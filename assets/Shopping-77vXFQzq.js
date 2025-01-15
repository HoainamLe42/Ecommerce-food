import{b as w,u,r as a,j as e,L as N,f as b,B as C,S,a as L,C as z}from"./index-CtOejRDY.js";import{A as g}from"./aos-_FsOWdfR.js";import{L as k}from"./loader-circle-CqQc1bLZ.js";/**
 * @license lucide-react v0.456.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const T=w("Star",[["path",{d:"M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z",key:"r04s7s"}]]),E=({id:t,name:i,image:c,price:d,type:s})=>{const{foods:n,increaseCartQuantity:o}=u(),[l,x]=a.useState(!1),m=n==null?void 0:n.find(p=>Number(p.id)===Number(t));return a.useEffect(()=>(g.init(),g.refresh(),()=>g.refresh()),[]),e.jsxs("div",{"data-aos":"zoom-in",className:"p-3 shadow-lg rounded-lg cursor-pointer transition-all duration-150 hover:scale-105 group relative",children:[e.jsxs("div",{className:"relative w-full h-56 rounded-md overflow-hidden",children:[!l&&e.jsxs("div",{className:"flex justify-center items-center h-full border overflow-hidden rounded-md",children:[e.jsx(k,{className:"animate-spin",color:"gray"}),e.jsx("p",{className:"text-secondary-text text-sm",children:"Loading..."})]}),e.jsx(N,{to:`/detail/${t}`,children:e.jsx("img",{src:c,alt:"",className:`h-full w-full mx-auto object-cover transition-opacity duration-300 ${l?"opacity-100":"opacity-0"}`,onLoad:()=>x(!0)})})]}),e.jsx("h3",{className:"text-xl capitalize font-bold mt-3",children:i}),e.jsx("p",{className:"text-secondary-text text-sm",children:s}),e.jsxs("p",{children:["Giá:"," ",e.jsx("span",{className:"text-lg font-semibold text-red-600",children:b(d)})]}),e.jsxs("div",{className:"flex items-center gap-2",children:[e.jsx("span",{className:"text-sm text-gray-500",children:"4.6"}),e.jsx(T,{size:"18",color:"red"})]}),e.jsx(C,{onClick:()=>o(Number(m==null?void 0:m.id)),className:"hidden group-hover:block transition-all duration-100 absolute right-5 bottom-5 p-2",children:e.jsx(S,{color:"white",size:"20"})})]})},f=[{id:1,name:"Burger",type:"Burger",image:"./images/category-product/pizza_img.png"},{id:2,name:"Pizza",type:"Pizza",image:"./images/category-product/sandwiches_img.png"},{id:3,name:"Sandwiches",type:"Sandwiches",image:"./images/category-product/sandwiches_img.png"},{id:4,name:"Gà rán",type:"chicken",image:"./images/category-product/wings_img.png"},{id:5,name:"Cà phê",type:"Coffee",image:"./images/category-product/coffee-tea_img.png"},{id:6,name:"Mì",type:"noodles",image:"./images/category-product/thai-food_img.png"},{id:7,name:"Fastfood",type:"Fast Food",image:"./images/category-product/american-food_img.png"}],P=()=>{const{selectedType:t,setSelectedType:i,selectedValue:c,setSelectedValue:d}=u();return e.jsxs("div",{className:"relative overflow-hidden flex justify-between",children:[e.jsxs("ul",{className:"md:flex hidden overflow-y-hidden items-center gap-9",children:[f.map(s=>e.jsxs("li",{onClick:()=>i(s.type),className:`flex flex-col items-center gap-2 cursor-pointer ${t===s.type?"text-primary":"text-inherit"}`,children:[e.jsx("div",{className:"h-16 w-16 flex items-center justify-center rounded-full bg-yellow-100",children:e.jsx("img",{src:s.image,alt:"",className:"h-7 w-7 object-cover cursor-pointer"})}),e.jsx("p",{className:"text-sm text-nowrap",children:s.name})]},s.id)),e.jsx("li",{className:`font-semibold text-nowrap cursor-pointer underline hover:text-primary hidden md:block ${t==="All"?"text-primary":"text-inherit"}`,onClick:()=>i("All"),children:"Tất cả"})]}),e.jsx("div",{className:"overflow-y-auto no-scrollbar",children:e.jsx("ul",{className:"md:hidden flex mx-auto overflow-y-auto items-center gap-9",children:f.map(s=>e.jsxs("li",{onClick:()=>i(s.type),className:`flex flex-col items-center justify-center gap-2 cursor-pointer ${t===s.type?"text-primary":"text-inherit"}`,children:[e.jsx("div",{className:"h-12 w-12 flex items-center justify-center rounded-full bg-yellow-100",children:e.jsx("img",{src:s.image,alt:"",className:"h-7 w-7 object-cover cursor-pointer"})}),e.jsx("p",{className:"font-semibold text-nowrap text-sm",children:s.name})]},s.id))})}),e.jsxs("div",{className:"lg:flex hidden items-end gap-5 pb-3 pr-3",children:[e.jsx("p",{className:"font-semibold",children:"Lọc:"})," ",e.jsx("div",{className:"p-1 border-[1px] border-gray-500 rounded-lg",children:e.jsxs("select",{value:c,onChange:s=>d(s.target.value),children:[e.jsx("option",{value:"all",children:"Tất cả"}),e.jsx("option",{value:"lowToHigh",children:"Giá cao đến thấp"}),e.jsx("option",{value:"highToLow",children:"Giá thấp đến cao"}),e.jsx("option",{value:"favourite",children:"Yêu thích"})]})})]})]})},I=()=>{const{filteredFoods:t,selectedType:i,setSelectedType:c,loading:d}=u(),[s,n]=a.useState(1),o=12,[l,x]=a.useState(window.innerWidth<640),[m,p]=a.useState([]);a.useEffect(()=>{const r=()=>{x(window.innerWidth<640)};return window.addEventListener("resize",r),()=>{window.removeEventListener("resize",r)}},[]);const j=Math.ceil(t.length/o);a.useEffect(()=>{n(1)},[t]);const y=t.slice((s-1)*o,s*o),v=r=>{n(r),window.scrollTo({top:0,behavior:"smooth"})};return a.useEffect(()=>{p(l?t:y)},[l,t]),e.jsx("div",{className:"bg-white",children:d?e.jsx(L,{}):e.jsx("div",{className:"py-10 md:pt-[120px] pt-[80px]",children:e.jsx(z,{children:e.jsxs("div",{children:[e.jsxs("div",{className:"w-full mb-5",children:[e.jsxs("div",{className:"flex justify-between",children:[e.jsx("h3",{className:"md:text-2xl text-xl font-semibold mb-2",children:"Danh sách món ăn"}),e.jsx("p",{className:`font-semibold text-nowrap cursor-pointer underline hover:text-primary md:hidden ${i==="All"?"text-primary":"text-inherit"}`,onClick:()=>c("All"),children:"Tất cả"})]}),e.jsx(P,{})]}),e.jsx("div",{className:`grid ${l?"sm:grid-cols-2 grid-cols-1":"lg:grid-cols-4 md:grid-cols-3"} gap-5`,children:m.map(r=>a.createElement(E,{...r,key:r.id}))}),t.length>o&&e.jsx("div",{className:`mt-7 flex ${l?"hidden":"flex"} gap-4`,children:Array.from({length:j},(r,h)=>e.jsx("button",{onClick:()=>v(h+1),className:`h-[44px] w-[44px] rounded-lg border-[1px] border-gray-400 ${s===h+1?"bg-primary text-white":""}`,children:h+1},h))})]})})})})};export{I as default};
