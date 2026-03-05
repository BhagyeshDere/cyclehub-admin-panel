"use client";

import { useState } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

type ReportOrder = {
id:number
customer:string
city:string
cycle:string
amount:number
date:string
}

export default function Reports(){

const [search,setSearch] = useState("");

const orders:ReportOrder[] = [

{ id:1, customer:"Rahul Sharma", city:"Mumbai", cycle:"Mountain X Pro", amount:25000, date:"12 Mar 2026" },

{ id:2, customer:"Amit Patil", city:"Pune", cycle:"Roadster 500", amount:18500, date:"10 Mar 2026" },

{ id:3, customer:"Sneha Joshi", city:"Delhi", cycle:"SpeedX Carbon", amount:42000, date:"8 Mar 2026" },

{ id:4, customer:"Rohit Verma", city:"Mumbai", cycle:"Urban Rider", amount:21000, date:"6 Mar 2026" },

{ id:5, customer:"Kiran Mehta", city:"Delhi", cycle:"Mountain X Pro", amount:25000, date:"5 Mar 2026" }

];

const filtered = orders.filter(o =>
o.customer.toLowerCase().includes(search.toLowerCase())
);

const totalRevenue = orders.reduce((acc,o)=>acc+o.amount,0);
const avgOrder = Math.round(totalRevenue / orders.length);

const cities = Array.from(new Set(orders.map(o=>o.city)));

return(

<div className="flex h-screen bg-white">

<Sidebar/>

<main className="flex-1 overflow-y-auto">

<Header/>

<div className="p-8 space-y-8">

{/* PAGE HEADER */}

<div>

<h2 className="text-3xl font-bold text-black">
Sales Reports
</h2>

<p className="text-black">
Analyze sales performance and business insights
</p>

</div>


{/* ANALYTICS CARDS */}

<div className="grid grid-cols-4 gap-6">

<Card title="Total Revenue" value={`₹${totalRevenue}`}/>

<Card title="Total Orders" value={orders.length}/>

<Card title="Customers" value={orders.length}/>

<Card title="Avg Order Value" value={`₹${avgOrder}`}/>

</div>


{/* SALES CHART */}

<div className="border border-black p-6 rounded-xl">

<h3 className="text-xl font-bold text-black mb-4">
Revenue Analytics
</h3>

<div className="flex items-end gap-6 h-44">

{orders.map((o,i)=>(
<div key={i} className="flex flex-col items-center">

<div
className="bg-black w-12 rounded"
style={{height:o.amount/300}}
></div>

<p className="text-xs text-black mt-2">
{o.customer.split(" ")[0]}
</p>

</div>
))}

</div>

</div>


{/* SEARCH */}

<input
type="text"
placeholder="Search report..."
value={search}
onChange={(e)=>setSearch(e.target.value)}
className="border border-black px-4 py-2 rounded-lg w-80 text-black placeholder-black"
/>


{/* SALES TABLE */}

<div className="border border-black rounded-xl overflow-hidden">

<table className="w-full">

<thead className="bg-black text-white">

<tr>

<th className="p-4 text-left">Customer</th>
<th className="text-left">City</th>
<th className="text-left">Cycle</th>
<th className="text-left">Amount</th>
<th className="text-left">Date</th>

</tr>

</thead>

<tbody>

{filtered.map(order=>(

<tr key={order.id} className="border-t border-black hover:bg-blue-50">

<td className="p-4 text-black">{order.customer}</td>

<td className="text-black">{order.city}</td>

<td className="text-black">{order.cycle}</td>

<td className="text-black font-semibold">
₹{order.amount}
</td>

<td className="text-black">{order.date}</td>

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


{/* CITY SALES */}

<div className="border border-black p-6 rounded-xl">

<h3 className="text-xl font-bold text-black mb-4">
Sales by City
</h3>

{cities.map(city=>{

const count = orders.filter(o=>o.city===city).length;

return(

<div key={city} className="flex justify-between border-b border-black py-2">

<span className="text-black">{city}</span>

<span className="text-black font-semibold">
{count} Orders
</span>

</div>

)

})}

</div>


{/* EXPORT */}

<button
className="bg-black text-white px-6 py-3 rounded-lg"
>
Export Reports
</button>

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