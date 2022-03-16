var app=function(){"use strict";function t(){}function e(t){return t()}function n(){return Object.create(null)}function o(t){t.forEach(e)}function r(t){return"function"==typeof t}function c(t,e){return t!=t?e==e:t!==e||t&&"object"==typeof t||"function"==typeof t}let l,s;function i(t,e){return t!=t?e==e:t!==e}function u(e,n,o){e.$$.on_destroy.push(function(e,...n){if(null==e)return t;const o=e.subscribe(...n);return o.unsubscribe?()=>o.unsubscribe():o}(n,o))}function f(t,e,n){return t.set(n),e}function a(t,e){t.appendChild(e)}function h(t,e,n){t.insertBefore(e,n||null)}function d(t){t.parentNode.removeChild(t)}function g(t,e){for(let n=0;n<t.length;n+=1)t[n]&&t[n].d(e)}function m(t){return document.createElement(t)}function p(t){return document.createElementNS("http://www.w3.org/2000/svg",t)}function b(t){return document.createTextNode(t)}function $(){return b(" ")}function w(){return b("")}function v(t,e,n,o){return t.addEventListener(e,n,o),()=>t.removeEventListener(e,n,o)}function y(t,e,n){null==n?t.removeAttribute(e):t.getAttribute(e)!==n&&t.setAttribute(e,n)}function x(t,e){e=""+e,t.wholeText!==e&&(t.data=e)}function E(t,e,n){t.classList[n?"add":"remove"](e)}function _(t){s=t}function T(){if(!s)throw new Error("Function called outside component initialization");return s}function N(t){T().$$.on_destroy.push(t)}function k(){const t=T();return(e,n)=>{const o=t.$$.callbacks[e];if(o){const r=function(t,e,n=!1){const o=document.createEvent("CustomEvent");return o.initCustomEvent(t,n,!1,e),o}(e,n);o.slice().forEach((e=>{e.call(t,r)}))}}}function A(t,e){const n=t.$$.callbacks[e.type];n&&n.slice().forEach((t=>t.call(this,e)))}const O=[],S=[],L=[],M=[],q=Promise.resolve();let C=!1;function D(t){L.push(t)}const z=new Set;let I=0;function B(){const t=s;do{for(;I<O.length;){const t=O[I];I++,_(t),P(t.$$)}for(_(null),O.length=0,I=0;S.length;)S.pop()();for(let t=0;t<L.length;t+=1){const e=L[t];z.has(e)||(z.add(e),e())}L.length=0}while(O.length);for(;M.length;)M.pop()();C=!1,z.clear(),_(t)}function P(t){if(null!==t.fragment){t.update(),o(t.before_update);const e=t.dirty;t.dirty=[-1],t.fragment&&t.fragment.p(t.ctx,e),t.after_update.forEach(D)}}const W=new Set;let R;function U(){R={r:0,c:[],p:R}}function V(){R.r||o(R.c),R=R.p}function F(t,e){t&&t.i&&(W.delete(t),t.i(e))}function j(t,e,n,o){if(t&&t.o){if(W.has(t))return;W.add(t),R.c.push((()=>{W.delete(t),o&&(n&&t.d(1),o())})),t.o(e)}}function G(t){t&&t.c()}function H(t,n,c,l){const{fragment:s,on_mount:i,on_destroy:u,after_update:f}=t.$$;s&&s.m(n,c),l||D((()=>{const n=i.map(e).filter(r);u?u.push(...n):o(n),t.$$.on_mount=[]})),f.forEach(D)}function J(t,e){const n=t.$$;null!==n.fragment&&(o(n.on_destroy),n.fragment&&n.fragment.d(e),n.on_destroy=n.fragment=null,n.ctx=[])}function K(t,e){-1===t.$$.dirty[0]&&(O.push(t),C||(C=!0,q.then(B)),t.$$.dirty.fill(0)),t.$$.dirty[e/31|0]|=1<<e%31}function Q(e,r,c,l,i,u,f,a=[-1]){const h=s;_(e);const g=e.$$={fragment:null,ctx:null,props:u,update:t,not_equal:i,bound:n(),on_mount:[],on_destroy:[],on_disconnect:[],before_update:[],after_update:[],context:new Map(r.context||(h?h.$$.context:[])),callbacks:n(),dirty:a,skip_bound:!1,root:r.target||h.$$.root};f&&f(g.root);let m=!1;if(g.ctx=c?c(e,r.props||{},((t,n,...o)=>{const r=o.length?o[0]:n;return g.ctx&&i(g.ctx[t],g.ctx[t]=r)&&(!g.skip_bound&&g.bound[t]&&g.bound[t](r),m&&K(e,t)),n})):[],g.update(),m=!0,o(g.before_update),g.fragment=!!l&&l(g.ctx),r.target){if(r.hydrate){const t=function(t){return Array.from(t.childNodes)}(r.target);g.fragment&&g.fragment.l(t),t.forEach(d)}else g.fragment&&g.fragment.c();r.intro&&F(e.$$.fragment),H(e,r.target,r.anchor,r.customElement),B()}_(h)}class X{$destroy(){J(this,1),this.$destroy=t}$on(t,e){const n=this.$$.callbacks[t]||(this.$$.callbacks[t]=[]);return n.push(e),()=>{const t=n.indexOf(e);-1!==t&&n.splice(t,1)}}$set(t){var e;this.$$set&&(e=t,0!==Object.keys(e).length)&&(this.$$.skip_bound=!0,this.$$set(t),this.$$.skip_bound=!1)}}var Y,Z,tt,et;!function(t){t[t.closed=0]="closed",t[t.flag=1]="flag",t[t.question=2]="question",t[t.flat=3]="flat",t[t.open=4]="open",t[t.wrong_flag=5]="wrong_flag"}(Y||(Y={})),function(t){t[t.zero=0]="zero",t[t.one=1]="one",t[t.two=2]="two",t[t.three=3]="three",t[t.four=4]="four",t[t.five=5]="five",t[t.six=6]="six",t[t.seven=7]="seven",t[t.eight=8]="eight"}(Z||(Z={})),function(t){t[t.OPEN=0]="OPEN",t[t.FLAG=2]="FLAG"}(tt||(tt={})),function(t){t[t.WON=0]="WON",t[t.LOST=1]="LOST",t[t.ACTIVE=2]="ACTIVE",t[t.UNSTARTED=3]="UNSTARTED"}(et||(et={}));const nt={width:10,height:10,question:!1,bombs:10,primary_action:tt.FLAG},ot=[];function rt(e,n=t){let o;const r=new Set;function l(t){if(c(e,t)&&(e=t,o)){const t=!ot.length;for(const t of r)t[1](),ot.push(t,e);if(t){for(let t=0;t<ot.length;t+=2)ot[t][0](ot[t+1]);ot.length=0}}}return{set:l,update:function(t){l(t(e))},subscribe:function(c,s=t){const i=[c,s];return r.add(i),1===r.size&&(o=n(l)||t),c(e),()=>{r.delete(i),0===r.size&&(o(),o=null)}}}}const ct=rt(et.UNSTARTED),lt=rt(0);function st(t){let e;function n(t,e){return t[1]?at:ft}let o=n(t),r=o(t);return{c(){r.c(),e=w()},m(t,n){r.m(t,n),h(t,e,n)},p(t,c){o===(o=n(t))&&r?r.p(t,c):(r.d(1),r=o(t),r&&(r.c(),r.m(e.parentNode,e)))},d(t){r.d(t),t&&d(e)}}}function it(e){let n;return{c(){n=b("?")},m(t,e){h(t,n,e)},p:t,d(t){t&&d(n)}}}function ut(t){let e,n,o,r=t[0]===Y.wrong_flag&&ht();return{c(){e=p("svg"),n=p("path"),o=p("path"),r&&r.c(),y(n,"d","M2 10v-1h1v-1h2v-3h1v3h2v1h1v1z"),y(n,"fill","#000"),y(o,"d","M2 3.5l4-2.5v5z"),y(o,"fill","red"),y(e,"xmlns","http://www.w3.org/2000/svg"),y(e,"viewBox","0 0 11 11")},m(t,c){h(t,e,c),a(e,n),a(e,o),r&&r.m(e,null)},p(t,n){t[0]===Y.wrong_flag?r||(r=ht(),r.c(),r.m(e,null)):r&&(r.d(1),r=null)},d(t){t&&d(e),r&&r.d()}}}function ft(t){let e,n=(t[2]?t[2]:"")+"";return{c(){e=b(n)},m(t,n){h(t,e,n)},p(t,o){4&o&&n!==(n=(t[2]?t[2]:"")+"")&&x(e,n)},d(t){t&&d(e)}}}function at(e){let n,o;return{c(){var t,e;n=m("img"),y(n,"class","bomb svelte-1n7xlyk"),t=n.src,e=o="./img/bomb.svg",l||(l=document.createElement("a")),l.href=e,t!==l.href&&y(n,"src","./img/bomb.svg"),y(n,"alt","bomb")},m(t,e){h(t,n,e)},p:t,d(t){t&&d(n)}}}function ht(t){let e;return{c(){e=p("path"),y(e,"d","M0 0L11 11zM0 11L11 0"),y(e,"stroke","#000"),y(e,"stroke-width","0.5")},m(t,n){h(t,e,n)},d(t){t&&d(e)}}}function dt(e){let n,r,c,l;function s(t,e){return t[0]===Y.flag||t[0]===Y.wrong_flag?ut:t[0]===Y.question?it:t[0]===Y.open?st:void 0}let i=s(e),u=i&&i(e);return{c(){n=m("span"),u&&u.c(),y(n,"class",r="tile "+(Z[e[2]]||"")+" "+Y[e[0]]+" svelte-1n7xlyk"),E(n,"exploded",e[3])},m(t,o){var r;h(t,n,o),u&&u.m(n,null),c||(l=[v(n,"click",e[5]),v(n,"contextmenu",(r=e[6],function(t){return t.preventDefault(),r.call(this,t)})),v(n,"mousedown",e[4])],c=!0)},p(t,[e]){i===(i=s(t))&&u?u.p(t,e):(u&&u.d(1),u=i&&i(t),u&&(u.c(),u.m(n,null))),5&e&&r!==(r="tile "+(Z[t[2]]||"")+" "+Y[t[0]]+" svelte-1n7xlyk")&&y(n,"class",r),13&e&&E(n,"exploded",t[3])},i:t,o:t,d(t){t&&d(n),u&&u.d(),c=!1,o(l)}}}function gt(t,e,n){let o,r;u(t,ct,(t=>n(14,o=t))),u(t,lt,(t=>n(15,r=t)));let{row:c}=e,{col:l}=e,{neighbors:s=[]}=e,{state:i=Y.closed}=e,{bomb:a=!1}=e,h=null,d=!1;const g=k();function m(t=!0){if(i===Y.closed)a?(f(ct,o=et.LOST,o),n(3,d=!0)):(g("clicked",{row:c,col:l,neighbors:s}),null===h&&n(2,h=s.reduce(((t,e)=>e.bomb?t+1:t),0)),0===h&&s.forEach((t=>t.calculateBombs()))),n(0,i=Y.open);else if(i===Y.open&&t){s.reduce(((t,e)=>e.state===Y.flag?t+1:t),0)>=h&&s.forEach((t=>t.open(!1)))}}function p(){switch(i){case Y.closed:r<nt.bombs?(n(0,i=Y.flag),f(lt,r+=1,r)):nt.question&&n(0,i=Y.question);break;case Y.flag:n(0,i=nt.question?Y.question:Y.closed),f(lt,r-=1,r);break;case Y.question:n(0,i=Y.closed)}}return N(ct.subscribe((t=>{t===et.LOST&&(i===Y.closed&&a?n(0,i=Y.open):i!==Y.flag||a||n(0,i=Y.wrong_flag))}))),t.$$set=t=>{"row"in t&&n(7,c=t.row),"col"in t&&n(8,l=t.col),"neighbors"in t&&n(9,s=t.neighbors),"state"in t&&n(0,i=t.state),"bomb"in t&&n(1,a=t.bomb)},[i,a,h,d,function(t){console.log(t.button,nt.primary_action),0===t.button&&i===Y.open&&h&&(g("flatten",{row:c,col:l}),s.forEach((t=>t.flatten())))},function(){o===et.ACTIVE?nt.primary_action===tt.OPEN?m():p():o===et.UNSTARTED&&m()},function(){o===et.ACTIVE?nt.primary_action===tt.OPEN?p():m():o===et.UNSTARTED&&m()},c,l,s,function(){null===h&&(n(2,h=s.reduce(((t,e)=>e.bomb?t+1:t),0)),a||m())},function(){i===Y.closed?n(0,i=Y.flat):i===Y.flat&&n(0,i=Y.closed)},m,function(t){0===t.button&&s.forEach((t=>t.flatten()))}]}class mt extends X{constructor(t){super(),Q(this,t,gt,dt,i,{row:7,col:8,neighbors:9,state:0,bomb:1,calculateBombs:10,flatten:11,open:12,unflattenNeighbors:13})}get row(){return this.$$.ctx[7]}set row(t){this.$$set({row:t}),B()}get col(){return this.$$.ctx[8]}set col(t){this.$$set({col:t}),B()}get neighbors(){return this.$$.ctx[9]}set neighbors(t){this.$$set({neighbors:t}),B()}get state(){return this.$$.ctx[0]}set state(t){this.$$set({state:t}),B()}get bomb(){return this.$$.ctx[1]}set bomb(t){this.$$set({bomb:t}),B()}get calculateBombs(){return this.$$.ctx[10]}get flatten(){return this.$$.ctx[11]}get open(){return this.$$.ctx[12]}get unflattenNeighbors(){return this.$$.ctx[13]}}function pt(t){return Math.floor(Math.random()*t)}function bt(t,e,n){const o=t.slice();return o[7]=e[n],o[8]=e,o[9]=n,o}function $t(t,e,n){const o=t.slice();return o[7]=e[n],o[10]=e,o[11]=n,o}function wt(t){let e,n,o=t[9],r=t[11];const c=()=>t[3](e,o,r),l=()=>t[3](null,o,r);let s={row:t[9],col:t[11]};return e=new mt({props:s}),c(),e.$on("clicked",t[2]),e.$on("flatten",t[4]),{c(){G(e.$$.fragment)},m(t,o){H(e,t,o),n=!0},p(t,n){o===t[9]&&r===t[11]||(l(),o=t[9],r=t[11],c());e.$set({})},i(t){n||(F(e.$$.fragment,t),n=!0)},o(t){j(e.$$.fragment,t),n=!1},d(t){l(),J(e,t)}}}function vt(t){let e,n,o=Array(nt.width),r=[];for(let e=0;e<o.length;e+=1)r[e]=wt($t(t,o,e));const c=t=>j(r[t],1,1,(()=>{r[t]=null}));return{c(){for(let t=0;t<r.length;t+=1)r[t].c();e=w()},m(t,o){for(let e=0;e<r.length;e+=1)r[e].m(t,o);h(t,e,o),n=!0},p(t,n){if(5&n){let l;for(o=Array(nt.width),l=0;l<o.length;l+=1){const c=$t(t,o,l);r[l]?(r[l].p(c,n),F(r[l],1)):(r[l]=wt(c),r[l].c(),F(r[l],1),r[l].m(e.parentNode,e))}for(U(),l=o.length;l<r.length;l+=1)c(l);V()}},i(t){if(!n){for(let t=0;t<o.length;t+=1)F(r[t]);n=!0}},o(t){r=r.filter(Boolean);for(let t=0;t<r.length;t+=1)j(r[t]);n=!1},d(t){g(r,t),t&&d(e)}}}function yt(t){let e,n,o=Array(nt.height),r=[];for(let e=0;e<o.length;e+=1)r[e]=vt(bt(t,o,e));const c=t=>j(r[t],1,1,(()=>{r[t]=null}));return{c(){e=m("div");for(let t=0;t<r.length;t+=1)r[t].c();var n,o,c,l;y(e,"class","board svelte-1r5nu20"),n=e,o="grid-template",null===(c="repeat("+nt.height+", 1fr) / repeat("+nt.width+", 1fr)")?n.style.removeProperty(o):n.style.setProperty(o,c,l?"important":""),E(e,"disabled",t[1]===et.WON||t[1]===et.LOST)},m(t,o){h(t,e,o);for(let t=0;t<r.length;t+=1)r[t].m(e,null);n=!0},p(t,[n]){if(5&n){let l;for(o=Array(nt.height),l=0;l<o.length;l+=1){const c=bt(t,o,l);r[l]?(r[l].p(c,n),F(r[l],1)):(r[l]=vt(c),r[l].c(),F(r[l],1),r[l].m(e,null))}for(U(),l=o.length;l<r.length;l+=1)c(l);V()}2&n&&E(e,"disabled",t[1]===et.WON||t[1]===et.LOST)},i(t){if(!n){for(let t=0;t<o.length;t+=1)F(r[t]);n=!0}},o(t){r=r.filter(Boolean);for(let t=0;t<r.length;t+=1)j(r[t]);n=!1},d(t){t&&d(e),g(r,t)}}}function xt(t,e,n){let o;u(t,ct,(t=>n(1,o=t)));const r=new Array(nt.height).fill(null).map((()=>[]));let c=nt.width*nt.height;var l;return l=()=>{for(let t=0;t<r.length;++t)for(let e=0;e<r[t].length;++e){const o=[];for(let n=-1;n<=1;++n)for(let c=-1;c<=1;++c)(n||c)&&r[t+n]&&r[t+n][e+c]&&o.push(r[t+n][e+c]);n(0,r[t][e].neighbors=o,r)}},T().$$.on_mount.push(l),[r,o,function(t){if(o===et.UNSTARTED&&(f(ct,o=et.ACTIVE,o),function(t,e,o){const c=new Array(nt.width*nt.height).fill(null).map(((t,e)=>e)),l=new Set;l.add(e+t*nt.width),o.forEach((t=>l.add(t.col+t.row*nt.width)));for(let t=0;t<nt.bombs;++t){let t=pt(c.length);for(;l.has(c[t]);)c.splice(t,1),t=pt(c.length);const e=c.splice(t,1)[0];n(0,r[Math.floor(e/nt.width)][e%nt.width].bomb=!0,r)}}(t.detail.row,t.detail.col,t.detail.neighbors)),c-=1,c===nt.bombs){f(ct,o=et.WON,o);for(const t of r)t.forEach((t=>{t.bomb&&t.state!==Y.flag&&(t.state=Y.flag)}));lt.set(nt.bombs)}},function(t,e,o){S[t?"unshift":"push"]((()=>{r[e][o]=t,n(0,r)}))},function(e){A.call(this,t,e)}]}class Et extends X{constructor(t){super(),Q(this,t,xt,yt,c,{tiles:0})}get tiles(){return this.$$.ctx[0]}}function _t(t){let e;return{c(){e=b("🙂")},m(t,n){h(t,e,n)},d(t){t&&d(e)}}}function Tt(t){let e;return{c(){e=b("😮")},m(t,n){h(t,e,n)},d(t){t&&d(e)}}}function Nt(t){let e;return{c(){e=b("😖")},m(t,n){h(t,e,n)},d(t){t&&d(e)}}}function kt(t){let e;return{c(){e=b("😎")},m(t,n){h(t,e,n)},d(t){t&&d(e)}}}function At(t){let e,n,r,c,l,s,i,u,f,g,p,w,E,_,T,N=t[0].bombs-t[5]+"";function k(t,e){return t[6]===et.WON?kt:t[6]===et.LOST?Nt:t[3]?Tt:_t}let A=k(t),O=A(t);return w=new Et({props:{}}),t[9](w),w.$on("flatten",t[10]),{c(){e=$(),n=m("main"),r=m("header"),c=m("h2"),l=b(N),s=$(),i=m("h2"),O.c(),u=$(),f=m("h2"),g=b(t[4]),p=$(),G(w.$$.fragment),y(c,"class","svelte-1xkpbfv"),y(i,"class","svelte-1xkpbfv"),y(f,"class","svelte-1xkpbfv"),y(r,"class","svelte-1xkpbfv")},m(o,d){h(o,e,d),h(o,n,d),a(n,r),a(r,c),a(c,l),a(r,s),a(r,i),O.m(i,null),a(r,u),a(r,f),a(f,g),a(n,p),H(w,n,null),E=!0,_||(T=[v(document.body,"mousedown",t[8]),v(document.body,"mouseup",t[7])],_=!0)},p(t,[e]){(!E||33&e)&&N!==(N=t[0].bombs-t[5]+"")&&x(l,N),A!==(A=k(t))&&(O.d(1),O=A(t),O&&(O.c(),O.m(i,null))),(!E||16&e)&&x(g,t[4]);w.$set({})},i(t){E||(F(w.$$.fragment,t),E=!0)},o(t){j(w.$$.fragment,t),E=!1},d(r){r&&d(e),r&&d(n),O.d(),t[9](null),J(w),_=!1,o(T)}}}function Ot(t,e,n){let o,r;u(t,lt,(t=>n(5,o=t))),u(t,ct,(t=>n(6,r=t))),nt.bombs=10,nt.width=10,nt.height=10;let c,l,s,i=null,f=!1,a="00:00";N(ct.subscribe((t=>{switch(t){case et.ACTIVE:l=(new Date).getTime(),s=setInterval((()=>{const t=(new Date).getTime()-l,e=Math.floor(t/36e5);n(4,a=e?`${e}:`.padStart(3,"0"):""+`${Math.floor(t%36e5/6e4)}:`.padStart(3,"0")+`${Math.floor(t%6e4/1e3)}`.padStart(2,"0"))}),1e3);break;case et.WON:case et.LOST:clearInterval(s)}})));return[nt,i,c,f,a,o,r,function(t){t.button===nt.primary_action&&t.target.classList.contains("tile")&&n(3,f=!1),i&&(i.unflattenNeighbors(t),n(1,i=null))},function(t){t.button===nt.primary_action&&t.target.classList.contains("tile")&&n(3,f=!0)},function(t){S[t?"unshift":"push"]((()=>{c=t,n(2,c)}))},t=>n(1,i=c.tiles[t.detail.row][t.detail.col])]}return new class extends X{constructor(t){super(),Q(this,t,Ot,At,c,{})}}({target:document.body,props:{}})}();
//# sourceMappingURL=bundle.js.map
