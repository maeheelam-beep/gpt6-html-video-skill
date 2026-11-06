import fs from 'node:fs';import path from 'node:path';import {pathToFileURL} from 'node:url';
import {browserRuntime,browserEnv,spec} from './common.mjs';import {auditFrame} from './audit.mjs';
const args=process.argv.slice(2),project=path.resolve(args.shift()||'.');
const take=(k,d)=>{const i=args.indexOf(k);return i<0?d:args.splice(i,2)[1];};
let browser,server;
try{
 const d=spec(project),step=Number(take('--step','.25')),out=path.resolve(project,take('--out','qa/director'));
 if(!Number.isFinite(step)||step<=0||d.duration/step>100000)throw Error('Invalid step or excessive sample count');
 if(args.length)throw Error('Unknown review arguments: '+args.join(' '));
 if(!fs.existsSync(path.join(project,'index.html')))throw Error('Review requires project index.html');
 Object.assign(process.env,browserEnv());
 const runtime=await import(pathToFileURL(browserRuntime()));
 const service=await runtime.serve(project);server=service.server;
 browser=await runtime.launch(await runtime.loadChromium(project));
 const page=await browser.newPage({viewport:{width:d.width,height:d.height}}),pageErrors=[];
 page.on('pageerror',e=>pageErrors.push(e.message));page.on('response',r=>{if(r.status()>=400&&!r.url().endsWith('favicon.ico'))pageErrors.push(`HTTP ${r.status()}: ${r.url()}`);});
 await page.goto(`http://127.0.0.1:${service.port}/index.html?render=1&w=${d.width}&h=${d.height}`);
 await page.waitForFunction(()=>window.READY===true&&typeof window.render==='function',null,{timeout:30000});
 await page.evaluate(()=>document.fonts.ready);
 const contract=await page.evaluate(()=>({duration:window.DUR,inspect:typeof window.inspect==='function'}));
 if(Math.abs(contract.duration-d.duration)>1e-6)throw Error('Page duration does not match project.json');
 const issues=[],unverified=new Set();let samples=0,annotations=0;
 for(let t=0;t<d.duration;t+=step){
  const frame=await page.evaluate(t=>{window.render(t);return typeof window.inspect==='function'?window.inspect(t):{};},t);
  const result=auditFrame(frame,d.width,d.height);samples++;annotations+=(frame.annotations||[]).length;
  for(const issue of result.issues)issues.push({time:+t.toFixed(4),issue});for(const message of result.unverified)unverified.add(message);
 }
 fs.mkdirSync(out,{recursive:true});const points=[];
 for(const s of d.scenes){const span=s.end-s.start;for(const t of[s.start+Math.min(.2,span*.1),(s.start+s.end)/2,s.end-Math.min(.15,span*.1)])points.push({time:t,kind:'shot',scene:s.id});}
 for(const s of d.scenes.slice(1))for(const dt of[-.2,.2,.7]){const t=s.start+dt;if(t>=0&&t<d.duration)points.push({time:t,kind:'transition',scene:s.id});}
 const escape=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));const cards=[];
 for(let i=0;i<points.length;i++){
  const p=points[i];await page.evaluate(t=>window.render(t),p.time);const file=`frame-${String(i).padStart(3,'0')}.jpg`;await page.screenshot({path:path.join(out,file),type:'jpeg',quality:88});p.file=file;
  cards.push(`<figure><img loading="lazy" src="data:image/jpeg;base64,${fs.readFileSync(path.join(out,file)).toString('base64')}" alt="${escape(p.scene)}"><figcaption>${p.time.toFixed(2)}s · ${escape(p.kind)} · ${escape(p.scene)}</figcaption></figure>`);
 }
 for(const message of pageErrors)issues.push({issue:message});
 const report={project,spec:d,samples,annotations,issues,unverified:[...unverified],inspectAvailable:contract.inspect,observedVisual:false,audioAudition:false,frames:points};
 fs.writeFileSync(path.join(out,'review.json'),JSON.stringify(report,null,2));
 const html=`<!doctype html><html lang="zh-CN"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>视频关键帧检查</title><style>body{background:#14242c;color:#f4ead6;font:16px/1.6 system-ui;margin:28px}main{max-width:1500px;margin:auto}.grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(320px,1fr));gap:18px}figure{margin:0;background:#213740}img{width:100%;cursor:zoom-in}figcaption{padding:8px}dialog{max-width:94vw;background:#14242c;color:white}dialog img{width:auto;max-width:90vw;max-height:85vh}dialog::backdrop{background:#000c}</style><main><h1>关键帧检查材料</h1><p>${samples} 个时间样本；${issues.length} 个几何/运行问题；${unverified.size} 类未验证项。生成材料不等于已经人工审片或试听。</p><pre>${escape(JSON.stringify({issues:issues.slice(0,30),unverified:[...unverified]},null,2))}</pre><div class="grid">${cards.join('')}</div></main><dialog><button>关闭</button><img></dialog><script>const d=document.querySelector('dialog');document.querySelectorAll('figure img').forEach(i=>i.onclick=()=>{d.querySelector('img').src=i.src;d.showModal()});d.querySelector('button').onclick=()=>d.close();</script></html>`;
 fs.writeFileSync(path.join(out,'review.html'),html);console.log(JSON.stringify({samples,frames:points.length,issues:issues.length,unverified:[...unverified],report:path.join(out,'review.json')}));if(issues.length)process.exitCode=1;
}catch(e){console.error(e.message);process.exitCode=1;}finally{await browser?.close();if(server)await new Promise(r=>server.close(r));}
