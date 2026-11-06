export function auditFrame(frame,width,height){
 frame=frame&&typeof frame==='object'?frame:{};
 const issues=[],unverified=[];
 const crop=frame.crop||[0,0,width,height];
 if(crop.length!==4||crop.some(v=>!Number.isFinite(v))||crop[2]<=crop[0]||crop[3]<=crop[1])return{issues:['Invalid crop'],unverified};
 const active=(Array.isArray(frame.annotations)?frame.annotations:[]).filter(a=>a&&((a.alpha??1)>=.9));
 if(!Array.isArray(frame.annotations))unverified.push('No annotation contract; annotation geometry was not checked');
 for(const [i,a] of active.entries()){
  const name=a.text||`annotation-${i}`;
  if(!Array.isArray(a.anchor)||a.anchor.length!==2||a.anchor.some(v=>!Number.isFinite(v))){issues.push(`${name}: invalid anchor`);continue;}
  if(!Array.isArray(a.box)||a.box.length!==4||a.box.some(v=>!Number.isFinite(v))||a.box[2]<=0||a.box[3]<=0){issues.push(`${name}: invalid box`);continue;}
  const [l,t,r,b]=crop,[x,y,w,h]=a.box;
  if(a.anchor[0]<l||a.anchor[0]>r||a.anchor[1]<t||a.anchor[1]>b)issues.push(`${name}: anchor outside viewport`);
  if(x<l||y<t||x+w>r||y+h>b)issues.push(`${name}: label outside viewport`);
 }
 for(let i=0;i<active.length;i++)for(let j=i+1;j<active.length;j++){
  const a=active[i].box,b=active[j].box;if(!Array.isArray(a)||!Array.isArray(b))continue;
  if(a[0]<b[0]+b[2]&&a[0]+a[2]>b[0]&&a[1]<b[1]+b[3]&&a[1]+a[3]>b[1])issues.push(`${active[i].text}/${active[j].text}: label overlap`);
 }
 if(Array.isArray(frame.assertions)){
  for(const a of frame.assertions){if(a?.passed===false)issues.push(`${a.name||'Project assertion'}: ${a.message||'failed'}`);else if(a?.passed!==true)unverified.push(`${a?.name||'Project assertion'}: no boolean result`);}
 }else unverified.push('No project content assertions supplied');
 return{issues,unverified};
}
