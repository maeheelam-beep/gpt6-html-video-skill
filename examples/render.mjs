// From repository root: node examples/render.mjs [product|data|science|typography|interface]
import {spawnSync} from 'node:child_process';
import fs from 'node:fs';import path from 'node:path';import {fileURLToPath} from 'node:url';
const root=path.dirname(fileURLToPath(import.meta.url)),repo=path.dirname(root);
const names=['product','data','science','typography','interface'];
const selected=process.argv.slice(2);if(selected.some(n=>!names.includes(n)))throw Error('Unknown example');
fs.mkdirSync(path.join(root,'previews'),{recursive:true});
function run(bin,args){const r=spawnSync(bin,args,{cwd:repo,stdio:'inherit',windowsHide:true});if(r.error||r.status!==0)throw Error(`${bin} failed`);}
for(const name of selected.length?selected:names){
 const project=path.join(root,name),video=path.join(root,'previews',name+'.mp4');
 run(process.execPath,['skills/video-director/runtime/backend.mjs','render',project,'--size','960x540','--fps','24','--out',video]);
 run(process.execPath,['skills/video-director/runtime/backend.mjs','qa',video,'--project',project,'--expect-size','960x540','--expect-fps','24','--expect-duration','8','--audio','none','--out','qa/video']);
 run('ffmpeg',['-y','-v','error','-ss','5.5','-i',video,'-frames:v','1',path.join(root,'previews',name+'.png')]);
 run('ffmpeg',['-y','-v','error','-i',video,'-vf','fps=10,scale=480:-1:flags=lanczos,split[a][b];[a]palettegen=stats_mode=diff[p];[b][p]paletteuse=dither=bayer','-loop','0',path.join(root,'previews',name+'.gif')]);
 console.log('Rendered and decoded:',name);
}
