"use client";

import { useState } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

type Product = {
id:number
name:string
sku:string
current:number
reserved:number
threshold:number
image:string
}

type History = {
product:string
added:number
removed:number
date:string
updatedBy:string
}

export default function Inventory(){

const [products,setProducts] = useState<Product[]>([
{
id:1,
name:"Mountain Pro X1",
sku:"MTB-X1-001",
current:42,
reserved:5,
threshold:10,
image:"https://images.unsplash.com/photo-1518655048521-f130df041f66"
},
{
id:2,
name:"Street Racer Elite",
sku:"SR-EL-021",
current:12,
reserved:8,
threshold:10,
image:"https://images.unsplash.com/photo-1485965120184-e220f721d03e"
},
{
id:3,
name:"Electric City S2",
sku:"EC-S2-301",
current:8,
reserved:2,
threshold:10,
image:"https://images.unsplash.com/photo-1571333250630-f0230c320b6d"
}
])

const [history,setHistory] = useState<History[]>([])

/* ADD STOCK */

function addStock(id:number){

const qty = Number(prompt("Enter stock quantity to ADD"))

if(!qty) return

setProducts(prev =>
prev.map(p=>{

if(p.id===id){

setHistory(h=>[
{
product:p.name,
added:qty,
removed:0,
date:new Date().toLocaleString(),
updatedBy:"Admin"
},
...h
])

return {...p,current:p.current+qty}

}

return p

})
)

}

/* REMOVE STOCK */

function removeStock(id:number){

const qty = Number(prompt("Enter stock quantity to REMOVE"))

if(!qty) return

setProducts(prev =>
prev.map(p=>{

if(p.id===id){

setHistory(h=>[
{
product:p.name,
added:0,
removed:qty,
date:new Date().toLocaleString(),
updatedBy:"Admin"
},
...h
])

return {...p,current:p.current-qty}

}

return p

})
)

}

const lowStock = products.filter(
p => p.current - p.reserved < p.threshold
)

return(

<div className="flex bg-gray-100 min-h-screen">

<Sidebar/>

<div className="flex-1">

<Header/>

<div className="p-8 space-y-8">

{/* LOW STOCK ALERT */}

{lowStock.length > 0 && (

<div className="bg-red-50 border border-red-200 p-5 rounded-xl flex justify-between items-center">

<div>

<h3 className="text-red-700 font-semibold">
Low Stock Alert
</h3>

<p className="text-red-600 text-sm">
{lowStock.length} items are below safety threshold
</p>

</div>

<button className="bg-red-600 text-white px-4 py-2 rounded-lg">
Replenish Now
</button>

</div>

)}

{/* STOCK LIST */}

<div>

<div className="flex justify-between mb-6">

<h2 className="text-xl font-semibold text-black">
Stock List
</h2>

<span className="bg-gray-300 text-gray-800 text-xs px-3 py-1 rounded">
{products.length} Total Items
</span>

</div>

<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

{products.map(product=>{

const available = product.current - product.reserved
const isLow = available < product.threshold

return(

<div
key={product.id}
className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm"
>

<div className="flex gap-4">

<img
src={product.image}
className="w-16 h-16 rounded-lg object-cover"
/>

<div>

<h3 className="font-semibold text-gray-900">
{product.name}
</h3>

<p className="text-xs text-gray-700">
SKU: {product.sku}
</p>

</div>

</div>

<div className="grid grid-cols-3 mt-5 text-sm">

<div>

<p className="text-gray-700 text-xs">
Current
</p>

<p className="font-semibold text-black">
{product.current}
</p>

</div>

<div>

<p className="text-gray-700 text-xs">
Reserved
</p>

<p className="font-semibold text-black">
{product.reserved}
</p>

</div>

<div>

<p className="text-gray-700 text-xs">
Available
</p>

<p className={`font-semibold ${
isLow ? "text-red-600" : "text-black"
}`}>
{available}
</p>

</div>

</div>

{/* STOCK UPDATE */}

<div className="flex gap-2 mt-5">

<button
onClick={()=>removeStock(product.id)}
className="flex-1 border border-gray-300 text-black rounded-lg py-2 hover:bg-gray-200"
>
Remove
</button>

<button
onClick={()=>addStock(product.id)}
className="flex-1 bg-black text-white rounded-lg py-2"
>
Add Stock
</button>

</div>

</div>

)

})}

</div>

</div>

{/* STOCK HISTORY */}

<div>

<h2 className="text-xl font-semibold mb-4 text-black">
Stock History
</h2>

<div className="bg-white border border-gray-200 rounded-xl overflow-hidden">

<table className="w-full text-sm">

<thead className="bg-gray-100 border-b">

<tr>

<th className="text-left p-3 text-gray-800">Product</th>
<th className="text-left p-3 text-gray-800">Stock Added</th>
<th className="text-left p-3 text-gray-800">Stock Removed</th>
<th className="text-left p-3 text-gray-800">Date</th>
<th className="text-left p-3 text-gray-800">Updated By</th>

</tr>

</thead>

<tbody>

{history.length===0 &&(

<tr>

<td colSpan={5} className="p-6 text-center text-gray-600">
No stock history yet
</td>

</tr>

)}

{history.map((h,i)=>(

<tr key={i} className="border-b">

<td className="p-3 text-gray-900">{h.product}</td>

<td className="p-3 text-green-600">
{h.added || "-"}
</td>

<td className="p-3 text-red-600">
{h.removed || "-"}
</td>

<td className="p-3 text-gray-800">{h.date}</td>

<td className="p-3 text-gray-800">{h.updatedBy}</td>

</tr>

))}

</tbody>

</table>

</div>

</div>

</div>

</div>

</div>

)

}