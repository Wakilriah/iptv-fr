"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Mail, Lock, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function AdminLogin() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Identifiants invalides")
      }

      router.push("/admin/dashboard")
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-[#050505] flex items-center justify-center px-4 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#a855f7]/10 blur-[120px] rounded-full pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md relative z-10"
      >
        <div className="bg-[#0d121f] border border-white/10 rounded-3xl p-8 shadow-2xl relative">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-0.5 bg-gradient-to-r from-transparent via-[#a855f7] to-transparent" />
          
          <div className="text-center mb-8">
            <h1 className="text-3xl font-black text-white tracking-tight uppercase">
              Match Ce Soir <span className="text-[#a855f7]">FR</span>
            </h1>
            <p className="text-gray-400 text-sm mt-2">Console d&apos;Administration</p>
          </div>

          {error && (
            <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-sm p-4 rounded-xl mb-6 font-semibold">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="text-xs font-black uppercase tracking-wider text-gray-400 block mb-2">
                Adresse Email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-500">
                  <Mail className="w-5 h-5" />
                </div>
                <input
                  type="email"
                  required
                  placeholder="admin@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-12 pr-4 py-3.5 bg-[#070b14] border border-white/10 rounded-xl text-white placeholder-gray-600 focus:outline-none focus:border-[#a855f7] focus:ring-1 focus:ring-[#a855f7] transition-all text-sm font-semibold"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-black uppercase tracking-wider text-gray-400 block mb-2">
                Mot de Passe
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-500">
                  <Lock className="w-5 h-5" />
                </div>
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-12 pr-4 py-3.5 bg-[#070b14] border border-white/10 rounded-xl text-white placeholder-gray-600 focus:outline-none focus:border-[#a855f7] focus:ring-1 focus:ring-[#a855f7] transition-all text-sm font-semibold"
                />
              </div>
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full font-bold py-6 bg-[#a855f7] hover:bg-[#9333ea] text-white rounded-xl shadow-[0_0_20px_-5px_#a855f7] hover:shadow-[0_0_30px_-5px_#a855f7] transition-all"
            >
              {loading ? (
                <div className="flex items-center gap-2">
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Connexion en cours...</span>
                </div>
              ) : (
                "Se Connecter"
              )}
            </Button>
          </form>
        </div>
      </motion.div>
    </main>
  )
}
