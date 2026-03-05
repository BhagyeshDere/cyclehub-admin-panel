export default function StatCard({title,value,icon,growth}:any){

return(

<div className="bg-white border rounded-xl p-5 shadow-sm">

<div className="flex justify-between">

<div>

<p className="text-xs text-gray-500">
{title}
</p>

<h3 className="text-2xl font-semibold mt-2">
{value}
</h3>

</div>

<div className="p-2 bg-yellow-100 text-yellow-600 rounded-lg">

<span className="material-symbols-outlined">
{icon}
</span>

</div>

</div>

<p className="text-green-500 text-xs mt-3">
{growth}
</p>

</div>

)

}