import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
export const ROOT=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
export const SKILLS=process.env.VIDEO_SKILLS_HOME?path.resolve(process.env.VIDEO_SKILLS_HOME):path.dirname(ROOT);
export function sibling(name,rel='SKILL.md'){const p=path.join(SKILLS,name,rel);if(!fs.existsSync(p))throw Error(`Missing ${name}: ${p}`);return p;}
export function backend(){const p=path.join(SKILLS,'motion-showreel/scripts/codex-native.mjs');return fs.existsSync(p)?p:path.join(ROOT,'runtime/backend.mjs');}
export function browserRuntime(){const p=path.join(SKILLS,'motion-showreel/scripts/lib/browser.mjs');return fs.existsSync(p)?p:path.join(ROOT,'runtime/browser.mjs');}
export function browserEnv(){const env={...process.env};const browser=[env.CHROME_PATH,env.PLAYWRIGHT_CHROME,'C:/Program Files/Google/Chrome/Application/chrome.exe','C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe','/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'].find(p=>p&&fs.existsSync(p));if(browser)env.CHROME_PATH=env.PLAYWRIGHT_CHROME=browser;return env;}
export function spec(project){
 const d=JSON.parse(fs.readFileSync(path.join(project,'project.json'),'utf8'));
 for(const k of ['duration','width','height','fps'])if(!Number.isFinite(d[k])||d[k]<=0)throw Error(`Invalid project ${k}`);
 for(const k of ['width','height','fps'])if(!Number.isInteger(d[k]))throw Error(`${k} must be an integer`);
 if(!['none','required'].includes(d.audio))throw Error('audio must be none|required');
 if(!Array.isArray(d.scenes)||!d.scenes.length)throw Error('scenes must not be empty');
 let cursor=0;for(const s of d.scenes){if(!s.id||!Number.isFinite(s.start)||!Number.isFinite(s.end)||Math.abs(s.start-cursor)>.001||s.end<=s.start||s.end>d.duration+.001)throw Error('Scenes must cover the film in order without gaps/overlaps');cursor=s.end;}
 if(Math.abs(cursor-d.duration)>.001)throw Error('Scenes must end at duration');return d;
}
