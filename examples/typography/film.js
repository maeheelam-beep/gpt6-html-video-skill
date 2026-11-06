// Original, dependency-free demonstrations. All motion derives from time.
const canvas=document.querySelector('canvas'),g=canvas.getContext('2d');
const mode=document.body.dataset.example,W=960,H=540;
canvas.width=W;canvas.height=H;window.DUR=8;
const clamp=x=>Math.max(0,Math.min(1,x)),ease=x=>1-(1-clamp(x))**3;
function text(s,x,y,size=20,color='#fff',weight=400){g.fillStyle=color;g.font=`${weight} ${size}px Arial, "Microsoft YaHei", sans-serif`;g.fillText(s,x,y);}
function rect(x,y,w,h,r,color){g.fillStyle=color;g.beginPath();g.roundRect(x,y,w,h,r);g.fill();}
function line(x,y,X,Y,c,width=1){g.strokeStyle=c;g.lineWidth=width;g.beginPath();g.moveTo(x,y);g.lineTo(X,Y);g.stroke();}
function dot(x,y,r,c){g.fillStyle=c;g.beginPath();g.arc(x,y,r,0,Math.PI*2);g.fill();}
function top(a,b,color){text(a,48,44,13,color,700);text(b,790,44,12,color);}
function footer(s,color){text(s,48,505,14,color);}
function product(t){
 g.fillStyle='#111815';g.fillRect(0,0,W,H);const grad=g.createRadialGradient(655,235,0,655,235,330);grad.addColorStop(0,'#315442');grad.addColorStop(1,'#111815');g.fillStyle=grad;g.fillRect(0,0,W,H);
 top('01 / PRODUCT FILM','FICTIONAL BRAND','#a9c5b5');
 const e=ease(t/1.3);g.save();g.globalAlpha=e;g.translate(-30*(1-e),0);text('Less noise.',48,180,56,'#f1f2df',700);text('More focus.',48,243,56,'#f1f2df',700);text('A quiet object. A clearer day.',51,288,18,'#acc2b3');
 const v=ease((t-3.5)/1.1);rect(50,335,157*v,36,18,'#c8e68c');if(v>.9)text('MEET STILL',71,359,13,'#173224',700);g.restore();
 g.save();g.translate(666,269+8*Math.sin(t*1.3));g.rotate(-.13+.07*Math.sin(t*.8));g.scale(.85+.15*e,.85+.15*e);
 g.shadowColor='#0009';g.shadowBlur=35;rect(-116,-167,232,334,46,'#bbc5b5');g.shadowBlur=0;
 const shell=g.createLinearGradient(-110,0,115,0);shell.addColorStop(0,'#cad4c4');shell.addColorStop(.45,'#edf1dc');shell.addColorStop(1,'#a8b8a7');rect(-110,-161,220,322,42,shell);rect(-83,-127,166,140,22,'#162b24');
 for(let i=0;i<26;i++){const bar=12+35*(.5+.5*Math.sin(i*.67+t*2));rect(-66+i*5.2,-57-bar/2,2.8,bar,2,'#c8e68c');}
 text('STILL',-28,54,15,'#314f3c',700);dot(0,105,24,'#a5b49f');dot(0,105,18,'#d4ddc8');g.restore();
 footer('Concept product • procedural illustration • no external assets','#91aa99');
}
function data(t){
 g.fillStyle='#f4f0e7';g.fillRect(0,0,W,H);top('02 / DATA STORY','ILLUSTRATIVE DATA','#5b645e');
 text('A better way to get there.',48,112,38,'#183c35',700);text('One fictional city. Four ways to commute.',49,147,18,'#6b736a');
 const labels=['Private car','Bus','Bicycle','Walking'],values=[72,46,19,12],colors=['#aeb5aa','#899f83','#42765b','#d77449'];
 for(let i=0;i<4;i++){let p=ease((t-.7-i*.32)/1.9),y=199+i*60;text(labels[i],50,y+22,18,'#24483c',600);rect(202,y,610,32,4,'#e3e3d8');rect(202,y,values[i]/80*610*p,32,4,colors[i]);text(String(Math.round(values[i]*p))+' min',830,y+23,16,'#24483c',700);}
 const e=ease((t-4.4)/1.1);g.globalAlpha=e;line(49,455,910,455,'#cbcfc1');text('Time adds up. So do your choices.',50,485,22,'#24483c',600);g.globalAlpha=1;
 text('Demo values only — not measured travel times or policy evidence.',50,523,12,'#71786c');
}
function science(t){
 g.fillStyle='#071728';g.fillRect(0,0,W,H);top('03 / SCIENCE EXPLAINER','SCHEMATIC','#86afc5');text('A wave carries energy.',48,112,38,'#e1eff4',700);text('The medium oscillates around its resting position.',49,147,18,'#a3bfd0');
 for(let x=80;x<900;x+=40)line(x,200,x,407,'#142d40');for(let y=207;y<420;y+=40)line(60,y,910,y,'#142d40');
 line(64,307,908,307,'#55718a');g.strokeStyle='#4fdaca';g.lineWidth=3;g.beginPath();
 for(let x=65;x<908;x+=2){const y=307+62*Math.sin((x-65)/72-t*2.5);x===65?g.moveTo(x,y):g.lineTo(x,y);}g.stroke();
 for(let i=0;i<26;i++){const x=70+i*32,y=307+62*Math.sin((x-65)/72-t*2.5);dot(x,y,i===12?9:4,i===12?'#ffca76':'#6ed9d0');}
 const xx=454,yy=307+62*Math.sin((xx-65)/72-t*2.5);line(xx,215,xx,398,'#ffca7666',2);dot(xx,307,3,'#ffca76');
 text('One particle: up ↕ down',512,415,17,'#ffca76');line(496,409,xx+12,yy,'#ffca7688');
 const arrow=620+((t*30)%150);line(arrow,212,arrow+64,212,'#6ed9d0',3);line(arrow+64,212,arrow+54,205,'#6ed9d0',3);line(arrow+64,212,arrow+54,219,'#6ed9d0',3);text('Energy →',646,192,16,'#6ed9d0');
 footer('Transverse-wave model • horizontal positions stay fixed • not to scale','#86afc5');
}
function type(t){
 g.fillStyle='#eb5039';g.fillRect(0,0,W,H);top('04 / KINETIC TYPOGRAPHY','MAKE IT MOVE','#351e1b');
 const words=[['MAKE',74,214],['ROOM',74,344],['FOR IDEAS.',74,454]];
 words.forEach(([s,x,y],i)=>{const e=ease((t-.25-i*.55)/1.15);g.save();g.beginPath();g.rect(50,y-112,870,121);g.clip();g.translate(0,(1-e)*125);text(s,x,y,i===2?95:142,'#f5ead4',900);g.restore();});
 const spin=t*.4;g.save();g.translate(798,190);g.rotate(spin);for(let i=0;i<12;i++){g.rotate(Math.PI/6);rect(28,-5,38,10,2,'#391e1a');}dot(0,0,18,'#391e1a');g.restore();
 footer('Big type. Clear rhythm. One idea at a time.','#351e1b');
}
function ui(t){
 g.fillStyle='#e8edf7';g.fillRect(0,0,W,H);top('05 / INTERFACE DEMO','FICTIONAL APP','#596881');
 text('From scattered to scheduled.',48,108,35,'#243453',700);
 rect(142,145,676,310,16,'#fff');rect(142,145,160,310,16,'#253452');rect(285,145,17,310,0,'#253452');text('daylight',165,181,21,'#e8ecff',700);
 ['Overview','My tasks','Calendar'].forEach((s,i)=>{if(i===1)rect(156,237,130,35,7,'#405476');text(s,170,225+i*35,14,'#e1e8f7');});
 text('Today, with intention.',325,182,22,'#263652',700);text('YOUR TASKS',326,215,11,'#7a8799',700);
 const names=['Write the brief','Review the design','Share the first cut'];
 names.forEach((s,i)=>{const done=t>2+i*1.1,y=231+i*61;rect(321,y,473,50,8,done?'#eff6f0':'#f5f6fa');rect(337,y+15,20,20,5,done?'#618b6b':'#d9dfeb');if(done){line(342,y+25,346,y+29,'#fff',2);line(346,y+29,353,y+20,'#fff',2);}text(s,372,y+29,16,done?'#526d58':'#394b68',500);text(done?'DONE':'TODAY',723,y+29,10,done?'#618b6b':'#8390a5',700);});
 const target=Math.min(2,Math.floor(Math.max(0,t-1.8)/1.1)),cy=256+target*61;const cx=350+75*(1-ease((t-.6)/1.1));g.fillStyle='#253452';g.beginPath();g.moveTo(cx,cy);g.lineTo(cx+8,cy+24);g.lineTo(cx+13,cy+15);g.lineTo(cx+24,cy+12);g.closePath();g.fill();
 const e=ease((t-5.4)/.7);g.globalAlpha=e;rect(565,407,228,34,8,'#253452');text('All clear. Make space to create.',578,429,12,'#fff');g.globalAlpha=1;
 footer('A scripted interface concept • no account, API or personal data','#596881');
}
const scenes={product,data,science,typography:type,interface:ui};
window.render=t=>{g.save();scenes[mode](Math.max(0,Math.min(8,t)));g.restore();};
await document.fonts.ready;window.render(0);window.READY=true;
if(!new URLSearchParams(location.search).has('render')){let start=performance.now(),paused=false,held=0;const button=document.querySelector('button');button.onclick=()=>{paused=!paused;if(paused)held=(performance.now()-start)/1000;else start=performance.now()-held*1000;button.textContent=paused?'Play / 播放':'Pause / 暂停';};function loop(now){if(!paused)window.render(((now-start)/1000)%8);requestAnimationFrame(loop);}requestAnimationFrame(loop);}
