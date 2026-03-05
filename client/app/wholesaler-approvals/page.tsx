"use client";

import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import { useState } from "react";

export default function WholesalerApprovals(){

const [search,setSearch] = useState("");
const [selected,setSelected] = useState<any>(null);

const [requests,setRequests] = useState([
{
id:"WS-1001",
name:"Rahul Sharma",
email:"rahul@cyclemart.com",
phone:"+91 9876543210",
company:"Cycle Mart Pvt Ltd",
city:"Mumbai",
gst:"27ABCDE1234F1Z5",
status:"Pending",
date:"12 Mar 2026"
},
{
id:"WS-1002",
name:"Amit Patil",
email:"amit@bikeworld.com",
phone:"+91 8765432109",
company:"Bike World",
city:"Pune",
gst:"27FGHIJ5678K1Z2",
status:"Pending",
date:"11 Mar 2026"
},
{
id:"WS-1003",
name:"Sneha Joshi",
email:"sneha@speedcycle.com",
phone:"+91 9123456789",
company:"Speed Cycle Store",
city:"Delhi",
gst:"07JKLMN4321Q1Z8",
status:"Approved",
date:"9 Mar 2026"
}
]);


/* APPROVE */

function approveRequest(id:any){

setRequests(
requests.map(r=>
r.id===id ? {...r,status:"Approved"} : r
)
);

}


/* REJECT */

function rejectRequest(id:any){

setRequests(
requests.map(r=>
r.id===id ? {...r,status:"Rejected"} : r
)
);

}


/* SEARCH */

const filtered = requests.filter(r =>
r.name.toLowerCase().includes(search.toLowerCase())
);

/* NEW ANALYTICS */

const registeredWholesalers = requests.filter(r=>r.status==="Approved").length;

/* Example total customers (can connect with real DB later) */

const totalCustomers = 1240;


return(

<div className="flex h-screen bg-white text-black">

<Sidebar/>

<main className="flex-1 overflow-y-auto">

<Header/>

<div className="p-8 space-y-8">

{/* PAGE HEADER */}

<div>

<h2 className="text-3xl font-bold text-black">
Wholesaler Approvals
</h2>

<p className="text-black mt-1">
Review and approve wholesaler registration requests
</p>

</div>


{/* STATS */}

<div className="grid grid-cols-6 gap-6">

<Stat title="Total Requests" value={requests.length}/>

<Stat 
title="Pending"
value={requests.filter(r=>r.status==="Pending").length}
/>

<Stat
title="Approved"
value={requests.filter(r=>r.status==="Approved").length}
/>

<Stat
title="Rejected"
value={requests.filter(r=>r.status==="Rejected").length}
/>

{/* NEW CARD */}

<Stat
title="Registered Wholesalers"
value={registeredWholesalers}
/>

{/* NEW CARD */}

<Stat
title="Total Customers"
value={totalCustomers}
/>

</div>


{/* SEARCH */}

<input
placeholder="Search wholesaler..."
value={search}
onChange={(e)=>setSearch(e.target.value)}
className="border border-black px-4 py-2 rounded-lg w-80 text-black"
/>


{/* TABLE */}

<div className="border rounded-xl overflow-hidden">

<table className="w-full">

<thead className="bg-black text-white">

<tr>

<th className="p-4 text-left">Wholesaler</th>
<th className="text-left">Company</th>
<th className="text-left">City</th>
<th className="text-left">GST</th>
<th className="text-left">Date</th>
<th className="text-left">Status</th>
<th className="text-left">Actions</th>

</tr>

</thead>

<tbody>

{filtered.map((req)=>(
<tr key={req.id} className="border-t hover:bg-slate-100">

<td className="p-4">

<div>

<p className="font-semibold text-black">
{req.name}
</p>

<p className="text-sm text-black">
{req.email}
</p>

</div>

</td>

<td className="text-black">{req.company}</td>

<td className="text-black">{req.city}</td>

<td className="text-black">{req.gst}</td>

<td className="text-black">{req.date}</td>

<td>

<span className={`px-3 py-1 rounded-full text-xs font-medium
${req.status==="Pending" && "bg-yellow-200 text-black"}
${req.status==="Approved" && "bg-green-300 text-black"}
${req.status==="Rejected" && "bg-red-300 text-black"}
`}>
{req.status}
</span>

</td>

<td className="flex gap-3 p-4">

<button
onClick={()=>setSelected(req)}
className="text-blue-700 hover:underline"
>
View
</button>

{req.status==="Pending" && (

<>

<button
onClick={()=>approveRequest(req.id)}
className="text-green-700 hover:underline"
>
Approve
</button>

<button
onClick={()=>rejectRequest(req.id)}
className="text-red-700 hover:underline"
>
Reject
</button>

</>

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

<div className="bg-white w-[420px] h-full p-6 space-y-6">

<h3 className="text-xl font-bold text-black">
Wholesaler Details
</h3>

<Detail label="Name" value={selected.name}/>
<Detail label="Email" value={selected.email}/>
<Detail label="Phone" value={selected.phone}/>
<Detail label="Company" value={selected.company}/>
<Detail label="City" value={selected.city}/>
<Detail label="GST Number" value={selected.gst}/>
<Detail label="Applied Date" value={selected.date}/>
<Detail label="Status" value={selected.status}/>

<div className="flex gap-3 pt-4">

{selected.status==="Pending" && (

<>

<button
onClick={()=>approveRequest(selected.id)}
className="bg-green-600 text-white px-4 py-2 rounded"
>
Approve
</button>

<button
onClick={()=>rejectRequest(selected.id)}
className="bg-red-600 text-white px-4 py-2 rounded"
>
Reject
</button>

</>

)}

<button
onClick={()=>setSelected(null)}
className="border border-black px-4 py-2 rounded"
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


/* STATS CARD */

function Stat({title,value}:any){

return(

<div className="border rounded-xl p-5 bg-white">

<p className="text-sm text-black">
{title}
</p>

<p className="text-2xl font-bold mt-1 text-black">
{value}
</p>

</div>

)

}


/* DETAILS FIELD */

function Detail({label,value}:any){

return(

<div>

<p className="text-sm font-medium text-black">
{label}
</p>

<p className="font-semibold text-black">
{value}
</p>

</div>

)

}