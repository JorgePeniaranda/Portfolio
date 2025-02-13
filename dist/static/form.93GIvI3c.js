import{j as J}from"./jsx-runtime.EKYJJIwR.js";import{S as Rt}from"./index.1JkRN11X.js";import{R as A,r as $}from"./index.DrxKNVES.js";import{P as Nt}from"./index.2EOGNVNh.js";import{c as Tt}from"./index.Li38iYKq.js";import{c as he}from"./classnames.B8F8Dq1p.js";var ve=e=>"checkbox"===e.type,ie=e=>e instanceof Date,O=e=>null==e;const at=e=>"object"==typeof e;var S=e=>!O(e)&&!Array.isArray(e)&&at(e)&&!ie(e),nt=e=>S(e)&&e.target?ve(e.target)?e.target.checked:e.target.value:e,It=e=>e.substring(0,e.search(/\.\d+(\.|$)/))||e,lt=(e,t)=>e.has(It(t)),Mt=e=>{const t=e.constructor&&e.constructor.prototype;return S(t)&&t.hasOwnProperty("isPrototypeOf")},Ie=typeof window<"u"&&typeof window.HTMLElement<"u"&&typeof document<"u";function U(e){let t;const r=Array.isArray(e),s=typeof FileList<"u"&&e instanceof FileList;if(e instanceof Date)t=new Date(e);else if(e instanceof Set)t=new Set(e);else{if(Ie&&(e instanceof Blob||s)||!r&&!S(e))return e;if(t=r?[]:{},r||Mt(e))for(const r in e)e.hasOwnProperty(r)&&(t[r]=U(e[r]));else t=e}return t}var we=e=>Array.isArray(e)?e.filter(Boolean):[],D=e=>void 0===e,f=(e,t,r)=>{if(!t||!S(e))return r;const s=we(t.split(/[,[\].]+?/)).reduce(((e,t)=>O(e)?e:e[t]),e);return D(s)||s===e?D(e[t])?r:e[t]:s},W=e=>"boolean"==typeof e,Me=e=>/^\w*$/.test(e),ut=e=>we(e.replace(/["|']|\]/g,"").split(/\.|\[/)),w=(e,t,r)=>{let s=-1;const a=Me(t)?[t]:ut(t),i=a.length,n=i-1;for(;++s<i;){const t=a[s];let i=r;if(s!==n){const r=e[t];i=S(r)||Array.isArray(r)?r:isNaN(+a[s+1])?{}:[]}if("__proto__"===t||"constructor"===t||"prototype"===t)return;e[t]=i,e=e[t]}return e};const Fe={BLUR:"blur",FOCUS_OUT:"focusout",CHANGE:"change"},K={onBlur:"onBlur",onChange:"onChange",onSubmit:"onSubmit",onTouched:"onTouched",all:"all"},Z={max:"max",min:"min",maxLength:"maxLength",minLength:"minLength",pattern:"pattern",required:"required",validate:"validate"},ot=A.createContext(null),De=()=>A.useContext(ot),Ot=e=>{const{children:t,...r}=e;return A.createElement(ot.Provider,{value:r},t)};var dt=(e,t,r,s=!0)=>{const a={defaultValues:t._defaultValues};for(const i in e)Object.defineProperty(a,i,{get:()=>{const a=i;return t._proxyFormState[a]!==K.all&&(t._proxyFormState[a]=!s||K.all),r&&(r[a]=!0),e[a]}});return a},P=e=>S(e)&&!Object.keys(e).length,ft=(e,t,r,s)=>{r(e);const{name:a,...i}=e;return P(i)||Object.keys(i).length>=Object.keys(t).length||Object.keys(i).find((e=>t[e]===(!s||K.all)))},ye=e=>Array.isArray(e)?e:[e],ct=(e,t,r)=>!e||!t||e===t||ye(e).some((e=>e&&(r?e===t:e.startsWith(t)||t.startsWith(e))));function Oe(e){const t=A.useRef(e);t.current=e,A.useEffect((()=>{const r=!e.disabled&&t.current.subject&&t.current.subject.subscribe({next:t.current.next});return()=>{r&&r.unsubscribe()}}),[e.disabled])}function Ut(e){const t=De(),{control:r=t.control,disabled:s,name:a,exact:i}=e||{},[n,o]=A.useState(r._formState),l=A.useRef(!0),u=A.useRef({isDirty:!1,isLoading:!1,dirtyFields:!1,touchedFields:!1,validatingFields:!1,isValidating:!1,isValid:!1,errors:!1}),d=A.useRef(a);return d.current=a,Oe({disabled:s,next:e=>l.current&&ct(d.current,e.name,i)&&ft(e,u.current,r._updateFormState)&&o({...r._formState,...e}),subject:r._subjects.state}),A.useEffect((()=>(l.current=!0,u.current.isValid&&r._updateValid(!0),()=>{l.current=!1})),[r]),A.useMemo((()=>dt(n,r,u.current,!1)),[n,r])}var Y=e=>"string"==typeof e,yt=(e,t,r,s,a)=>Y(e)?(s&&t.watch.add(e),f(r,e,a)):Array.isArray(e)?e.map((e=>(s&&t.watch.add(e),f(r,e)))):(s&&(t.watchAll=!0),r);function Pt(e){const t=De(),{control:r=t.control,name:s,defaultValue:a,disabled:i,exact:n}=e||{},o=A.useRef(s);o.current=s,Oe({disabled:i,subject:r._subjects.values,next:e=>{ct(o.current,e.name,n)&&u(U(yt(o.current,r._names,e.values||r._formValues,!1,a)))}});const[l,u]=A.useState(r._getWatch(s,a));return A.useEffect((()=>r._removeUnmounted())),l}function Bt(e){const t=De(),{name:r,disabled:s,control:a=t.control,shouldUnregister:i}=e,n=lt(a._names.array,r),o=Pt({control:a,name:r,defaultValue:f(a._formValues,r,f(a._defaultValues,r,e.defaultValue)),exact:!0}),l=Ut({control:a,name:r,exact:!0}),u=A.useRef(a.register(r,{...e.rules,value:o,...W(e.disabled)?{disabled:e.disabled}:{}})),d=A.useMemo((()=>Object.defineProperties({},{invalid:{enumerable:!0,get:()=>!!f(l.errors,r)},isDirty:{enumerable:!0,get:()=>!!f(l.dirtyFields,r)},isTouched:{enumerable:!0,get:()=>!!f(l.touchedFields,r)},isValidating:{enumerable:!0,get:()=>!!f(l.validatingFields,r)},error:{enumerable:!0,get:()=>f(l.errors,r)}})),[l,r]),c=A.useMemo((()=>({name:r,value:o,...W(s)||l.disabled?{disabled:l.disabled||s}:{},onChange:e=>u.current.onChange({target:{value:nt(e),name:r},type:Fe.CHANGE}),onBlur:()=>u.current.onBlur({target:{value:f(a._formValues,r),name:r},type:Fe.BLUR}),ref:e=>{const t=f(a._fields,r);t&&e&&(t._f.ref={focus:()=>e.focus(),select:()=>e.select(),setCustomValidity:t=>e.setCustomValidity(t),reportValidity:()=>e.reportValidity()})}})),[r,a._formValues,s,l.disabled,o,a._fields]);return A.useEffect((()=>{const e=a._options.shouldUnregister||i,t=(e,t)=>{const r=f(a._fields,e);r&&r._f&&(r._f.mount=t)};if(t(r,!0),e){const e=U(f(a._options.defaultValues,r));w(a._defaultValues,r,e),D(f(a._formValues,r))&&w(a._formValues,r,e)}return!n&&a.register(r),()=>{(n?e&&!a._state.action:e)?a.unregister(r):t(r,!1)}}),[r,a,n,i]),A.useEffect((()=>{a._updateDisabledField({disabled:s,fields:a._fields,name:r})}),[s,r,a]),A.useMemo((()=>({field:c,formState:l,fieldState:d})),[c,l,d])}const jt=e=>e.render(Bt(e));var qt=(e,t,r,s,a)=>t?{...r[e],types:{...r[e]&&r[e].types?r[e].types:{},[s]:a||!0}}:{},Je=e=>({isOnSubmit:!e||e===K.onSubmit,isOnBlur:e===K.onBlur,isOnChange:e===K.onChange,isOnAll:e===K.all,isOnTouch:e===K.onTouched}),Qe=(e,t,r)=>!r&&(t.watchAll||t.watch.has(e)||[...t.watch].some((t=>e.startsWith(t)&&/^\.\w+/.test(e.slice(t.length)))));const ge=(e,t,r,s)=>{for(const a of r||Object.keys(e)){const r=f(e,a);if(r){const{_f:e,...i}=r;if(e){if(e.refs&&e.refs[0]&&t(e.refs[0],a)&&!s)return!0;if(e.ref&&t(e.ref,e.name)&&!s)return!0;if(ge(i,t))break}else if(S(i)&&ge(i,t))break}}};var Wt=(e,t,r)=>{const s=ye(f(e,r));return w(s,"root",t[r]),w(e,r,s),e},Ue=e=>"file"===e.type,G=e=>"function"==typeof e,xe=e=>{if(!Ie)return!1;const t=e?e.ownerDocument:0;return e instanceof(t&&t.defaultView?t.defaultView.HTMLElement:HTMLElement)},be=e=>Y(e),Pe=e=>"radio"===e.type,Ve=e=>e instanceof RegExp;const Xe={value:!1,isValid:!1},Ze={value:!0,isValid:!0};var gt=e=>{if(Array.isArray(e)){if(e.length>1){const t=e.filter((e=>e&&e.checked&&!e.disabled)).map((e=>e.value));return{value:t,isValid:!!t.length}}return e[0].checked&&!e[0].disabled?e[0].attributes&&!D(e[0].attributes.value)?D(e[0].value)||""===e[0].value?Ze:{value:e[0].value,isValid:!0}:Ze:Xe}return Xe};const et={isValid:!1,value:null};var ht=e=>Array.isArray(e)?e.reduce(((e,t)=>t&&t.checked&&!t.disabled?{isValid:!0,value:t.value}:e),et):et;function tt(e,t,r="validate"){if(be(e)||Array.isArray(e)&&e.every(be)||W(e)&&!e)return{type:r,message:be(e)?e:"",ref:t}}var le=e=>S(e)&&!Ve(e)?e:{value:e,message:""},rt=async(e,t,r,s,a,i)=>{const{ref:n,refs:o,required:l,maxLength:u,minLength:d,min:c,max:m,pattern:y,validate:v,name:g,valueAsNumber:h,mount:b}=e._f,p=f(r,g);if(!b||t.has(g))return{};const _=o?o[0]:n,A=e=>{a&&_.reportValidity&&(_.setCustomValidity(W(e)?"":e||""),_.reportValidity())},w={},V=Pe(n),x=ve(n),F=V||x,C=(h||Ue(n))&&D(n.value)&&D(p)||xe(n)&&""===n.value||""===p||Array.isArray(p)&&!p.length,k=qt.bind(null,g,s,w),N=(e,t,r,s=Z.maxLength,a=Z.minLength)=>{const i=e?t:r;w[g]={type:e?s:a,message:i,ref:n,...k(e?s:a,i)}};if(i?!Array.isArray(p)||!p.length:l&&(!F&&(C||O(p))||W(p)&&!p||x&&!gt(o).isValid||V&&!ht(o).isValid)){const{value:e,message:t}=be(l)?{value:!!l,message:l}:le(l);if(e&&(w[g]={type:Z.required,message:t,ref:_,...k(Z.required,t)},!s))return A(t),w}if(!(C||O(c)&&O(m))){let e,t;const r=le(m),a=le(c);if(O(p)||isNaN(p)){const s=n.valueAsDate||new Date(p),i=e=>new Date((new Date).toDateString()+" "+e),o="time"==n.type,l="week"==n.type;Y(r.value)&&p&&(e=o?i(p)>i(r.value):l?p>r.value:s>new Date(r.value)),Y(a.value)&&p&&(t=o?i(p)<i(a.value):l?p<a.value:s<new Date(a.value))}else{const s=n.valueAsNumber||p&&+p;O(r.value)||(e=s>r.value),O(a.value)||(t=s<a.value)}if((e||t)&&(N(!!e,r.message,a.message,Z.max,Z.min),!s))return A(w[g].message),w}if((u||d)&&!C&&(Y(p)||i&&Array.isArray(p))){const e=le(u),t=le(d),r=!O(e.value)&&p.length>+e.value,a=!O(t.value)&&p.length<+t.value;if((r||a)&&(N(r,e.message,t.message),!s))return A(w[g].message),w}if(y&&!C&&Y(p)){const{value:e,message:t}=le(y);if(Ve(e)&&!p.match(e)&&(w[g]={type:Z.pattern,message:t,ref:n,...k(Z.pattern,t)},!s))return A(t),w}if(v)if(G(v)){const e=tt(await v(p,r),_);if(e&&(w[g]={...e,...k(Z.validate,e.message)},!s))return A(e.message),w}else if(S(v)){let e={};for(const t in v){if(!P(e)&&!s)break;const a=tt(await v[t](p,r),_,t);a&&(e={...a,...k(t,a.message)},A(a.message),s&&(w[g]=e))}if(!P(e)&&(w[g]={ref:_,...e},!s))return w}return A(!0),w};function $t(e,t){const r=t.slice(0,-1).length;let s=0;for(;s<r;)e=D(e)?s++:e[t[s++]];return e}function Ht(e){for(const t in e)if(e.hasOwnProperty(t)&&!D(e[t]))return!1;return!0}function C(e,t){const r=Array.isArray(t)?t:Me(t)?[t]:ut(t),s=1===r.length?e:$t(e,r),a=r.length-1,i=r[a];return s&&delete s[i],0!==a&&(S(s)&&P(s)||Array.isArray(s)&&Ht(s))&&C(e,r.slice(0,-1)),e}var Le=()=>{let e=[];return{get observers(){return e},next:t=>{for(const r of e)r.next&&r.next(t)},subscribe:t=>(e.push(t),{unsubscribe:()=>{e=e.filter((e=>e!==t))}}),unsubscribe:()=>{e=[]}}},Te=e=>O(e)||!at(e);function re(e,t){if(Te(e)||Te(t))return e===t;if(ie(e)&&ie(t))return e.getTime()===t.getTime();const r=Object.keys(e),s=Object.keys(t);if(r.length!==s.length)return!1;for(const a of r){const r=e[a];if(!s.includes(a))return!1;if("ref"!==a){const e=t[a];if(ie(r)&&ie(e)||S(r)&&S(e)||Array.isArray(r)&&Array.isArray(e)?!re(r,e):r!==e)return!1}}return!0}var vt=e=>"select-multiple"===e.type,Kt=e=>Pe(e)||ve(e),Re=e=>xe(e)&&e.isConnected,mt=e=>{for(const t in e)if(G(e[t]))return!0;return!1};function Ae(e,t={}){const r=Array.isArray(e);if(S(e)||r)for(const r in e)Array.isArray(e[r])||S(e[r])&&!mt(e[r])?(t[r]=Array.isArray(e[r])?[]:{},Ae(e[r],t[r])):O(e[r])||(t[r]=!0);return t}function _t(e,t,r){const s=Array.isArray(e);if(S(e)||s)for(const s in e)Array.isArray(e[s])||S(e[s])&&!mt(e[s])?D(t)||Te(r[s])?r[s]=Array.isArray(e[s])?Ae(e[s],[]):{...Ae(e[s])}:_t(e[s],O(t)?{}:t[s],r[s]):r[s]=!re(e[s],t[s]);return r}var fe=(e,t)=>_t(e,t,Ae(t)),bt=(e,{valueAsNumber:t,valueAsDate:r,setValueAs:s})=>D(e)?e:t?""===e?NaN:e&&+e:r&&Y(e)?new Date(e):s?s(e):e;function Ne(e){const t=e.ref;return Ue(t)?t.files:Pe(t)?ht(e.refs).value:vt(t)?[...t.selectedOptions].map((({value:e})=>e)):ve(t)?gt(e.refs).value:bt(D(t.value)?e.ref.value:t.value,e)}var zt=(e,t,r,s)=>{const a={};for(const r of e){const e=f(t,r);e&&w(a,r,e._f)}return{criteriaMode:r,names:[...e],fields:a,shouldUseNativeValidation:s}},ce=e=>D(e)?e:Ve(e)?e.source:S(e)?Ve(e.value)?e.value.source:e.value:e;const st="AsyncFunction";var Gt=e=>!!e&&!!e.validate&&!!(G(e.validate)&&e.validate.constructor.name===st||S(e.validate)&&Object.values(e.validate).find((e=>e.constructor.name===st))),Yt=e=>e.mount&&(e.required||e.min||e.max||e.maxLength||e.minLength||e.pattern||e.validate);function it(e,t,r){const s=f(e,r);if(s||Me(r))return{error:s,name:r};const a=r.split(".");for(;a.length;){const s=a.join("."),i=f(t,s),n=f(e,s);if(i&&!Array.isArray(i)&&r!==s)return{name:r};if(n&&n.type)return{name:s,error:n};a.pop()}return{name:r}}var Jt=(e,t,r,s,a)=>!a.isOnAll&&(!r&&a.isOnTouch?!(t||e):(r?s.isOnBlur:a.isOnBlur)?!e:!(r?s.isOnChange:a.isOnChange)||e),Qt=(e,t)=>!we(f(e,t)).length&&C(e,t);const Xt={mode:K.onSubmit,reValidateMode:K.onChange,shouldFocusError:!0};function Zt(e={}){let t,r={...Xt,...e},s={submitCount:0,isDirty:!1,isLoading:G(r.defaultValues),isValidating:!1,isSubmitted:!1,isSubmitting:!1,isSubmitSuccessful:!1,isValid:!1,touchedFields:{},dirtyFields:{},validatingFields:{},errors:r.errors||{},disabled:r.disabled||!1},a={},i=(S(r.defaultValues)||S(r.values))&&U(r.defaultValues||r.values)||{},n=r.shouldUnregister?{}:U(i),o={action:!1,mount:!1,watch:!1},l={mount:new Set,disabled:new Set,unMount:new Set,array:new Set,watch:new Set},u=0;const d={isDirty:!1,dirtyFields:!1,validatingFields:!1,touchedFields:!1,isValidating:!1,isValid:!1,errors:!1},c={values:Le(),array:Le(),state:Le()},m=Je(r.mode),y=Je(r.reValidateMode),v=r.criteriaMode===K.all,g=async e=>{if(!r.disabled&&(d.isValid||e)){const e=r.resolver?P((await A()).errors):await V(a,!0);e!==s.isValid&&c.state.next({isValid:e})}},h=(e,t)=>{!r.disabled&&(d.isValidating||d.validatingFields)&&((e||Array.from(l.mount)).forEach((e=>{e&&(t?w(s.validatingFields,e,t):C(s.validatingFields,e))})),c.state.next({validatingFields:s.validatingFields,isValidating:!P(s.validatingFields)}))},b=(e,t,r,s)=>{const l=f(a,e);if(l){const a=f(n,e,D(r)?f(i,e):r);D(a)||s&&s.defaultChecked||t?w(n,e,t?a:Ne(l._f)):k(e,a),o.mount&&g()}},p=(e,t,n,o,l)=>{let u=!1,m=!1;const y={name:e};if(!r.disabled){const r=!!(f(a,e)&&f(a,e)._f&&f(a,e)._f.disabled);if(!n||o){d.isDirty&&(m=s.isDirty,s.isDirty=y.isDirty=x(),u=m!==y.isDirty);const a=r||re(f(i,e),t);m=!(r||!f(s.dirtyFields,e)),a||r?C(s.dirtyFields,e):w(s.dirtyFields,e,!0),y.dirtyFields=s.dirtyFields,u=u||d.dirtyFields&&m!==!a}if(n){const t=f(s.touchedFields,e);t||(w(s.touchedFields,e,n),y.touchedFields=s.touchedFields,u=u||d.touchedFields&&t!==n)}u&&l&&c.state.next(y)}return u?y:{}},_=(e,a,i,n)=>{const o=f(s.errors,e),l=d.isValid&&W(a)&&s.isValid!==a;if(r.delayError&&i?(t=(e=>t=>{clearTimeout(u),u=setTimeout(e,t)})((()=>((e,t)=>{w(s.errors,e,t),c.state.next({errors:s.errors})})(e,i))),t(r.delayError)):(clearTimeout(u),t=null,i?w(s.errors,e,i):C(s.errors,e)),(i?!re(o,i):o)||!P(n)||l){const t={...n,...l&&W(a)?{isValid:a}:{},errors:s.errors,name:e};s={...s,...t},c.state.next(t)}},A=async e=>{h(e,!0);const t=await r.resolver(n,r.context,zt(e||l.mount,a,r.criteriaMode,r.shouldUseNativeValidation));return h(e),t},V=async(e,t,a={valid:!0})=>{for(const i in e){const o=e[i];if(o){const{_f:e,...u}=o;if(e){const u=l.array.has(e.name),c=o._f&&Gt(o._f);c&&d.validatingFields&&h([i],!0);const m=await rt(o,l.disabled,n,v,r.shouldUseNativeValidation&&!t,u);if(c&&d.validatingFields&&h([i]),m[e.name]&&(a.valid=!1,t))break;!t&&(f(m,e.name)?u?Wt(s.errors,m,e.name):w(s.errors,e.name,m[e.name]):C(s.errors,e.name))}!P(u)&&await V(u,t,a)}}return a.valid},x=(e,t)=>!r.disabled&&(e&&t&&w(n,e,t),!re(M(),i)),F=(e,t,r)=>yt(e,l,{...o.mount?n:D(t)?i:Y(e)?{[e]:t}:t},r,t),k=(e,t,r={})=>{const s=f(a,e);let i=t;if(s){const r=s._f;r&&(!r.disabled&&w(n,e,bt(t,r)),i=xe(r.ref)&&O(t)?"":t,vt(r.ref)?[...r.ref.options].forEach((e=>e.selected=i.includes(e.value))):r.refs?ve(r.ref)?r.refs.length>1?r.refs.forEach((e=>(!e.defaultChecked||!e.disabled)&&(e.checked=Array.isArray(i)?!!i.find((t=>t===e.value)):i===e.value))):r.refs[0]&&(r.refs[0].checked=!!i):r.refs.forEach((e=>e.checked=e.value===i)):Ue(r.ref)?r.ref.value="":(r.ref.value=i,r.ref.type||c.values.next({name:e,values:{...n}})))}(r.shouldDirty||r.shouldTouch)&&p(e,i,r.shouldTouch,r.shouldDirty,!0),r.shouldValidate&&T(e)},N=(e,t,r)=>{for(const s in t){const i=t[s],n=`${e}.${s}`,o=f(a,n);(l.array.has(e)||S(i)||o&&!o._f)&&!ie(i)?N(n,i,r):k(n,i,r)}},j=(e,t,r={})=>{const u=f(a,e),m=l.array.has(e),y=U(t);w(n,e,y),m?(c.array.next({name:e,values:{...n}}),(d.isDirty||d.dirtyFields)&&r.shouldDirty&&c.state.next({name:e,dirtyFields:fe(i,n),isDirty:x(e,y)})):!u||u._f||O(y)?k(e,y,r):N(e,y,r),Qe(e,l)&&c.state.next({...s}),c.values.next({name:o.mount?e:void 0,values:{...n}})},E=async e=>{o.mount=!0;const i=e.target;let u=i.name,b=!0;const S=f(a,u),x=e=>{b=Number.isNaN(e)||ie(e)&&isNaN(e.getTime())||re(e,f(n,u,e))};if(S){let o,F;const D=i.type?Ne(S._f):nt(e),C=e.type===Fe.BLUR||e.type===Fe.FOCUS_OUT,O=!Yt(S._f)&&!r.resolver&&!f(s.errors,u)&&!S._f.deps||Jt(C,f(s.touchedFields,u),s.isSubmitted,y,m),k=Qe(u,l,C);w(n,u,D),C?(S._f.onBlur&&S._f.onBlur(e),t&&t(0)):S._f.onChange&&S._f.onChange(e);const N=p(u,D,C,!1),U=!P(N)||k;if(!C&&c.values.next({name:u,type:e.type,values:{...n}}),O)return d.isValid&&("onBlur"===r.mode&&C?g():C||g()),U&&c.state.next({name:u,...k?{}:N});if(!C&&k&&c.state.next({...s}),r.resolver){const{errors:e}=await A([u]);if(x(D),b){const t=it(s.errors,a,u),r=it(e,a,t.name||u);o=r.error,u=r.name,F=P(e)}}else h([u],!0),o=(await rt(S,l.disabled,n,v,r.shouldUseNativeValidation))[u],h([u]),x(D),b&&(o?F=!1:d.isValid&&(F=await V(a,!0)));b&&(S._f.deps&&T(S._f.deps),_(u,F,o,N))}},L=(e,t)=>{if(f(s.errors,t)&&e.focus)return e.focus(),1},T=async(e,t={})=>{let i,n;const o=ye(e);if(r.resolver){const t=await(async e=>{const{errors:t}=await A(e);if(e)for(const r of e){const e=f(t,r);e?w(s.errors,r,e):C(s.errors,r)}else s.errors=t;return t})(D(e)?e:o);i=P(t),n=e?!o.some((e=>f(t,e))):i}else e?(n=(await Promise.all(o.map((async e=>{const t=f(a,e);return await V(t&&t._f?{[e]:t}:t)})))).every(Boolean),(n||s.isValid)&&g()):n=i=await V(a);return c.state.next({...!Y(e)||d.isValid&&i!==s.isValid?{}:{name:e},...r.resolver||!e?{isValid:i}:{},errors:s.errors}),t.shouldFocus&&!n&&ge(a,L,e?o:l.mount),n},M=e=>{const t={...o.mount?n:i};return D(e)?t:Y(e)?f(t,e):e.map((e=>f(t,e)))},R=(e,t)=>({invalid:!!f((t||s).errors,e),isDirty:!!f((t||s).dirtyFields,e),error:f((t||s).errors,e),isValidating:!!f(s.validatingFields,e),isTouched:!!f((t||s).touchedFields,e)}),I=(e,t,r)=>{const i=(f(a,e,{_f:{}})._f||{}).ref,n=f(s.errors,e)||{},{ref:o,message:l,type:u,...d}=n;w(s.errors,e,{...d,...t,ref:i}),c.state.next({name:e,errors:s.errors,isValid:!1}),r&&r.shouldFocus&&i&&i.focus&&i.focus()},$=(e,t={})=>{for(const o of e?ye(e):l.mount)l.mount.delete(o),l.array.delete(o),t.keepValue||(C(a,o),C(n,o)),!t.keepError&&C(s.errors,o),!t.keepDirty&&C(s.dirtyFields,o),!t.keepTouched&&C(s.touchedFields,o),!t.keepIsValidating&&C(s.validatingFields,o),!r.shouldUnregister&&!t.keepDefaultValue&&C(i,o);c.values.next({values:{...n}}),c.state.next({...s,...t.keepDirty?{isDirty:x()}:{}}),!t.keepIsValid&&g()},B=({disabled:e,name:t,field:r,fields:s})=>{(W(e)&&o.mount||e||l.disabled.has(t))&&(e?l.disabled.add(t):l.disabled.delete(t),p(t,Ne(r?r._f:f(s,t)._f),!1,!1,!0))},J=(e,t={})=>{let s=f(a,e);const n=W(t.disabled)||W(r.disabled);return w(a,e,{...s||{},_f:{...s&&s._f?s._f:{ref:{name:e}},name:e,mount:!0,...t}}),l.mount.add(e),s?B({field:s,disabled:W(t.disabled)?t.disabled:r.disabled,name:e}):b(e,!0,t.value),{...n?{disabled:t.disabled||r.disabled}:{},...r.progressive?{required:!!t.required,min:ce(t.min),max:ce(t.max),minLength:ce(t.minLength),maxLength:ce(t.maxLength),pattern:ce(t.pattern)}:{},name:e,onChange:E,onBlur:E,ref:n=>{if(n){J(e,t),s=f(a,e);const r=D(n.value)&&n.querySelectorAll&&n.querySelectorAll("input,select,textarea")[0]||n,o=Kt(r),l=s._f.refs||[];if(o?l.find((e=>e===r)):r===s._f.ref)return;w(a,e,{_f:{...s._f,...o?{refs:[...l.filter(Re),r,...Array.isArray(f(i,e))?[{}]:[]],ref:{type:r.type,name:e}}:{ref:r}}}),b(e,!1,void 0,r)}else s=f(a,e,{}),s._f&&(s._f.mount=!1),(r.shouldUnregister||t.shouldUnregister)&&(!lt(l.array,e)||!o.action)&&l.unMount.add(e)}}},q=()=>r.shouldFocusError&&ge(a,L,l.mount),Z=(e,t)=>async i=>{let o;i&&(i.preventDefault&&i.preventDefault(),i.persist&&i.persist());let u=U(n);if(l.disabled.size)for(const e of l.disabled)w(u,e,void 0);if(c.state.next({isSubmitting:!0}),r.resolver){const{errors:e,values:t}=await A();s.errors=e,u=t}else await V(a);if(C(s.errors,"root"),P(s.errors)){c.state.next({errors:{}});try{await e(u,i)}catch(e){o=e}}else t&&await t({...s.errors},i),q(),setTimeout(q);if(c.state.next({isSubmitted:!0,isSubmitting:!1,isSubmitSuccessful:P(s.errors)&&!o,submitCount:s.submitCount+1,errors:s.errors}),o)throw o},H=(e,t={})=>{const u=e?U(e):i,m=U(u),y=P(e),v=y?i:m;if(t.keepDefaultValues||(i=u),!t.keepValues){if(t.keepDirtyValues){const e=new Set([...l.mount,...Object.keys(fe(i,n))]);for(const t of Array.from(e))f(s.dirtyFields,t)?w(v,t,f(n,t)):j(t,f(v,t))}else{if(Ie&&D(e))for(const e of l.mount){const t=f(a,e);if(t&&t._f){const e=Array.isArray(t._f.refs)?t._f.refs[0]:t._f.ref;if(xe(e)){const t=e.closest("form");if(t){t.reset();break}}}}a={}}n=r.shouldUnregister?t.keepDefaultValues?U(i):{}:U(v),c.array.next({values:{...v}}),c.values.next({values:{...v}})}l={mount:t.keepDirtyValues?l.mount:new Set,unMount:new Set,array:new Set,disabled:new Set,watch:new Set,watchAll:!1,focus:""},o.mount=!d.isValid||!!t.keepIsValid||!!t.keepDirtyValues,o.watch=!!r.shouldUnregister,c.state.next({submitCount:t.keepSubmitCount?s.submitCount:0,isDirty:!y&&(t.keepDirty?s.isDirty:!(!t.keepDefaultValues||re(e,i))),isSubmitted:!!t.keepIsSubmitted&&s.isSubmitted,dirtyFields:y?{}:t.keepDirtyValues?t.keepDefaultValues&&n?fe(i,n):s.dirtyFields:t.keepDefaultValues&&e?fe(i,e):t.keepDirty?s.dirtyFields:{},touchedFields:t.keepTouched?s.touchedFields:{},errors:t.keepErrors?s.errors:{},isSubmitSuccessful:!!t.keepIsSubmitSuccessful&&s.isSubmitSuccessful,isSubmitting:!1})},X=(e,t)=>H(G(e)?e(n):e,t);return{control:{register:J,unregister:$,getFieldState:R,handleSubmit:Z,setError:I,_executeSchema:A,_getWatch:F,_getDirty:x,_updateValid:g,_removeUnmounted:()=>{for(const e of l.unMount){const t=f(a,e);t&&(t._f.refs?t._f.refs.every((e=>!Re(e))):!Re(t._f.ref))&&$(e)}l.unMount=new Set},_updateFieldArray:(e,t=[],l,u,m=!0,y=!0)=>{if(u&&l&&!r.disabled){if(o.action=!0,y&&Array.isArray(f(a,e))){const t=l(f(a,e),u.argA,u.argB);m&&w(a,e,t)}if(y&&Array.isArray(f(s.errors,e))){const t=l(f(s.errors,e),u.argA,u.argB);m&&w(s.errors,e,t),Qt(s.errors,e)}if(d.touchedFields&&y&&Array.isArray(f(s.touchedFields,e))){const t=l(f(s.touchedFields,e),u.argA,u.argB);m&&w(s.touchedFields,e,t)}d.dirtyFields&&(s.dirtyFields=fe(i,n)),c.state.next({name:e,isDirty:x(e,t),dirtyFields:s.dirtyFields,errors:s.errors,isValid:s.isValid})}else w(n,e,t)},_updateDisabledField:B,_getFieldArray:e=>we(f(o.mount?n:i,e,r.shouldUnregister?f(i,e,[]):[])),_reset:H,_resetDefaultValues:()=>G(r.defaultValues)&&r.defaultValues().then((e=>{X(e,r.resetOptions),c.state.next({isLoading:!1})})),_updateFormState:e=>{s={...s,...e}},_disableForm:e=>{W(e)&&(c.state.next({disabled:e}),ge(a,((t,r)=>{const s=f(a,r);s&&(t.disabled=s._f.disabled||e,Array.isArray(s._f.refs)&&s._f.refs.forEach((t=>{t.disabled=s._f.disabled||e})))}),0,!1))},_subjects:c,_proxyFormState:d,_setErrors:e=>{s.errors=e,c.state.next({errors:s.errors,isValid:!1})},get _fields(){return a},get _formValues(){return n},get _state(){return o},set _state(e){o=e},get _defaultValues(){return i},get _names(){return l},set _names(e){l=e},get _formState(){return s},set _formState(e){s=e},get _options(){return r},set _options(e){r={...r,...e}}},trigger:T,register:J,handleSubmit:Z,watch:(e,t)=>G(e)?c.values.subscribe({next:r=>e(F(void 0,t),r)}):F(e,t,!0),setValue:j,getValues:M,reset:X,resetField:(e,t={})=>{f(a,e)&&(D(t.defaultValue)?j(e,U(f(i,e))):(j(e,t.defaultValue),w(i,e,U(t.defaultValue))),t.keepTouched||C(s.touchedFields,e),t.keepDirty||(C(s.dirtyFields,e),s.isDirty=t.defaultValue?x(e,U(f(i,e))):x()),t.keepError||(C(s.errors,e),d.isValid&&g()),c.state.next({...s}))},clearErrors:e=>{e&&ye(e).forEach((e=>C(s.errors,e))),c.state.next({errors:e?s.errors:{}})},unregister:$,setError:I,setFocus:(e,t={})=>{const r=f(a,e),s=r&&r._f;if(s){const e=s.refs?s.refs[0]:s.ref;e.focus&&(e.focus(),t.shouldSelect&&G(e.select)&&e.select())}},getFieldState:R}}function vr(e={}){const t=A.useRef(void 0),r=A.useRef(void 0),[s,a]=A.useState({isDirty:!1,isValidating:!1,isLoading:G(e.defaultValues),isSubmitted:!1,isSubmitting:!1,isSubmitSuccessful:!1,isValid:!1,submitCount:0,dirtyFields:{},touchedFields:{},validatingFields:{},errors:e.errors||{},disabled:e.disabled||!1,defaultValues:G(e.defaultValues)?void 0:e.defaultValues});t.current||(t.current={...Zt(e),formState:s});const i=t.current.control;return i._options=e,Oe({subject:i._subjects.state,next:e=>{ft(e,i._proxyFormState,i._updateFormState,!0)&&a({...i._formState})}}),A.useEffect((()=>i._disableForm(e.disabled)),[i,e.disabled]),A.useEffect((()=>{if(i._proxyFormState.isDirty){const e=i._getDirty();e!==s.isDirty&&i._subjects.state.next({isDirty:e})}}),[i,s.isDirty]),A.useEffect((()=>{e.values&&!re(e.values,r.current)?(i._reset(e.values,i._options.resetOptions),r.current=e.values,a((e=>({...e})))):i._resetDefaultValues()}),[e.values,i]),A.useEffect((()=>{e.errors&&i._setErrors(e.errors)}),[e.errors,i]),A.useEffect((()=>{i._state.mount||(i._updateValid(),i._state.mount=!0),i._state.watch&&(i._state.watch=!1,i._subjects.state.next({...i._formState})),i._removeUnmounted()})),A.useEffect((()=>{e.shouldUnregister&&i._subjects.values.next({values:i._getWatch()})}),[e.shouldUnregister,i]),t.current.formState=dt(s,i),t.current}var er="Label",Ft=$.forwardRef(((e,t)=>J.jsx(Nt.label,{...e,ref:t,onMouseDown:t=>{t.target.closest("button, input, select, textarea")||(e.onMouseDown?.(t),!t.defaultPrevented&&t.detail>1&&t.preventDefault())}})));Ft.displayName=er;var xt=Ft;const tr=Tt("text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"),Vt=$.forwardRef((({className:e,...t},r)=>J.jsx(xt,{ref:r,className:he(tr(),e),...t})));Vt.displayName=xt.displayName;const mr=Ot,At=$.createContext({});function _r({...e}){return J.jsx(At.Provider,{value:{name:e.name},children:J.jsx(jt,{...e})})}const Se=()=>{const e=$.useContext(At),t=$.useContext(wt),{getFieldState:r,formState:s}=De(),a=r(e.name,s);if(!e)throw new Error("useFormField should be used within <FormField>");const{id:i}=t;return{id:i,name:e.name,formItemId:`${i}-form-item`,formDescriptionId:`${i}-form-item-description`,formMessageId:`${i}-form-item-message`,...a}},wt=$.createContext({}),rr=$.forwardRef((({className:e,...t},r)=>{const s=$.useId();return J.jsx(wt.Provider,{value:{id:s},children:J.jsx("div",{ref:r,className:he("space-y-2",e),...t})})}));rr.displayName="FormItem";const sr=$.forwardRef((({className:e,...t},r)=>{const{error:s,formItemId:a}=Se();return J.jsx(Vt,{ref:r,className:he(s&&"text-destructive",e),htmlFor:a,...t})}));sr.displayName="FormLabel";const ir=$.forwardRef((({...e},t)=>{const{error:r,formItemId:s,formDescriptionId:a,formMessageId:i}=Se();return J.jsx(Rt,{ref:t,"aria-describedby":r?`${a} ${i}`:`${a}`,"aria-invalid":!!r,id:s,...e})}));ir.displayName="FormControl";const ar=$.forwardRef((({className:e,...t},r)=>{const{formDescriptionId:s}=Se();return J.jsx("p",{ref:r,className:he("text-sm text-muted-foreground",e),id:s,...t})}));ar.displayName="FormDescription";const nr=$.forwardRef((({className:e,children:t,...r},s)=>{const{error:a,formMessageId:i}=Se(),n=a?String(a?.message):t;return n?J.jsx("p",{ref:s,className:he("text-sm font-medium text-destructive",e),id:i,...r,children:n}):null}));nr.displayName="FormMessage";export{mr as F,_r as a,rr as b,sr as c,ir as d,nr as e,qt as f,f as g,w as s,vr as u};