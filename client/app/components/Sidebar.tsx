"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

export default function Sidebar() {

const pathname = usePathname();
const router = useRouter();

/* LOGOUT FUNCTION */

function handleLogout(){

localStorage.removeItem("token");
localStorage.removeItem("user");

sessionStorage.clear();

router.push("/login");

}

const Item = ({href,label,icon}:any) => (

<Link href={href}>

<div
className={`flex items-center gap-4 px-4 py-3 rounded-xl cursor-pointer transition-all duration-200 text-[15px] font-medium
${pathname === href 
? "bg-gradient-to-r from-gray-700 to-gray-800 text-white shadow"
: "text-gray-400 hover:bg-gray-800 hover:text-white"}`
}
>

<span className="material-symbols-outlined text-[22px]">
{icon}
</span>

{label}

</div>

</Link>

);

return(

<aside className="w-64 min-h-screen bg-gradient-to-b from-black via-[#0a0a0a] to-black border-r border-gray-800 flex flex-col">

{/* LOGO */}

<div className="p-6 flex items-center gap-3 border-b border-gray-800">

<div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">

<span className="material-symbols-outlined text-black text-[20px]">
pedal_bike
</span>

</div>

<h1 className="text-lg font-semibold text-white tracking-wide">
Cycle_Bazaar
</h1>

</div>


{/* NAVIGATION */}

<nav className="flex-1 px-3 py-6 space-y-2">

<Item href="/dashboard" label="Dashboard" icon="dashboard" />

<Item href="/products" label="Products" icon="inventory_2" />

<Item href="/wholesalers" label="Wholesalers" icon="group" />

<Item href="/orders" label="Orders" icon="shopping_cart" />

<Item href="/inventory" label="Inventory" icon="inventory_2" />

<Item href="/reports" label="Reports" icon="analytics" />

<Item href="/banners" label="Banners" icon="photo" />

</nav>


{/* USER + LOGOUT */}

<div className="p-4 border-t border-gray-800">

<div className="flex items-center gap-3 mb-3">

<div className="w-9 h-9 bg-gray-700 rounded-full"></div>

<div>

<p className="text-sm text-white font-medium">
Admin User
</p>

<p className="text-xs text-gray-400">
Super Admin
</p>

</div>

</div>


<button
onClick={handleLogout}
className="flex items-center gap-3 text-red-400 hover:bg-red-500/20 w-full px-3 py-2 rounded-lg transition text-sm font-medium"
>

<span className="material-symbols-outlined">
logout
</span>

Logout

</button>

</div>

</aside>

)

}