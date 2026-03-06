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

<div className="flex h-screen w-full bg-gradient-to-br from-gray-100 via-gray-50 to-gray-200 items-center justify-center overflow-hidden relative">

{/* BACKGROUND GLOW */}

<div className="absolute w-[700px] h-[700px] bg-gray-300 opacity-20 blur-[160px] rounded-full -top-40 -left-40"></div>
<div className="absolute w-[600px] h-[600px] bg-gray-400 opacity-20 blur-[160px] rounded-full bottom-0 right-0"></div>

{/* LOGIN CARD */}

<div className="relative w-[1000px] h-[600px] bg-white/95 backdrop-blur-xl rounded-3xl shadow-[0_70px_160px_rgba(0,0,0,0.15)] flex overflow-visible border border-gray-200">

{/* LEFT SIDE */}

<div className="flex-1 relative bg-gradient-to-br from-gray-100 via-gray-50 to-gray-200 rounded-l-3xl flex items-center justify-center">

<div className="absolute w-[360px] h-[360px] bg-gray-400 opacity-20 blur-3xl rounded-full"></div>

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

<h2 className="text-3xl font-semibold text-gray-600">
Welcome to
</h2>

<h1 className="text-4xl font-bold text-black tracking-tight">
Cycle<span className="text-gray-700">Bazaar</span>
</h1>

<p className="text-sm text-gray-500 mt-1">
Admin Control Panel
</p>

</div>

{/* EMAIL */}

<div className="relative mb-5">

<span className="absolute left-3 top-3 text-gray-400">
📧
</span>

<input
type="email"
placeholder="Enter Email Address"
className="w-full border border-gray-300 rounded-xl pl-10 pr-4 py-3 bg-white focus:ring-2 focus:ring-black outline-none transition shadow-sm text-black placeholder:text-gray-400"
value={email}
onChange={(e)=>setEmail(e.target.value)}
/>

</div>

{/* PASSWORD */}

<div className="relative mb-4">

<span className="absolute left-3 top-3 text-gray-400">
🔒
</span>

<input
type={showPassword ? "text":"password"}
placeholder="Enter Password"
className="w-full border border-gray-300 rounded-xl pl-10 pr-10 py-3 bg-white focus:ring-2 focus:ring-black outline-none transition shadow-sm text-black placeholder:text-gray-400"
value={password}
onChange={(e)=>setPassword(e.target.value)}
/>

<span
onClick={()=>setShowPassword(!showPassword)}
className="absolute right-4 top-3.5 cursor-pointer text-gray-500 hover:text-black transition"
>
{showPassword ? "🙈":"👁️"}
</span>

</div>

{/* REMEMBER + FORGOT */}

<div className="flex items-center justify-between mb-8 text-sm">

<label className="flex items-center gap-2 text-gray-600">

<input
type="checkbox"
checked={remember}
onChange={()=>setRemember(!remember)}
className="accent-black"
/>

Remember me

</label>

<span className="text-black cursor-pointer hover:underline">
Forgot password?
</span>

</div>

{/* LOGIN BUTTON */}

<button
onClick={handleLogin}
disabled={loading}
className="w-full bg-black hover:bg-gray-900 active:scale-[0.97] text-white py-3 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all shadow-lg hover:shadow-xl"
>

{loading ? (
<>
<div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
Signing In...
</>
) : (
"LOG IN"
)}

</button>

{/* DIVIDER */}

<div className="flex items-center gap-3 my-8">

<div className="flex-1 h-px bg-gray-200"></div>
<span className="text-xs text-gray-400">Secure Admin Portal</span>
<div className="flex-1 h-px bg-gray-200"></div>

</div>

{/* FOOTER */}

<p className="text-xs text-gray-500 text-center">
© 2026 Cycle_Bazaar Admin
</p>

</div>

</div>

</div>

  );

}