const spec=await(await fetch('project.json')).json(),c=document.querySelector('canvas'),qs=new URLSearchParams(location.search);c.width=+(qs.get('w')||spec.width);c.height=+(qs.get('h')||spec.height);const g=c.getContext('2d');
window.DUR=spec.duration;
window.render=t=>{const w=spec.width,h=spec.height,u=Math.max(0,Math.min(1,t/spec.duration));g.save();g.scale(c.width/w,c.height/h);g.fillStyle='#181818';g.fillRect(0,0,w,h);g.fillStyle='#aaaaaa';g.beginPath();g.arc(w*(.2+.6*u),h*.54,h*.1,0,Math.PI*2);g.fill();g.font=`500 ${Math.max(16,h*.065)}px "Microsoft YaHei",sans-serif`;g.fillStyle='#eeeeee';g.fillText('工程起点 · 请替换为作品内容',w*.08,h*.22);g.restore();};
window.inspect=t=>{window.render(t);return{crop:[0,0,spec.width,spec.height],annotations:[]};};
await document.fonts.ready;window.render(0);window.READY=true;

