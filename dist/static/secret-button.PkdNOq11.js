import{j as s}from"./jsx-runtime.EKYJJIwR.js";import{r as e}from"./index.DrxKNVES.js";import{B as Ne}from"./button.x7-QiqwQ.js";import{D as Re,a as Oe,b as Ie,c as Ae,d as Be,e as We}from"./dialog.C0ZfxG5a.js";import{c as J}from"./classnames.B8F8Dq1p.js";import{M as Fe}from"./minus.B742cYsN.js";import{u as _e}from"./use-toast.BikYzejn.js";import{u as He}from"./secret-code.Cv6L9TH_.js";import{S as Le}from"./scan-face.CGF3SiT7.js";import"./index.BLEmuFXE.js";import"./index.1JkRN11X.js";import"./index.Li38iYKq.js";import"./index.BZXvyPAu.js";import"./index.BJknnQuW.js";import"./index.qJiwp9Ip.js";import"./index.BRpELbpY.js";import"./index.yusZEH1f.js";import"./index.2EOGNVNh.js";import"./index.rqUiOy30.js";import"./index.B2LyIUNT.js";import"./Combination.CoL-rreF.js";import"./index.CdA-AeYO.js";import"./index.CwYy1fy-.js";import"./x.DYFGPTRN.js";import"./createLucideIcon.D2R2PR3o.js";import"./middleware.BnB6WXUL.js";import"./common.Dl7uHOGF.js";import"./env.Bik-fSFe.js";import"./dev-console-log.CInb5xbI.js";var ze=Object.defineProperty,$e=Object.defineProperties,Ge=Object.getOwnPropertyDescriptors,Q=Object.getOwnPropertySymbols,he=Object.prototype.hasOwnProperty,ve=Object.prototype.propertyIsEnumerable,ge=(e,t,n)=>t in e?ze(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n,Ve=(e,t)=>{for(var n in t||(t={}))he.call(t,n)&&ge(e,n,t[n]);if(Q)for(var n of Q(t))ve.call(t,n)&&ge(e,n,t[n]);return e},qe=(e,t)=>$e(e,Ge(t)),Ue=(e,t)=>{var n={};for(var r in e)he.call(e,r)&&t.indexOf(r)<0&&(n[r]=e[r]);if(null!=e&&Q)for(var r of Q(e))t.indexOf(r)<0&&ve.call(e,r)&&(n[r]=e[r]);return n};function Ke(e){return[setTimeout(e,0),setTimeout(e,10),setTimeout(e,50)]}function Ze(t){let n=e.useRef();return e.useEffect((()=>{n.current=t})),n.current}var Je=18,be=40,Qe=`${be}px`,Xe=["[data-lastpass-icon-root]","com-1password-button","[data-dashlanecreated]",'[style$="2147483647 !important;"]'].join(",");function Ye({containerRef:t,inputRef:n,pushPasswordManagerStrategy:r,isFocused:a}){let[o,s]=e.useState(!1),[l,i]=e.useState(!1),[c,u]=e.useState(!1),d=e.useMemo((()=>"none"!==r&&(("increase-width"===r||"experimental-no-flickering"===r)&&o&&l)),[o,l,r]),p=e.useCallback((()=>{let e=t.current,a=n.current;if(!e||!a||c||"none"===r)return;let o=e,l=o.getBoundingClientRect().left+o.offsetWidth,i=o.getBoundingClientRect().top+o.offsetHeight/2,d=l-Je,p=i;0===document.querySelectorAll(Xe).length&&document.elementFromPoint(d,p)===e||(s(!0),u(!0))}),[t,n,c,r]);return e.useEffect((()=>{let e=t.current;if(!e||"none"===r)return;function n(){let t=window.innerWidth-e.getBoundingClientRect().right;i(t>=be)}n();let a=setInterval(n,1e3);return()=>{clearInterval(a)}}),[t,r]),e.useEffect((()=>{let e=a||document.activeElement===n.current;if("none"===r||!e)return;let t=setTimeout(p,0),o=setTimeout(p,2e3),s=setTimeout(p,5e3),l=setTimeout((()=>{u(!0)}),6e3);return()=>{clearTimeout(t),clearTimeout(o),clearTimeout(s),clearTimeout(l)}}),[n,a,r,p]),{hasPWMBadge:o,willPushPWMBadge:d,PWM_BADGE_SPACE_WIDTH:Qe}}var xe=e.createContext({}),we=e.forwardRef(((t,n)=>{var r,a,o,s,l,i=t,{value:c,onChange:u,maxLength:d,textAlign:p="left",pattern:m,placeholder:f,inputMode:g="numeric",onComplete:h,pushPasswordManagerStrategy:v="increase-width",pasteTransformer:x,containerClassName:b,noScriptCSSFallback:j=et,render:w,children:S}=i,y=Ue(i,["value","onChange","maxLength","textAlign","pattern","placeholder","inputMode","onComplete","pushPasswordManagerStrategy","pasteTransformer","containerClassName","noScriptCSSFallback","render","children"]);let[E,C]=e.useState("string"==typeof y.defaultValue?y.defaultValue:""),P=c??E,N=Ze(P),k=e.useCallback((e=>{u?.(e),C(e)}),[u]),B=e.useMemo((()=>m?"string"==typeof m?new RegExp(m):m:null),[m]),R=e.useRef(null),M=e.useRef(null),O=e.useRef({value:P,onChange:k,isIOS:typeof window<"u"&&(null==(a=null==(r=window?.CSS)?void 0:r.supports)?void 0:a.call(r,"-webkit-touch-callout","none"))}),I=e.useRef({prev:[null==(o=R.current)?void 0:o.selectionStart,null==(s=R.current)?void 0:s.selectionEnd,null==(l=R.current)?void 0:l.selectionDirection]});e.useImperativeHandle(n,(()=>R.current),[]),e.useEffect((()=>{let e=R.current,t=M.current;if(!e||!t)return;function n(){if(document.activeElement!==e)return L(null),void _(null);let t,n=e.selectionStart,r=e.selectionEnd,a=e.selectionDirection,o=e.maxLength,s=e.value,l=I.current.prev,i=-1,c=-1;if(0!==s.length&&null!==n&&null!==r){let e=n===r,a=n===s.length&&s.length<o;if(e&&!a){let e=n;if(0===e)i=0,c=1,t="forward";else if(e===o)i=e-1,c=e,t="backward";else if(o>1&&s.length>1){let n=0;if(null!==l[0]&&null!==l[1]){t=e<l[1]?"backward":"forward";let r=l[0]===l[1]&&l[0]<o;"backward"===t&&!r&&(n=-1)}i=n+e,c=n+e+1}}-1!==i&&-1!==c&&i!==c&&R.current.setSelectionRange(i,c,t)}let u=-1!==i?i:n,d=-1!==c?c:r,p=t??a;L(u),_(d),I.current.prev=[u,d,p]}if(O.current.value!==e.value&&O.current.onChange(e.value),I.current.prev=[e.selectionStart,e.selectionEnd,e.selectionDirection],document.addEventListener("selectionchange",n,{capture:!0}),n(),document.activeElement===e&&F(!0),!document.getElementById("input-otp-style")){let e=document.createElement("style");if(e.id="input-otp-style",document.head.appendChild(e),e.sheet){let t="background: transparent !important; color: transparent !important; border-color: transparent !important; opacity: 0 !important; box-shadow: none !important; -webkit-box-shadow: none !important; -webkit-text-fill-color: transparent !important;";q(e.sheet,"[data-input-otp]::selection { background: transparent !important; color: transparent !important; }"),q(e.sheet,`[data-input-otp]:autofill { ${t} }`),q(e.sheet,`[data-input-otp]:-webkit-autofill { ${t} }`),q(e.sheet,"@supports (-webkit-touch-callout: none) { [data-input-otp] { letter-spacing: -.6em !important; font-weight: 100 !important; font-stretch: ultra-condensed; font-optical-sizing: none !important; left: -1px !important; right: 1px !important; } }"),q(e.sheet,"[data-input-otp] + * { pointer-events: all !important; }")}}let r=()=>{t&&t.style.setProperty("--root-height",`${e.clientHeight}px`)};r();let a=new ResizeObserver(r);return a.observe(e),()=>{document.removeEventListener("selectionchange",n,{capture:!0}),a.disconnect()}}),[]);let[T,D]=e.useState(!1),[A,F]=e.useState(!1),[W,L]=e.useState(null),[H,_]=e.useState(null);e.useEffect((()=>{Ke((()=>{var e,t,n,r;null==(e=R.current)||e.dispatchEvent(new Event("input"));let a=null==(t=R.current)?void 0:t.selectionStart,o=null==(n=R.current)?void 0:n.selectionEnd,s=null==(r=R.current)?void 0:r.selectionDirection;null!==a&&null!==o&&(L(a),_(o),I.current.prev=[a,o,s])}))}),[P,A]),e.useEffect((()=>{void 0!==N&&P!==N&&N.length<d&&P.length===d&&h?.(P)}),[d,h,N,P]);let G=Ye({containerRef:M,inputRef:R,pushPasswordManagerStrategy:v,isFocused:A}),J=e.useCallback((e=>{let t=e.currentTarget.value.slice(0,d);t.length>0&&B&&!B.test(t)?e.preventDefault():("string"==typeof N&&t.length<N.length&&document.dispatchEvent(new Event("selectionchange")),k(t))}),[d,k,N,B]),U=e.useCallback((()=>{var e;if(R.current){let t=Math.min(R.current.value.length,d-1),n=R.current.value.length;null==(e=R.current)||e.setSelectionRange(t,n),L(t),_(n)}F(!0)}),[d]),z=e.useCallback((e=>{var t,n;let r=R.current;if(!(x||O.current.isIOS&&e.clipboardData&&r))return;let a=e.clipboardData.getData("text/plain"),o=x?x(a):a;e.preventDefault();let s=null==(t=R.current)?void 0:t.selectionStart,l=null==(n=R.current)?void 0:n.selectionEnd,i=(s!==l?P.slice(0,s)+o+P.slice(l):P.slice(0,s)+o+P.slice(s)).slice(0,d);if(i.length>0&&B&&!B.test(i))return;r.value=i,k(i);let c=Math.min(i.length,d-1),u=i.length;r.setSelectionRange(c,u),L(c),_(u)}),[d,k,B,P]),$=e.useMemo((()=>({position:"relative",cursor:y.disabled?"default":"text",userSelect:"none",WebkitUserSelect:"none",pointerEvents:"none"})),[y.disabled]),Q=e.useMemo((()=>({position:"absolute",inset:0,width:G.willPushPWMBadge?`calc(100% + ${G.PWM_BADGE_SPACE_WIDTH})`:"100%",clipPath:G.willPushPWMBadge?`inset(0 ${G.PWM_BADGE_SPACE_WIDTH} 0 0)`:void 0,height:"100%",display:"flex",textAlign:p,opacity:"1",color:"transparent",pointerEvents:"all",background:"transparent",caretColor:"transparent",border:"0 solid transparent",outline:"0 solid transparent",boxShadow:"none",lineHeight:"1",letterSpacing:"-.5em",fontSize:"var(--root-height)",fontFamily:"monospace",fontVariantNumeric:"tabular-nums"})),[G.PWM_BADGE_SPACE_WIDTH,G.willPushPWMBadge,p]),Y=e.useMemo((()=>e.createElement("input",qe(Ve({autoComplete:y.autoComplete||"one-time-code"},y),{"data-input-otp":!0,"data-input-otp-placeholder-shown":0===P.length||void 0,"data-input-otp-mss":W,"data-input-otp-mse":H,inputMode:g,pattern:B?.source,"aria-placeholder":f,style:Q,maxLength:d,value:P,ref:R,onPaste:e=>{var t;z(e),null==(t=y.onPaste)||t.call(y,e)},onChange:J,onMouseOver:e=>{var t;D(!0),null==(t=y.onMouseOver)||t.call(y,e)},onMouseLeave:e=>{var t;D(!1),null==(t=y.onMouseLeave)||t.call(y,e)},onFocus:e=>{var t;U(),null==(t=y.onFocus)||t.call(y,e)},onBlur:e=>{var t;F(!1),null==(t=y.onBlur)||t.call(y,e)}}))),[J,U,z,g,Q,d,H,W,y,B?.source,P]),V=e.useMemo((()=>({slots:Array.from({length:d}).map(((e,t)=>{var n;let r=A&&null!==W&&null!==H&&(W===H&&t===W||t>=W&&t<H),a=void 0!==P[t]?P[t]:null;return{char:a,placeholderChar:void 0!==P[0]?null:null!=(n=f?.[t])?n:null,isActive:r,hasFakeCaret:r&&null===a}})),isFocused:A,isHovering:!y.disabled&&T})),[A,T,d,H,W,y.disabled,P]),X=e.useMemo((()=>w?w(V):e.createElement(xe.Provider,{value:V},S)),[S,V,w]);return e.createElement(e.Fragment,null,null!==j&&e.createElement("noscript",null,e.createElement("style",null,j)),e.createElement("div",{ref:M,"data-input-otp-container":!0,style:$,className:b},X,e.createElement("div",{style:{position:"absolute",inset:0,pointerEvents:"none"}},Y)))}));function q(e,t){try{e.insertRule(t)}catch{console.error("input-otp could not insert CSS rule:",t)}}we.displayName="Input";var et="\n[data-input-otp] {\n  --nojs-bg: white !important;\n  --nojs-fg: black !important;\n\n  background-color: var(--nojs-bg) !important;\n  color: var(--nojs-fg) !important;\n  caret-color: var(--nojs-fg) !important;\n  letter-spacing: .25em !important;\n  text-align: center !important;\n  border: 1px solid var(--nojs-fg) !important;\n  border-radius: 4px !important;\n  width: 100% !important;\n}\n@media (prefers-color-scheme: dark) {\n  [data-input-otp] {\n    --nojs-bg: black !important;\n    --nojs-fg: white !important;\n  }\n}",tt="^\\d+$";const Se=e.forwardRef((({className:e,containerClassName:t,...n},r)=>s.jsx(we,{ref:r,className:J("disabled:cursor-not-allowed",e),containerClassName:J("flex items-center gap-2 has-[:disabled]:opacity-50",t),...n})));Se.displayName="InputOTP";const nt=e.forwardRef((({className:e,...t},n)=>s.jsx("div",{ref:n,className:J("flex items-center",e),...t})));nt.displayName="InputOTPGroup";const U=e.forwardRef((({index:t,className:n,...r},a)=>{const o=e.useContext(xe),{char:l,hasFakeCaret:i,isActive:c}=o.slots[t];return s.jsxs("div",{ref:a,className:J("relative flex h-9 w-9 items-center justify-center border-y border-r border-input text-sm shadow-sm transition-all first:rounded-l-md first:border-l last:rounded-r-md",c&&"z-10 ring-1 ring-ring",n),...r,children:[l,i?s.jsx("div",{className:"pointer-events-none absolute inset-0 flex items-center justify-center",children:s.jsx("div",{className:"h-4 w-px animate-caret-blink bg-foreground duration-1000"})}):null]})}));U.displayName="InputOTPSlot";const rt=e.forwardRef((({...e},t)=>s.jsx("div",{ref:t,role:"separator",...e,children:s.jsx(Fe,{})})));function Ot(){const{secretCode:t}=He(),[n,r]=e.useState(`${t[0]}`),[a,o]=e.useState(!1),{toast:l}=_e();return s.jsxs(Re,{children:[s.jsxs(Oe,{className:"hover: flex items-center gap-2 rounded-lg bg-[#580001] px-3 py-2 text-white shadow-sm dark:bg-[#780001]",children:["Acá se esconde algo",s.jsx(Le,{})]}),s.jsxs(Ie,{children:[s.jsxs(Ae,{children:[s.jsx(Be,{className:"text-center text-2xl",children:"¡Aventura en alta mar!"}),s.jsx(We,{className:"text-center",children:"Para abrir las puertas del dashboard secreto, necesitas el número clave. Ingresa el código y accede a toda la información oculta en las profundidades. ¡Prepárate para navegar por un mar de datos exclusivos!"})]}),s.jsxs("form",{className:"flex w-full flex-col gap-5",onSubmit:e=>{t===n?(l({title:"Código correcto",description:"Enhorabuena. Has descubierto el código secreto. Bienvenido al panel secreto.",variant:"default",className:"bg-green-500 text-black"}),o(!0)):l({title:"Código incorrecto",description:"¡Arrr! El código secreto no es correcto. ¡Inténtalo de nuevo!",variant:"destructive"}),e.preventDefault()},children:[s.jsx("div",{className:"mx-auto",children:s.jsxs(Se,{maxLength:4,pattern:tt,value:n,onChange:e=>r(e),children:[s.jsx(U,{className:"size-11",index:0}),s.jsx(U,{className:"size-11",index:1}),s.jsx(U,{className:"size-11",index:2}),s.jsx(U,{className:"size-11",index:3})]})}),a?s.jsx("a",{className:"inline-flex h-10 items-center justify-center whitespace-nowrap rounded-md bg-green-700 px-4 py-2 text-sm font-medium text-white ring-offset-background transition-colors hover:bg-green-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",href:"/vault",children:"Ir al panel secreto"}):s.jsx(Ne,{className:"bg-[#282828] text-white hover:bg-[#323232]",type:"submit",children:"Probar Código Secreto"})]})]})]})}rt.displayName="InputOTPSeparator";export{Ot as SecretButton};