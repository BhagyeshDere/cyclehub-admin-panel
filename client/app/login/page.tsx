"use client";

import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function Login() {

  const router = useRouter();

  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [showPassword,setShowPassword] = useState(false);
  const [loading,setLoading] = useState(false);
  const [remember,setRemember] = useState(false);

  const handleLogin = async () => {

    try{

      setLoading(true);

      const res = await axios.post(
        "http://localhost:5000/api/admin/login",
        {
          email,
          password
        }
      );

      localStorage.setItem("token",res.data.token);

      router.push("/dashboard");

    }catch(error:any){

      console.error("Login Error:",error.response?.data || error.message);

      alert("Login failed");

    }finally{

      setLoading(false);

    }

  };

  return (

<div className="flex h-screen w-full bg-gradient-to-br from-[#f5f7fb] via-[#f9fafc] to-[#eef2f7] items-center justify-center overflow-hidden relative">

{/* BACKGROUND GLOW */}

<div className="absolute w-[700px] h-[700px] bg-yellow-200 opacity-30 blur-[160px] rounded-full -top-40 -left-40"></div>
<div className="absolute w-[600px] h-[600px] bg-orange-200 opacity-30 blur-[160px] rounded-full bottom-0 right-0"></div>

{/* LOGIN CARD */}

<div className="relative w-[1000px] h-[600px] bg-white/95 backdrop-blur-xl rounded-3xl shadow-[0_70px_160px_rgba(0,0,0,0.15)] flex overflow-visible border border-slate-200">

{/* LEFT SIDE */}

<div className="flex-1 relative bg-gradient-to-br from-yellow-100 via-yellow-50 to-orange-100 rounded-l-3xl flex items-center justify-center">

<div className="absolute w-[360px] h-[360px] bg-yellow-300 opacity-20 blur-3xl rounded-full"></div>

<div className="absolute -left-24 bottom-[-110px]">

<Image
src="/images/cycle-login1.png"
alt="Cycle Illustration"
width={520}
height={520}
priority
className="object-contain drop-shadow-[0_40px_70px_rgba(0,0,0,0.25)]"
/>

</div>

</div>

{/* RIGHT SIDE */}

<div className="flex-1 px-16 flex flex-col justify-center">

{/* BRAND */}

<div className="mb-10">

<h2 className="text-3xl font-semibold text-slate-700">
Welcome to
</h2>

<h1 className="text-4xl font-bold text-black tracking-tight">
Cycle<span className="text-yellow-500">Hub</span>
</h1>

<p className="text-sm text-slate-500 mt-1">
Admin Control Panel
</p>

</div>

{/* EMAIL */}

<div className="relative mb-5">

<span className="absolute left-3 top-3 text-slate-400">
📧
</span>

<input
type="email"
placeholder="Enter Email Address"
className="w-full border border-slate-300 rounded-xl pl-10 pr-4 py-3 bg-white focus:ring-2 focus:ring-yellow-400 outline-none transition shadow-sm text-black placeholder:text-slate-400"
value={email}
onChange={(e)=>setEmail(e.target.value)}
/>

</div>

{/* PASSWORD */}

<div className="relative mb-4">

<span className="absolute left-3 top-3 text-slate-400">
🔒
</span>

<input
type={showPassword ? "text":"password"}
placeholder="Enter Password"
className="w-full border border-slate-300 rounded-xl pl-10 pr-10 py-3 bg-white focus:ring-2 focus:ring-yellow-400 outline-none transition shadow-sm text-black placeholder:text-slate-400"
value={password}
onChange={(e)=>setPassword(e.target.value)}
/>

<span
onClick={()=>setShowPassword(!showPassword)}
className="absolute right-4 top-3.5 cursor-pointer text-slate-500 hover:text-black transition"
>
{showPassword ? "🙈":"👁️"}
</span>

</div>

{/* REMEMBER + FORGOT */}

<div className="flex items-center justify-between mb-8 text-sm">

<label className="flex items-center gap-2 text-slate-600">

<input
type="checkbox"
checked={remember}
onChange={()=>setRemember(!remember)}
className="accent-yellow-500"
/>

Remember me

</label>

<span className="text-yellow-600 cursor-pointer hover:underline">
Forgot password?
</span>

</div>

{/* LOGIN BUTTON */}

<button
onClick={handleLogin}
disabled={loading}
className="w-full bg-yellow-400 hover:bg-yellow-500 active:scale-[0.97] text-black py-3 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all shadow-lg hover:shadow-xl"
>

{loading ? (
<>
<div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
Signing In...
</>
) : (
"LOG IN"
)}

</button>

{/* DIVIDER */}

<div className="flex items-center gap-3 my-8">

<div className="flex-1 h-px bg-slate-200"></div>
<span className="text-xs text-slate-400">Secure Admin Portal</span>
<div className="flex-1 h-px bg-slate-200"></div>

</div>

{/* FOOTER */}

<p className="text-xs text-slate-500 text-center">
© 2026 CycleHub Admin
</p>

</div>

</div>

</div>

  );

}