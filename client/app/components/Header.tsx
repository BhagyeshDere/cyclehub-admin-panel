export default function Header(){

return(

<header className="h-16 bg-[#F8F9FB] border-b border-gray-200 flex items-center justify-between px-8">

{/* LEFT SIDE : LOGO */}

<div className="flex items-center gap-6">


<div className="relative w-96">

<span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
search
</span>

<input
placeholder="Search orders, products, wholesalers..."
className="w-full bg-gray-100 border border-gray-200 rounded-xl pl-10 pr-4 py-2 text-sm text-gray-700 placeholder-gray-400 focus:ring-2 focus:ring-gray-300 outline-none"
/>

</div>

</div>

{/* RIGHT SIDE */}

<div className="flex items-center gap-6">

{/* NOTIFICATION */}

<div className="relative cursor-pointer">

<span className="material-symbols-outlined text-gray-600">
notifications
</span>

<span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] px-1.5 rounded-full">
3
</span>

</div>

{/* PROFILE */}

<div className="flex items-center gap-3">

<div className="text-right">

<p className="text-sm font-medium text-gray-800">
Admin
</p>

<p className="text-xs text-gray-500">
Super Admin
</p>

</div>

<img
src="https://i.pravatar.cc/40?img=12"
className="w-10 h-10 rounded-full border border-gray-300"
/>

</div>

</div>

</header>

)

}