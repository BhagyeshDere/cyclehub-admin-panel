"use client";

import { useState,useEffect } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

import {
LineChart,
Line,
XAxis,
YAxis,
Tooltip,
ResponsiveContainer,
BarChart,
Bar
} from "recharts";

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
type:"Customer" | "Wholesaler"
}

export default function Users(){

const [search,setSearch] = useState("");
const [selectedOrder,setSelectedOrder] = useState<Order | null>(null);
const [sort,setSort] = useState("none");
const [orderType,setOrderType] = useState("All");
const [notifications,setNotifications] = useState<string[]>([]);

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
type:"Customer"
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
type:"Customer"
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
type:"Wholesaler"
},
{
id:4,
customer:"Rohit Traders",
email:"rohit@cyclemart.com",
cycle:"Urban Rider",
amount:60000,
date:"7 Mar 2026",
status:"Processing",
payment:"Paid",
avatar:"https://i.pravatar.cc/40?img=4",
type:"Wholesaler"
}
];

let filteredOrders = orders
.filter(order =>
order.customer.toLowerCase().includes(search.toLowerCase())
)
.filter(order =>
orderType==="All" ? true : order.type===orderType
);

if(sort==="amount"){
filteredOrders=[...filteredOrders].sort((a,b)=>b.amount-a.amount);
}

if(sort==="status"){
filteredOrders=[...filteredOrders].sort((a,b)=>a.status.localeCompare(b.status));
}

const totalRevenue = orders.reduce((acc,o)=>acc+o.amount,0);

/* CUSTOMER ANALYTICS */

const customersDay = 12;
const customersMonth = 320;
const customersYear = 4200;

/* WHOLESALER ANALYTICS */

const wholesalersDay = 2;
const wholesalersMonth = 35;
const wholesalersYear = 400;

/* CHART DATA */

const customerGrowth=[
{name:"Jan",customers:200},
{name:"Feb",customers:400},
{name:"Mar",customers:650},
{name:"Apr",customers:900},
{name:"May",customers:1200},
{name:"Jun",customers:1500}
];

const wholesalerGrowth=[
{name:"Jan",wholesalers:20},
{name:"Feb",wholesalers:35},
{name:"Mar",wholesalers:50},
{name:"Apr",wholesalers:70},
{name:"May",wholesalers:95},
{name:"Jun",wholesalers:120}
];

const revenueForecast=[
{name:"Jul",revenue:38000},
{name:"Aug",revenue:42000},
{name:"Sep",revenue:46000},
{name:"Oct",revenue:51000},
{name:"Nov",revenue:58000}
];

const heatmapData=[
{name:"Mon",orders:10},
{name:"Tue",orders:25},
{name:"Wed",orders:18},
{name:"Thu",orders:30},
{name:"Fri",orders:22},
{name:"Sat",orders:40},
{name:"Sun",orders:35}
];

/* REAL TIME NOTIFICATIONS */

useEffect(()=>{

const interval=setInterval(()=>{

const randomCustomer=["Rohit","Karan","Vikram","Neha","Pooja"];

const newOrder=`${randomCustomer[Math.floor(Math.random()*5)]} placed a new order`;

setNotifications(prev=>[newOrder,...prev.slice(0,4)])

},5000)

return ()=>clearInterval(interval)

},[])

return(

<div className="flex h-screen bg-white">

<Sidebar/>

<main className="flex-1 overflow-y-auto">

<Header/>

<div className="p-8 space-y-8">

{/* HEADER */}

<div>
<h2 className="text-3xl font-bold text-black">
Orders Dashboard
</h2>
<p className="text-black">
Customers who purchased cycles
</p>
</div>


{/* ANALYTICS CARDS */}

<div className="grid grid-cols-4 gap-6">

<div className="border border-black p-6 rounded-xl">
<p className="text-black">Total Orders</p>
<h3 className="text-2xl font-bold text-black">{orders.length}</h3>
</div>

<div className="border border-black p-6 rounded-xl">
<p className="text-black">Revenue</p>
<h3 className="text-2xl font-bold text-black">₹{totalRevenue}</h3>
</div>

<div className="border border-black p-6 rounded-xl">
<p className="text-black">Delivered</p>
<h3 className="text-2xl font-bold text-black">
{orders.filter(o=>o.status==="Delivered").length}
</h3>
</div>

<div className="border border-black p-6 rounded-xl">
<p className="text-black">Pending</p>
<h3 className="text-2xl font-bold text-black">
{orders.filter(o=>o.status!=="Delivered").length}
</h3>
</div>

</div>


{/* SEARCH + SORT + TYPE FILTER */}

<div className="flex gap-4">

<input
type="text"
placeholder="Search customer..."
className="border border-black text-black placeholder-black px-4 py-2 rounded-lg w-80"
value={search}
onChange={(e)=>setSearch(e.target.value)}
/>

<select
className="border border-black px-3 py-2 rounded"
onChange={(e)=>setSort(e.target.value)}
>

<option value="none">Sort</option>
<option value="amount">Amount</option>
<option value="status">Status</option>

</select>

<select
className="border border-black px-3 py-2 rounded"
onChange={(e)=>setOrderType(e.target.value)}
>

<option value="All">All Orders</option>
<option value="Customer">Customer Orders</option>
<option value="Wholesaler">Wholesaler Orders</option>

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
<th className="text-left">Status</th>
<th className="text-left">Payment</th>
<th className="text-left">Action</th>
</tr>

</thead>

<tbody>

{filteredOrders.map(order=>(

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
{order.type}
</td>

<td className="text-black">{order.cycle}</td>

<td className="text-black">₹{order.amount}</td>

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
onClick={()=>setSelectedOrder(order)}
>
View
</button>

</td>

</tr>

))}

</tbody>

</table>

</div>

</div>

</main>

</div>

)

}