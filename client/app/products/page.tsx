"use client";

import { useState } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

type Product = {
id:number
name:string
image:string
category:string
brand:string
color:string
price:number
wholesalePrice:number
quantity:number
stockStatus:string
}

export default function Products(){

const [mode,setMode] = useState("customer")
const [search,setSearch] = useState("")
const [showModal,setShowModal] = useState(false)
const [editIndex,setEditIndex] = useState<number|null>(null)

const [product,setProduct] = useState<Product>({
id:0,
name:"",
image:"",
category:"",
brand:"",
color:"",
price:0,
wholesalePrice:0,
quantity:0,
stockStatus:"In Stock"
})

const [products,setProducts] = useState<Product[]>([
{
id:1,
name:"Mountain Pro X1",
image:"https://images.unsplash.com/photo-1518655048521-f130df041f66",
category:"Mountain",
brand:"Trek",
color:"Red",
price:1200,
wholesalePrice:950,
quantity:42,
stockStatus:"In Stock"
},
{
id:2,
name:"Street Racer Elite",
image:"https://images.unsplash.com/photo-1485965120184-e220f721d03e",
category:"Road",
brand:"Giant",
color:"Black",
price:950,
wholesalePrice:750,
quantity:8,
stockStatus:"Low Stock"
},
{
id:3,
name:"Electric City S2",
image:"https://images.unsplash.com/photo-1571333250630-f0230c320b6d",
category:"Electric",
brand:"Hero",
color:"Blue",
price:1500,
wholesalePrice:1200,
quantity:0,
stockStatus:"Out of Stock"
}
])

/* SEARCH */

const filtered = products.filter(p =>
p.name.toLowerCase().includes(search.toLowerCase())
)

/* DELETE */

function deleteProduct(index:number){
setProducts(products.filter((_,i)=>i!==index))
}

/* EDIT */

function editProduct(index:number){
setProduct(products[index])
setEditIndex(index)
setShowModal(true)
}

/* ADD / UPDATE */

function saveProduct(){

if(editIndex !== null){

const updated=[...products]
updated[editIndex]=product
setProducts(updated)
setEditIndex(null)

}else{

setProducts([...products,{...product,id:Date.now()}])

}

setShowModal(false)

setProduct({
id:0,
name:"",
image:"",
category:"",
brand:"",
color:"",
price:0,
wholesalePrice:0,
quantity:0,
stockStatus:"In Stock"
})

}

return(

<div className="flex bg-gray-50 min-h-screen">

<Sidebar/>

<div className="flex-1">

<Header/>

<div className="p-8 max-w-5xl">

{/* TITLE */}

<div className="flex justify-between items-center mb-6">

<h2 className="text-xl font-semibold text-gray-800">
Products
</h2>

<button
onClick={()=>setShowModal(true)}
className="bg-black hover:bg-gray-800 text-white w-10 h-10 rounded-lg flex items-center justify-center text-lg shadow"
>
+
</button>

</div>


{/* SEARCH */}

<div className="mb-6">

<input
placeholder="Search products, SKU..."
className="w-full bg-white border border-gray-200 px-4 py-3 rounded-xl outline-none focus:ring-2 focus:ring-black text-gray-700"
value={search}
onChange={(e)=>setSearch(e.target.value)}
/>

</div>


{/* PRICING TOGGLE */}

<div className="flex bg-gray-200 rounded-xl p-1 mb-6">

<button
onClick={()=>setMode("customer")}
className={`flex-1 py-2 text-sm font-medium rounded-lg transition ${
mode==="customer"
? "bg-white shadow text-black"
: "text-gray-600"
}`}
>
Customer Pricing
</button>

<button
onClick={()=>setMode("wholesaler")}
className={`flex-1 py-2 text-sm font-medium rounded-lg transition ${
mode==="wholesaler"
? "bg-white shadow text-black"
: "text-gray-600"
}`}
>
Wholesaler Pricing
</button>

</div>


{/* FILTERS */}

<div className="flex gap-3 mb-6 flex-wrap">

<button className="bg-white border px-4 py-1.5 rounded-lg text-sm text-gray-700 hover:bg-gray-100">
Category
</button>

<button className="bg-white border px-4 py-1.5 rounded-lg text-sm text-gray-700 hover:bg-gray-100">
Brand
</button>

<button className="bg-white border px-4 py-1.5 rounded-lg text-sm text-gray-700 hover:bg-gray-100">
Stock
</button>

<button className="bg-white border px-4 py-1.5 rounded-lg text-sm text-gray-700 hover:bg-gray-100">
Color
</button>

</div>


{/* PRODUCT LIST */}

<div className="space-y-4">

{filtered.map((p,index)=>(

<div
key={p.id}
className="bg-white rounded-xl p-4 flex items-center gap-4 border border-gray-200 shadow-sm hover:shadow transition"
>

<img
src={p.image}
className="w-16 h-16 rounded-lg object-cover border"
/>

<div className="flex-1">

<div className="flex justify-between items-start">

<h3 className="font-semibold text-gray-800">
{p.name}
</h3>

<div className="flex gap-3 text-lg">

<button
onClick={()=>editProduct(index)}
className="text-gray-500 hover:text-black"
>
✏️
</button>

<button
onClick={()=>deleteProduct(index)}
className="text-red-500 hover:text-red-700"
>
🗑
</button>

</div>

</div>

<p className="text-sm text-gray-500 mt-1">
{p.category} • {p.brand}
</p>

<div className="flex justify-between items-center mt-2">

<span className="font-bold text-gray-900">

₹ {mode==="customer"
? p.price
: p.wholesalePrice}

</span>

<span className={`text-xs px-3 py-1 rounded-full font-medium ${
p.stockStatus==="In Stock"
? "bg-green-100 text-green-700"
: p.stockStatus==="Low Stock"
? "bg-yellow-100 text-yellow-700"
: "bg-red-100 text-red-600"
}`}>
{p.stockStatus} ({p.quantity})
</span>

</div>

</div>

</div>

))}

</div>

</div>

</div>


{/* ADD PRODUCT MODAL */}

{showModal && (

<div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

<div className="bg-white p-6 rounded-xl w-[420px] space-y-3 shadow-lg">

<h3 className="font-semibold text-lg text-gray-800">
{editIndex !== null ? "Update Product" : "Add Product"}
</h3>

<input
placeholder="Name"
className="border border-gray-300 w-full p-2 rounded-lg focus:ring-2 focus:ring-black"
value={product.name}
onChange={(e)=>setProduct({...product,name:e.target.value})}
/>

<input
placeholder="Category"
className="border border-gray-300 w-full p-2 rounded-lg focus:ring-2 focus:ring-black"
value={product.category}
onChange={(e)=>setProduct({...product,category:e.target.value})}
/>

<input
placeholder="Brand"
className="border border-gray-300 w-full p-2 rounded-lg focus:ring-2 focus:ring-black"
value={product.brand}
onChange={(e)=>setProduct({...product,brand:e.target.value})}
/>

<input
placeholder="Color"
className="border border-gray-300 w-full p-2 rounded-lg focus:ring-2 focus:ring-black"
value={product.color}
onChange={(e)=>setProduct({...product,color:e.target.value})}
/>

<input
type="number"
placeholder="Quantity"
className="border border-gray-300 w-full p-2 rounded-lg focus:ring-2 focus:ring-black"
value={product.quantity}
onChange={(e)=>setProduct({...product,quantity:Number(e.target.value)})}
/>

<input
type="number"
placeholder="Customer Price"
className="border border-gray-300 w-full p-2 rounded-lg focus:ring-2 focus:ring-black"
value={product.price}
onChange={(e)=>setProduct({...product,price:Number(e.target.value)})}
/>

<input
type="number"
placeholder="Wholesaler Price"
className="border border-gray-300 w-full p-2 rounded-lg focus:ring-2 focus:ring-black"
value={product.wholesalePrice}
onChange={(e)=>setProduct({...product,wholesalePrice:Number(e.target.value)})}
/>

<select
className="border border-gray-300 w-full p-2 rounded-lg focus:ring-2 focus:ring-black"
value={product.stockStatus}
onChange={(e)=>setProduct({...product,stockStatus:e.target.value})}
>

<option>In Stock</option>
<option>Low Stock</option>
<option>Out of Stock</option>

</select>

<div className="flex justify-end gap-3 pt-2">

<button
onClick={()=>setShowModal(false)}
className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg"
>
Cancel
</button>

<button
onClick={saveProduct}
className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800"
>
Save
</button>

</div>

</div>

</div>

)}

</div>

)

}