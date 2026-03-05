"use client";

import SalesChart from "../components/SalesChart";
import Sidebar from "../components/Sidebar";

export default function Dashboard() {

  return (
    <div className="flex h-screen bg-[#f6f8fb] text-slate-800">

      {/* SIDEBAR */}
      <Sidebar />


      {/* MAIN */}

      <main className="flex-1 flex flex-col overflow-hidden">

        {/* HEADER */}

        <header className="h-16 bg-white border-b flex items-center justify-between px-8">

          <div className="relative w-96">

            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
              search
            </span>

            <input
              placeholder="Search products, orders, users..."
              className="w-full bg-gray-50 border border-gray-200 rounded-xl pl-10 pr-4 py-2 text-sm focus:ring-2 focus:ring-yellow-400 outline-none"
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

              <div className="w-10 h-10 bg-gray-200 rounded-full"></div>

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

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

            <StatCard
              title="Total Products"
              value="1,240"
              icon="pedal_bike"
              growth="+12%"
            />

            <StatCard
              title="Total Users"
              value="8,432"
              icon="group"
              growth="+5%"
            />

            <StatCard
              title="Total Orders"
              value="456"
              icon="shopping_bag"
              growth="+18%"
            />

            <StatCard
              title="Revenue"
              value="$128,400"
              icon="payments"
              growth="+24%"
            />

          </div>



          {/* CHART + TOP SELLING */}

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

            {/* SALES OVERVIEW */}

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

                <div className="flex gap-2">

                  <button className="px-3 py-1 text-xs bg-gray-100 rounded">
                    Weekly
                  </button>

                  <button className="px-3 py-1 text-xs bg-yellow-400 text-black rounded font-medium">
                    Monthly
                  </button>

                </div>

              </div>

              <div className="h-64">
  <SalesChart />
</div>

            </div>



            {/* TOP SELLING */}

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


function SidebarItem({label,icon,active}:any){

  return(

    <div
      className={`flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer transition
      ${active ? "bg-yellow-100 text-yellow-700" : "text-gray-600 hover:bg-gray-100"}`}
    >

      <span className="material-symbols-outlined text-[18px]">
        {icon}
      </span>

      {label}

    </div>

  )

}


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


function TopItem({name,percent}:any){

  return(

    <div className="mb-5">

      <div className="flex justify-between text-sm mb-1">

        <span>{name}</span>
        <span className="text-gray-500">{percent}%</span>

      </div>

      <div className="h-2 bg-gray-200 rounded-full">

        <div
          className="h-2 bg-yellow-400 rounded-full"
          style={{width:`${percent}%`}}
        />

      </div>

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