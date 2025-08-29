import"../chunks/DsnmJJEf.js";import{aa as Le,F as X,ab as ne,G as j,w as ce,a as S,I as V,Y as Bt,f as Ee,K as U,J as P,n as Et,M as D,B as Ht,H as Lt,g as It,ac as Rt,y as jt,a8 as Wt}from"../chunks/BIIsVck-.js";import{w as C,x as Re,f as J,e as wt,a as zt,l as Gt,o as Ut}from"../chunks/Sv6Vf9Pg.js";import{w as F,c as Xt,t as Fe,g as dt,d as ft,m as H,e as ee,u as gt,a as mt,i as f,n as je,b as le,f as E,F as vt,k as z,p as Vt,s as Pe,h as Yt,S as ot,j as A,l as qt,o as te,q as Me,r as pt,v as $e,x as Ae,y as Jt,z as Qt,A as Zt,B as en,C as tn,D as ze,E as rt,G as kt,H as at,I as nn,J as Ge,L as rn,T as an}from"../chunks/Bn21ThHC.js";import{s as de,r as fe,i as ht}from"../chunks/B4eF0bdU.js";import{b as sn,r as on,a as Ue}from"../chunks/CLqYpC2G.js";import{b as un}from"../chunks/DGSd5bF9.js";import{a as Ce,s as _t}from"../chunks/gbVgNTor.js";import{h as ln,i as cn,b as $t,l as dn}from"../chunks/DNHB5EVq.js";import{I as ge}from"../chunks/CT1HdE_K.js";function fn(n,t){let i=!1;for(let u=0,d=t.length-1;u<t.length;d=u++){const b=t[u].x,o=t[u].y,l=t[d].x,x=t[d].y;o>n.y!=x>n.y&&n.x<(l-b)*(n.y-o)/(x-o)+b&&(i=!i)}return i}function gn(n,t){return t?fn({x:n.clientX,y:n.clientY},t):!1}const mn={ltr:[...ot,z.ARROW_RIGHT]},vn={ltr:[z.ARROW_LEFT]},bt=["menu","trigger"],pn={arrowSize:8,positioning:{placement:"bottom"},preventScroll:!0,escapeBehavior:"close",closeOnOutsideClick:!0,portal:"body",loop:!1,dir:"ltr",defaultOpen:!1,typeahead:!0,closeOnItemClick:!0,onOutsideClick:void 0,preventTextSelectionOverflow:!0};function hn(n){const{name:t,selector:i}=Yt(n.selector),{preventScroll:u,arrowSize:d,positioning:b,escapeBehavior:o,closeOnOutsideClick:l,portal:x,forceVisible:W,typeahead:Y,loop:q,closeFocus:me,disableFocusFirstItem:ve,closeOnItemClick:re,onOutsideClick:ae,preventTextSelectionOverflow:se}=n.rootOptions,w=n.rootOpen,G=n.rootActiveTrigger,L=n.nextFocusable,pe=n.prevFocusable,R=F.writable(!1),Ke=F(C(0)),oe=F(C(null)),Ie=F(C("right")),we=F(C(null)),K=F(Re([Ie,oe],([e,s])=>r=>e===s?.side&&gn(r,s?.area))),{typed:Q,handleTypeaheadSearch:he}=Xt(),Z=Fe({...dt(bt),...n.ids}),xe=ft({open:w,forceVisible:W,activeTrigger:G}),ie=H(t(),{stores:[xe,w,G,x,Z.menu,Z.trigger],returned:([e,s,r,a,g,$])=>({role:"menu",hidden:e?void 0:!0,style:e?void 0:Pe({display:"none"}),id:g,"aria-labelledby":$,"data-state":s&&r?"open":"closed","data-portal":Vt(a),tabindex:-1}),action:e=>{let s=je;const r=ee([xe,G,b,l,x],([g,$,N,k,m])=>{s(),!(!g||!$)&&Le().then(()=>{s(),Se(e,i),s=gt(e,{anchorElement:$,open:w,options:{floating:N,modal:{closeOnInteractOutside:k,shouldCloseOnInteractOutside:h=>(ae.get()?.(h),!(f($)&&$.contains(h.target))),onClose:()=>w.set(!1)},portal:mt(e,m),escapeKeydown:{behaviorType:o},preventTextSelectionOverflow:{enabled:se}}}).destroy})}),a=le(E(e,"keydown",g=>{const $=g.target,N=g.currentTarget;if(!f($)||!f(N)||!($.closest('[role="menu"]')===N))return;if(vt.includes(g.key)&&Tt(g,q.get()??!1),g.key===z.TAB){g.preventDefault(),w.set(!1),yt(g,L,pe);return}const m=g.key.length===1;!(g.ctrlKey||g.altKey||g.metaKey)&&m&&Y.get()===!0&&he(g.key,Te(N))}));return{destroy(){r(),a(),s()}}}}),be=H(t("trigger"),{stores:[w,Z.menu,Z.trigger],returned:([e,s,r])=>({"aria-controls":s,"aria-expanded":e,"data-state":e?"open":"closed",id:r,tabindex:0}),action:e=>(We(e),G.update(r=>r||e),{destroy:le(E(e,"click",r=>{const a=w.get(),g=r.currentTarget;f(g)&&(it(g),a||r.preventDefault())}),E(e,"keydown",r=>{const a=r.currentTarget;if(!f(a)||!(ot.includes(r.key)||r.key===z.ARROW_DOWN))return;r.preventDefault(),it(a);const g=a.getAttribute("aria-controls");if(!g)return;const $=document.getElementById(g);if(!$)return;const N=Te($);N.length&&A(N[0])}))})}),Oe=H(t("arrow"),{stores:d,returned:e=>({"data-arrow":!0,style:Pe({position:"absolute",width:`var(--arrow-size, ${e}px)`,height:`var(--arrow-size, ${e}px)`})})}),Xe=H(t("overlay"),{stores:[xe],returned:([e])=>({hidden:e?void 0:!0,tabindex:-1,style:Pe({display:e?void 0:"none"}),"aria-hidden":"true","data-state":yn(e)}),action:e=>{const s=ee([x],([r])=>{if(r===null)return je;const a=mt(e,r);return a===null?je:qt(e,a).destroy});return{destroy(){s()}}}}),Ne=H(t("item"),{returned:()=>({role:"menuitem",tabindex:-1,"data-orientation":"vertical"}),action:e=>(Se(e,i),We(e),{destroy:le(E(e,"pointerdown",r=>{const a=r.currentTarget;if(f(a)&&te(a)){r.preventDefault();return}}),E(e,"click",r=>{const a=r.currentTarget;if(f(a)){if(te(a)){r.preventDefault();return}if(r.defaultPrevented){A(a);return}re.get()&&Me(1).then(()=>{w.set(!1)})}}),E(e,"keydown",r=>{et(r)}),E(e,"pointermove",r=>{Qe(r)}),E(e,"pointerleave",r=>{Ze(r)}),E(e,"focusin",r=>{Be(r)}),E(e,"focusout",r=>{qe(r)}))})}),ye=H(t("group"),{returned:()=>e=>({role:"group","aria-labelledby":e})}),Ve=H(t("group-label"),{returned:()=>e=>({id:e})}),Ye={defaultChecked:!1,disabled:!1},Mt=e=>{const s={...Ye,...e},r=s.checked??C(s.defaultChecked??null),a=ze(r,s.onCheckedChange),g=C(s.disabled),$=H(t("checkbox-item"),{stores:[a,g],returned:([m,h])=>({role:"menuitemcheckbox",tabindex:-1,"data-orientation":"vertical","aria-checked":tt(m)?"mixed":m?"true":"false","data-disabled":rt(h),"data-state":Ct(m)}),action:m=>(Se(m,i),We(m),{destroy:le(E(m,"pointerdown",p=>{const y=p.currentTarget;if(f(y)&&te(y)){p.preventDefault();return}}),E(m,"click",p=>{const y=p.currentTarget;if(f(y)){if(te(y)){p.preventDefault();return}if(p.defaultPrevented){A(y);return}a.update(ue=>tt(ue)?!0:!ue),re.get()&&Le().then(()=>{w.set(!1)})}}),E(m,"keydown",p=>{et(p)}),E(m,"pointermove",p=>{const y=p.currentTarget;if(f(y)){if(te(y)){Je(p);return}Qe(p,y)}}),E(m,"pointerleave",p=>{Ze(p)}),E(m,"focusin",p=>{Be(p)}),E(m,"focusout",p=>{qe(p)}))})}),N=Re(a,m=>m===!0),k=Re(a,m=>m==="indeterminate");return{elements:{checkboxItem:$},states:{checked:a},helpers:{isChecked:N,isIndeterminate:k},options:{disabled:g}}},xt=(e={})=>{const s=e.value??C(e.defaultValue??null),r=ze(s,e.onValueChange),a=H(t("radio-group"),{returned:()=>({role:"group"})}),g={disabled:!1},$=H(t("radio-item"),{stores:[r],returned:([k])=>m=>{const{value:h,disabled:p}={...g,...m},y=k===h;return{disabled:p,role:"menuitemradio","data-state":y?"checked":"unchecked","aria-checked":y,"data-disabled":rt(p),"data-value":h,"data-orientation":"vertical",tabindex:-1}},action:k=>(Se(k,i),{destroy:le(E(k,"pointerdown",h=>{const p=h.currentTarget;if(!f(p))return;const y=k.dataset.value;if(k.dataset.disabled||y===void 0){h.preventDefault();return}}),E(k,"click",h=>{const p=h.currentTarget;if(!f(p))return;const y=k.dataset.value;if(k.dataset.disabled||y===void 0){h.preventDefault();return}if(h.defaultPrevented){if(!f(p))return;A(p);return}r.set(y),re.get()&&Le().then(()=>{w.set(!1)})}),E(k,"keydown",h=>{et(h)}),E(k,"pointermove",h=>{const p=h.currentTarget;if(!f(p))return;const y=k.dataset.value;if(k.dataset.disabled||y===void 0){Je(h);return}Qe(h,p)}),E(k,"pointerleave",h=>{Ze(h)}),E(k,"focusin",h=>{Be(h)}),E(k,"focusout",h=>{qe(h)}))})}),N=Re(r,k=>m=>k===m);return{elements:{radioGroup:a,radioItem:$},states:{value:r},helpers:{isChecked:N}}},{elements:{root:Ot}}=wn({orientation:"horizontal"}),Pt={...pn,disabled:!1,positioning:{placement:"right-start",gutter:8}},Dt=e=>{const s={...Pt,...e},r=s.open??C(!1),a=ze(r,s?.onOpenChange),g=Fe(kt(s,"ids")),{positioning:$,arrowSize:N,disabled:k}=g,m=F(C(null)),h=F(C(null)),p=F(C(0)),y=Fe({...dt(bt),...s.ids});pt(()=>{const T=document.getElementById(y.trigger.get());T&&m.set(T)});const ue=ft({open:a,forceVisible:W,activeTrigger:m}),Ft=H(t("submenu"),{stores:[ue,a,m,y.menu,y.trigger],returned:([T,O,B,v,c])=>({role:"menu",hidden:T?void 0:!0,style:T?void 0:Pe({display:"none"}),id:v,"aria-labelledby":c,"data-state":O&&B?"open":"closed","data-id":v,tabindex:-1}),action:T=>{let O=je;const B=ee([ue,$],([c,I])=>{if(O(),!c)return;const _=m.get();_&&Le().then(()=>{O();const M=lt(_);O=gt(T,{anchorElement:_,open:a,options:{floating:I,portal:f(M)?M:void 0,modal:null,focusTrap:null,escapeKeydown:null,preventTextSelectionOverflow:null}}).destroy})}),v=le(E(T,"keydown",c=>{if(c.key===z.ESCAPE)return;const I=c.target,_=c.currentTarget;if(!f(I)||!f(_)||!(I.closest('[role="menu"]')===_))return;if(vt.includes(c.key)){c.stopImmediatePropagation(),Tt(c,q.get()??!1);return}const ke=vn.ltr.includes(c.key),_e=c.ctrlKey||c.altKey||c.metaKey,He=c.key.length===1;if(ke){const ct=m.get();c.preventDefault(),a.update(()=>(ct&&A(ct),!1));return}if(c.key===z.TAB){c.preventDefault(),w.set(!1),yt(c,L,pe);return}!_e&&He&&Y.get()===!0&&he(c.key,Te(_))}),E(T,"pointermove",c=>{At(c)}),E(T,"focusout",c=>{const I=m.get();if(R.get()){const _=c.target,M=document.getElementById(y.menu.get());if(!f(M)||!f(_))return;!M.contains(_)&&_!==I&&a.set(!1)}else{const _=c.currentTarget,M=c.relatedTarget;if(!f(M)||!f(_))return;!_.contains(M)&&M!==I&&a.set(!1)}}));return{destroy(){B(),O(),v()}}}}),Kt=H(t("subtrigger"),{stores:[a,k,y.menu,y.trigger],returned:([T,O,B,v])=>({role:"menuitem",id:v,tabindex:-1,"aria-controls":B,"aria-expanded":T,"data-state":T?"open":"closed","data-disabled":rt(O),"aria-haspopop":"menu"}),action:T=>{Se(T,i),We(T),m.update(v=>v||T);const O=()=>{st(h),window.clearTimeout(p.get()),oe.set(null)},B=le(E(T,"click",v=>{if(v.defaultPrevented)return;const c=v.currentTarget;!f(c)||te(c)||(A(c),a.get()||a.update(I=>I||(m.set(c),!I)))}),E(T,"keydown",v=>{const c=Q.get(),I=v.currentTarget;if(!(!f(I)||te(I)||c.length>0&&v.key===z.SPACE)&&mn.ltr.includes(v.key)){if(!a.get()){I.click(),v.preventDefault();return}const M=I.getAttribute("aria-controls");if(!M)return;const ke=document.getElementById(M);if(!f(ke))return;const _e=Te(ke)[0];A(_e)}}),E(T,"pointermove",v=>{if(!De(v)||(ut(v),v.defaultPrevented))return;const c=v.currentTarget;if(!f(c))return;bn(y.menu.get())||A(c);const I=h.get();!a.get()&&!I&&!te(c)&&h.set(window.setTimeout(()=>{a.update(()=>(m.set(c),!0)),st(h)},100))}),E(T,"pointerleave",v=>{if(!De(v))return;st(h);const c=document.getElementById(y.menu.get()),I=c?.getBoundingClientRect();if(I){const _=c?.dataset.side,M=_==="right",ke=M?-5:5,_e=I[M?"left":"right"],He=I[M?"right":"left"];oe.set({area:[{x:v.clientX+ke,y:v.clientY},{x:_e,y:I.top},{x:He,y:I.top},{x:He,y:I.bottom},{x:_e,y:I.bottom}],side:_}),window.clearTimeout(p.get()),p.set(window.setTimeout(()=>{oe.set(null)},300))}else{if(St(v),v.defaultPrevented)return;oe.set(null)}}),E(T,"focusout",v=>{const c=v.currentTarget;if(!f(c))return;$e(c);const I=v.relatedTarget;if(!f(I))return;const _=c.getAttribute("aria-controls");if(!_)return;const M=document.getElementById(_);M&&!M.contains(I)&&a.set(!1)}),E(T,"focusin",v=>{Be(v)}));return{destroy(){O(),B()}}}}),Nt=H(t("subarrow"),{stores:N,returned:T=>({"data-arrow":!0,style:Pe({position:"absolute",width:`var(--arrow-size, ${T}px)`,height:`var(--arrow-size, ${T}px)`})})});return ee([w],([T])=>{T||(m.set(null),a.set(!1))}),ee([oe],([T])=>{!Ae||T||window.clearTimeout(p.get())}),ee([a],([T])=>{if(Ae&&(T&&R.get()&&Me(1).then(()=>{const O=document.getElementById(y.menu.get());if(!O)return;const B=Te(O);B.length&&A(B[0])}),!T)){const O=we.get(),B=document.getElementById(y.trigger.get());if(O&&Me(1).then(()=>{const v=document.getElementById(y.menu.get());v&&v.contains(O)&&$e(O)}),!B||document.activeElement===B)return;$e(B)}}),{ids:y,elements:{subTrigger:Kt,subMenu:Ft,subArrow:Nt},states:{subOpen:a},options:g}};pt(()=>{const e=document.getElementById(Z.trigger.get());f(e)&&w.get()&&G.set(e);const s=[],r=()=>R.set(!1),a=()=>{R.set(!0),s.push(le(at(document,"pointerdown",r,{capture:!0,once:!0}),at(document,"pointermove",r,{capture:!0,once:!0})))};return s.push(at(document,"keydown",a,{capture:!0})),()=>{s.forEach(g=>g())}}),ee([w,we],([e,s])=>{!e&&s&&$e(s)}),ee([w],([e])=>{!Ae||e||Jt({prop:me.get(),defaultEl:G.get()})},{skipFirstRun:!0}),ee([w,u],([e,s])=>{if(!Ae)return;const r=[];return e&&s&&r.push(Qt()),Me(1).then(()=>{const a=document.getElementById(Z.menu.get());if(a&&e&&R.get()){if(ve.get()){A(a);return}const g=Te(a);if(!g.length)return;A(g[0])}}),()=>{r.forEach(a=>a())}});function it(e){w.update(s=>{const r=!s;return r&&(L.set(Zt(e)),pe.set(en(e)),G.set(e)),r})}function Be(e){const s=e.currentTarget;if(!f(s))return;const r=we.get();r&&$e(r),tn(s),we.set(s)}function qe(e){const s=e.currentTarget;f(s)&&$e(s)}function ut(e){nt(e)&&e.preventDefault()}function Je(e){if(nt(e))return;const s=e.target;if(!f(s))return;const r=lt(s);r&&A(r)}function St(e){nt(e)&&e.preventDefault()}function At(e){if(!De(e))return;const s=e.target,r=e.currentTarget;if(!f(r)||!f(s))return;const a=Ke.get(),g=a!==e.clientX;if(r.contains(s)&&g){const $=e.clientX>a?"right":"left";Ie.set($),Ke.set(e.clientX)}}function Qe(e,s=null){if(!De(e)||(ut(e),e.defaultPrevented))return;if(s){A(s);return}const r=e.currentTarget;f(r)&&A(r)}function Ze(e){De(e)&&Je(e)}function et(e){if(Q.get().length>0&&e.key===z.SPACE){e.preventDefault();return}if(ot.includes(e.key)){e.preventDefault();const a=e.currentTarget;if(!f(a))return;a.click()}}function tt(e){return e==="indeterminate"}function Ct(e){return tt(e)?"indeterminate":e?"checked":"unchecked"}function nt(e){return K.get()(e)}function lt(e){const s=e.closest('[role="menu"]');return f(s)?s:null}return{elements:{trigger:be,menu:ie,overlay:Xe,item:Ne,group:ye,groupLabel:Ve,arrow:Oe,separator:Ot},builders:{createCheckboxItem:Mt,createSubmenu:Dt,createMenuRadioGroup:xt},states:{open:w},helpers:{handleTypeaheadSearch:he},ids:Z,options:n.rootOptions}}function yt(n,t,i){if(n.shiftKey){const u=i.get();u&&(n.preventDefault(),Me(1).then(()=>u.focus()),i.set(null))}else{const u=t.get();u&&(n.preventDefault(),Me(1).then(()=>u.focus()),t.set(null))}}function Te(n){return Array.from(n.querySelectorAll(`[data-melt-menu-id="${n.id}"]`)).filter(t=>f(t))}function We(n){!n||!te(n)||(n.setAttribute("data-disabled",""),n.setAttribute("aria-disabled","true"))}function st(n){if(!Ae)return;const t=n.get();t&&(window.clearTimeout(t),n.set(null))}function De(n){return n.pointerType==="mouse"}function Se(n,t){if(!n)return;const i=n.closest(`${t()}, ${t("submenu")}`);f(i)&&n.setAttribute("data-melt-menu-id",i.id)}function Tt(n,t){n.preventDefault();const i=document.activeElement,u=n.currentTarget;if(!f(i)||!f(u))return;const d=Te(u);if(!d.length)return;const b=d.filter(x=>!(x.hasAttribute("data-disabled")||x.getAttribute("disabled")==="true")),o=b.indexOf(i);let l;switch(n.key){case z.ARROW_DOWN:t?l=o<b.length-1?o+1:0:l=o<b.length-1?o+1:o;break;case z.ARROW_UP:t?l=o>0?o-1:b.length-1:l=o<0?b.length-1:o>0?o-1:0;break;case z.HOME:l=0;break;case z.END:l=b.length-1;break;default:return}A(b[l])}function bn(n){const t=document.activeElement;if(!f(t))return!1;const i=t.closest(`[data-id="${n}"]`);return f(i)}function yn(n){return n?"open":"closed"}const Tn={arrowSize:8,positioning:{placement:"bottom"},preventScroll:!0,escapeBehavior:"close",closeOnOutsideClick:!0,portal:"body",loop:!1,dir:"ltr",defaultOpen:!1,forceVisible:!1,typeahead:!0,closeFocus:void 0,disableFocusFirstItem:!1,closeOnItemClick:!0,onOutsideClick:void 0,preventTextSelectionOverflow:!0};function En(n){const t={...Tn,...n},i=Fe(kt(t,"ids")),u=t.open??C(t.defaultOpen),d=ze(u,t?.onOpenChange),b=F(C(null)),o=F(C(null)),l=F(C(null)),{elements:x,builders:W,ids:Y,states:q,options:me}=hn({rootOptions:i,rootOpen:d,rootActiveTrigger:F(b),nextFocusable:F(o),prevFocusable:F(l),selector:"dropdown-menu",ids:t.ids});return{ids:Y,elements:x,states:q,builders:W,options:me}}const In={orientation:"horizontal",decorative:!1},wn=n=>{const t={...In,...n},i=Fe(t),{orientation:u,decorative:d}=i;return{elements:{root:H("separator",{stores:[u,d],returned:([o,l])=>({role:l?"none":"separator","aria-orientation":o==="vertical"?o:void 0,"aria-hidden":l,"data-orientation":o})})},options:i}};function kn(n,t){X(t,!0);/**
 * @license @lucide/svelte v0.535.0 - ISC
 *
 * ISC License
 *
 * Copyright (c) for portions of Lucide are held by Cole Bemis 2013-2022 as part of Feather (MIT). All other copyright (c) for Lucide are held by Lucide Contributors 2022.
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 */let i=fe(t,["$$slots","$$events","$$legacy"]);const u=[["path",{d:"M18 20a6 6 0 0 0-12 0"}],["circle",{cx:"12",cy:"10",r:"4"}],["circle",{cx:"12",cy:"12",r:"10"}]];ge(n,de({name:"circle-user-round"},()=>i,{get iconNode(){return u},children:(d,b)=>{var o=ne(),l=j(o);J(l,()=>t.children??ce),S(d,o)},$$slots:{default:!0}})),V()}function _n(n,t){X(t,!0);/**
 * @license @lucide/svelte v0.535.0 - ISC
 *
 * ISC License
 *
 * Copyright (c) for portions of Lucide are held by Cole Bemis 2013-2022 as part of Feather (MIT). All other copyright (c) for Lucide are held by Lucide Contributors 2022.
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 */let i=fe(t,["$$slots","$$events","$$legacy"]);const u=[["path",{d:"M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"}],["path",{d:"M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"}]];ge(n,de({name:"house"},()=>i,{get iconNode(){return u},children:(d,b)=>{var o=ne(),l=j(o);J(l,()=>t.children??ce),S(d,o)},$$slots:{default:!0}})),V()}function $n(n,t){X(t,!0);/**
 * @license @lucide/svelte v0.535.0 - ISC
 *
 * ISC License
 *
 * Copyright (c) for portions of Lucide are held by Cole Bemis 2013-2022 as part of Feather (MIT). All other copyright (c) for Lucide are held by Lucide Contributors 2022.
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 */let i=fe(t,["$$slots","$$events","$$legacy"]);const u=[["path",{d:"M3 12h.01"}],["path",{d:"M3 18h.01"}],["path",{d:"M3 6h.01"}],["path",{d:"M8 12h13"}],["path",{d:"M8 18h13"}],["path",{d:"M8 6h13"}]];ge(n,de({name:"list"},()=>i,{get iconNode(){return u},children:(d,b)=>{var o=ne(),l=j(o);J(l,()=>t.children??ce),S(d,o)},$$slots:{default:!0}})),V()}function Mn(n,t){X(t,!0);/**
 * @license @lucide/svelte v0.535.0 - ISC
 *
 * ISC License
 *
 * Copyright (c) for portions of Lucide are held by Cole Bemis 2013-2022 as part of Feather (MIT). All other copyright (c) for Lucide are held by Lucide Contributors 2022.
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 */let i=fe(t,["$$slots","$$events","$$legacy"]);const u=[["path",{d:"m10 17 5-5-5-5"}],["path",{d:"M15 12H3"}],["path",{d:"M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"}]];ge(n,de({name:"log-in"},()=>i,{get iconNode(){return u},children:(d,b)=>{var o=ne(),l=j(o);J(l,()=>t.children??ce),S(d,o)},$$slots:{default:!0}})),V()}function xn(n,t){X(t,!0);/**
 * @license @lucide/svelte v0.535.0 - ISC
 *
 * ISC License
 *
 * Copyright (c) for portions of Lucide are held by Cole Bemis 2013-2022 as part of Feather (MIT). All other copyright (c) for Lucide are held by Lucide Contributors 2022.
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 */let i=fe(t,["$$slots","$$events","$$legacy"]);const u=[["path",{d:"m16 17 5-5-5-5"}],["path",{d:"M21 12H9"}],["path",{d:"M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"}]];ge(n,de({name:"log-out"},()=>i,{get iconNode(){return u},children:(d,b)=>{var o=ne(),l=j(o);J(l,()=>t.children??ce),S(d,o)},$$slots:{default:!0}})),V()}function On(n,t){X(t,!0);/**
 * @license @lucide/svelte v0.535.0 - ISC
 *
 * ISC License
 *
 * Copyright (c) for portions of Lucide are held by Cole Bemis 2013-2022 as part of Feather (MIT). All other copyright (c) for Lucide are held by Lucide Contributors 2022.
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 */let i=fe(t,["$$slots","$$events","$$legacy"]);const u=[["path",{d:"M14.106 5.553a2 2 0 0 0 1.788 0l3.659-1.83A1 1 0 0 1 21 4.619v12.764a1 1 0 0 1-.553.894l-4.553 2.277a2 2 0 0 1-1.788 0l-4.212-2.106a2 2 0 0 0-1.788 0l-3.659 1.83A1 1 0 0 1 3 19.381V6.618a1 1 0 0 1 .553-.894l4.553-2.277a2 2 0 0 1 1.788 0z"}],["path",{d:"M15 5.764v15"}],["path",{d:"M9 3.236v15"}]];ge(n,de({name:"map"},()=>i,{get iconNode(){return u},children:(d,b)=>{var o=ne(),l=j(o);J(l,()=>t.children??ce),S(d,o)},$$slots:{default:!0}})),V()}function Pn(n,t){X(t,!0);/**
 * @license @lucide/svelte v0.535.0 - ISC
 *
 * ISC License
 *
 * Copyright (c) for portions of Lucide are held by Cole Bemis 2013-2022 as part of Feather (MIT). All other copyright (c) for Lucide are held by Lucide Contributors 2022.
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 */let i=fe(t,["$$slots","$$events","$$legacy"]);const u=[["path",{d:"M5 12h14"}],["path",{d:"M12 5v14"}]];ge(n,de({name:"plus"},()=>i,{get iconNode(){return u},children:(d,b)=>{var o=ne(),l=j(o);J(l,()=>t.children??ce),S(d,o)},$$slots:{default:!0}})),V()}function Dn(n,t){X(t,!0);/**
 * @license @lucide/svelte v0.535.0 - ISC
 *
 * ISC License
 *
 * Copyright (c) for portions of Lucide are held by Cole Bemis 2013-2022 as part of Feather (MIT). All other copyright (c) for Lucide are held by Lucide Contributors 2022.
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 */let i=fe(t,["$$slots","$$events","$$legacy"]);const u=[["path",{d:"M12 3v12"}],["path",{d:"m17 8-5-5-5 5"}],["path",{d:"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"}]];ge(n,de({name:"upload"},()=>i,{get iconNode(){return u},children:(d,b)=>{var o=ne(),l=j(o);J(l,()=>t.children??ce),S(d,o)},$$slots:{default:!0}})),V()}var Sn=Ee('<header class="svelte-13sunvs">Select Provider</header> <form class="svelte-13sunvs"><input type="url" required placeholder="Identity Provider"/> <button type="submit">Sign In</button></form>',1);function An(n,t){X(t,!0);let i=Bt({provider:""});function u(l){l.preventDefault(),t.onsave(i)}var d=Sn(),b=U(j(d),2),o=P(b);on(o),Et(2),D(b),wt("submit",b,u),sn(o,()=>i.provider,l=>i.provider=l),S(n,d),V()}var Cn=Ee("<!> <div><div> </div> <div><!> Sign out</div></div>",1);function Fn(n,t){X(t,!0);const[i,u]=_t(),d=()=>Ce($t,"$session",i),b=()=>Ce(me,"$profile",i),o=()=>Ce(x,"$menu",i),l=()=>Ce(W,"$item",i),{elements:{menu:x,item:W,trigger:Y}}=En(),q=async()=>{await dn(),globalThis.location.href="/"};ln(d().info.webId);const me=cn(nn,d().info.webId),ve=Rt(()=>b()?.name);var re=Cn(),ae=j(re);J(ae,()=>t.children,()=>({trigger:Y}));var se=U(ae,2);Ue(se,()=>({...o(),class:"menu","aria-label":"User menu"}),void 0,void 0,"svelte-1q3aoyo");var w=P(se);Ue(w,()=>({...l()}),void 0,void 0,"svelte-1q3aoyo");var G=P(w,!0);D(w),Ge(w,R=>W?.(R));var L=U(w,2);Ue(L,()=>({...l()}),void 0,void 0,"svelte-1q3aoyo");var pe=P(L);xn(pe,{"aria-hidden":"true"}),Et(),D(L),Ge(L,R=>W?.(R)),Ht(()=>wt("m-click",L,q)),D(se),Ge(se,R=>x?.(R)),Lt(()=>zt(G,It(ve))),S(n,re),V(),u()}var Kn=Ee('<button disabled class="loading svelte-rnhdja"><!></button>'),Nn=Ee("<button><!></button>"),Bn=Ee('<button aria-label="Sign In" title="Sign In" class="svelte-rnhdja"><!></button>'),Hn=Ee('<nav class="header svelte-rnhdja"><a href="/" aria-label="Home" title="Home" class="svelte-rnhdja"><!></a> <a href="map" aria-label="Map" title="Map" class="svelte-rnhdja"><!></a> <a href="list" aria-label="List" title="List" class="svelte-rnhdja"><!></a> <div class="spacer svelte-rnhdja"></div> <a href="add" aria-label="Add Place" title="Add Place" class="svelte-rnhdja"><!></a> <a href="import" aria-label="Import from GPX" title="Import from GPX" class="svelte-rnhdja"><!></a> <!></nav> <dialog class="svelte-rnhdja"><!></dialog>',1);function Ln(n,t){X(t,!0);const[i,u]=_t(),d=()=>Ce($t,"$session",i),b=async K=>{await d().login({oidcIssuer:K,redirectUrl:globalThis.location.href})};let o=Wt(!1);Ut(async()=>{try{await d().handleIncomingRedirect({restorePreviousSession:!0})}finally{jt(o,!0)}});let l;const x=()=>{l.showModal()};var W=Hn(),Y=j(W),q=P(Y),me=P(q);_n(me,{"aria-hidden":"true"}),D(q);var ve=U(q,2),re=P(ve);On(re,{"aria-hidden":"true"}),D(ve);var ae=U(ve,2),se=P(ae);$n(se,{"aria-hidden":"true"}),D(ae);var w=U(ae,4),G=P(w);Pn(G,{"aria-hidden":"true"}),D(w);var L=U(w,2),pe=P(L);Dn(pe,{"aria-hidden":"true"}),D(L);var R=U(L,2);{var Ke=K=>{var Q=Kn(),he=P(Q);rn(he,{"aria-hidden":"true",class:"spinning"}),D(Q),S(K,Q)},oe=K=>{var Q=ne(),he=j(Q);{var Z=ie=>{Fn(ie,{children:(Oe,Xe)=>{let Ne=()=>Xe?.().trigger;var ye=Nn();Ue(ye,()=>({...Ne(),"aria-label":"User Menu",title:"User Menu"}),void 0,void 0,"svelte-rnhdja");var Ve=P(ye);kn(Ve,{"aria-hidden":"true"}),D(ye),Ge(ye,Ye=>Ne()?.(Ye)),S(Oe,ye)},$$slots:{default:!0}})},xe=ie=>{var be=Bn();be.__click=x;var Oe=P(be);Mn(Oe,{"aria-hidden":"true"}),D(be),S(ie,be)};ht(he,ie=>{d().info.isLoggedIn?ie(Z):ie(xe,!1)},!0)}S(K,Q)};ht(R,K=>{It(o)?K(oe,!1):K(Ke)})}D(Y);var Ie=U(Y,2),we=P(Ie);An(we,{onsave:K=>b(K.provider)}),D(Ie),un(Ie,K=>l=K,()=>l),S(n,W),V(),u()}Gt(["click"]);var Rn=Ee('<div class="layout svelte-7sy0rh"><header class="header svelte-7sy0rh"><!></header> <main class="main svelte-7sy0rh"><!></main></div> <!>',1);function Qn(n,t){var i=Rn(),u=j(i),d=P(u),b=P(d);Ln(b,{}),D(d);var o=U(d,2),l=P(o);J(l,()=>t.children),D(o),D(u);var x=U(u,2);an(x,{}),S(n,i)}export{Qn as component};
