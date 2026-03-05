"use client";

import { useState } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

type Approved = {
id:string
name:string
email:string
phone:string
company:string
city:string
gst:string
orders:number
revenue:number
joined:string
avatar:string
}

export default function ApprovedRequests(){

const [search,setSearch] = useState("");
const [selected,setSelected] = useState<Approved | null>(null);

const wholesalers:Approved[] = [

{
id:"WS-2001",
name:"Rahul Sharma",
email:"rahul@cyclemart.com",
phone:"+91 9876543210",
company:"Cycle Mart Pvt Ltd",
city:"Mumbai",
gst:"27ABCDE1234F1Z5",
orders:45,
revenue:350000,
joined:"12 Feb 2026",
avatar:"https://i.pravatar.cc/40?img=1"
},

{
id:"WS-2002",
name:"Amit Patil",
email:"amit@bikeworld.com",
phone:"+91 9871234567",
company:"Bike World",
city:"Pune",
gst:"27FGHIJ5678K1Z2",
orders:32,
revenue:210000,
joined:"20 Feb 2026",
avatar:"https://i.pravatar.cc/40?img=2"
},

{
id:"WS-2003",
name:"Sneha Joshi",
email:"sneha@speedcycle.com",
phone:"+91 9988776655",
company:"Speed Cycle Store",
city:"Delhi",
gst:"07JKLMN4321Q1Z8",
orders:61,
revenue:480000,
joined:"5 Mar 2026",
avatar:"https://i.pravatar.cc/40?img=3"
}

];

const filtered = wholesalers.filter(w =>
w.name.toLowerCase().includes(search.toLowerCase())
);

const totalRevenue = wholesalers.reduce((acc,w)=>acc+w.revenue,0);

return(

<div className="flex h-screen bg-white">

<Sidebar/>

<main className="flex-1 overflow-y-auto">

<Header/>

<div className="p-8 space-y-8">

{/* PAGE HEADER */}

<div>

<h2 className="text-3xl font-bold text-black">
Approved Wholesalers
</h2>

<p className="text-black">
Wholesalers who are approved and selling cycles
</p>

</div>


{/* ANALYTICS */}

<div className="grid grid-cols-4 gap-6">

<Card title="Total Wholesalers" value={wholesalers.length}/>

<Card title="Total Orders" value={wholesalers.reduce((acc,w)=>acc+w.orders,0)}/>

<Card title="Total Revenue" value={`₹${totalRevenue}`}/>

<Card title="Active Cities" value={[...new Set(wholesalers.map(w=>w.city))].length}/>

</div>


{/* SEARCH */}

<input
type="text"
placeholder="Search wholesaler..."
value={search}
onChange={(e)=>setSearch(e.target.value)}
className="border border-black px-4 py-2 rounded-lg w-80 text-black placeholder-black"
/>


{/* TABLE */}

<div className="border border-black rounded-xl overflow-hidden">

<table className="w-full">

<thead className="bg-black text-white">

<tr>

<th className="p-4 text-left">Wholesaler</th>
<th className="text-left">Company</th>
<th className="text-left">City</th>
<th className="text-left">Orders</th>
<th className="text-left">Revenue</th>
<th className="text-left">Status</th>
<th className="text-left">Action</th>

</tr>

</thead>

<tbody>

{filtered.map(w=>(

<tr key={w.id} className="border-t border-black hover:bg-blue-50">

<td className="p-4 flex items-center gap-3">

<img
src={w.avatar}
className="w-10 h-10 rounded-full"
/>

<div>

<p className="font-semibold text-black">
{w.name}
</p>

<p className="text-sm text-black">
{w.email}
</p>

</div>

</td>

<td className="text-black">{w.company}</td>

<td className="text-black">{w.city}</td>

<td className="text-black">{w.orders}</td>

<td className="text-black">₹{w.revenue}</td>

<td>

<span className="bg-green-300 text-black text-xs px-3 py-1 rounded-full">
Active
</span>

</td>

<td>

<button
className="text-blue-700 font-semibold"
onClick={()=>setSelected(w)}
>
View
</button>

</td>

</tr>

))}

</tbody>

</table>

</div>


{/* TOP WHOLESALERS */}

<div className="border border-black p-6 rounded-xl">

<h3 className="text-xl font-bold text-black mb-4">
Top Revenue Wholesalers
</h3>

{wholesalers
.sort((a,b)=>b.revenue-a.revenue)
.slice(0,3)
.map(w=>(

<div key={w.id} className="flex justify-between border-b border-black py-2">

<span className="text-black">{w.company}</span>

<span className="text-black font-semibold">
₹{w.revenue}
</span>

</div>

))}

</div>


{/* DETAILS DRAWER */}

{selected && (

<div className="fixed inset-0 bg-black/40 flex justify-end">

<div className="bg-white w-96 h-full p-6 space-y-6">

<h3 className="text-xl font-bold text-black">
Wholesaler Details
</h3>

<Detail label="Name" value={selected.name}/>
<Detail label="Email" value={selected.email}/>
<Detail label="Phone" value={selected.phone}/>
<Detail label="Company" value={selected.company}/>
<Detail label="City" value={selected.city}/>
<Detail label="GST" value={selected.gst}/>
<Detail label="Orders" value={selected.orders}/>
<Detail label="Revenue" value={`₹${selected.revenue}`}/>
<Detail label="Joined" value={selected.joined}/>

{/* ACTIVITY */}

<div>

<h4 className="font-bold text-black mb-2">
Activity Timeline
</h4>

<ul className="text-sm text-black space-y-2">

<li>📝 Registration Submitted</li>
<li>✅ Admin Approved</li>
<li>🚴 Started Selling Cycles</li>

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