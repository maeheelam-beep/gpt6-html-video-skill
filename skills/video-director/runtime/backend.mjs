import fs from 'node:fs';import path from 'node:path';import {spawn,spawnSync} from 'node:child_process';import {once} from 'node:events';
import {loadChromium,launch,serve} from './browser.mjs';
const args=process.argv.slice(2),command=args.shift(),take=(k,f)=>{const i=args.indexOf(k);return i<0?f:args.splice(i,2)[1];};
let browser,server,encoder;
const binary=(name,argv)=>{const r=spawnSync(name,argv,{encoding:'utf8',windowsHide:true});if(r.error||r.status!==0)throw Error(`${name} failed: ${r.error?.message||r.stderr?.slice(-1200)}`);return r.stdout;};
async function pageAt(project,width,height){const s=await serve(project);server=s.server;browser=await launch(await loadChromium());const page=await browser.newPage({viewport:{width,height}});let error;page.on('pageerror',e=>error=e.message);await page.goto(`http://127.0.0.1:${s.port}/index.html?render=1&w=${width}&h=${height}`);await page.waitForFunction(()=>window.READY===true&&typeof window.render==='function',null,{timeout:30000});await page.evaluate(()=>document.fonts.ready);if(error)throw Error(error);return page;}
try{
 if(command==='doctor'){
  const project=path.resolve(take('--project','.')),page=await pageAt(project,320,180);await page.evaluate(()=>window.render(0));console.log(JSON.stringify({backend:'bundled',browser:browser.version(),pageReady:true}));
 }else if(command==='render'){
  const project=path.resolve(args.shift()||'.'),size=take('--size','1920x1080').match(/^(\d+)x(\d+)$/),fps=Number(take('--fps','24')),audio=take('--audio'),output=path.resolve(project,take('--out','film.mp4'));
  if(!size||!Number.isFinite(fps)||fps<=0)throw Error('Invalid size/fps');
  for(const k of['--workers','--subframes']){const v=take(k,'1');if(v!=='1')throw Error('Bundled renderer supports one worker/sample; use the optional motion-showreel backend for advanced rendering');}
  if(args.length)throw Error('Unsupported bundled render options: '+args.join(' '));
  const width=+size[1],height=+size[2],page=await pageAt(project,width,height),duration=await page.evaluate(()=>window.DUR);
  if(!Number.isFinite(duration)||duration<=0)throw Error('Invalid window.DUR');if(width%2||height%2)throw Error('H.264 yuv420p requires even frame dimensions');
  const argv=['-y','-hide_banner','-loglevel','error','-f','image2pipe','-framerate',String(fps),'-i','pipe:0'];
  if(audio)argv.push('-i',path.resolve(project,audio),'-map','0:v:0','-map','1:a:0','-c:a','aac','-b:a','192k');
  argv.push('-c:v','libx264','-preset','medium','-crf','18','-pix_fmt','yuv420p','-t',String(duration),'-movflags','+faststart',output);fs.mkdirSync(path.dirname(output),{recursive:true});
  encoder=spawn('ffmpeg',argv,{stdio:['pipe','ignore','pipe'],windowsHide:true});let stderr='',pipeError;encoder.stderr.on('data',b=>stderr=(stderr+b).slice(-2000));encoder.stdin.on('error',e=>pipeError=e);encoder.on('error',e=>pipeError=e);const finished=new Promise(r=>encoder.on('close',r));
  const frames=Math.round(duration*fps);for(let i=0;i<frames;i++){if(pipeError)throw pipeError;await page.evaluate(t=>window.render(t),i/fps);const png=await page.screenshot({type:'png'});if(!encoder.stdin.write(png))await once(encoder.stdin,'drain');}
  encoder.stdin.end();const code=await finished;encoder=null;if(code!==0)throw Error('FFmpeg encode failed: '+stderr);console.log(JSON.stringify({video:output,frames,duration,width,height,fps,backend:'bundled'}));
 }else if(command==='qa'){
  const video=path.resolve(args.shift()||''),project=path.resolve(take('--project',path.dirname(video))),size=take('--expect-size'),fps=Number(take('--expect-fps')),duration=Number(take('--expect-duration')),audio=take('--audio'),out=path.resolve(project,take('--out','qa/video'));
  if(args.length)throw Error('Unsupported bundled QA options: '+args.join(' '));if(!size||!fps||!duration||!['none','required'].includes(audio))throw Error('Explicit QA specs required');
  const info=JSON.parse(binary('ffprobe',['-v','error','-count_frames','-show_streams','-show_format','-of','json',video])),v=info.streams.find(s=>s.codec_type==='video'),hasAudio=info.streams.some(s=>s.codec_type==='audio'),issues=[];
  if(!v)throw Error('No video stream');const actualFps=v.avg_frame_rate.split('/').reduce((a,b)=>a/b),actualDuration=Number(v.duration||info.format.duration),frames=Number(v.nb_read_frames);
  if(`${v.width}x${v.height}`!==size)issues.push('size mismatch');if(Math.abs(actualFps-fps)>.01)issues.push('fps mismatch');if(Math.abs(actualDuration-duration)>1.5/fps)issues.push('duration mismatch');if(Math.abs(frames-Math.round(duration*fps))>1)issues.push('frame count mismatch');if(hasAudio!==(audio==='required'))issues.push('audio presence mismatch');
  binary('ffmpeg',['-v','error','-i',video,'-f','null','-']);const report={video,backend:'bundled',issues,frames,actualFps,actualDuration,hasAudio,checks:['metadata','frame count','audio presence','full decode'],notChecked:['black/flash detection','audio loudness','visual judgment','audio audition']};fs.mkdirSync(path.dirname(out),{recursive:true});fs.writeFileSync(out+'.json',JSON.stringify(report,null,2));console.log(JSON.stringify(report));if(issues.length)process.exitCode=1;
 }else if(command==='preview'){
  const project=path.resolve(args.shift()||'.'),s=await serve(project);server=s.server;console.log(`Preview: http://127.0.0.1:${s.port}/index.html (Ctrl+C to stop)`);await new Promise(resolve=>{process.once('SIGINT',resolve);process.once('SIGTERM',resolve);});
 }else throw Error('Unknown bundled backend command');
}catch(e){console.error(e.message);process.exitCode=1;}finally{if(encoder)encoder.kill();await browser?.close();if(server)await new Promise(r=>server.close(r));}
