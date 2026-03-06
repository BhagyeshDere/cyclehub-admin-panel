"use client";

import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import { useState } from "react";

type Wholesaler = {
id:string
businessName:string
ownerName:string
gst:string
phone:string
aadhar:string
email:string
address:string
license:string
status:"Pending" | "Approved" | "Rejected" | "Suspended"
date:string
}

export default function Wholesalers(){

const [search,setSearch] = useState("");
const [selected,setSelected] = useState<Wholesaler | null>(null);

const [wholesalers,setWholesalers] = useState<Wholesaler[]>([

{
id:"WS-1001",
businessName:"Cycle Mart Pvt Ltd",
ownerName:"Rahul Sharma",
gst:"27ABCDE1234F1Z5",
phone:"+91 9876543210",
aadhar:"XXXX-XXXX-4587",
email:"rahul@cyclemart.com",
address:"Mumbai, Maharashtra",
license:"https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=300",
status:"Pending",
date:"12 Mar 2026"
},

{
id:"WS-1002",
businessName:"Bike World",
ownerName:"Amit Patil",
gst:"27FGHIJ5678K1Z2",
phone:"+91 8765432109",
aadhar:"XXXX-XXXX-3489",
email:"amit@bikeworld.com",
address:"Pune, Maharashtra",
license:"https://images.unsplash.com/photo-1581091870622-1e7d2b0c7b4b?w=300",
status:"Pending",
date:"10 Mar 2026"
},

{
id:"WS-1003",
businessName:"Speed Cycle Store",
ownerName:"Sneha Joshi",
gst:"07JKLMN4321Q1Z8",
phone:"+91 9123456789",
aadhar:"XXXX-XXXX-7482",
email:"sneha@speedcycle.com",
address:"Delhi",
license:"https://images.unsplash.com/photo-1593642634524-b40b5baae6bb?w=300",
status:"Approved",
date:"8 Mar 2026"
}

]);

/* ACTIONS */

function approve(id:string){
setWholesalers(
wholesalers.map(w =>
w.id===id ? {...w,status:"Approved"} : w
)
);
}

function reject(id:string){
setWholesalers(
wholesalers.map(w =>
w.id===id ? {...w,status:"Rejected"} : w
)
);
}

function suspend(id:string){
setWholesalers(
wholesalers.map(w =>
w.id===id ? {...w,status:"Suspended"} : w
)
);
}

/* FILTER */

const filtered = wholesalers.filter(w =>
w.businessName.toLowerCase().includes(search.toLowerCase())
);

return(

<div className="flex h-screen bg-white text-black">

<Sidebar/>

<main className="flex-1 overflow-y-auto">

<Header/>

<div className="p-8 space-y-8">

{/* PAGE HEADER */}

<div>

<h2 className="text-3xl font-bold">
Wholesaler Management
</h2>

<p>
Registration Requests & Approvals
</p>

</div>


{/* STATS */}

<div className="grid grid-cols-4 gap-6">

<Card title="Total Requests" value={wholesalers.length}/>

<Card
title="Pending"
value={wholesalers.filter(w=>w.status==="Pending").length}
/>

<Card
title="Approved"
value={wholesalers.filter(w=>w.status==="Approved").length}
/>

<Card
title="Suspended"
value={wholesalers.filter(w=>w.status==="Suspended").length}
/>

</div>


{/* SEARCH */}

<input
placeholder="Search business..."
value={search}
onChange={(e)=>setSearch(e.target.value)}
className="border border-black px-4 py-2 rounded-lg w-80"
/>


{/* TABLE */}

<div className="border rounded-xl overflow-hidden">

<table className="w-full">

<thead className="bg-black text-white">

<tr>

<th className="p-4 text-left">Business</th>
<th className="text-left">Owner</th>
<th className="text-left">Phone</th>
<th className="text-left">GST</th>
<th className="text-left">Date</th>
<th className="text-left">Status</th>
<th className="text-left">Actions</th>

</tr>

</thead>

<tbody>

{filtered.map(w=>(
<tr key={w.id} className="border-t hover:bg-slate-100">

<td className="p-4">

<p className="font-semibold">
{w.businessName}
</p>

<p className="text-sm">
{w.email}
</p>

</td>

<td>{w.ownerName}</td>

<td>{w.phone}</td>

<td>{w.gst}</td>

<td>{w.date}</td>

<td>

<span className={`px-3 py-1 rounded-full text-xs font-medium
${w.status==="Pending" && "bg-yellow-200"}
${w.status==="Approved" && "bg-green-300"}
${w.status==="Rejected" && "bg-red-300"}
${w.status==="Suspended" && "bg-gray-300"}
`}>
{w.status}
</span>

</td>

<td className="flex gap-3 p-4">

<button
onClick={()=>setSelected(w)}
className="text-blue-700 hover:underline"
>
View
</button>

{w.status==="Pending" && (

<>

<button
onClick={()=>approve(w.id)}
className="text-green-700 hover:underline"
>
Approve
</button>

<button
onClick={()=>reject(w.id)}
className="text-red-700 hover:underline"
>
Reject
</button>

</>

)}

{w.status==="Approved" && (

<button
onClick={()=>suspend(w.id)}
className="text-gray-700 hover:underline"
>
Suspend
</button>

)}

</td>

</tr>
))}

</tbody>

</table>

</div>

</div>

</main>


{/* DETAILS DRAWER */}

{selected && (

<div className="fixed inset-0 bg-black/40 flex justify-end">

<div className="bg-white w-[420px] h-full p-6 space-y-6 overflow-y-auto">

<h3 className="text-xl font-bold">
Wholesaler Details
</h3>

<Detail label="Business Name" value={selected.businessName}/>
<Detail label="Owner Name" value={selected.ownerName}/>
<Detail label="GST Number" value={selected.gst}/>
<Detail label="Phone" value={selected.phone}/>
<Detail label="Aadhar" value={selected.aadhar}/>
<Detail label="Email" value={selected.email}/>
<Detail label="Address" value={selected.address}/>
<Detail label="Status" value={selected.status}/>

<div>

<p className="font-semibold mb-2">
Business License
</p>

<img
src={selected.license}
className="rounded-lg border"
/>

</div>

<div className="flex gap-3 pt-4">

<button
onClick={()=>setSelected(null)}
className="border px-4 py-2 rounded"
>
Close
</button>

</div>

</div>

</div>

)}

</div>

)

}


/* CARD */

function Card({title,value}:any){

return(

<div className="border rounded-xl p-5 bg-white">

<p className="text-sm">
{title}
</p>

<p className="text-2xl font-bold mt-1">
{value}
</p>

</div>

)

}


/* DETAIL */

function Detail({label,value}:any){

return(

<div>

<p className="text-sm font-medium">
{label}
</p>

<p className="font-semibold">
{value}
</p>

</div>

)

}