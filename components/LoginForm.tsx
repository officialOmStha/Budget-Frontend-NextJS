"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

const LoginForm = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("")
    const [loading, setLoading] =useState(false);
    const router = useRouter();

    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await fetch("http://127.0.0.1:8000/api/token/",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        email,
                        password,
                    }),
                }
            );

            const data = await response.json();

            if (!response.ok){
                alert("Invalid credentials.")
                return
            }

            localStorage.setItem("access", data.access);
            localStorage.setItem("refresh", data.refresh);

            router.push("/");

        } catch (error) {
            console.log("Login Failed", error);
        } finally{
            setLoading(false);
        }
    }

    return (
        <form
            onSubmit={handleLogin}
            className="w-full max-w-md bg-white/30 backdrop-blur-lg border border-white/40 p-8 rounded-2xl shadow-2xl space-y-6">

            {/* Title */}
            <div className="text-center">
                <h2 className="text-3xl font-bold text-white">Welcome Back</h2>
                <p className="text-white/80 text-sm mt-1">
                    Please enter your details to sign in
                </p>
            </div>

            {/* Email */}
            <div>
                <label className="block text-sm font-medium text-white mb-1">
                    Email
                </label>
                <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    autoComplete="email"
                    className="w-full px-4 py-3 bg-white/40 border border-white/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-white transition text-white placeholder-white/70"
                />
            </div>

            {/* Password */}
            <div>
                <label className="block text-sm font-medium text-white mb-1">
                    Password
                </label>
                <input
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-3 bg-white/40 border border-white/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-white transition text-white placeholder-white/70"
                />
            </div>

            {/* Button */}
            <button
                type="submit"
                className="w-full bg-white text-blue-600 py-3 rounded-lg font-semibold hover:bg-white/90 transition duration-200 shadow-md"

            >
                {loading ? "Logging in..." : "Log In"}
            </button>

        </form>
    );
};

export default LoginForm;
