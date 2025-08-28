import"../chunks/DsnmJJEf.js";import{as as He,ai as G,at as ne,aj as j,_ as ce,a as S,al as V,f as Ee,an as U,am as P,n as Et,ap as D,ag as Bt,ak as Rt,g as It,au as Ht,$ as Lt,aq as jt}from"../chunks/CVXStvyL.js";import{w as C,t as Le,c as J,e as kt,a as Wt,f as Xt,o as zt}from"../chunks/BXlc4ceW.js";import{w as F,j as Ut,t as Fe,h as dt,k as ft,m as R,E as ee,G as gt,H as mt,I as je,p as le,c as E,i as f,F as vt,q as X,S as Gt,J as Pe,f as Vt,a5 as ot,a6 as A,W as qt,x as te,a7 as Me,a8 as pt,N as $e,e as Ae,X as Yt,O as Jt,a9 as Qt,aa as Zt,M as en,o as Xe,C as rt,d as wt,Q as at,Y as de,Z as tn,$ as ze,a2 as nn,ab as rn}from"../chunks/DIDDYduG.js";import{i as ht}from"../chunks/Cgv_sWxw.js";import{b as an,r as sn,a as Ue}from"../chunks/GuTiBxeJ.js";import{b as on}from"../chunks/DeiusSuN.js";import{a as Ce,s as _t}from"../chunks/DCLxvnlw.js";import{h as un,i as ln,b as $t,n as cn}from"../chunks/MZ-F8SYP.js";import{s as fe,r as ge}from"../chunks/BwakM5-C.js";function dn(n,t){let i=!1;for(let u=0,d=t.length-1;u<t.length;d=u++){const b=t[u].x,o=t[u].y,l=t[d].x,O=t[d].y;o>n.y!=O>n.y&&n.x<(l-b)*(n.y-o)/(O-o)+b&&(i=!i)}return i}function fn(n,t){return t?dn({x:n.clientX,y:n.clientY},t):!1}const gn={ltr:[...ot,X.ARROW_RIGHT]},mn={ltr:[X.ARROW_LEFT]},bt=["menu","trigger"],vn={arrowSize:8,positioning:{placement:"bottom"},preventScroll:!0,escapeBehavior:"close",closeOnOutsideClick:!0,portal:"body",loop:!1,dir:"ltr",defaultOpen:!1,typeahead:!0,closeOnItemClick:!0,onOutsideClick:void 0,preventTextSelectionOverflow:!0};function pn(n){const{name:t,selector:i}=Vt(n.selector),{preventScroll:u,arrowSize:d,positioning:b,escapeBehavior:o,closeOnOutsideClick:l,portal:O,forceVisible:W,typeahead:q,loop:Y,closeFocus:me,disableFocusFirstItem:ve,closeOnItemClick:re,onOutsideClick:ae,preventTextSelectionOverflow:se}=n.rootOptions,k=n.rootOpen,z=n.rootActiveTrigger,H=n.nextFocusable,pe=n.prevFocusable,L=F.writable(!1),Ne=F(C(0)),oe=F(C(null)),Ie=F(C("right")),ke=F(C(null)),N=F(Le([Ie,oe],([e,s])=>r=>e===s?.side&&fn(r,s?.area))),{typed:Q,handleTypeaheadSearch:he}=Ut(),Z=Fe({...dt(bt),...n.ids}),Oe=ft({open:k,forceVisible:W,activeTrigger:z}),ie=R(t(),{stores:[Oe,k,z,O,Z.menu,Z.trigger],returned:([e,s,r,a,g,$])=>({role:"menu",hidden:e?void 0:!0,style:e?void 0:Pe({display:"none"}),id:g,"aria-labelledby":$,"data-state":s&&r?"open":"closed","data-portal":Gt(a),tabindex:-1}),action:e=>{let s=je;const r=ee([Oe,z,b,l,O],([g,$,K,w,m])=>{s(),!(!g||!$)&&He().then(()=>{s(),Se(e,i),s=gt(e,{anchorElement:$,open:k,options:{floating:K,modal:{closeOnInteractOutside:w,shouldCloseOnInteractOutside:h=>(ae.get()?.(h),!(f($)&&$.contains(h.target))),onClose:()=>k.set(!1)},portal:mt(e,m),escapeKeydown:{behaviorType:o},preventTextSelectionOverflow:{enabled:se}}}).destroy})}),a=le(E(e,"keydown",g=>{const $=g.target,K=g.currentTarget;if(!f($)||!f(K)||!($.closest('[role="menu"]')===K))return;if(vt.includes(g.key)&&Tt(g,Y.get()??!1),g.key===X.TAB){g.preventDefault(),k.set(!1),yt(g,H,pe);return}const m=g.key.length===1;!(g.ctrlKey||g.altKey||g.metaKey)&&m&&q.get()===!0&&he(g.key,Te(K))}));return{destroy(){r(),a(),s()}}}}),be=R(t("trigger"),{stores:[k,Z.menu,Z.trigger],returned:([e,s,r])=>({"aria-controls":s,"aria-expanded":e,"data-state":e?"open":"closed",id:r,tabindex:0}),action:e=>(We(e),z.update(r=>r||e),{destroy:le(E(e,"click",r=>{const a=k.get(),g=r.currentTarget;f(g)&&(it(g),a||r.preventDefault())}),E(e,"keydown",r=>{const a=r.currentTarget;if(!f(a)||!(ot.includes(r.key)||r.key===X.ARROW_DOWN))return;r.preventDefault(),it(a);const g=a.getAttribute("aria-controls");if(!g)return;const $=document.getElementById(g);if(!$)return;const K=Te($);K.length&&A(K[0])}))})}),xe=R(t("arrow"),{stores:d,returned:e=>({"data-arrow":!0,style:Pe({position:"absolute",width:`var(--arrow-size, ${e}px)`,height:`var(--arrow-size, ${e}px)`})})}),Ge=R(t("overlay"),{stores:[Oe],returned:([e])=>({hidden:e?void 0:!0,tabindex:-1,style:Pe({display:e?void 0:"none"}),"aria-hidden":"true","data-state":bn(e)}),action:e=>{const s=ee([O],([r])=>{if(r===null)return je;const a=mt(e,r);return a===null?je:qt(e,a).destroy});return{destroy(){s()}}}}),Ke=R(t("item"),{returned:()=>({role:"menuitem",tabindex:-1,"data-orientation":"vertical"}),action:e=>(Se(e,i),We(e),{destroy:le(E(e,"pointerdown",r=>{const a=r.currentTarget;if(f(a)&&te(a)){r.preventDefault();return}}),E(e,"click",r=>{const a=r.currentTarget;if(f(a)){if(te(a)){r.preventDefault();return}if(r.defaultPrevented){A(a);return}re.get()&&Me(1).then(()=>{k.set(!1)})}}),E(e,"keydown",r=>{et(r)}),E(e,"pointermove",r=>{Qe(r)}),E(e,"pointerleave",r=>{Ze(r)}),E(e,"focusin",r=>{Be(r)}),E(e,"focusout",r=>{Ye(r)}))})}),ye=R(t("group"),{returned:()=>e=>({role:"group","aria-labelledby":e})}),Ve=R(t("group-label"),{returned:()=>e=>({id:e})}),qe={defaultChecked:!1,disabled:!1},Mt=e=>{const s={...qe,...e},r=s.checked??C(s.defaultChecked??null),a=Xe(r,s.onCheckedChange),g=C(s.disabled),$=R(t("checkbox-item"),{stores:[a,g],returned:([m,h])=>({role:"menuitemcheckbox",tabindex:-1,"data-orientation":"vertical","aria-checked":tt(m)?"mixed":m?"true":"false","data-disabled":rt(h),"data-state":Ct(m)}),action:m=>(Se(m,i),We(m),{destroy:le(E(m,"pointerdown",p=>{const y=p.currentTarget;if(f(y)&&te(y)){p.preventDefault();return}}),E(m,"click",p=>{const y=p.currentTarget;if(f(y)){if(te(y)){p.preventDefault();return}if(p.defaultPrevented){A(y);return}a.update(ue=>tt(ue)?!0:!ue),re.get()&&He().then(()=>{k.set(!1)})}}),E(m,"keydown",p=>{et(p)}),E(m,"pointermove",p=>{const y=p.currentTarget;if(f(y)){if(te(y)){Je(p);return}Qe(p,y)}}),E(m,"pointerleave",p=>{Ze(p)}),E(m,"focusin",p=>{Be(p)}),E(m,"focusout",p=>{Ye(p)}))})}),K=Le(a,m=>m===!0),w=Le(a,m=>m==="indeterminate");return{elements:{checkboxItem:$},states:{checked:a},helpers:{isChecked:K,isIndeterminate:w},options:{disabled:g}}},Ot=(e={})=>{const s=e.value??C(e.defaultValue??null),r=Xe(s,e.onValueChange),a=R(t("radio-group"),{returned:()=>({role:"group"})}),g={disabled:!1},$=R(t("radio-item"),{stores:[r],returned:([w])=>m=>{const{value:h,disabled:p}={...g,...m},y=w===h;return{disabled:p,role:"menuitemradio","data-state":y?"checked":"unchecked","aria-checked":y,"data-disabled":rt(p),"data-value":h,"data-orientation":"vertical",tabindex:-1}},action:w=>(Se(w,i),{destroy:le(E(w,"pointerdown",h=>{const p=h.currentTarget;if(!f(p))return;const y=w.dataset.value;if(w.dataset.disabled||y===void 0){h.preventDefault();return}}),E(w,"click",h=>{const p=h.currentTarget;if(!f(p))return;const y=w.dataset.value;if(w.dataset.disabled||y===void 0){h.preventDefault();return}if(h.defaultPrevented){if(!f(p))return;A(p);return}r.set(y),re.get()&&He().then(()=>{k.set(!1)})}),E(w,"keydown",h=>{et(h)}),E(w,"pointermove",h=>{const p=h.currentTarget;if(!f(p))return;const y=w.dataset.value;if(w.dataset.disabled||y===void 0){Je(h);return}Qe(h,p)}),E(w,"pointerleave",h=>{Ze(h)}),E(w,"focusin",h=>{Be(h)}),E(w,"focusout",h=>{Ye(h)}))})}),K=Le(r,w=>m=>w===m);return{elements:{radioGroup:a,radioItem:$},states:{value:r},helpers:{isChecked:K}}},{elements:{root:xt}}=In({orientation:"horizontal"}),Pt={...vn,disabled:!1,positioning:{placement:"right-start",gutter:8}},Dt=e=>{const s={...Pt,...e},r=s.open??C(!1),a=Xe(r,s?.onOpenChange),g=Fe(wt(s,"ids")),{positioning:$,arrowSize:K,disabled:w}=g,m=F(C(null)),h=F(C(null)),p=F(C(0)),y=Fe({...dt(bt),...s.ids});pt(()=>{const T=document.getElementById(y.trigger.get());T&&m.set(T)});const ue=ft({open:a,forceVisible:W,activeTrigger:m}),Ft=R(t("submenu"),{stores:[ue,a,m,y.menu,y.trigger],returned:([T,x,B,v,c])=>({role:"menu",hidden:T?void 0:!0,style:T?void 0:Pe({display:"none"}),id:v,"aria-labelledby":c,"data-state":x&&B?"open":"closed","data-id":v,tabindex:-1}),action:T=>{let x=je;const B=ee([ue,$],([c,I])=>{if(x(),!c)return;const _=m.get();_&&He().then(()=>{x();const M=lt(_);x=gt(T,{anchorElement:_,open:a,options:{floating:I,portal:f(M)?M:void 0,modal:null,focusTrap:null,escapeKeydown:null,preventTextSelectionOverflow:null}}).destroy})}),v=le(E(T,"keydown",c=>{if(c.key===X.ESCAPE)return;const I=c.target,_=c.currentTarget;if(!f(I)||!f(_)||!(I.closest('[role="menu"]')===_))return;if(vt.includes(c.key)){c.stopImmediatePropagation(),Tt(c,Y.get()??!1);return}const we=mn.ltr.includes(c.key),_e=c.ctrlKey||c.altKey||c.metaKey,Re=c.key.length===1;if(we){const ct=m.get();c.preventDefault(),a.update(()=>(ct&&A(ct),!1));return}if(c.key===X.TAB){c.preventDefault(),k.set(!1),yt(c,H,pe);return}!_e&&Re&&q.get()===!0&&he(c.key,Te(_))}),E(T,"pointermove",c=>{At(c)}),E(T,"focusout",c=>{const I=m.get();if(L.get()){const _=c.target,M=document.getElementById(y.menu.get());if(!f(M)||!f(_))return;!M.contains(_)&&_!==I&&a.set(!1)}else{const _=c.currentTarget,M=c.relatedTarget;if(!f(M)||!f(_))return;!_.contains(M)&&M!==I&&a.set(!1)}}));return{destroy(){B(),x(),v()}}}}),Nt=R(t("subtrigger"),{stores:[a,w,y.menu,y.trigger],returned:([T,x,B,v])=>({role:"menuitem",id:v,tabindex:-1,"aria-controls":B,"aria-expanded":T,"data-state":T?"open":"closed","data-disabled":rt(x),"aria-haspopop":"menu"}),action:T=>{Se(T,i),We(T),m.update(v=>v||T);const x=()=>{st(h),window.clearTimeout(p.get()),oe.set(null)},B=le(E(T,"click",v=>{if(v.defaultPrevented)return;const c=v.currentTarget;!f(c)||te(c)||(A(c),a.get()||a.update(I=>I||(m.set(c),!I)))}),E(T,"keydown",v=>{const c=Q.get(),I=v.currentTarget;if(!(!f(I)||te(I)||c.length>0&&v.key===X.SPACE)&&gn.ltr.includes(v.key)){if(!a.get()){I.click(),v.preventDefault();return}const M=I.getAttribute("aria-controls");if(!M)return;const we=document.getElementById(M);if(!f(we))return;const _e=Te(we)[0];A(_e)}}),E(T,"pointermove",v=>{if(!De(v)||(ut(v),v.defaultPrevented))return;const c=v.currentTarget;if(!f(c))return;hn(y.menu.get())||A(c);const I=h.get();!a.get()&&!I&&!te(c)&&h.set(window.setTimeout(()=>{a.update(()=>(m.set(c),!0)),st(h)},100))}),E(T,"pointerleave",v=>{if(!De(v))return;st(h);const c=document.getElementById(y.menu.get()),I=c?.getBoundingClientRect();if(I){const _=c?.dataset.side,M=_==="right",we=M?-5:5,_e=I[M?"left":"right"],Re=I[M?"right":"left"];oe.set({area:[{x:v.clientX+we,y:v.clientY},{x:_e,y:I.top},{x:Re,y:I.top},{x:Re,y:I.bottom},{x:_e,y:I.bottom}],side:_}),window.clearTimeout(p.get()),p.set(window.setTimeout(()=>{oe.set(null)},300))}else{if(St(v),v.defaultPrevented)return;oe.set(null)}}),E(T,"focusout",v=>{const c=v.currentTarget;if(!f(c))return;$e(c);const I=v.relatedTarget;if(!f(I))return;const _=c.getAttribute("aria-controls");if(!_)return;const M=document.getElementById(_);M&&!M.contains(I)&&a.set(!1)}),E(T,"focusin",v=>{Be(v)}));return{destroy(){x(),B()}}}}),Kt=R(t("subarrow"),{stores:K,returned:T=>({"data-arrow":!0,style:Pe({position:"absolute",width:`var(--arrow-size, ${T}px)`,height:`var(--arrow-size, ${T}px)`})})});return ee([k],([T])=>{T||(m.set(null),a.set(!1))}),ee([oe],([T])=>{!Ae||T||window.clearTimeout(p.get())}),ee([a],([T])=>{if(Ae&&(T&&L.get()&&Me(1).then(()=>{const x=document.getElementById(y.menu.get());if(!x)return;const B=Te(x);B.length&&A(B[0])}),!T)){const x=ke.get(),B=document.getElementById(y.trigger.get());if(x&&Me(1).then(()=>{const v=document.getElementById(y.menu.get());v&&v.contains(x)&&$e(x)}),!B||document.activeElement===B)return;$e(B)}}),{ids:y,elements:{subTrigger:Nt,subMenu:Ft,subArrow:Kt},states:{subOpen:a},options:g}};pt(()=>{const e=document.getElementById(Z.trigger.get());f(e)&&k.get()&&z.set(e);const s=[],r=()=>L.set(!1),a=()=>{L.set(!0),s.push(le(at(document,"pointerdown",r,{capture:!0,once:!0}),at(document,"pointermove",r,{capture:!0,once:!0})))};return s.push(at(document,"keydown",a,{capture:!0})),()=>{s.forEach(g=>g())}}),ee([k,ke],([e,s])=>{!e&&s&&$e(s)}),ee([k],([e])=>{!Ae||e||Yt({prop:me.get(),defaultEl:z.get()})},{skipFirstRun:!0}),ee([k,u],([e,s])=>{if(!Ae)return;const r=[];return e&&s&&r.push(Jt()),Me(1).then(()=>{const a=document.getElementById(Z.menu.get());if(a&&e&&L.get()){if(ve.get()){A(a);return}const g=Te(a);if(!g.length)return;A(g[0])}}),()=>{r.forEach(a=>a())}});function it(e){k.update(s=>{const r=!s;return r&&(H.set(Qt(e)),pe.set(Zt(e)),z.set(e)),r})}function Be(e){const s=e.currentTarget;if(!f(s))return;const r=ke.get();r&&$e(r),en(s),ke.set(s)}function Ye(e){const s=e.currentTarget;f(s)&&$e(s)}function ut(e){nt(e)&&e.preventDefault()}function Je(e){if(nt(e))return;const s=e.target;if(!f(s))return;const r=lt(s);r&&A(r)}function St(e){nt(e)&&e.preventDefault()}function At(e){if(!De(e))return;const s=e.target,r=e.currentTarget;if(!f(r)||!f(s))return;const a=Ne.get(),g=a!==e.clientX;if(r.contains(s)&&g){const $=e.clientX>a?"right":"left";Ie.set($),Ne.set(e.clientX)}}function Qe(e,s=null){if(!De(e)||(ut(e),e.defaultPrevented))return;if(s){A(s);return}const r=e.currentTarget;f(r)&&A(r)}function Ze(e){De(e)&&Je(e)}function et(e){if(Q.get().length>0&&e.key===X.SPACE){e.preventDefault();return}if(ot.includes(e.key)){e.preventDefault();const a=e.currentTarget;if(!f(a))return;a.click()}}function tt(e){return e==="indeterminate"}function Ct(e){return tt(e)?"indeterminate":e?"checked":"unchecked"}function nt(e){return N.get()(e)}function lt(e){const s=e.closest('[role="menu"]');return f(s)?s:null}return{elements:{trigger:be,menu:ie,overlay:Ge,item:Ke,group:ye,groupLabel:Ve,arrow:xe,separator:xt},builders:{createCheckboxItem:Mt,createSubmenu:Dt,createMenuRadioGroup:Ot},states:{open:k},helpers:{handleTypeaheadSearch:he},ids:Z,options:n.rootOptions}}function yt(n,t,i){if(n.shiftKey){const u=i.get();u&&(n.preventDefault(),Me(1).then(()=>u.focus()),i.set(null))}else{const u=t.get();u&&(n.preventDefault(),Me(1).then(()=>u.focus()),t.set(null))}}function Te(n){return Array.from(n.querySelectorAll(`[data-melt-menu-id="${n.id}"]`)).filter(t=>f(t))}function We(n){!n||!te(n)||(n.setAttribute("data-disabled",""),n.setAttribute("aria-disabled","true"))}function st(n){if(!Ae)return;const t=n.get();t&&(window.clearTimeout(t),n.set(null))}function De(n){return n.pointerType==="mouse"}function Se(n,t){if(!n)return;const i=n.closest(`${t()}, ${t("submenu")}`);f(i)&&n.setAttribute("data-melt-menu-id",i.id)}function Tt(n,t){n.preventDefault();const i=document.activeElement,u=n.currentTarget;if(!f(i)||!f(u))return;const d=Te(u);if(!d.length)return;const b=d.filter(O=>!(O.hasAttribute("data-disabled")||O.getAttribute("disabled")==="true")),o=b.indexOf(i);let l;switch(n.key){case X.ARROW_DOWN:t?l=o<b.length-1?o+1:0:l=o<b.length-1?o+1:o;break;case X.ARROW_UP:t?l=o>0?o-1:b.length-1:l=o<0?b.length-1:o>0?o-1:0;break;case X.HOME:l=0;break;case X.END:l=b.length-1;break;default:return}A(b[l])}function hn(n){const t=document.activeElement;if(!f(t))return!1;const i=t.closest(`[data-id="${n}"]`);return f(i)}function bn(n){return n?"open":"closed"}const yn={arrowSize:8,positioning:{placement:"bottom"},preventScroll:!0,escapeBehavior:"close",closeOnOutsideClick:!0,portal:"body",loop:!1,dir:"ltr",defaultOpen:!1,forceVisible:!1,typeahead:!0,closeFocus:void 0,disableFocusFirstItem:!1,closeOnItemClick:!0,onOutsideClick:void 0,preventTextSelectionOverflow:!0};function Tn(n){const t={...yn,...n},i=Fe(wt(t,"ids")),u=t.open??C(t.defaultOpen),d=Xe(u,t?.onOpenChange),b=F(C(null)),o=F(C(null)),l=F(C(null)),{elements:O,builders:W,ids:q,states:Y,options:me}=pn({rootOptions:i,rootOpen:d,rootActiveTrigger:F(b),nextFocusable:F(o),prevFocusable:F(l),selector:"dropdown-menu",ids:t.ids});return{ids:q,elements:O,states:Y,builders:W,options:me}}const En={orientation:"horizontal",decorative:!1},In=n=>{const t={...En,...n},i=Fe(t),{orientation:u,decorative:d}=i;return{elements:{root:R("separator",{stores:[u,d],returned:([o,l])=>({role:l?"none":"separator","aria-orientation":o==="vertical"?o:void 0,"aria-hidden":l,"data-orientation":o})})},options:i}};function kn(n,t){G(t,!0);/**
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
 */let i=ge(t,["$$slots","$$events","$$legacy"]);const u=[["path",{d:"M18 20a6 6 0 0 0-12 0"}],["circle",{cx:"12",cy:"10",r:"4"}],["circle",{cx:"12",cy:"12",r:"10"}]];de(n,fe({name:"circle-user-round"},()=>i,{get iconNode(){return u},children:(d,b)=>{var o=ne(),l=j(o);J(l,()=>t.children??ce),S(d,o)},$$slots:{default:!0}})),V()}function wn(n,t){G(t,!0);/**
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
 */let i=ge(t,["$$slots","$$events","$$legacy"]);const u=[["path",{d:"M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"}],["path",{d:"M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"}]];de(n,fe({name:"house"},()=>i,{get iconNode(){return u},children:(d,b)=>{var o=ne(),l=j(o);J(l,()=>t.children??ce),S(d,o)},$$slots:{default:!0}})),V()}function _n(n,t){G(t,!0);/**
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
 */let i=ge(t,["$$slots","$$events","$$legacy"]);const u=[["path",{d:"M3 12h.01"}],["path",{d:"M3 18h.01"}],["path",{d:"M3 6h.01"}],["path",{d:"M8 12h13"}],["path",{d:"M8 18h13"}],["path",{d:"M8 6h13"}]];de(n,fe({name:"list"},()=>i,{get iconNode(){return u},children:(d,b)=>{var o=ne(),l=j(o);J(l,()=>t.children??ce),S(d,o)},$$slots:{default:!0}})),V()}function $n(n,t){G(t,!0);/**
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
 */let i=ge(t,["$$slots","$$events","$$legacy"]);const u=[["path",{d:"m10 17 5-5-5-5"}],["path",{d:"M15 12H3"}],["path",{d:"M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"}]];de(n,fe({name:"log-in"},()=>i,{get iconNode(){return u},children:(d,b)=>{var o=ne(),l=j(o);J(l,()=>t.children??ce),S(d,o)},$$slots:{default:!0}})),V()}function Mn(n,t){G(t,!0);/**
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
 */let i=ge(t,["$$slots","$$events","$$legacy"]);const u=[["path",{d:"m16 17 5-5-5-5"}],["path",{d:"M21 12H9"}],["path",{d:"M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"}]];de(n,fe({name:"log-out"},()=>i,{get iconNode(){return u},children:(d,b)=>{var o=ne(),l=j(o);J(l,()=>t.children??ce),S(d,o)},$$slots:{default:!0}})),V()}function On(n,t){G(t,!0);/**
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
 */let i=ge(t,["$$slots","$$events","$$legacy"]);const u=[["path",{d:"M14.106 5.553a2 2 0 0 0 1.788 0l3.659-1.83A1 1 0 0 1 21 4.619v12.764a1 1 0 0 1-.553.894l-4.553 2.277a2 2 0 0 1-1.788 0l-4.212-2.106a2 2 0 0 0-1.788 0l-3.659 1.83A1 1 0 0 1 3 19.381V6.618a1 1 0 0 1 .553-.894l4.553-2.277a2 2 0 0 1 1.788 0z"}],["path",{d:"M15 5.764v15"}],["path",{d:"M9 3.236v15"}]];de(n,fe({name:"map"},()=>i,{get iconNode(){return u},children:(d,b)=>{var o=ne(),l=j(o);J(l,()=>t.children??ce),S(d,o)},$$slots:{default:!0}})),V()}function xn(n,t){G(t,!0);/**
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
 */let i=ge(t,["$$slots","$$events","$$legacy"]);const u=[["path",{d:"M5 12h14"}],["path",{d:"M12 5v14"}]];de(n,fe({name:"plus"},()=>i,{get iconNode(){return u},children:(d,b)=>{var o=ne(),l=j(o);J(l,()=>t.children??ce),S(d,o)},$$slots:{default:!0}})),V()}function Pn(n,t){G(t,!0);/**
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
 */let i=ge(t,["$$slots","$$events","$$legacy"]);const u=[["path",{d:"M12 3v12"}],["path",{d:"m17 8-5-5-5 5"}],["path",{d:"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"}]];de(n,fe({name:"upload"},()=>i,{get iconNode(){return u},children:(d,b)=>{var o=ne(),l=j(o);J(l,()=>t.children??ce),S(d,o)},$$slots:{default:!0}})),V()}var Dn=Ee('<header class="svelte-13sunvs">Select Provider</header> <form class="svelte-13sunvs"><input type="url" required placeholder="Identity Provider"/> <button type="submit">Sign In</button></form>',1);function Sn(n,t){G(t,!0);let i={provider:""};function u(l){l.preventDefault(),t.onsave(i)}var d=Dn(),b=U(j(d),2),o=P(b);sn(o),Et(2),D(b),kt("submit",b,u),an(o,()=>i.provider,l=>i.provider=l),S(n,d),V()}var An=Ee("<!> <div><div> </div> <div><!> Sign out</div></div>",1);function Cn(n,t){G(t,!0);const[i,u]=_t(),d=()=>Ce($t,"$session",i),b=()=>Ce(me,"$profile",i),o=()=>Ce(O,"$menu",i),l=()=>Ce(W,"$item",i),{elements:{menu:O,item:W,trigger:q}}=Tn(),Y=async()=>{await cn(),globalThis.location.href="/"};un(d().info.webId);const me=ln(tn,d().info.webId),ve=Ht(()=>b()?.name);var re=An(),ae=j(re);J(ae,()=>t.children,()=>({trigger:q}));var se=U(ae,2);Ue(se,()=>({...o(),class:"menu","aria-label":"User menu"}),void 0,void 0,"svelte-1q3aoyo");var k=P(se);Ue(k,()=>({...l()}),void 0,void 0,"svelte-1q3aoyo");var z=P(k,!0);D(k),ze(k,L=>W?.(L));var H=U(k,2);Ue(H,()=>({...l()}),void 0,void 0,"svelte-1q3aoyo");var pe=P(H);Mn(pe,{"aria-hidden":"true"}),Et(),D(H),ze(H,L=>W?.(L)),Bt(()=>kt("m-click",H,Y)),D(se),ze(se,L=>O?.(L)),Rt(()=>Wt(z,It(ve))),S(n,re),V(),u()}var Fn=Ee('<button disabled class="loading svelte-rnhdja"><!></button>'),Nn=Ee("<button><!></button>"),Kn=Ee('<button aria-label="Sign In" title="Sign In" class="svelte-rnhdja"><!></button>'),Bn=Ee('<nav class="header svelte-rnhdja"><a href="/" aria-label="Home" title="Home" class="svelte-rnhdja"><!></a> <a href="map" aria-label="Map" title="Map" class="svelte-rnhdja"><!></a> <a href="list" aria-label="List" title="List" class="svelte-rnhdja"><!></a> <div class="spacer svelte-rnhdja"></div> <a href="add" aria-label="Add Place" title="Add Place" class="svelte-rnhdja"><!></a> <a href="import" aria-label="Import from GPX" title="Import from GPX" class="svelte-rnhdja"><!></a> <!></nav> <dialog class="svelte-rnhdja"><!></dialog>',1);function Rn(n,t){G(t,!0);const[i,u]=_t(),d=()=>Ce($t,"$session",i),b=async N=>{await d().login({oidcIssuer:N,redirectUrl:globalThis.location.href})};let o=jt(!1);zt(async()=>{try{await d().handleIncomingRedirect({restorePreviousSession:!0})}finally{Lt(o,!0)}});let l;const O=()=>{l.showModal()};var W=Bn(),q=j(W),Y=P(q),me=P(Y);wn(me,{"aria-hidden":"true"}),D(Y);var ve=U(Y,2),re=P(ve);On(re,{"aria-hidden":"true"}),D(ve);var ae=U(ve,2),se=P(ae);_n(se,{"aria-hidden":"true"}),D(ae);var k=U(ae,4),z=P(k);xn(z,{"aria-hidden":"true"}),D(k);var H=U(k,2),pe=P(H);Pn(pe,{"aria-hidden":"true"}),D(H);var L=U(H,2);{var Ne=N=>{var Q=Fn(),he=P(Q);nn(he,{"aria-hidden":"true",class:"spinning"}),D(Q),S(N,Q)},oe=N=>{var Q=ne(),he=j(Q);{var Z=ie=>{Cn(ie,{children:(xe,Ge)=>{let Ke=()=>Ge?.().trigger;var ye=Nn();Ue(ye,()=>({...Ke(),"aria-label":"User Menu",title:"User Menu"}),void 0,void 0,"svelte-rnhdja");var Ve=P(ye);kn(Ve,{"aria-hidden":"true"}),D(ye),ze(ye,qe=>Ke()?.(qe)),S(xe,ye)},$$slots:{default:!0}})},Oe=ie=>{var be=Kn();be.__click=O;var xe=P(be);$n(xe,{"aria-hidden":"true"}),D(be),S(ie,be)};ht(he,ie=>{d().info.isLoggedIn?ie(Z):ie(Oe,!1)},!0)}S(N,Q)};ht(L,N=>{It(o)?N(oe,!1):N(Ne)})}D(q);var Ie=U(q,2),ke=P(Ie);Sn(ke,{onsave:N=>b(N.provider)}),D(Ie),on(Ie,N=>l=N,()=>l),S(n,W),V(),u()}Xt(["click"]);var Hn=Ee('<div class="layout svelte-7sy0rh"><header class="header svelte-7sy0rh"><!></header> <main class="main svelte-7sy0rh"><!></main></div> <!>',1);function Jn(n,t){var i=Hn(),u=j(i),d=P(u),b=P(d);Rn(b,{}),D(d);var o=U(d,2),l=P(o);J(l,()=>t.children),D(o),D(u);var O=U(u,2);rn(O,{}),S(n,i)}export{Jn as component};
