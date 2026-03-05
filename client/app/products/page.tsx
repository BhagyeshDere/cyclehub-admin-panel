"use client";

import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import { useState } from "react";

export default function Products(){

const [search,setSearch] = useState("");
const [showModal,setShowModal] = useState(false);
const [deleteProduct,setDeleteProduct] = useState<any>(null);
const [preview,setPreview] = useState<any>(null);
const [filter,setFilter] = useState("All");
const [sort,setSort] = useState("None");

const [categories,setCategories] = useState([
"Mountain","Road","BMX","Electric"
]);

const [products,setProducts] = useState([
{ id:"PRD-1021", name:"Mountain Pro X1", category:"Mountain", price:1200, stock:45, status:"In Stock", image:null },
{ id:"PRD-1023", name:"Urban BMX Rider", category:"BMX", price:680, stock:22, status:"In Stock", image:null },
{ id:"PRD-1024", name:"Electric Volt E-Bike", category:"Electric", price:2100, stock:6, status:"Low Stock", image:null },
{ id:"PRD-1025", name:"Mountain Trail X9", category:"Mountain", price:1500, stock:0, status:"Out of Stock", image:null }
]);

const [form,setForm] = useState({
name:"",
category:"Mountain",
price:"",
stock:"",
image:null as any
});


function handleAdd(){

if(!form.name || !form.price || !form.stock){
alert("Please fill all fields");
return;
}

const price = Number(form.price) || 0;
const stock = Number(form.stock) || 0;

const newProduct={
id:`PRD-${Math.floor(Math.random()*9999)}`,
name:form.name,
category:form.category,
price:price,
stock:stock,
image:preview,
status:stock > 10 ? "In Stock" : stock > 0 ? "Low Stock" : "Out of Stock"
};

setProducts([...products,newProduct]);

setForm({ name:"", category:"Mountain", price:"", stock:"", image:null });

setPreview(null);
setShowModal(false);

}

function handleDelete(){
setProducts(products.filter(p=>p.id!==deleteProduct.id));
setDeleteProduct(null);
}

function handleDrop(e:any){
e.preventDefault();
const file=e.dataTransfer.files[0];
if(file){
setForm({...form,image:file});
setPreview(URL.createObjectURL(file));
}
}

function handleImage(e:any){
const file=e.target.files[0];
if(file){
setForm({...form,image:file});
setPreview(URL.createObjectURL(file));
}
}

function safeNumber(value:any){
const num = Number(value);
return isNaN(num) ? 0 : num;
}

function handleCSV(e:any){

const file=e.target.files[0];
if(!file) return;

const reader=new FileReader();

reader.onload=(event:any)=>{

const text = event.target.result;
const rows = text.split("\n");

const imported:any[] = [];

rows.slice(1).forEach((row:any)=>{

if(!row.trim()) return;

const cols = row.split(",");

const name = cols[0]?.trim();
const category = cols[1]?.trim() || "Mountain";
const price = safeNumber(cols[2]);
const stock = safeNumber(cols[3]);

if(!name) return;

imported.push({
id:`PRD-${Math.floor(Math.random()*10000)}`,
name:name,
category:category,
price:price,
stock:stock,
status:stock > 10 ? "In Stock" : stock > 0 ? "Low Stock" : "Out of Stock",
image:null
});

});

setProducts(prev => [...prev,...imported]);

};

reader.readAsText(file);

}

function exportCSV(){

const header = "name,category,price,stock\n";

const rows = products.map(p =>
`${p.name},${p.category},${p.price},${p.stock}`
).join("\n");

const blob = new Blob([header + rows]);
const url = URL.createObjectURL(blob);

const a = document.createElement("a");
a.href=url;
a.download="products.csv";
a.click();

}

const categoryImages:any = {
Mountain:"https://images.unsplash.com/photo-1507035895480-2b3156c31fc8?w=200",
Road:"https://images.unsplash.com/photo-1518655048521-f130df041f66?w=200",
BMX:"https://images.unsplash.com/photo-1541625602330-2277a4c46182?w=200",
Electric:"https://images.unsplash.com/photo-1595433562696-7c8c7b5e21a3?w=200"
};

let filtered = products.filter(p =>
p.name.toLowerCase().includes(search.toLowerCase())
);

if(filter!=="All"){
filtered = filtered.filter(p=>p.category===filter);
}

if(sort==="Price"){
filtered = [...filtered].sort((a,b)=>a.price-b.price);
}

if(sort==="Stock"){
filtered = [...filtered].sort((a,b)=>a.stock-b.stock);
}

return(

<div className="flex min-h-screen bg-[#f6f8fb] text-black">

<Sidebar/>

<main className="flex-1 flex flex-col overflow-y-auto">

<Header/>

<div className="p-8 space-y-6">

<div className="flex items-center justify-between">

<h2 className="text-2xl font-semibold">
Products
</h2>

<div className="flex gap-3">

<button onClick={exportCSV} className="bg-black text-white px-4 py-2 rounded">
Export CSV
</button>

<label className="bg-black text-white px-4 py-2 rounded cursor-pointer text-sm">
Import CSV
<input type="file" hidden onChange={handleCSV}/>
</label>

<button
onClick={()=>setShowModal(true)}
className="bg-yellow-400 hover:bg-yellow-500 text-black px-5 py-2 rounded-lg font-medium shadow"
>
+ Add Product
</button>

</div>

</div>

<div className="grid grid-cols-3 gap-6">

<Card title="Total Products" value={products.length}/>
<Card title="Low Stock" value={products.filter(p=>p.stock<15).length}/>
<Card title="Out of Stock" value={products.filter(p=>p.stock==0).length}/>

</div>

<input
placeholder="Search products..."
value={search}
onChange={(e)=>setSearch(e.target.value)}
className="border border-black bg-white px-4 py-2 rounded-lg w-72"
/>

<div className="bg-white rounded-xl shadow overflow-x-auto">

<table className="w-full min-w-[900px] border border-black rounded-xl">

<thead className="border-b bg-black text-white text-sm">

<tr>
<th className="p-4 text-left">Product</th>
<th className="p-4 text-left">Category</th>
<th className="p-4 text-left">Price</th>
<th className="p-4 text-left">Stock</th>
<th className="p-4 text-left">Status</th>
<th className="p-4 text-left">Actions</th>
</tr>

</thead>

<tbody>

{filtered.map((product)=>(

<tr key={product.id} className="border-b hover:bg-blue-50 transition">

<td className="p-4">

<div className="flex items-center gap-4">

<img
src={product.image || categoryImages[product.category]}
onError={(e:any)=>{
e.currentTarget.src="https://cdn-icons-png.flaticon.com/512/2972/2972185.png"
}}
className="w-14 h-14 object-cover rounded-lg border"
/>

<div>

<p className="font-medium">
{product.name}
</p>

<p className="text-xs">
{product.id}
</p>

</div>

</div>

</td>

<td>{product.category}</td>

<td className="font-medium">
${product.price}
</td>

<td>

<div className="w-32 bg-blue-100 rounded-full h-2 mb-1">

<div
className="bg-blue-600 h-2 rounded-full"
style={{
width:`${Math.min(product.stock * 2,100)}%`
}}
></div>

</div>

{product.stock}

</td>

<td>

<span className={`px-3 py-1 rounded-full text-xs font-medium
${product.status==="In Stock" && "bg-green-200 text-green-900"}
${product.status==="Low Stock" && "bg-yellow-200 text-yellow-900"}
${product.status==="Out of Stock" && "bg-red-200 text-red-900"}
`}>

{product.status}

</span>

</td>

<td className="p-4">

<div className="flex gap-3">

<button className="text-blue-700 text-sm hover:underline">
Edit
</button>

<button
onClick={()=>setDeleteProduct(product)}
className="text-red-600 text-sm hover:underline"
>
Delete
</button>

</div>

</td>

</tr>

))}

</tbody>

</table>

</div>

</div>

</main>

{/* ADD PRODUCT MODAL HERE */}

{showModal && (

<div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

<div className="bg-white w-[420px] rounded-xl p-6 space-y-4 shadow-xl">

<h3 className="text-lg font-semibold">Add Product</h3>

<input
placeholder="Product Name"
value={form.name}
onChange={(e)=>setForm({...form,name:e.target.value})}
className="w-full border p-2 rounded"
/>

<select
value={form.category}
onChange={(e)=>setForm({...form,category:e.target.value})}
className="w-full border p-2 rounded"
>
{categories.map(c=>(
<option key={c}>{c}</option>
))}
</select>

<input
type="number"
placeholder="Price"
value={form.price}
onChange={(e)=>setForm({...form,price:e.target.value})}
className="w-full border p-2 rounded"
/>

<input
type="number"
placeholder="Stock"
value={form.stock}
onChange={(e)=>setForm({...form,stock:e.target.value})}
className="w-full border p-2 rounded"
/>

<div
onDrop={handleDrop}
onDragOver={(e)=>e.preventDefault()}
className="border-2 border-dashed p-6 text-center rounded cursor-pointer"
>

{preview ? (
<img src={preview} className="h-24 mx-auto"/>
) : (
<p>Drag & Drop Image</p>
)}

<input type="file" onChange={handleImage} className="mt-2"/>

</div>

<div className="flex justify-end gap-3">

<button
onClick={()=>setShowModal(false)}
className="px-4 py-2 border rounded"
>
Cancel
</button>

<button
onClick={handleAdd}
className="px-4 py-2 bg-yellow-400 rounded"
>
Add Product
</button>

</div>

</div>

</div>

)}


</div>

)

}

function Card({title,value}:any){

return(

<div className="bg-white border rounded-xl p-5 shadow">

<p className="text-sm">
{title}
</p>

<p className="text-2xl font-semibold mt-1">
{value}
</p>



</div>

)

}