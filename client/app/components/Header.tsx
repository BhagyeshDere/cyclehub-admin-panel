export default function Header(){

return(

<header className="h-16 bg-gradient-to-r from-white via-yellow-50 to-white border-b border-yellow-200 flex items-center justify-between px-8 shadow-sm">

{/* LEFT SIDE : LOGO */}

<div className="flex items-center gap-6">

<h1 className="text-xl font-bold text-black tracking-wide">
CycleHub
</h1>

<div className="relative w-96">

<span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-black">
search
</span>

<input
placeholder="Search products, orders, users..."
className="w-full bg-white border border-yellow-300 rounded-xl pl-10 pr-4 py-2 text-sm text-black placeholder-black focus:ring-2 focus:ring-yellow-400 outline-none shadow-sm"
/>

</div>

</div>

{/* RIGHT SIDE */}

<div className="flex items-center gap-6">

{/* NOTIFICATION */}

<div className="relative cursor-pointer">

<span className="material-symbols-outlined text-black">
notifications
</span>

<span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] px-1.5 rounded-full">
3
</span>

</div>

{/* PROFILE */}

<div className="flex items-center gap-3">

<div className="text-right">

<p className="text-sm font-medium text-black">
Admin
</p>

<p className="text-xs text-black">
Super Admin
</p>

</div>

<img
src="https://i.pravatar.cc/40?img=12"
className="w-10 h-10 rounded-full border border-yellow-400 shadow"
/>

</div>

</div>

</header>

)

}