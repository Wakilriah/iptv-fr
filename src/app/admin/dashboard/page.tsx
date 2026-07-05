"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import {
  TrendingUp, Users, Clock, Search, Trash2,
  LogOut, MessageCircle, Mail, Filter, Loader2, ShieldAlert
} from "lucide-react"
import { Button } from "@/components/ui/button"

interface Order {
  id: string
  fullname: string
  email: string
  phone: string
  planName: string
  planPrice: string
  status: string
  createdAt: string
}

export default function AdminDashboard() {
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const [authLoading, setAuthLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("ALL")
  const [planFilter, setPlanFilter] = useState("ALL")
  const router = useRouter()

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch("/api/admin/me")
        if (!res.ok) {
          router.push("/admin/login")
          return
        }
        fetchOrders()
      } catch (err) {
        router.push("/admin/login")
      } finally {
        setAuthLoading(false)
      }
    }
    checkAuth()
  }, [])

  const fetchOrders = async () => {
    try {
      const res = await fetch("/api/admin/orders")
      if (res.ok) {
        const data = await res.json()
        setOrders(data.orders || [])
      }
    } catch (err) {
      console.error("Error fetching orders:", err)
    } finally {
      setLoading(false)
    }
  }

  const handleUpdateStatus = async (id: string, newStatus: string) => {
    try {
      const res = await fetch("/api/admin/orders", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status: newStatus }),
      })
      if (res.ok) {
        setOrders(prev =>
          prev.map(o => (o.id === id ? { ...o, status: newStatus } : o))
        )
      }
    } catch (err) {
      console.error("Error updating status:", err)
    }
  }

  const handleDeleteOrder = async (id: string) => {
    if (!window.confirm("Êtes-vous sûr de vouloir supprimer cette commande ?")) return
    try {
      const res = await fetch("/api/admin/orders", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      })
      if (res.ok) {
        setOrders(prev => prev.filter(o => o.id !== id))
      }
    } catch (err) {
      console.error("Error deleting order:", err)
    }
  }

  const handleLogout = async () => {
    try {
      const res = await fetch("/api/admin/logout", { method: "POST" })
      if (res.ok) {
        router.push("/admin/login")
      }
    } catch (err) {
      console.error("Error logging out:", err)
    }
  }

  if (authLoading) {
    return (
      <div className="min-h-screen bg-[#050505] flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-[#a855f7] animate-spin" />
      </div>
    )
  }

  // Calculations
  const totalLeads = orders.length
  const trialRequests = orders.filter(o => parseFloat(o.planPrice) === 0 || o.planName.toLowerCase().includes("test")).length
  const paidOrders = totalLeads - trialRequests
  
  // Calculate total revenue (confirmed and completed paid orders)
  const confirmedPaidOrders = orders.filter(o => 
    (o.status === "CONFIRMED" || o.status === "COMPLETED") && 
    parseFloat(o.planPrice || "0") > 0
  )
  const totalRevenue = confirmedPaidOrders.reduce((sum, o) => sum + parseFloat(o.planPrice || "0"), 0)

  const pendingCount = orders.filter(o => o.status === "PENDING").length

  // Filtered orders
  const filteredOrders = orders.filter(order => {
    const matchesSearch =
      order.fullname.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.phone.includes(searchTerm)

    const matchesStatus = statusFilter === "ALL" || order.status === statusFilter
    
    let matchesPlan = true
    if (planFilter !== "ALL") {
      const name = order.planName.toLowerCase()
      if (planFilter === "TEST") matchesPlan = parseFloat(order.planPrice) === 0 || name.includes("test")
      else if (planFilter === "STANDARD") matchesPlan = name.includes("standard")
      else if (planFilter === "PREMIUM") matchesPlan = name.includes("premium")
      else if (planFilter === "VIP") matchesPlan = name.includes("vip")
    }

    return matchesSearch && matchesStatus && matchesPlan
  })

  return (
    <main className="min-h-screen bg-[#050505] text-white p-6 md:p-12 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#a855f7]/5 blur-[150px] rounded-full pointer-events-none" />

      {/* Header */}
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-10 pb-6 border-b border-white/5 relative z-10">
        <div>
          <h1 className="text-3xl md:text-4xl font-black tracking-tight uppercase">
            Dashboard <span className="text-[#a855f7]">Match Ce Soir</span>
          </h1>
          <p className="text-gray-400 text-sm mt-1">Gestion des commandes et demandes de tests IPTV</p>
        </div>
        <Button
          onClick={handleLogout}
          variant="outline"
          className="border-white/10 hover:bg-white/5 rounded-full px-5 py-2.5 flex items-center gap-2 text-sm text-gray-300 font-bold transition-all bg-transparent text-white border-white/10"
        >
          <LogOut className="w-4 h-4" />
          Déconnexion
        </Button>
      </div>

      <div className="max-w-7xl mx-auto space-y-8 relative z-10">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              title: "Revenus Confirmés",
              value: `${totalRevenue.toFixed(2)}€`,
              desc: `${confirmedPaidOrders.length} abonnements payés`,
              icon: <TrendingUp className="w-6 h-6" />,
              color: "from-green-500/20 to-transparent border-green-500/30 text-green-400"
            },
            {
              title: "Commandes Payantes",
              value: paidOrders,
              desc: "Abonnements 3, 6, 12 mois",
              icon: <Users className="w-6 h-6" />,
              color: "from-[#a855f7]/20 to-transparent border-[#a855f7]/30 text-[#a855f7]"
            },
            {
              title: "Demandes de Test 1H",
              value: trialRequests,
              desc: "Converties depuis le hero/popups",
              icon: <Clock className="w-6 h-6" />,
              color: "from-sky-500/20 to-transparent border-sky-500/30 text-sky-400"
            },
            {
              title: "Commandes en Attente",
              value: pendingCount,
              desc: "Nouveaux prospects à recontacter",
              icon: <ShieldAlert className="w-6 h-6" />,
              color: pendingCount > 0 
                ? "from-amber-500/20 to-transparent border-amber-500/30 text-amber-400 animate-pulse" 
                : "from-gray-500/20 to-transparent border-gray-500/10 text-gray-400"
            }
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className={`bg-[#0d121f] border rounded-2xl p-6 flex items-start justify-between bg-gradient-to-br ${stat.color}`}
            >
              <div className="space-y-2">
                <p className="text-gray-400 text-xs font-black uppercase tracking-wider">{stat.title}</p>
                <h3 className="text-3xl font-black tracking-tight">{stat.value}</h3>
                <p className="text-gray-500 text-xs font-semibold">{stat.desc}</p>
              </div>
              <div className="p-3 bg-white/5 rounded-xl border border-white/5 shrink-0">
                {stat.icon}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Filters and List */}
        <div className="bg-[#0d121f] border border-white/10 rounded-3xl p-6 md:p-8 shadow-2xl">
          {/* Filters Bar */}
          <div className="flex flex-col lg:flex-row gap-4 items-stretch lg:items-center justify-between mb-8 pb-6 border-b border-white/5">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-500 w-5 h-5" />
              <input
                type="text"
                placeholder="Rechercher par nom, email, téléphone..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-[#070b14] border border-white/10 rounded-xl text-white placeholder-gray-600 focus:outline-none focus:border-[#a855f7] transition-all text-sm font-semibold"
              />
            </div>
            
            {/* Dropdowns */}
            <div className="flex flex-wrap gap-4 items-center">
              <div className="flex items-center gap-2">
                <span className="text-xs font-black uppercase tracking-wider text-gray-500">Statut:</span>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="bg-[#070b14] border border-white/10 rounded-xl text-xs py-2.5 px-4 font-bold text-gray-300 focus:outline-none focus:border-[#a855f7]"
                >
                  <option value="ALL">Tous les statuts</option>
                  <option value="PENDING">En attente (Pending)</option>
                  <option value="CONFIRMED">Confirmé (Confirmed)</option>
                  <option value="COMPLETED">Livré (Completed)</option>
                  <option value="CANCELLED">Annulé (Cancelled)</option>
                </select>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs font-black uppercase tracking-wider text-gray-500">Type de plan:</span>
                <select
                  value={planFilter}
                  onChange={(e) => setPlanFilter(e.target.value)}
                  className="bg-[#070b14] border border-white/10 rounded-xl text-xs py-2.5 px-4 font-bold text-gray-300 focus:outline-none focus:border-[#a855f7]"
                >
                  <option value="ALL">Tous les plans</option>
                  <option value="TEST">Tests 1H</option>
                  <option value="STANDARD">Packs Standard</option>
                  <option value="PREMIUM">Packs Premium 4K</option>
                  <option value="VIP">Packs VIP+</option>
                </select>
              </div>
            </div>
          </div>

          {/* Table */}
          {loading ? (
            <div className="py-20 flex flex-col items-center justify-center gap-4">
              <Loader2 className="w-8 h-8 text-[#a855f7] animate-spin" />
              <p className="text-gray-400 text-sm">Chargement des données...</p>
            </div>
          ) : filteredOrders.length === 0 ? (
            <div className="py-20 text-center text-gray-500">
              Aucune commande ou demande trouvée.
            </div>
          ) : (
            <div className="overflow-x-auto -mx-6 md:-mx-8">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-white/5 text-xs font-black uppercase tracking-wider text-gray-500">
                    <th className="px-6 md:px-8 pb-4">Client</th>
                    <th className="px-6 pb-4">Produit / Tarif</th>
                    <th className="px-6 pb-4">Statut</th>
                    <th className="px-6 pb-4">Date</th>
                    <th className="px-6 pb-4">Actions de contact</th>
                    <th className="px-6 md:px-8 pb-4 text-right">Gestion</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {filteredOrders.map((order) => {
                    const isTest = parseFloat(order.planPrice) === 0 || order.planName.toLowerCase().includes("test")
                    
                    return (
                      <tr key={order.id} className="hover:bg-white/[0.01] transition-colors group">
                        {/* Client details */}
                        <td className="px-6 md:px-8 py-5">
                          <div className="space-y-1">
                            <p className="font-bold text-white text-base">{order.fullname}</p>
                            <div className="text-xs text-gray-400 flex flex-col sm:flex-row sm:items-center gap-x-2 gap-y-0.5">
                              <span>{order.email}</span>
                              <span className="hidden sm:inline text-gray-600">•</span>
                              <span>{order.phone}</span>
                            </div>
                          </div>
                        </td>
                        
                        {/* Plan details */}
                        <td className="px-6 py-5">
                          <div className="space-y-1">
                            <p className="font-bold text-sm">
                              {order.planName}
                            </p>
                            <p className="text-xs text-gray-400">
                              Tarif:{" "}
                              <span className={isTest ? "text-sky-400 font-bold" : "text-[#a855f7] font-bold"}>
                                {isTest ? "Offert" : `${order.planPrice}€`}
                              </span>
                            </p>
                          </div>
                        </td>
                        
                        {/* Status Select dropdown */}
                        <td className="px-6 py-5">
                          <select
                            value={order.status}
                            onChange={(e) => handleUpdateStatus(order.id, e.target.value)}
                            className={`border rounded-xl text-xs py-1.5 px-3 font-black uppercase tracking-wider focus:outline-none bg-[#070b14] ${
                              order.status === "PENDING"
                                ? "text-amber-400 border-amber-400/20"
                                : order.status === "CONFIRMED"
                                ? "text-[#a855f7] border-[#a855f7]/20"
                                : order.status === "COMPLETED"
                                ? "text-green-400 border-green-400/20"
                                : "text-red-400 border-red-400/20"
                            }`}
                          >
                            <option value="PENDING">Pending</option>
                            <option value="CONFIRMED">Confirmed</option>
                            <option value="COMPLETED">Completed</option>
                            <option value="CANCELLED">Cancelled</option>
                          </select>
                        </td>
                        
                        {/* Date */}
                        <td className="px-6 py-5 text-sm text-gray-400">
                          {new Date(order.createdAt).toLocaleDateString("fr-FR", {
                            day: "2-digit",
                            month: "short",
                            hour: "2-digit",
                            minute: "2-digit"
                          })}
                        </td>
                        
                        {/* Quick Contact buttons */}
                        <td className="px-6 py-5">
                          <div className="flex gap-2.5">
                            {/* WhatsApp link helper */}
                            <a
                              href={`https://wa.me/${order.phone.replace(/[^0-9]/g, "")}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="w-9 h-9 rounded-xl bg-green-500/10 hover:bg-green-500 text-green-400 hover:text-white border border-green-500/20 flex items-center justify-center transition-all"
                              title="Contacter par WhatsApp"
                            >
                              <MessageCircle className="w-4 h-4" />
                            </a>
                            
                            {/* Email link helper */}
                            <a
                              href={`mailto:${order.email}?subject=Abonnement IPTV Match Ce Soir FR&body=Bonjour ${order.fullname},`}
                              className="w-9 h-9 rounded-xl bg-sky-500/10 hover:bg-sky-500 text-sky-400 hover:text-white border border-sky-500/20 flex items-center justify-center transition-all"
                              title="Envoyer un email"
                            >
                              <Mail className="w-4 h-4" />
                            </a>
                          </div>
                        </td>
                        
                        {/* Delete row */}
                        <td className="px-6 md:px-8 py-5 text-right">
                          <button
                            onClick={() => handleDeleteOrder(order.id)}
                            className="w-9 h-9 rounded-xl bg-red-500/10 hover:bg-red-500 text-red-400 hover:text-white border border-red-500/20 flex items-center justify-center transition-all opacity-0 group-hover:opacity-100 focus:opacity-100"
                            title="Supprimer la commande"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </main>
  )
}
