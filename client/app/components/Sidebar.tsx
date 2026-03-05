"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Sidebar() {

const pathname = usePathname();

const Item = ({href,label,icon}:any) => (

<Link href={href}>

<div className={`flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer transition-all duration-200 font-medium
${pathname === href 
? "bg-yellow-200 text-black shadow-sm"
: "text-black hover:bg-yellow-50 hover:translate-x-1"}`}>

<span className="material-symbols-outlined text-[18px]">
{icon}
</span>

{label}

</div>

</Link>

);

return(

<aside className="w-64 min-h-screen bg-gradient-to-b from-white via-yellow-50 to-yellow-100 border-r border-yellow-200 flex flex-col shadow-md">

<div className="p-6 flex items-center gap-3 border-b border-yellow-200">

<div className="w-10 h-10 bg-yellow-400 rounded-xl flex items-center justify-center shadow-md">

<span className="material-symbols-outlined text-black">
pedal_bike
</span>

</div>

<h1 className="text-xl font-bold text-black tracking-wide">
CycleHub
</h1>

</div>

<nav className="flex-1 px-4 py-6 space-y-2">

<Item href="/dashboard" label="Dashboard" icon="dashboard" />
<Item href="/products" label="Products" icon="inventory_2" />
<Item href="/users" label="Users" icon="group" />
<Item href="/wholesaler-approvals" label="Wholesaler Approvals" icon="verified_user" />
<Item href="/approved-requests" label="Approved Requests" icon="task_alt" />
<Item href="/orders" label="Orders" icon="shopping_cart" />
<Item href="/reports" label="Reports" icon="analytics" />

</nav>

<div className="p-4 border-t border-yellow-200">

<button className="flex items-center gap-3 text-red-600 hover:bg-red-100 w-full px-3 py-2 rounded-lg transition font-medium">

<span className="material-symbols-outlined">
logout
</span>

Logout

</button>

</div>

</aside>

)

}