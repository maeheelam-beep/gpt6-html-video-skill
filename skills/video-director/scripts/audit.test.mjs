import {test} from 'node:test';import assert from 'node:assert/strict';import {auditFrame} from './audit.mjs';
test('valid geometry and project-defined assertions pass declared checks',()=>{
 const r=auditFrame({annotations:[{text:'first',anchor:[20,30],box:[5,5,10,10]},{text:'second',anchor:[60,30],box:[70,5,10,10]}],assertions:[{name:'content',passed:true}]},100,100);assert.deepEqual(r,{issues:[],unverified:[]});
});
test('failed project assertion, off-screen anchor, clipped label and collisions fail',()=>{
 const r=auditFrame({annotations:[{text:'outside',anchor:[-1,20],box:[90,5,20,20]},{text:'overlap',anchor:[50,40],box:[92,8,5,5]}],assertions:[{name:'reference-match',passed:false}]},100,100);assert.equal(r.issues.length,4);
});
test('missing semantics and absent inspect are unverified, not invented passes',()=>{
 const r=auditFrame({annotations:[{anchor:[20,30],box:[5,5,10,10]}]},100,100);assert.equal(r.unverified.length,1);assert.equal(auditFrame({},100,100).unverified.length,2);
});
test('non-finite geometry and malformed crop fail without throwing',()=>{
 assert.ok(auditFrame({annotations:[{anchor:[NaN,2],box:[1,1,4,4]}]},100,100).issues.length);
 assert.ok(auditFrame({crop:[0,0,NaN,50]},100,100).issues.length);
});
