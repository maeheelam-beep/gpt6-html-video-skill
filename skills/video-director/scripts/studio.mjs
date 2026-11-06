#!/usr/bin/env node
import fs from 'node:fs';import path from 'node:path';import {spawnSync} from 'node:child_process';
import {ROOT,SKILLS,sibling,backend,browserEnv,spec} from './common.mjs';
const args=process.argv.slice(2),cmd=args.shift();
const take=(k,fallback)=>{const i=args.indexOf(k);return i<0?fallback:args.splice(i,2)[1];};
function run(script,argv,cwd=process.cwd()){const r=spawnSync(process.execPath,[script,...argv],{cwd,env:browserEnv(),stdio:'inherit',windowsHide:true});if(r.error)throw r.error;process.exitCode=r.status??1;return r.status;}
function binary(name){const r=spawnSync(name,['-version'],{encoding:'utf8',windowsHide:true});return r.status===0?r.stdout.split('\n')[0].trim():null;}
try{
 if(cmd==='doctor'){
  const names=['motion-showreel','lemo-opuscar','code-mv-render','ui2v-motions','video-shot-demos','swiss-shot-demos','phone-ui-demos','win11-ui-demos','dynamic-archify','flowchart','network-protocol-viz','card-theater','stacked-data-cards','ppt-animation','web-video-presentation','opus-video-skills','hyperframes','video-qa-frameproof','gpt-image-2','beautiful-article','web-design-engineer','kb-retriever'];
  const skills=Object.fromEntries(names.map(n=>[n,{installed:fs.existsSync(path.join(SKILLS,n,'SKILL.md')),path:path.join(SKILLS,n),...(n==='hyperframes'||n==='video-qa-frameproof'?{engine:'not inferred from skill installation'}:{})}]));
  const report={node:process.versions.node,skillsRoot:SKILLS,ffmpeg:binary('ffmpeg'),ffprobe:binary('ffprobe'),browser:browserEnv().CHROME_PATH||'Playwright discovery',skills};console.log(JSON.stringify(report,null,2));
  const reportFile=take('--report');if(reportFile){fs.mkdirSync(path.dirname(path.resolve(reportFile)),{recursive:true});fs.writeFileSync(reportFile,JSON.stringify(report,null,2));}
  if(+process.versions.node.split('.')[0]<20||!report.ffmpeg||!report.ffprobe||(!skills['motion-showreel'].installed&&!fs.existsSync(path.join(ROOT,'node_modules/playwright-core'))))process.exitCode=1;
  if(args.includes('--launch')){const project=path.resolve(take('--project',process.cwd()));run(backend(),['doctor','--project',project]);}
 }else if(cmd==='init'){
  const target=args.shift();if(!target||target.startsWith('--'))throw Error('init requires a target directory');const project=path.resolve(target);
  const duration=Number(take('--duration')),fps=Number(take('--fps','24')),size=take('--size','1920x1080').match(/^(\d+)x(\d+)$/),audio=take('--audio','none'),route=take('--route','code');
  if(!size||!Number.isFinite(duration)||duration<=0||!Number.isInteger(fps)||fps<1||!['none','required'].includes(audio))throw Error('Invalid project specs');
  const width=+size[1],height=+size[2];if(width<16||height<16||width>8192||height>8192)throw Error('Unsupported frame size');if(args.length)throw Error('Unknown init arguments: '+args.join(' '));
  if(fs.existsSync(project)&&(!fs.statSync(project).isDirectory()||fs.readdirSync(project).length))throw Error('Target must be absent or empty; existing work is never overwritten');
  fs.mkdirSync(project,{recursive:true});fs.cpSync(path.join(ROOT,'assets/starter'),project,{recursive:true});
  fs.writeFileSync(path.join(project,'project.json'),JSON.stringify({version:1,route,starter:true,duration,width,height,fps,audio,scenes:[{id:'opening',start:0,end:duration}]},null,2));
  console.log(JSON.stringify({project,starter:true,note:'Replace example content before delivery'}));
 }else if(cmd==='render'){
  const project=path.resolve(args.shift()||'.'),d=spec(project),allow=args.indexOf('--allow-starter');if(allow>=0)args.splice(allow,1);
  if(d.starter&&allow<0)throw Error('Replace starter content and set starter=false; --allow-starter is only for pipeline testing');
  if(d.audio==='required'&&!args.includes('--audio'))throw Error('Soundtrack required: pass --audio <actual audio file>');
  if(args.includes('--size')||args.includes('--fps'))throw Error('Set size/fps in project.json so render and QA share the same contract');
  run(backend(),['render',project,'--size',`${d.width}x${d.height}`,'--fps',String(d.fps),...args]);
 }else if(cmd==='qa'){
  const video=path.resolve(args.shift()||''),project=path.resolve(take('--project',path.dirname(video))),d=spec(project);
  const fontDir=path.join(project,'fonts');
  const hasProjectFont=fs.existsSync(fontDir)&&fs.readdirSync(fontDir).some(n=>/\.(ttf|otf)$/i.test(n));
  if(!process.env.SHOWREEL_FONT_FILE&&!hasProjectFont){
   const font=['C:/Windows/Fonts/arial.ttf','/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf'].find(p=>fs.existsSync(p));
   if(font)process.env.SHOWREEL_FONT_FILE=font;
  }
  for(const k of['--expect-size','--expect-fps','--expect-duration','--audio'])if(args.includes(k))throw Error('QA specs are taken from project.json; update the contract there');
  run(backend(),['qa',video,'--project',project,'--expect-size',`${d.width}x${d.height}`,'--expect-fps',String(d.fps),'--expect-duration',String(d.duration),'--audio',d.audio,...args]);
 }else if(cmd==='review')run(path.join(ROOT,'scripts/review.mjs'),args);
 else if(cmd==='preview'){const project=path.resolve(args.shift()||'.');run(backend(),['preview',project,...args]);}
 else throw Error('Usage: studio.mjs doctor [--launch] | init <dir> --duration N --size WxH --fps N --audio none|required | render <dir> ... | qa <video> --project <dir> | review <dir> | preview <dir>');
}catch(e){console.error(e.message);process.exitCode=1;}

