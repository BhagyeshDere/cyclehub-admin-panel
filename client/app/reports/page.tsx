"use client";

import { useState } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

import {
BarChart,
Bar,
XAxis,
YAxis,
Tooltip,
ResponsiveContainer,
LineChart,
Line
} from "recharts";

type ReportOrder = {
id:number
customer:string
city:string
cycle:string
amount:number
date:string
type:"Customer" | "Wholesaler"
}

export default function Reports(){

const [search,setSearch] = useState("");
const [startDate,setStartDate] = useState("");
const [endDate,setEndDate] = useState("");

const orders:ReportOrder[] = [

{ id:1, customer:"Rahul Sharma", city:"Mumbai", cycle:"Mountain X Pro", amount:25000, date:"2026-03-12", type:"Customer" },

{ id:2, customer:"Amit Patil", city:"Pune", cycle:"Roadster 500", amount:18500, date:"2026-03-10", type:"Customer" },

{ id:3, customer:"Sneha Joshi", city:"Delhi", cycle:"SpeedX Carbon", amount:42000, date:"2026-03-08", type:"Customer" },

{ id:4, customer:"Rohit Verma", city:"Mumbai", cycle:"Urban Rider", amount:21000, date:"2026-03-06", type:"Customer" },

{ id:5, customer:"Kiran Mehta", city:"Delhi", cycle:"Mountain X Pro", amount:25000, date:"2026-03-05", type:"Customer" },

{ id:6, customer:"BikeWorld Traders", city:"Mumbai", cycle:"Mountain X Pro", amount:80000, date:"2026-03-04", type:"Wholesaler" },

{ id:7, customer:"CycleHub Dealers", city:"Delhi", cycle:"Roadster 500", amount:120000, date:"2026-03-02", type:"Wholesaler" }

];

let filtered = orders.filter(o =>
o.customer.toLowerCase().includes(search.toLowerCase())
);

/* DATE RANGE FILTER */

if(startDate && endDate){
filtered = filtered.filter(o=>{
const d = new Date(o.date);
return d >= new Date(startDate) && d <= new Date(endDate);
});
}

const totalRevenue = filtered.reduce((acc,o)=>acc+o.amount,0);
const avgOrder = Math.round(totalRevenue / (filtered.length || 1));

const cities = Array.from(new Set(orders.map(o=>o.city)));

/* REVENUE VS ORDERS CHART */

const revenueOrdersData = cities.map(city=>{
const cityOrders = orders.filter(o=>o.city===city);
return {
city,
orders:cityOrders.length,
revenue:cityOrders.reduce((a,b)=>a+b.amount,0)
}
});

/* AI SALES PREDICTION */

const aiPrediction = [
{ month:"Apr", revenue:260000 },
{ month:"May", revenue:310000 },
{ month:"Jun", revenue:380000 }
];

/* WHOLESALER LEADERBOARD */

const wholesalers = orders
.filter(o=>o.type==="Wholesaler")
.map(o=>({name:o.customer,amount:o.amount}))
.sort((a,b)=>b.amount-a.amount);

/* CITY HEATMAP */

const cityHeatmap = cities.map(city=>{
const count = orders.filter(o=>o.city===city).length;
return { city, orders:count };
});

/* CSV EXPORT */

function exportCSV(){

const headers = ["Customer","Type","City","Cycle","Amount","Date"];

const rows = orders.map(o=>[
o.customer,
o.type,
o.city,
o.cycle,
o.amount,
o.date
]);

let csv = headers.join(",") + "\n";

rows.forEach(r=>{
csv += r.join(",") + "\n";
});

const blob = new Blob([csv],{type:"text/csv"});
const url = window.URL.createObjectURL(blob);

const a = document.createElement("a");
a.href = url;
a.download = "sales-report.csv";
a.click();

}

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


{/* DATE RANGE */}

<div className="flex gap-4">

<input
type="date"
value={startDate}
onChange={(e)=>setStartDate(e.target.value)}
className="border border-black px-3 py-2 rounded"
/>

<input
type="date"
value={endDate}
onChange={(e)=>setEndDate(e.target.value)}
className="border border-black px-3 py-2 rounded"
/>

</div>


{/* ANALYTICS CARDS */}

<div className="grid grid-cols-4 gap-6">

<Card title="Total Revenue" value={`₹${totalRevenue}`}/>

<Card title="Total Orders" value={filtered.length}/>

<Card title="Customers" value={filtered.filter(o=>o.type==="Customer").length}/>

<Card title="Avg Order Value" value={`₹${avgOrder}`}/>

</div>


{/* INTERACTIVE REVENUE VS ORDERS */}

<div className="border border-black p-6 rounded-xl">

<h3 className="text-xl font-bold text-black mb-4">
Revenue vs Orders Chart
</h3>

<ResponsiveContainer width="100%" height={300}>

<BarChart data={revenueOrdersData}>

<XAxis dataKey="city"/>

<YAxis/>

<Tooltip/>

<Bar dataKey="revenue" fill="#000"/>

<Bar dataKey="orders" fill="#666"/>

</BarChart>

</ResponsiveContainer>

</div>


{/* AI SALES PREDICTION */}

<div className="border border-black p-6 rounded-xl">

<h3 className="text-xl font-bold text-black mb-4">
AI Sales Prediction
</h3>

<ResponsiveContainer width="100%" height={300}>

<LineChart data={aiPrediction}>

<XAxis dataKey="month"/>

<YAxis/>

<Tooltip/>

<Line dataKey="revenue" stroke="#000" strokeWidth={3}/>

</LineChart>

</ResponsiveContainer>

</div>


{/* TOP WHOLESALERS */}

<div className="border border-black p-6 rounded-xl">

<h3 className="text-xl font-bold text-black mb-4">
Top Wholesalers Leaderboard
</h3>

{wholesalers.map((w,i)=>(

<div key={i} className="flex justify-between border-b py-2">

<span className="text-black">{w.name}</span>

<span className="text-black font-semibold">₹{w.amount}</span>

</div>

))}

</div>


{/* CITY HEATMAP */}

<div className="border border-black p-6 rounded-xl">

<h3 className="text-xl font-bold text-black mb-4">
City Sales Heatmap
</h3>

<ResponsiveContainer width="100%" height={250}>

<BarChart data={cityHeatmap}>

<XAxis dataKey="city"/>

<YAxis/>

<Tooltip/>

<Bar dataKey="orders" fill="#000"/>

</BarChart>

</ResponsiveContainer>

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
<th className="text-left">Type</th>
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

<td className="text-black">{order.type}</td>

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


{/* EXPORT */}

<button
onClick={exportCSV}
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