"use client";

import { useState } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

type Order = {
id:number
customer:string
email:string
cycle:string
amount:number
date:string
status:string
payment:string
avatar:string
role:"Customer" | "Wholesaler"
}

export default function Orders(){

const [search,setSearch] = useState("");
const [statusFilter,setStatusFilter] = useState("All");
const [roleFilter,setRoleFilter] = useState("All");
const [selected,setSelected] = useState<Order | null>(null);

const orders:Order[] = [

{
id:1,
customer:"Rahul Sharma",
email:"rahul@gmail.com",
cycle:"Mountain X Pro",
amount:25000,
date:"12 Mar 2026",
status:"Delivered",
payment:"Paid",
avatar:"https://i.pravatar.cc/40?img=1",
role:"Customer"
},

{
id:2,
customer:"Amit Patil",
email:"amit@gmail.com",
cycle:"Roadster 500",
amount:18500,
date:"10 Mar 2026",
status:"Processing",
payment:"Pending",
avatar:"https://i.pravatar.cc/40?img=2",
role:"Customer"
},

{
id:3,
customer:"Sneha Joshi",
email:"sneha@gmail.com",
cycle:"SpeedX Carbon",
amount:42000,
date:"8 Mar 2026",
status:"Shipped",
payment:"Paid",
avatar:"https://i.pravatar.cc/40?img=3",
role:"Wholesaler"
},

{
id:4,
customer:"Rohit Verma",
email:"rohit@gmail.com",
cycle:"Urban Rider",
amount:21000,
date:"7 Mar 2026",
status:"Delivered",
payment:"Paid",
avatar:"https://i.pravatar.cc/40?img=4",
role:"Wholesaler"
}

];

const filtered = orders
.filter(o=>o.customer.toLowerCase().includes(search.toLowerCase()))
.filter(o=>statusFilter==="All" ? true : o.status===statusFilter)
.filter(o=>roleFilter==="All" ? true : o.role===roleFilter);

const totalRevenue = orders.reduce((acc,o)=>acc+o.amount,0);

return(

<div className="flex h-screen bg-white">

<Sidebar/>

<main className="flex-1 overflow-y-auto">

<Header/>

<div className="p-8 space-y-8">

{/* PAGE HEADER */}

<div>

<h2 className="text-3xl font-bold text-black">
Orders Management
</h2>

<p className="text-black">
Track customer orders and deliveries
</p>

</div>


{/* ANALYTICS CARDS */}

<div className="grid grid-cols-4 gap-6">

<Card title="Total Orders" value={orders.length}/>

<Card title="Revenue" value={`₹${totalRevenue}`}/>

<Card 
title="Delivered"
value={orders.filter(o=>o.status==="Delivered").length}
/>

<Card 
title="Pending"
value={orders.filter(o=>o.status!=="Delivered").length}
/>

</div>


{/* REVENUE CHART */}

<div className="border border-black p-6 rounded-xl">

<h3 className="text-xl font-bold text-black mb-4">
Revenue Analytics
</h3>

<div className="flex gap-6 items-end h-44">

{orders.map((o,i)=>(
<div key={i} className="flex flex-col items-center">

<div
className="bg-black w-10 rounded"
style={{height:o.amount/300}}
></div>

<p className="text-xs text-black mt-2">
{o.customer.split(" ")[0]}
</p>

</div>
))}

</div>

</div>


{/* SEARCH + FILTER */}

<div className="flex gap-4">

<input
type="text"
placeholder="Search customer..."
value={search}
onChange={(e)=>setSearch(e.target.value)}
className="border border-black px-4 py-2 rounded-lg w-80 text-black placeholder-black"
/>

<select
value={statusFilter}
onChange={(e)=>setStatusFilter(e.target.value)}
className="border border-black px-4 py-2 rounded-lg text-black"
>

<option>All</option>
<option>Delivered</option>
<option>Processing</option>
<option>Shipped</option>

</select>

{/* NEW ROLE FILTER */}

<select
value={roleFilter}
onChange={(e)=>setRoleFilter(e.target.value)}
className="border border-black px-4 py-2 rounded-lg text-black"
>

<option>All</option>
<option>Customer</option>
<option>Wholesaler</option>

</select>

</div>


{/* ORDERS TABLE */}

<div className="border border-black rounded-xl overflow-hidden">

<table className="w-full">

<thead className="bg-black text-white">

<tr>

<th className="p-4 text-left">Customer</th>
<th className="text-left">Type</th>
<th className="text-left">Cycle</th>
<th className="text-left">Amount</th>
<th className="text-left">Date</th>
<th className="text-left">Status</th>
<th className="text-left">Payment</th>
<th className="text-left">Action</th>

</tr>

</thead>

<tbody>

{filtered.map(order=>(

<tr key={order.id} className="border-t border-black hover:bg-blue-50">

<td className="p-4 flex items-center gap-3">

<img
src={order.avatar}
className="w-10 h-10 rounded-full"
/>

<div>

<p className="font-semibold text-black">
{order.customer}
</p>

<p className="text-sm text-black">
{order.email}
</p>

</div>

</td>

<td className="text-black font-semibold">
{order.role}
</td>

<td className="text-black">{order.cycle}</td>

<td className="text-black">₹{order.amount}</td>

<td className="text-black">{order.date}</td>

<td>

<span className={`px-3 py-1 rounded-full text-xs text-black ${
order.status==="Delivered"
?"bg-green-300"
:order.status==="Shipped"
?"bg-blue-300"
:"bg-yellow-300"
}`}>
{order.status}
</span>

</td>

<td>

<span className={`px-3 py-1 rounded-full text-xs text-black ${
order.payment==="Paid"
?"bg-green-300"
:"bg-red-300"
}`}>
{order.payment}
</span>

</td>

<td>

<button
className="text-blue-700 font-semibold"
onClick={()=>setSelected(order)}
>
View
</button>

</td>

</tr>

))}

</tbody>

</table>

</div>


{/* TOP SELLING CYCLES */}

<div className="border border-black p-6 rounded-xl">

<h3 className="text-xl font-bold text-black mb-4">
Top Selling Cycles
</h3>

<ul className="space-y-2 text-black">

<li>🚴 Mountain X Pro</li>
<li>🚴 SpeedX Carbon</li>
<li>🚴 Roadster 500</li>
<li>🚴 Urban Rider</li>

</ul>

</div>


{/* ORDER DETAILS DRAWER */}

{selected && (

<div className="fixed inset-0 bg-black/40 flex justify-end">

<div className="bg-white w-96 h-full p-6 space-y-6">

<h3 className="text-xl font-bold text-black">
Order Details
</h3>

<Detail label="Customer" value={selected.customer}/>
<Detail label="Type" value={selected.role}/>
<Detail label="Email" value={selected.email}/>
<Detail label="Cycle" value={selected.cycle}/>
<Detail label="Amount" value={`₹${selected.amount}`}/>
<Detail label="Status" value={selected.status}/>
<Detail label="Payment" value={selected.payment}/>
<Detail label="Date" value={selected.date}/>

<div>

<h4 className="font-bold text-black mb-2">
Order Timeline
</h4>

<ul className="space-y-2 text-sm text-black">

<li>📦 Order Placed</li>
<li>🚚 Shipped</li>
<li>🏠 Delivered</li>

</ul>

</div>

<button
onClick={()=>setSelected(null)}
className="bg-black text-white px-4 py-2 rounded"
>
Close
</button>

</div>

</div>

)}

</div>

</main>

</div>

)

}


function Card({title,value}:any){

return(

<div className="border border-black p-6 rounded-xl">

<p className="text-black">
{title}
</p>

<h3 className="text-2xl font-bold text-black">
{value}
</h3>

</div>

)

}


function Detail({label,value}:any){

return(

<div>

<p className="text-sm text-black">
{label}
</p>

<p className="font-semibold text-black">
{value}
</p>

</div>

)

}