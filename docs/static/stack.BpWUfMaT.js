import{j as e}from"./jsx-runtime.EKYJJIwR.js";import{r as f}from"./index.DrxKNVES.js";import{D as b,s as v,a as n,C as h,A as y,b as w,c as C,d as k,e as T,f as D,g as N,h as A,i as E}from"./alert-dialog.BtDjhMo0.js";import{B as S}from"./button.x7-QiqwQ.js";import{I as R}from"./input.BtdTvaem.js";import{T as c,a as d,b as m,c as p}from"./tooltip.CS3QOdkF.js";import{S as g,b as x}from"./transcriptions.BDQUoU-M.js";import{a as P,h as z,b as K}from"./toast-handler.Ct0WAJ7j.js";import{a as u,i as B}from"./is-defined.BPY7jSh6.js";import{u as I}from"./use-toast.BikYzejn.js";import{P as H}from"./plus.CAt6JUe3.js";import{E as M,T as _}from"./trash.C19WQqkW.js";import{P as F}from"./pen.CrEsg7t5.js";import"./index.BLEmuFXE.js";import"./classnames.B8F8Dq1p.js";import"./select.BKrJ3BO-.js";import"./index.rqUiOy30.js";import"./index.B2LyIUNT.js";import"./index.BJknnQuW.js";import"./index.qJiwp9Ip.js";import"./index.CoUN5iVw.js";import"./index.1JkRN11X.js";import"./index.Ca4aSXhd.js";import"./index.yusZEH1f.js";import"./index.2EOGNVNh.js";import"./Combination.CoL-rreF.js";import"./index.BRpELbpY.js";import"./index.CGPvhYpy.js";import"./index.CdA-AeYO.js";import"./index.wLl3Idx7.js";import"./chevrons-up-down.BMPs55cN.js";import"./createLucideIcon.D2R2PR3o.js";import"./chevron-down.DmgAbkcx.js";import"./chevron-right.CVrw0MJX.js";import"./index.CwYy1fy-.js";import"./dropdown-menu.CLGLWY-8.js";import"./x.DYFGPTRN.js";import"./index.BZXvyPAu.js";import"./index.Li38iYKq.js";import"./env.Bik-fSFe.js";import"./dev-console-log.CInb5xbI.js";import"./index.CdM0oSJi.js";import"./message-display.CI2NEmxy.js";async function O(e){try{const{data:s}=await P.delete("/api/stack",{data:e});return s}catch(e){throw z({error:e,defaultErrorMessage:"No se pudo eliminar el stack."})}}const V=[v(),{id:"name",accessorKey:"name",header:({column:s})=>e.jsx(n,{column:s,title:"Nombre"})},{id:"key",accessorKey:"key",header:({column:s})=>e.jsx(n,{column:s,title:"Key"})},{id:"description",accessorKey:"description",header:({column:s})=>e.jsx(n,{column:s,title:"Descripción"})},{id:"category",accessorKey:"category",header:({column:s})=>e.jsx(n,{column:s,title:"Categoria"}),cell:({row:e})=>u(e.original?.category)||!(e.original?.category in g)?"Sin categoría":g[e.original.category]},{id:"type",accessorKey:"type",header:({column:s})=>e.jsx(n,{column:s,title:"Tipo"}),cell:({row:e})=>u(e.original?.type)||!(e.original?.type in x)?"Sin categoría":x[e.original.type]}];function ze({data:s}){const[i,r]=f.useState(s);return e.jsx(b,{HeaderComponent:Y,columns:V,data:i,meta:{deleteRows:e=>{r((s=>s.filter(((s,i)=>!e.includes(i)))))}}})}function Y({table:s}){const{toast:i}=I(),r=s.getSelectedRowModel(),{rows:t,selectedCount:o}=f.useMemo((()=>({...r,selectedCount:r.rows.length??0})),[r]),a=async()=>{try{await O(t.map((e=>e.original.id))),i({title:"Colaboradores eliminados",description:"Los stack seleccionados se han eliminado correctamente.",className:"bg-green-500 text-black"}),B(s.options.meta?.deleteRows)&&s.options.meta.deleteRows(t.map((e=>e.index))),s.setRowSelection({})}catch(e){K({error:e,title:"Error al eliminar los stack",defaultErrorMessage:"Ha ocurrido un error al intentar eliminar los stacks seleccionados.",tryAgain:()=>a()})}};return e.jsxs("div",{className:"flex items-center py-4",children:[e.jsx(R,{autoComplete:"off",className:"max-w-xs",placeholder:"Buscar por nombre...",value:s.getColumn("name")?.getFilterValue()??"",onChange:e=>s.getColumn("name")?.setFilterValue(e.target.value)}),e.jsxs("ul",{className:"ml-auto flex items-center space-x-2",children:[e.jsx("li",{children:e.jsx(c,{children:e.jsxs(d,{delayDuration:0,children:[e.jsx(m,{asChild:!0,children:e.jsx(h,{className:"inline-flex size-max items-center justify-center whitespace-nowrap rounded-full bg-lime-600 p-2 text-sm font-medium text-white ring-offset-background transition-colors hover:bg-lime-700 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 dark:text-white dark:hover:bg-lime-500",disabled:0!==o,disabledButtonProps:{className:"pointer-events-none opacity-50"},href:"/vault/views/stack/create",children:e.jsx(H,{className:"size-5"})})}),e.jsx(p,{children:"Crear"})]})})}),e.jsx("li",{children:e.jsx(c,{children:e.jsxs(d,{delayDuration:0,children:[e.jsx(m,{asChild:!0,children:e.jsx(h,{className:"inline-flex size-max items-center justify-center whitespace-nowrap rounded-full bg-blue-600 p-2 text-sm font-medium text-white ring-offset-background transition-colors hover:bg-blue-700 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 dark:text-white dark:hover:bg-blue-500",disabled:1!==o||u(t[0]?.original.id),disabledButtonProps:{className:"pointer-events-none opacity-50"},href:`/vault/views/stack/${t[0]?.original.id}`,children:e.jsx(M,{className:"size-5"})})}),e.jsx(p,{children:"Ver detalles"})]})})}),e.jsx("li",{children:e.jsx(c,{children:e.jsxs(d,{delayDuration:0,children:[e.jsx(m,{asChild:!0,children:e.jsx(h,{className:"inline-flex size-max items-center justify-center whitespace-nowrap rounded-full bg-gray-600 p-2 text-sm font-medium text-white ring-offset-background transition-colors hover:bg-gray-700 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 dark:text-white dark:hover:bg-gray-500",disabled:1!==o||u(t[0]?.original.id),disabledButtonProps:{className:"pointer-events-none opacity-50"},href:`/vault/views/stack/${t[0]?.original.id}/edit`,children:e.jsx(F,{className:"size-5"})})}),e.jsx(p,{children:"Editar"})]})})}),e.jsx("li",{children:e.jsxs(y,{children:[e.jsx(w,{disabled:o<=0,children:e.jsx(c,{children:e.jsxs(d,{delayDuration:0,children:[e.jsx(m,{asChild:!0,children:e.jsx(S,{className:"size-max rounded-full bg-red-500 p-2 text-white hover:bg-red-600 hover:text-white dark:text-white dark:hover:bg-red-400",disabled:o<=0,variant:"outline",children:e.jsx(_,{className:"size-5"})})}),e.jsx(p,{children:"Eliminar"})]})})}),e.jsxs(C,{children:[e.jsxs(k,{children:[e.jsx(T,{children:"¿Está completamente seguro?"}),e.jsx(D,{children:"Esta acción no se puede deshacer. Esto borrará permanentemente el/los stacks seleccionados."})]}),e.jsxs(N,{children:[e.jsx(A,{children:"Cancelar"}),e.jsx(E,{className:"bg-red-500 text-white hover:bg-red-600 hover:text-white dark:text-white dark:hover:bg-red-400",onClick:a,children:"Borrar"})]})]})]})})]})]})}export{ze as StackTable};