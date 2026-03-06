"use client";

import { useState, useEffect } from "react";
import SalesChart from "../components/SalesChart";
import Sidebar from "../components/Sidebar";

export default function Dashboard() {

const [notifications,setNotifications] = useState([
"New order placed by Rahul Sharma",
"Wholesaler request approved",
"Inventory low for Mountain X Pro"
]);

useEffect(()=>{

const interval=setInterval(()=>{

const msgs=[
"New customer registered",
"New order placed",
"Payment received",
"Wholesaler request submitted"
];

setNotifications(prev=>[
msgs[Math.floor(Math.random()*msgs.length)],
...prev
]);

},7000);

return()=>clearInterval(interval)

},[])


  return (
    <div className="flex h-screen bg-gray-100 text-gray-800">

      {/* SIDEBAR */}
      <Sidebar />


      {/* MAIN */}

      <main className="flex-1 flex flex-col overflow-hidden">

        {/* HEADER */}

        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-8">

          <div className="relative w-96">

            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
              search
            </span>

            <input
              placeholder="Search orders, products, wholesalers..."
              className="w-full bg-gray-100 border border-gray-200 rounded-xl pl-10 pr-4 py-2 text-sm focus:ring-2 focus:ring-gray-300 outline-none"
            />

          </div>


          <div className="flex items-center gap-6">

            <span className="material-symbols-outlined text-gray-500">
              notifications
            </span>

            <div className="flex items-center gap-3">

              <div className="text-right">

                <p className="text-sm font-medium">
                  Alex Thompson
                </p>

                <p className="text-xs text-gray-400">
                  Super Admin
                </p>

              </div>

              <div className="w-10 h-10 bg-gray-300 rounded-full"></div>

            </div>

          </div>

        </header>



        {/* CONTENT */}

        <div className="flex-1 overflow-y-auto p-8 space-y-8">


          {/* TITLE */}

          <div>

            <h2 className="text-2xl font-semibold">
              Dashboard Overview
            </h2>

            <p className="text-gray-500 text-sm mt-1">
              Welcome back. Here is the latest analytics of your store.
            </p>

          </div>



          {/* STATS */}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6">

            <StatCard title="Total Products" value="1,240" icon="pedal_bike" growth="+12%"/>
            <StatCard title="Total Users" value="8,432" icon="group" growth="+5%"/>
            <StatCard title="Total Customers" value="6,210" icon="person" growth="+7%"/>
            <StatCard title="Total Wholesalers" value="340" icon="store" growth="+4%"/>
            <StatCard title="Total Orders" value="456" icon="shopping_bag" growth="+18%"/>
            <StatCard title="Revenue" value="$128,400" icon="payments" growth="+24%"/>

          </div>



          {/* CHART + TOP SELLING */}

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

            <div className="lg:col-span-2 bg-white rounded-xl border p-6 shadow-sm">

              <div className="flex justify-between mb-6">

                <div>

                  <h4 className="font-semibold text-lg">
                    Sales Overview
                  </h4>

                  <p className="text-sm text-gray-500">
                    Last 30 days performance
                  </p>

                </div>

              </div>

              <div className="h-64">
                <SalesChart />
              </div>

            </div>



            <div className="bg-white border rounded-xl p-6 shadow-sm">

              <h4 className="font-semibold text-lg mb-6">
                Top Selling Bikes
              </h4>

              <TopItem name="Mountain Pro X1" percent={85} />
              <TopItem name="Street Racer Elite" percent={65} />
              <TopItem name="Electric City S2" percent={45} />
              <TopItem name="BMX Fury 20" percent={30} />
              <TopItem name="Hybrid Commuter" percent={22} />

            </div>

          </div>



{/* NEW ADVANCED ANALYTICS SECTION */}

<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

{/* LIVE REVENUE */}

<div className="bg-white border rounded-xl p-6">

<h3 className="font-semibold mb-4">
Live Revenue Chart
</h3>

<div className="flex items-end gap-3 h-40">

{[40,60,80,30,70,50].map((v,i)=>(
<div key={i} className="w-8 bg-gray-700 rounded" style={{height:v+"%"}}></div>
))}

</div>

</div>


{/* ORDERS GROWTH */}

<div className="bg-white border rounded-xl p-6">

<h3 className="font-semibold mb-4">
Orders Growth
</h3>

<div className="flex items-end gap-3 h-40">

{[20,30,50,80,60,90].map((v,i)=>(
<div key={i} className="w-8 bg-gray-600 rounded" style={{height:v+"%"}}></div>
))}

</div>

</div>


{/* CUSTOMER ACTIVITY */}

<div className="bg-white border rounded-xl p-6">

<h3 className="font-semibold mb-4">
Customer Activity
</h3>

<div className="flex items-end gap-3 h-40">

{[30,45,70,60,80,50].map((v,i)=>(
<div key={i} className="w-8 bg-gray-500 rounded" style={{height:v+"%"}}></div>
))}

</div>

</div>

</div>



{/* WHOLESALER LEADERBOARD */}

<div className="bg-white border rounded-xl p-6">

<h3 className="font-semibold text-lg mb-4">
Top Wholesalers Leaderboard
</h3>

<Leaderboard name="Metro Cycles Ltd." value="$52,000"/>
<Leaderboard name="Velocity Distributors" value="$41,200"/>
<Leaderboard name="BikeWorld Wholesale" value="$38,900"/>
<Leaderboard name="UrbanRide Suppliers" value="$31,500"/>

</div>



{/* REAL TIME NOTIFICATIONS */}

<div className="bg-white border rounded-xl p-6">

<h3 className="font-semibold text-lg mb-4">
Real Time Notifications
</h3>

<div className="space-y-3">

{notifications.map((n,i)=>(
<div key={i} className="text-sm border-b pb-2">
🔔 {n}
</div>
))}

</div>

</div>



{/* AI ANALYTICS PANEL */}

<div className="bg-white border rounded-xl p-6">

<h3 className="font-semibold text-lg mb-4">
Admin AI Analytics
</h3>

<ul className="text-sm space-y-2 text-gray-600">

<li>📈 Sales expected to increase 18% next week</li>
<li>⚠ Mountain Pro X1 stock may run out in 5 days</li>
<li>👥 Customer growth trending upward</li>
<li>🏬 12 new wholesaler applications predicted</li>

</ul>

</div>



          {/* RECENT ORDERS */}

          <div className="bg-white border rounded-xl p-6 shadow-sm">

            <h4 className="font-semibold text-lg mb-6">
              Recent Orders
            </h4>

            <table className="w-full text-sm">

              <thead className="text-gray-500 border-b">

                <tr>

                  <th className="text-left py-2">Order</th>
                  <th className="text-left py-2">Customer</th>
                  <th className="text-left py-2">Amount</th>
                  <th className="text-left py-2">Status</th>

                </tr>

              </thead>

              <tbody>

                <TableRow order="#1021" user="John Doe" price="$320" status="Completed"/>
                <TableRow order="#1022" user="Sarah Smith" price="$210" status="Pending"/>
                <TableRow order="#1023" user="Michael Lee" price="$540" status="Completed"/>
                <TableRow order="#1024" user="Emma Brown" price="$180" status="Cancelled"/>

              </tbody>

            </table>

          </div>


        </div>

      </main>

    </div>

  );

}



/* COMPONENTS */

function StatCard({title,value,icon,growth}:any){

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

        <div className="p-2 bg-gray-100 text-gray-700 rounded-lg">

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


function TopItem({name,percent}:any){

  return(

    <div className="mb-5">

      <div className="flex justify-between text-sm mb-1">

        <span>{name}</span>
        <span className="text-gray-500">{percent}%</span>

      </div>

      <div className="h-2 bg-gray-200 rounded-full">

        <div
          className="h-2 bg-gray-800 rounded-full"
          style={{width:`${percent}%`}}
        />

      </div>

    </div>

  )

}

function Leaderboard({name,value}:any){

return(

<div className="flex justify-between border-b py-2">

<span>{name}</span>
<span className="font-medium">{value}</span>

</div>

)

}

function TableRow({order,user,price,status}:any){

  const colorMap:any = {
    Completed: "text-green-600",
    Pending: "text-yellow-600",
    Cancelled: "text-red-600"
  };

  const color = colorMap[status] || "text-gray-500";

  return(

    <tr className="border-b">

      <td className="py-3">{order}</td>
      <td>{user}</td>
      <td>{price}</td>
      <td className={color}>{status}</td>

    </tr>

  )

}