import{r as s}from"./index.DrxKNVES.js";import{r as Ee}from"./index.rqUiOy30.js";import{u as xe,c as h}from"./index.BJknnQuW.js";import{u as te}from"./index.1JkRN11X.js";import{c as ye}from"./index.CoUN5iVw.js";import{c as Pe,a as H,u as Ce}from"./index.qJiwp9Ip.js";import{B as he,R as Re}from"./index.yusZEH1f.js";import{P as be}from"./index.CdA-AeYO.js";import{P as ge}from"./index.CwYy1fy-.js";import{P as A,d as Se}from"./index.2EOGNVNh.js";import{V as oe}from"./index.wLl3Idx7.js";import{j as c}from"./jsx-runtime.EKYJJIwR.js";var z="ToastProvider",[G,Ie,Ae]=ye("Toast"),[re,rt]=Pe("Toast",[Ae]),[Fe,W]=re(z),se=e=>{const{__scopeToast:o,label:r="Notification",duration:t=5e3,swipeDirection:u="right",swipeThreshold:d=50,children:p}=e,[T,v]=s.useState(null),[i,C]=s.useState(0),E=s.useRef(!1),F=s.useRef(!1);return r.trim()||console.error(`Invalid prop \`label\` supplied to \`${z}\`. Expected non-empty \`string\`.`),c.jsx(G.Provider,{scope:o,children:c.jsx(Fe,{scope:o,label:r,duration:t,swipeDirection:u,swipeThreshold:d,toastCount:i,viewport:T,onViewportChange:v,onToastAdd:s.useCallback(()=>C(g=>g+1),[]),onToastRemove:s.useCallback(()=>C(g=>g-1),[]),isFocusedToastEscapeKeyDownRef:E,isClosePausedRef:F,children:p})})};se.displayName=z;var ne="ToastViewport",De=["F8"],$="toast.viewportPause",B="toast.viewportResume",ae=s.forwardRef((e,o)=>{const{__scopeToast:r,hotkey:t=De,label:u="Notifications ({hotkey})",...d}=e,p=W(ne,r),T=Ie(r),v=s.useRef(null),i=s.useRef(null),C=s.useRef(null),E=s.useRef(null),F=te(o,E,p.onViewportChange),g=t.join("+").replace(/Key/g,"").replace(/Digit/g,""),S=p.toastCount>0;s.useEffect(()=>{const a=x=>{t.length!==0&&t.every(m=>x[m]||x.code===m)&&E.current?.focus()};return document.addEventListener("keydown",a),()=>document.removeEventListener("keydown",a)},[t]),s.useEffect(()=>{const a=v.current,x=E.current;if(S&&a&&x){const f=()=>{if(!p.isClosePausedRef.current){const w=new CustomEvent($);x.dispatchEvent(w),p.isClosePausedRef.current=!0}},m=()=>{if(p.isClosePausedRef.current){const w=new CustomEvent(B);x.dispatchEvent(w),p.isClosePausedRef.current=!1}},y=w=>{!a.contains(w.relatedTarget)&&m()},P=()=>{a.contains(document.activeElement)||m()};return a.addEventListener("focusin",f),a.addEventListener("focusout",y),a.addEventListener("pointermove",f),a.addEventListener("pointerleave",P),window.addEventListener("blur",f),window.addEventListener("focus",m),()=>{a.removeEventListener("focusin",f),a.removeEventListener("focusout",y),a.removeEventListener("pointermove",f),a.removeEventListener("pointerleave",P),window.removeEventListener("blur",f),window.removeEventListener("focus",m)}}},[S,p.isClosePausedRef]);const l=s.useCallback(({tabbingDirection:a})=>{const f=T().map(m=>{const y=m.ref.current,P=[y,...Xe(y)];return a==="forwards"?P:P.reverse()});return(a==="forwards"?f.reverse():f).flat()},[T]);return s.useEffect(()=>{const a=E.current;if(a){const x=f=>{const m=f.altKey||f.ctrlKey||f.metaKey;if(f.key==="Tab"&&!m){const P=document.activeElement,w=f.shiftKey;if(f.target===a&&w){i.current?.focus();return}const _=l({tabbingDirection:w?"backwards":"forwards"}),O=_.findIndex(I=>I===P);Y(_.slice(O+1))?f.preventDefault():w?i.current?.focus():C.current?.focus()}};return a.addEventListener("keydown",x),()=>a.removeEventListener("keydown",x)}},[T,l]),c.jsxs(he,{ref:v,role:"region","aria-label":u.replace("{hotkey}",g),tabIndex:-1,style:{pointerEvents:S?void 0:"none"},children:[S&&c.jsx(q,{ref:i,onFocusFromOutsideViewport:()=>{const a=l({tabbingDirection:"forwards"});Y(a)}}),c.jsx(G.Slot,{scope:r,children:c.jsx(A.ol,{tabIndex:-1,...d,ref:F})}),S&&c.jsx(q,{ref:C,onFocusFromOutsideViewport:()=>{const a=l({tabbingDirection:"backwards"});Y(a)}})]})});ae.displayName=ne;var ie="ToastFocusProxy",q=s.forwardRef((e,o)=>{const{__scopeToast:r,onFocusFromOutsideViewport:t,...u}=e,d=W(ie,r);return c.jsx(oe,{"aria-hidden":!0,tabIndex:0,...u,ref:o,style:{position:"fixed"},onFocus:p=>{const T=p.relatedTarget;!d.viewport?.contains(T)&&t()}})});q.displayName=ie;var U="Toast",_e="toast.swipeStart",Ne="toast.swipeMove",Le="toast.swipeCancel",Me="toast.swipeEnd",ce=s.forwardRef((e,o)=>{const{forceMount:r,open:t,defaultOpen:u,onOpenChange:d,...p}=e,[T=!0,v]=xe({prop:t,defaultProp:u,onChange:d});return c.jsx(ge,{present:r||T,children:c.jsx(ke,{open:T,...p,ref:o,onClose:()=>v(!1),onPause:H(e.onPause),onResume:H(e.onResume),onSwipeStart:h(e.onSwipeStart,i=>{i.currentTarget.setAttribute("data-swipe","start")}),onSwipeMove:h(e.onSwipeMove,i=>{const{x:C,y:E}=i.detail.delta;i.currentTarget.setAttribute("data-swipe","move"),i.currentTarget.style.setProperty("--radix-toast-swipe-move-x",`${C}px`),i.currentTarget.style.setProperty("--radix-toast-swipe-move-y",`${E}px`)}),onSwipeCancel:h(e.onSwipeCancel,i=>{i.currentTarget.setAttribute("data-swipe","cancel"),i.currentTarget.style.removeProperty("--radix-toast-swipe-move-x"),i.currentTarget.style.removeProperty("--radix-toast-swipe-move-y"),i.currentTarget.style.removeProperty("--radix-toast-swipe-end-x"),i.currentTarget.style.removeProperty("--radix-toast-swipe-end-y")}),onSwipeEnd:h(e.onSwipeEnd,i=>{const{x:C,y:E}=i.detail.delta;i.currentTarget.setAttribute("data-swipe","end"),i.currentTarget.style.removeProperty("--radix-toast-swipe-move-x"),i.currentTarget.style.removeProperty("--radix-toast-swipe-move-y"),i.currentTarget.style.setProperty("--radix-toast-swipe-end-x",`${C}px`),i.currentTarget.style.setProperty("--radix-toast-swipe-end-y",`${E}px`),v(!1)})})})});ce.displayName=U;var[Oe,je]=re(U,{onClose(){}}),ke=s.forwardRef((e,o)=>{const{__scopeToast:r,type:t="foreground",duration:u,open:d,onClose:p,onEscapeKeyDown:T,onPause:v,onResume:i,onSwipeStart:C,onSwipeMove:E,onSwipeCancel:F,onSwipeEnd:g,...S}=e,l=W(U,r),[a,x]=s.useState(null),f=te(o,n=>x(n)),m=s.useRef(null),y=s.useRef(null),P=u||l.duration,w=s.useRef(0),D=s.useRef(P),M=s.useRef(0),{onToastAdd:_,onToastRemove:O}=l,I=H(()=>{a?.contains(document.activeElement)&&l.viewport?.focus(),p()}),j=s.useCallback(n=>{!n||n===1/0||(window.clearTimeout(M.current),w.current=new Date().getTime(),M.current=window.setTimeout(I,n))},[I]);s.useEffect(()=>{const n=l.viewport;if(n){const R=()=>{j(D.current),i?.()},b=()=>{const N=new Date().getTime()-w.current;D.current=D.current-N,window.clearTimeout(M.current),v?.()};return n.addEventListener($,b),n.addEventListener(B,R),()=>{n.removeEventListener($,b),n.removeEventListener(B,R)}}},[l.viewport,P,v,i,j]),s.useEffect(()=>{d&&!l.isClosePausedRef.current&&j(P)},[d,P,l.isClosePausedRef,j]),s.useEffect(()=>(_(),()=>O()),[_,O]);const Q=s.useMemo(()=>a?Te(a):null,[a]);return l.viewport?c.jsxs(c.Fragment,{children:[Q&&c.jsx(Ve,{__scopeToast:r,role:"status","aria-live":t==="foreground"?"assertive":"polite","aria-atomic":!0,children:Q}),c.jsx(Oe,{scope:r,onClose:I,children:Ee.createPortal(c.jsx(G.ItemSlot,{scope:r,children:c.jsx(Re,{asChild:!0,onEscapeKeyDown:h(T,()=>{l.isFocusedToastEscapeKeyDownRef.current||I(),l.isFocusedToastEscapeKeyDownRef.current=!1}),children:c.jsx(A.li,{role:"status","aria-live":"off","aria-atomic":!0,tabIndex:0,"data-state":d?"open":"closed","data-swipe-direction":l.swipeDirection,...S,ref:f,style:{userSelect:"none",touchAction:"none",...e.style},onKeyDown:h(e.onKeyDown,n=>{n.key==="Escape"&&(T?.(n.nativeEvent),n.nativeEvent.defaultPrevented||(l.isFocusedToastEscapeKeyDownRef.current=!0,I()))}),onPointerDown:h(e.onPointerDown,n=>{n.button===0&&(m.current={x:n.clientX,y:n.clientY})}),onPointerMove:h(e.onPointerMove,n=>{if(!m.current)return;const R=n.clientX-m.current.x,b=n.clientY-m.current.y,N=!!y.current,L=["left","right"].includes(l.swipeDirection),k=["left","up"].includes(l.swipeDirection)?Math.min:Math.max,ve=L?k(0,R):0,we=L?0:k(0,b),X=n.pointerType==="touch"?10:2,V={x:ve,y:we},Z={originalEvent:n,delta:V};N?(y.current=V,K(Ne,E,Z,{discrete:!1})):ee(V,l.swipeDirection,X)?(y.current=V,K(_e,C,Z,{discrete:!1}),n.target.setPointerCapture(n.pointerId)):(Math.abs(R)>X||Math.abs(b)>X)&&(m.current=null)}),onPointerUp:h(e.onPointerUp,n=>{const R=y.current,b=n.target;if(b.hasPointerCapture(n.pointerId)&&b.releasePointerCapture(n.pointerId),y.current=null,m.current=null,R){const N=n.currentTarget,L={originalEvent:n,delta:R};ee(R,l.swipeDirection,l.swipeThreshold)?K(Me,g,L,{discrete:!0}):K(Le,F,L,{discrete:!0}),N.addEventListener("click",k=>k.preventDefault(),{once:!0})}})})})}),l.viewport)})]}):null}),Ve=e=>{const{__scopeToast:o,children:r,...t}=e,u=W(U,o),[d,p]=s.useState(!1),[T,v]=s.useState(!1);return We(()=>p(!0)),s.useEffect(()=>{const i=window.setTimeout(()=>v(!0),1e3);return()=>window.clearTimeout(i)},[]),T?null:c.jsx(be,{asChild:!0,children:c.jsx(oe,{...t,children:d&&c.jsxs(c.Fragment,{children:[u.label," ",r]})})})},Ke="ToastTitle",ue=s.forwardRef((e,o)=>{const{__scopeToast:r,...t}=e;return c.jsx(A.div,{...t,ref:o})});ue.displayName=Ke;var He="ToastDescription",le=s.forwardRef((e,o)=>{const{__scopeToast:r,...t}=e;return c.jsx(A.div,{...t,ref:o})});le.displayName=He;var de="ToastAction",pe=s.forwardRef((e,o)=>{const{altText:r,...t}=e;return r.trim()?c.jsx(me,{altText:r,asChild:!0,children:c.jsx(J,{...t,ref:o})}):(console.error(`Invalid prop \`altText\` supplied to \`${de}\`. Expected non-empty \`string\`.`),null)});pe.displayName=de;var fe="ToastClose",J=s.forwardRef((e,o)=>{const{__scopeToast:r,...t}=e,u=je(fe,r);return c.jsx(me,{asChild:!0,children:c.jsx(A.button,{type:"button",...t,ref:o,onClick:h(e.onClick,u.onClose)})})});J.displayName=fe;var me=s.forwardRef((e,o)=>{const{__scopeToast:r,altText:t,...u}=e;return c.jsx(A.div,{"data-radix-toast-announce-exclude":"","data-radix-toast-announce-alt":t||void 0,...u,ref:o})});function Te(e){const o=[];return Array.from(e.childNodes).forEach(t=>{if(t.nodeType===t.TEXT_NODE&&t.textContent&&o.push(t.textContent),Ue(t)){const u=t.ariaHidden||t.hidden||t.style.display==="none",d=t.dataset.radixToastAnnounceExclude==="";if(!u)if(d){const p=t.dataset.radixToastAnnounceAlt;p&&o.push(p)}else o.push(...Te(t))}}),o}function K(e,o,r,{discrete:t}){const u=r.originalEvent.currentTarget,d=new CustomEvent(e,{bubbles:!0,cancelable:!0,detail:r});o&&u.addEventListener(e,o,{once:!0}),t?Se(u,d):u.dispatchEvent(d)}var ee=(e,o,r=0)=>{const t=Math.abs(e.x),u=Math.abs(e.y),d=t>u;return o==="left"||o==="right"?d&&t>r:!d&&u>r};function We(e=()=>{}){const o=H(e);Ce(()=>{let r=0,t=0;return r=window.requestAnimationFrame(()=>t=window.requestAnimationFrame(o)),()=>{window.cancelAnimationFrame(r),window.cancelAnimationFrame(t)}},[o])}function Ue(e){return e.nodeType===e.ELEMENT_NODE}function Xe(e){const o=[],r=document.createTreeWalker(e,NodeFilter.SHOW_ELEMENT,{acceptNode:t=>{const u=t.tagName==="INPUT"&&t.type==="hidden";return t.disabled||t.hidden||u?NodeFilter.FILTER_SKIP:t.tabIndex>=0?NodeFilter.FILTER_ACCEPT:NodeFilter.FILTER_SKIP}});for(;r.nextNode();)o.push(r.currentNode);return o}function Y(e){const o=document.activeElement;return e.some(r=>r===o?!0:(r.focus(),document.activeElement!==o))}var st=se,nt=ae,at=ce,it=ue,ct=le,ut=pe,lt=J;export{ut as A,lt as C,ct as D,st as P,at as R,pe as T,nt as V,it as a};
