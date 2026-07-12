"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import {
  TrendingUp, Users, Clock, Search, Trash2,
  LogOut, MessageCircle, Mail, Filter, Loader2, ShieldAlert,
  Download, Plus, CheckCircle2, Info, Calendar, DollarSign, X, Check, ArrowUpDown
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

interface Toast {
  id: string
  message: string
  type: "success" | "error" | "info"
}

export default function AdminDashboard() {
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const [authLoading, setAuthLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("ALL")
  const [planFilter, setPlanFilter] = useState("ALL")
  const [dateFilter, setDateFilter] = useState("ALL") // ALL, TODAY, WEEK, MONTH
  const [sortField, setSortField] = useState<"createdAt" | "planPrice">("createdAt")
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc")
  
  // Selection for bulk actions
  const [selectedIds, setSelectedIds] = useState<string[]>([])
  
  // Modals & Drawers
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)
  
  // Form for adding order manually
  const [newOrderForm, setNewOrderForm] = useState({
    fullname: "",
    email: "",
    phone: "",
    planName: "Abonnement Standard (12 mois)",
    planPrice: "35.99"
  })
  
  // Toasts
  const [toasts, setToasts] = useState<Toast[]>([])
  
  const router = useRouter()

  const showToast = (message: string, type: "success" | "error" | "info" = "success") => {
    const id = Date.now().toString()
    setToasts(prev => [...prev, { id, message, type }])
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id))
    }, 4000)
  }

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
      showToast("Impossible de charger les commandes", "error")
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
        showToast("Statut de la commande mis à jour")
      } else {
        showToast("Échec de la mise à jour", "error")
      }
    } catch (err) {
      console.error("Error updating status:", err)
      showToast("Erreur lors de la mise à jour", "error")
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
        setSelectedIds(prev => prev.filter(selectedId => selectedId !== id))
        if (selectedOrder?.id === id) setSelectedOrder(null)
        showToast("Commande supprimée avec succès")
      } else {
        showToast("Échec de la suppression", "error")
      }
    } catch (err) {
      console.error("Error deleting order:", err)
      showToast("Erreur lors de la suppression", "error")
    }
  }

  // Bulk Actions
  const handleBulkStatusChange = async (newStatus: string) => {
    if (selectedIds.length === 0) return
    let successCount = 0
    
    // We update sequentially or in parallel
    await Promise.all(selectedIds.map(async (id) => {
      try {
        const res = await fetch("/api/admin/orders", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id, status: newStatus }),
        })
        if (res.ok) successCount++
      } catch (err) {
        console.error(err)
      }
    }))
    
    setOrders(prev =>
      prev.map(o => (selectedIds.includes(o.id) ? { ...o, status: newStatus } : o))
    )
    setSelectedIds([])
    showToast(`${successCount} commande(s) mise(s) à jour avec succès`)
  }

  const handleBulkDelete = async () => {
    if (selectedIds.length === 0) return
    if (!window.confirm(`Êtes-vous sûr de vouloir supprimer ces ${selectedIds.length} commande(s) ?`)) return
    
    let successCount = 0
    await Promise.all(selectedIds.map(async (id) => {
      try {
        const res = await fetch("/api/admin/orders", {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id }),
        })
        if (res.ok) successCount++
      } catch (err) {
        console.error(err)
      }
    }))
    
    setOrders(prev => prev.filter(o => !selectedIds.includes(o.id)))
    setSelectedIds([])
    setSelectedOrder(null)
    showToast(`${successCount} commande(s) supprimée(s) avec succès`)
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

  // Manual creation form
  const handleCreateOrder = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newOrderForm),
      })
      if (res.ok) {
        showToast("Commande créée manuellement")
        setIsAddModalOpen(false)
        setNewOrderForm({
          fullname: "",
          email: "",
          phone: "",
          planName: "Abonnement Standard (12 mois)",
          planPrice: "35.99"
        })
        fetchOrders()
      } else {
        showToast("Erreur lors de la création", "error")
      }
    } catch (err) {
      console.error(err)
      showToast("Erreur serveur", "error")
    }
  }

  // Toggle selection
  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedIds(filteredOrders.map(o => o.id))
    } else {
      setSelectedIds([])
    }
  }

  const handleSelectId = (id: string, checked: boolean) => {
    if (checked) {
      setSelectedIds(prev => [...prev, id])
    } else {
      setSelectedIds(prev => prev.filter(item => item !== id))
    }
  }

  // CSV Export
  const handleExportCSV = () => {
    try {
      const headers = ["Nom complet", "Email", "Telephone", "Forfait", "Prix", "Statut", "Date de Creation"]
      const rows = filteredOrders.map(o => [
        `"${o.fullname.replace(/"/g, '""')}"`,
        `"${o.email.replace(/"/g, '""')}"`,
        `"${o.phone.replace(/"/g, '""')}"`,
        `"${o.planName.replace(/"/g, '""')}"`,
        `"${o.planPrice}"`,
        `"${o.status}"`,
        `"${new Date(o.createdAt).toLocaleString("fr-FR")}"`
      ])
      
      const csvContent = "data:text/csv;charset=utf-8,\uFEFF" 
        + [headers.join(","), ...rows.map(e => e.join(","))].join("\n")
        
      const encodedUri = encodeURI(csvContent)
      const link = document.createElement("a")
      link.setAttribute("href", encodedUri)
      link.setAttribute("download", `matchcesoir_leads_${new Date().toISOString().split('T')[0]}.csv`)
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      showToast("Export CSV téléchargé avec succès")
    } catch (err) {
      console.error(err)
      showToast("Échec de l'export CSV", "error")
    }
  }

  const toggleSort = (field: "createdAt" | "planPrice") => {
    if (sortField === field) {
      setSortDirection(prev => (prev === "asc" ? "desc" : "asc"))
    } else {
      setSortField(field)
      setSortDirection("desc")
    }
  }

  // Analytics Chart calculation (Last 7 Days activity)
  const getChartData = () => {
    const data: Record<string, number> = {}
    // Get past 7 days dates
    for (let i = 6; i >= 0; i--) {
      const d = new Date()
      d.setDate(d.getDate() - i)
      const dateStr = d.toLocaleDateString("fr-FR", { day: "2-digit", month: "short" })
      data[dateStr] = 0
    }
    
    // Fill values
    orders.forEach(o => {
      const dateStr = new Date(o.createdAt).toLocaleDateString("fr-FR", { day: "2-digit", month: "short" })
      if (data[dateStr] !== undefined) {
        data[dateStr]++
      }
    })
    
    return Object.entries(data).map(([date, count]) => ({ date, count }))
  }

  const chartData = getChartData()
  const maxChartVal = Math.max(...chartData.map(d => d.count), 5) // at least 5 for height scale

  // Calculations
  const totalLeads = orders.length
  const trialRequests = orders.filter(o => parseFloat(o.planPrice) === 0 || o.planName.toLowerCase().includes("test")).length
  const paidOrders = totalLeads - trialRequests
  
  const confirmedPaidOrders = orders.filter(o => 
    (o.status === "CONFIRMED" || o.status === "COMPLETED") && 
    parseFloat(o.planPrice || "0") > 0
  )
  const totalRevenue = confirmedPaidOrders.reduce((sum, o) => sum + parseFloat(o.planPrice || "0"), 0)
  const pendingCount = orders.filter(o => o.status === "PENDING").length

  // Filtered and Sorted orders
  const filteredOrders = orders.filter(order => {
    // Search
    const matchesSearch =
      order.fullname.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.phone.includes(searchTerm)

    // Status
    const matchesStatus = statusFilter === "ALL" || order.status === statusFilter
    
    // Plan Type
    let matchesPlan = true
    if (planFilter !== "ALL") {
      const name = order.planName.toLowerCase()
      if (planFilter === "TEST") matchesPlan = parseFloat(order.planPrice) === 0 || name.includes("test")
      else if (planFilter === "STANDARD") matchesPlan = name.includes("standard")
      else if (planFilter === "PREMIUM") matchesPlan = name.includes("premium")
      else if (planFilter === "VIP") matchesPlan = name.includes("vip")
    }

    // Date range
    let matchesDate = true
    if (dateFilter !== "ALL") {
      const createdDate = new Date(order.createdAt)
      const now = new Date()
      if (dateFilter === "TODAY") {
        matchesDate = createdDate.toDateString() === now.toDateString()
      } else if (dateFilter === "WEEK") {
        const oneWeekAgo = new Date()
        oneWeekAgo.setDate(now.getDate() - 7)
        matchesDate = createdDate >= oneWeekAgo
      } else if (dateFilter === "MONTH") {
        matchesDate = createdDate.getMonth() === now.getMonth() && createdDate.getFullYear() === now.getFullYear()
      }
    }

    return matchesSearch && matchesStatus && matchesPlan && matchesDate
  }).sort((a, b) => {
    let comparison = 0
    if (sortField === "createdAt") {
      comparison = new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
    } else {
      comparison = parseFloat(a.planPrice) - parseFloat(b.planPrice)
    }
    return sortDirection === "desc" ? -comparison : comparison
  })

  return (
    <main className="min-h-screen bg-[#050505] text-white p-4 md:p-8 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-[250px] h-[250px] md:w-[500px] md:h-[500px] bg-[#9333ea]/5 blur-[80px] md:blur-[150px] rounded-full pointer-events-none" />

      {/* Toast Notification Container */}
      <div className="fixed top-6 right-6 z-50 flex flex-col gap-3 max-w-sm w-full">
        {toasts.map(toast => (
          <div
            key={toast.id}
            className={`p-4 rounded-xl shadow-2xl border flex items-center justify-between gap-3 text-sm font-semibold backdrop-blur-md ${
              toast.type === "error"
                ? "bg-red-500/10 border-red-500/30 text-red-400"
                : toast.type === "info"
                ? "bg-sky-500/10 border-sky-500/30 text-sky-400"
                : "bg-green-500/10 border-green-500/30 text-green-300"
            }`}
          >
            <span>{toast.message}</span>
            <button onClick={() => setToasts(prev => prev.filter(t => t.id !== toast.id))} className="text-gray-400 hover:text-white transition-colors" aria-label="Fermer">
              <X className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>

      {/* Header */}
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-8 pb-6 border-b border-white/5 relative z-10">
        <div>
          <h1 className="text-3xl md:text-4xl font-black tracking-tight uppercase">
            Dashboard <span className="text-[#a855f7]">Match Ce Soir</span>
          </h1>
          <p className="text-gray-300 text-sm mt-1">Console d&apos;administration et suivi des abonnements clients</p>
        </div>
        
        <div className="flex flex-wrap gap-3">
          <Button
            onClick={handleExportCSV}
            variant="outline"
            className="border-white/10 hover:bg-white/5 rounded-full px-5 py-2.5 flex items-center gap-2 text-sm text-gray-300 font-bold transition-all bg-transparent text-white"
          >
            <Download className="w-4 h-4" />
            Exporter CSV
          </Button>
          <Button
            onClick={() => setIsAddModalOpen(true)}
            className="bg-[#9333ea] hover:bg-[#7e22ce] text-white rounded-full px-5 py-2.5 flex items-center gap-2 text-sm font-bold transition-all shadow-[0_0_15px_-5px_#a855f7]"
          >
            <Plus className="w-4 h-4" />
            Nouvelle Commande
          </Button>
          <Button
            onClick={handleLogout}
            variant="outline"
            className="border-red-500/20 hover:bg-red-500/5 hover:text-red-400 rounded-full px-5 py-2.5 flex items-center gap-2 text-sm text-gray-300 font-bold transition-all bg-transparent"
          >
            <LogOut className="w-4 h-4" />
            Déconnexion
          </Button>
        </div>
      </div>

      {loading ? (
        <div className="min-h-[50vh] bg-[#050505] flex flex-col items-center justify-center gap-4">
          <Loader2 className="w-8 h-8 text-[#a855f7] animate-spin" />
          <p className="text-gray-300 text-sm">Chargement des données...</p>
        </div>
      ) : (
        <div className="max-w-7xl mx-auto space-y-8 relative z-10">
          
          {/* Main stats + Mini chart section */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Stats list */}
            <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                {
                  title: "Revenus Confirmés",
                  value: `${totalRevenue.toFixed(2)}€`,
                  desc: `${confirmedPaidOrders.length} abonnements confirmés/livrés`,
                  icon: <TrendingUp className="w-6 h-6" />,
                  color: "from-green-500/20 to-transparent border-green-500/30 text-green-300"
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
                  desc: "Demandes d'essai soumises",
                  icon: <Clock className="w-6 h-6" />,
                  color: "from-sky-500/20 to-transparent border-sky-500/30 text-sky-400"
                },
                {
                  title: "En Attente",
                  value: pendingCount,
                  desc: "Nouveaux prospects à contacter",
                  icon: <ShieldAlert className="w-6 h-6" />,
                  color: pendingCount > 0 
                    ? "from-amber-500/20 to-transparent border-amber-500/30 text-amber-400 animate-pulse" 
                    : "from-gray-500/20 to-transparent border-gray-500/10 text-gray-300"
                }
              ].map((stat, i) => (
                <div
                  key={i}
                  className={`bg-[#0d121f] border rounded-2xl p-5 flex items-start justify-between bg-gradient-to-br ${stat.color}`}
                >
                  <div className="space-y-1.5">
                    <p className="text-gray-300 text-xs font-black uppercase tracking-wider">{stat.title}</p>
                    <h2 className="text-2xl md:text-3xl font-black tracking-tight">{stat.value}</h2>
                    <p className="text-gray-400 text-xs font-semibold">{stat.desc}</p>
                  </div>
                  <div className="p-2.5 bg-white/5 rounded-lg border border-white/5 shrink-0">
                    {stat.icon}
                  </div>
                </div>
              ))}
            </div>

            {/* Premium Activity SVG Chart */}
            <div className="bg-[#0d121f] border border-white/10 rounded-2xl p-5 flex flex-col justify-between">
              <div>
                <h3 className="text-xs font-black uppercase tracking-wider text-gray-300 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#9333ea] inline-block animate-ping" />
                  Activité des 7 Derniers Jours
                </h3>
                <p className="text-gray-400 text-xs mt-0.5">Nombre total de leads par jour</p>
              </div>
              
              {/* SVG visual chart */}
              <div className="h-28 w-full mt-4 flex items-end justify-between gap-1.5 px-2">
                {chartData.map((d, index) => {
                  const percentHeight = (d.count / maxChartVal) * 80 + 10 // scale 10% to 90%
                  
                  return (
                    <div key={index} className="flex-1 flex flex-col items-center gap-2 group cursor-pointer">
                      <div className="w-full relative flex items-end justify-center h-20">
                        {/* Bar */}
                        <div
                          style={{ height: `${percentHeight}%` }}
                          className="w-full sm:w-8 rounded-t-lg bg-gradient-to-t from-[#a855f7]/40 to-[#a855f7] group-hover:from-[#9333ea] group-hover:to-[#a855f7] transition-all relative"
                        >
                          {/* Tooltip */}
                          <div className="absolute -top-7 left-1/2 -translate-x-1/2 bg-black text-white text-[10px] font-black px-1.5 py-0.5 rounded border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-30 shadow-lg">
                            {d.count} lead{d.count > 1 ? "s" : ""}
                          </div>
                        </div>
                      </div>
                      <span className="text-[10px] text-gray-400 font-bold group-hover:text-white transition-colors">{d.date}</span>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>

          {/* Filters, Bulk Actions and Main Table Card */}
          <div className="bg-[#0d121f] border border-white/10 rounded-3xl p-6 shadow-2xl relative">
            
            {/* Filters grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6 pb-6 border-b border-white/5">
              {/* Search input */}
              <div className="relative">
                <Search className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Rechercher par nom, email, tél..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-2.5 bg-[#070b14] border border-white/10 rounded-xl text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-[#9333ea] focus:border-transparent transition-all text-sm font-semibold"
                />
              </div>

              {/* Status Select */}
              <div className="flex items-center bg-[#070b14] border border-white/10 rounded-xl px-3.5">
                <span className="text-[11px] font-black uppercase text-gray-400 shrink-0 mr-2">Statut:</span>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="bg-transparent border-0 text-xs py-2.5 w-full font-bold text-gray-300 focus:outline-none"
                >
                  <option value="ALL" className="bg-[#070b14]">Tous</option>
                  <option value="PENDING" className="bg-[#070b14]">En Attente</option>
                  <option value="CONFIRMED" className="bg-[#070b14]">Confirmé</option>
                  <option value="COMPLETED" className="bg-[#070b14]">Livré</option>
                  <option value="CANCELLED" className="bg-[#070b14]">Annulé</option>
                </select>
              </div>

              {/* Plan Select */}
              <div className="flex items-center bg-[#070b14] border border-white/10 rounded-xl px-3.5">
                <span className="text-[11px] font-black uppercase text-gray-400 shrink-0 mr-2">Forfait:</span>
                <select
                  value={planFilter}
                  onChange={(e) => setPlanFilter(e.target.value)}
                  className="bg-transparent border-0 text-xs py-2.5 w-full font-bold text-gray-300 focus:outline-none"
                >
                  <option value="ALL" className="bg-[#070b14]">Tous</option>
                  <option value="TEST" className="bg-[#070b14]">Tests 1H</option>
                  <option value="STANDARD" className="bg-[#070b14]">Standard</option>
                  <option value="PREMIUM" className="bg-[#070b14]">Premium 4K</option>
                  <option value="VIP" className="bg-[#070b14]">VIP+</option>
                </select>
              </div>

              {/* Date Select */}
              <div className="flex items-center bg-[#070b14] border border-white/10 rounded-xl px-3.5">
                <span className="text-[11px] font-black uppercase text-gray-400 shrink-0 mr-2">Période:</span>
                <select
                  value={dateFilter}
                  onChange={(e) => setDateFilter(e.target.value)}
                  className="bg-transparent border-0 text-xs py-2.5 w-full font-bold text-gray-300 focus:outline-none"
                >
                  <option value="ALL" className="bg-[#070b14]">Toutes</option>
                  <option value="TODAY" className="bg-[#070b14]">Aujourd&apos;hui</option>
                  <option value="WEEK" className="bg-[#070b14]">7 Derniers jours</option>
                  <option value="MONTH" className="bg-[#070b14]">Ce Mois</option>
                </select>
              </div>
            </div>

            {/* Bulk actions bar (shows when selectedIds has items) */}
            {selectedIds.length > 0 && (
              <div
                className="bg-[#9333ea]/10 border border-[#a855f7]/30 rounded-xl p-4 mb-6 flex flex-col sm:flex-row items-center justify-between gap-4 z-20"
              >
                <div className="flex items-center gap-2">
                  <span className="bg-[#9333ea] text-white text-[11px] font-black px-2.5 py-1 rounded-full">
                    {selectedIds.length} sélectionné(s)
                  </span>
                  <span className="text-xs text-gray-300 font-semibold">Actions groupées :</span>
                </div>
                
                <div className="flex flex-wrap gap-2.5 items-center">
                  <select
                    onChange={(e) => {
                      if (e.target.value) handleBulkStatusChange(e.target.value)
                      e.target.value = ""
                    }}
                    className="bg-[#070b14] border border-[#a855f7]/30 rounded-lg text-xs py-1.5 px-3 font-bold text-white focus:outline-none"
                  >
                    <option value="">Modifier Statut...</option>
                    <option value="PENDING">En attente (Pending)</option>
                    <option value="CONFIRMED">Confirmé (Confirmed)</option>
                    <option value="COMPLETED">Livré (Completed)</option>
                    <option value="CANCELLED">Annulé (Cancelled)</option>
                  </select>
                  
                  <button
                    onClick={handleBulkDelete}
                    className="bg-red-500/10 hover:bg-red-500 text-red-400 hover:text-white border border-red-500/20 rounded-lg text-xs py-1.5 px-3 font-bold flex items-center gap-1.5 transition-all"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    Supprimer
                  </button>
                  
                  <button
                    onClick={() => setSelectedIds([])}
                    className="text-gray-300 hover:text-white text-xs font-bold px-2 py-1 transition-colors"
                  >
                    Annuler
                  </button>
                </div>
              </div>
            )}

            {/* Table */}
            {filteredOrders.length === 0 ? (
              <div className="py-20 text-center text-gray-400 flex flex-col items-center justify-center gap-2">
                <Info className="w-8 h-8 text-gray-400" />
                <p className="text-base font-bold">Aucune commande ou demande trouvée</p>
                <p className="text-xs text-gray-400">Ajustez vos filtres de recherche ou de période</p>
              </div>
            ) : (
              <div className="overflow-x-auto -mx-6 md:-mx-8">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-white/5 text-[11px] font-black uppercase tracking-wider text-gray-400">
                      {/* Checkbox select all */}
                      <th className="px-6 md:px-8 pb-4 w-12">
                        <input
                          type="checkbox"
                          checked={selectedIds.length === filteredOrders.length}
                          onChange={(e) => handleSelectAll(e.target.checked)}
                          className="w-4.5 h-4.5 accent-[#a855f7] rounded border-white/10"
                        />
                      </th>
                      
                      <th className="px-4 pb-4">Client</th>
                      
                      <th className="px-4 pb-4 cursor-pointer hover:text-white transition-colors" onClick={() => toggleSort("planPrice")}>
                        <div className="flex items-center gap-1">
                          Tarif
                          <ArrowUpDown className="w-3 h-3 text-gray-400" />
                        </div>
                      </th>
                      
                      <th className="px-4 pb-4">Statut</th>
                      
                      <th className="px-4 pb-4 cursor-pointer hover:text-white transition-colors" onClick={() => toggleSort("createdAt")}>
                        <div className="flex items-center gap-1">
                          Date
                          <ArrowUpDown className="w-3 h-3 text-gray-400" />
                        </div>
                      </th>
                      
                      <th className="px-4 pb-4">Contact direct</th>
                      <th className="px-6 md:px-8 pb-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {filteredOrders.map((order) => {
                      const isTest = parseFloat(order.planPrice) === 0 || order.planName.toLowerCase().includes("test")
                      const isSelected = selectedIds.includes(order.id)
                      
                      return (
                        <tr
                          key={order.id}
                          onClick={() => setSelectedOrder(order)}
                          className={`hover:bg-white/[0.02] cursor-pointer transition-colors group ${
                            isSelected ? "bg-white/[0.01]" : ""
                          }`}
                        >
                          {/* Checkbox */}
                          <td className="px-6 md:px-8 py-4.5" onClick={(e) => e.stopPropagation()}>
                            <input
                              type="checkbox"
                              checked={isSelected}
                              onChange={(e) => handleSelectId(order.id, e.target.checked)}
                              className="w-4.5 h-4.5 accent-[#a855f7] rounded border-white/10"
                            />
                          </td>
                          
                          {/* Client details */}
                          <td className="px-4 py-4.5">
                            <div>
                              <p className="font-bold text-white text-[15px] group-hover:text-[#a855f7] transition-colors">
                                {order.fullname}
                              </p>
                              <p className="text-[11px] text-gray-400 font-semibold mt-0.5">{order.email}</p>
                            </div>
                          </td>
                          
                          {/* Tarif */}
                          <td className="px-4 py-4.5">
                            <div className="space-y-0.5">
                              <p className="font-bold text-sm text-gray-200">
                                {order.planName}
                              </p>
                              <span className={`text-xs font-black inline-block px-2 py-0.5 rounded-full ${
                                isTest ? "bg-sky-500/10 text-sky-400" : "bg-[#9333ea]/10 text-[#a855f7]"
                              }`}>
                                {isTest ? "Essai" : `${order.planPrice}€`}
                              </span>
                            </div>
                          </td>
                          
                          {/* Statut Dropdown */}
                          <td className="px-4 py-4.5" onClick={(e) => e.stopPropagation()}>
                            <select
                              value={order.status}
                              onChange={(e) => handleUpdateStatus(order.id, e.target.value)}
                              className={`border rounded-xl text-[10px] py-1.5 px-3 font-black uppercase tracking-wider focus:outline-none bg-[#070b14] cursor-pointer ${
                                order.status === "PENDING"
                                  ? "text-amber-400 border-amber-400/20"
                                  : order.status === "CONFIRMED"
                                  ? "text-[#a855f7] border-[#a855f7]/20"
                                  : order.status === "COMPLETED"
                                  ? "text-green-300 border-green-400/20"
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
                          <td className="px-4 py-4.5 text-xs text-gray-300 font-medium">
                            {new Date(order.createdAt).toLocaleDateString("fr-FR", {
                              day: "2-digit",
                              month: "short",
                              hour: "2-digit",
                              minute: "2-digit"
                            })}
                          </td>
                          
                          {/* Contact buttons */}
                          <td className="px-4 py-4.5" onClick={(e) => e.stopPropagation()}>
                            <div className="flex gap-2">
                              <a
                                href={`https://wa.me/${order.phone.replace(/[^0-9]/g, "")}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-8.5 h-8.5 rounded-lg bg-green-500/10 hover:bg-green-500 text-green-300 hover:text-white border border-green-500/20 flex items-center justify-center transition-all"
                                title="WhatsApp"
                              >
                                <MessageCircle className="w-4 h-4" />
                              </a>
                              <a
                                href={`mailto:${order.email}?subject=Premium Match Ce Soir&body=Bonjour ${order.fullname},`}
                                className="w-8.5 h-8.5 rounded-lg bg-sky-500/10 hover:bg-sky-500 text-sky-400 hover:text-white border border-sky-500/20 flex items-center justify-center transition-all"
                                title="Email"
                              >
                                <Mail className="w-4 h-4" />
                              </a>
                            </div>
                          </td>
                          
                          {/* Trash button */}
                          <td className="px-6 md:px-8 py-4.5 text-right" onClick={(e) => e.stopPropagation()}>
                            <button
                              onClick={() => handleDeleteOrder(order.id)}
                              className="w-8.5 h-8.5 rounded-lg bg-red-500/10 hover:bg-red-500 text-red-400 hover:text-white border border-red-500/20 flex items-center justify-center transition-all opacity-0 group-hover:opacity-100 focus:opacity-100"
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
      )}

      {/* Manual Order Creation Modal */}
      {isAddModalOpen && (
        <>
          <div
            onClick={() => setIsAddModalOpen(false)}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
          />
          <div className="fixed inset-0 z-50 flex items-center justify-center px-4 pointer-events-none">
            <div
              className="bg-[#0d121f] border border-white/10 rounded-3xl w-full max-w-md p-6 pointer-events-auto shadow-2xl relative"
            >
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-0.5 bg-gradient-to-r from-transparent via-[#a855f7] to-transparent" />
              
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-black text-white uppercase">Ajouter manuellement</h2>
                <button onClick={() => setIsAddModalOpen(false)} className="text-gray-400 hover:text-white p-1" aria-label="Fermer">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleCreateOrder} className="space-y-4">
                <div>
                  <label className="text-[10px] font-black uppercase tracking-wider text-gray-300 block mb-1">
                    Nom complet
                  </label>
                  <input
                    type="text"
                    required
                    value={newOrderForm.fullname}
                    onChange={(e) => setNewOrderForm(prev => ({ ...prev, fullname: e.target.value }))}
                    placeholder="Jean Dupont"
                    className="w-full px-4 py-2.5 bg-[#070b14] border border-white/10 rounded-xl text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-[#9333ea] focus:border-transparent text-sm font-semibold"
                  />
                </div>

                <div>
                  <label className="text-[10px] font-black uppercase tracking-wider text-gray-300 block mb-1">
                    Adresse Email
                  </label>
                  <input
                    type="email"
                    required
                    value={newOrderForm.email}
                    onChange={(e) => setNewOrderForm(prev => ({ ...prev, email: e.target.value }))}
                    placeholder="jean.dupont@email.com"
                    className="w-full px-4 py-2.5 bg-[#070b14] border border-white/10 rounded-xl text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-[#9333ea] focus:border-transparent text-sm font-semibold"
                  />
                </div>

                <div>
                  <label className="text-[10px] font-black uppercase tracking-wider text-gray-300 block mb-1">
                    Téléphone (ex: +33600000000)
                  </label>
                  <input
                    type="text"
                    required
                    value={newOrderForm.phone}
                    onChange={(e) => setNewOrderForm(prev => ({ ...prev, phone: e.target.value }))}
                    placeholder="+33 6 12 34 56 78"
                    className="w-full px-4 py-2.5 bg-[#070b14] border border-white/10 rounded-xl text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-[#9333ea] focus:border-transparent text-sm font-semibold"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] font-black uppercase tracking-wider text-gray-300 block mb-1">
                      Forfait
                    </label>
                    <select
                      value={newOrderForm.planName}
                      onChange={(e) => {
                        const name = e.target.value
                        let price = "0"
                        if (name.includes("3 mois") && name.includes("Premium")) price = "25.99"
                        else if (name.includes("6 mois") && name.includes("Premium")) price = "35.99"
                        else if (name.includes("12 mois") && name.includes("Premium")) price = "55.99"
                        else if (name.includes("3 mois")) price = "16.99"
                        else if (name.includes("6 mois")) price = "24.99"
                        else if (name.includes("12 mois")) price = "35.99"
                        else if (name.includes("VIP")) price = "89.99"
                        
                        setNewOrderForm(prev => ({ ...prev, planName: name, planPrice: price }))
                      }}
                      className="w-full px-3 py-2.5 bg-[#070b14] border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-[#9333ea] focus:border-transparent text-xs font-bold"
                    >
                      <option value="1 heure d'essai gratuit">1 heure d'essai gratuit</option>
                      <option value="Abonnement Standard (3 mois)">Standard (3 mois)</option>
                      <option value="Abonnement Standard (6 mois)">Standard (6 mois)</option>
                      <option value="Abonnement Standard (12 mois)">Standard (12 mois)</option>
                      <option value="Abonnement Premium (3 mois)">Premium (3 mois)</option>
                      <option value="Abonnement Premium (6 mois)">Premium (6 mois)</option>
                      <option value="Abonnement Premium (12 mois)">Premium (12 mois)</option>
                      <option value="Abonnement VIP+ (12 mois)">VIP+ (12 mois)</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-[10px] font-black uppercase tracking-wider text-gray-300 block mb-1">
                      Tarif (€)
                    </label>
                    <input
                      type="text"
                      required
                      value={newOrderForm.planPrice}
                      onChange={(e) => setNewOrderForm(prev => ({ ...prev, planPrice: e.target.value }))}
                      className="w-full px-4 py-2.5 bg-[#070b14] border border-white/10 rounded-xl text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-[#9333ea] focus:border-transparent text-sm font-semibold"
                    />
                  </div>
                </div>

                <Button
                  type="submit"
                  className="w-full py-5 font-bold bg-[#9333ea] hover:bg-[#7e22ce] text-white rounded-xl mt-4"
                >
                  Ajouter le Lead
                </Button>
              </form>
            </div>
          </div>
        </>
      )}

      {selectedOrder && (
        <>
          <div
            onClick={() => setSelectedOrder(null)}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-40"
          />
          <div
            className="fixed top-0 right-0 h-full w-full max-w-md bg-[#0d121f] border-l border-white/10 p-6 overflow-y-auto z-40 shadow-2xl flex flex-col justify-between"
          >
            <div>
              <div className="flex justify-between items-center mb-8 pb-4 border-b border-white/5">
                <div>
                  <h2 className="text-lg font-black uppercase text-[#a855f7]">Détails du Lead</h2>
                  <p className="text-[10px] text-gray-400 font-bold font-mono">ID: {selectedOrder.id}</p>
                </div>
                <button onClick={() => setSelectedOrder(null)} className="text-gray-400 hover:text-white p-1" aria-label="Fermer">
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="space-y-6">
                {/* Client Info */}
                <div>
                  <h3 className="text-[10px] font-black uppercase tracking-widest text-[#a855f7] mb-3">Informations Client</h3>
                  <div className="bg-[#070b14] border border-white/5 rounded-2xl p-4 space-y-3.5">
                    <div>
                      <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider block">Nom Complet</span>
                      <span className="text-white text-sm font-extrabold">{selectedOrder.fullname}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider block">Adresse E-mail</span>
                      <span className="text-white text-sm font-extrabold break-all">{selectedOrder.email}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider block">Téléphone</span>
                      <span className="text-white text-sm font-extrabold">{selectedOrder.phone}</span>
                    </div>
                  </div>
                </div>

                {/* Order Details */}
                <div>
                  <h3 className="text-[10px] font-black uppercase tracking-widest text-[#a855f7] mb-3">Détails Forfait</h3>
                  <div className="bg-[#070b14] border border-white/5 rounded-2xl p-4 space-y-3.5">
                    <div>
                      <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider block">Nom du Pack</span>
                      <span className="text-white text-sm font-extrabold">{selectedOrder.planName}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider block">Tarif</span>
                      <span className="text-white text-sm font-extrabold">{selectedOrder.planPrice} €</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider block font-mono">Date de création</span>
                      <span className="text-gray-300 text-xs font-semibold">{new Date(selectedOrder.createdAt).toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                {/* Actions & Status */}
                <div>
                  <h3 className="text-[10px] font-black uppercase tracking-widest text-[#a855f7] mb-3">Statut &amp; Suivi</h3>
                  <div className="bg-[#070b14] border border-white/5 rounded-2xl p-4 space-y-4">
                    <div>
                      <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider block mb-2">Modifier le Statut</span>
                      <select
                        value={selectedOrder.status}
                        onChange={(e) => handleUpdateStatus(selectedOrder.id, e.target.value)}
                        className={`w-full px-3 py-2 bg-[#070b14] border rounded-xl font-extrabold text-xs focus:outline-none focus:ring-1 focus:ring-[#9333ea] ${
                          selectedOrder.status === "PENDING"
                            ? "text-yellow-400 border-yellow-400/20"
                            : selectedOrder.status === "CONFIRMED"
                            ? "text-sky-400 border-sky-400/20"
                            : selectedOrder.status === "COMPLETED"
                            ? "text-green-300 border-green-400/20"
                            : "text-red-400 border-red-400/20"
                        }`}
                      >
                        <option value="PENDING">Pending (En Attente)</option>
                        <option value="CONFIRMED">Confirmed (Confirmé)</option>
                        <option value="COMPLETED">Completed (Livré)</option>
                        <option value="CANCELLED">Cancelled (Annulé)</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Action buttons footer */}
            <div className="pt-6 border-t border-white/5 space-y-3">
              <a
                href={`https://wa.me/${selectedOrder.phone.replace(/[^0-9]/g, "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-4.5 rounded-xl bg-green-500 text-white font-black text-center flex items-center justify-center gap-2 hover:bg-green-600 transition-colors shadow-lg shadow-green-500/10"
              >
                <MessageCircle className="w-5 h-5" />
                Contacter sur WhatsApp
              </a>
              
              <a
                href={`mailto:${selectedOrder.email}?subject=Abonnement Premium Match Ce Soir&body=Bonjour ${selectedOrder.fullname},`}
                className="w-full py-4.5 rounded-xl bg-sky-500 text-white font-black text-center flex items-center justify-center gap-2 hover:bg-sky-600 transition-colors shadow-lg shadow-sky-500/10"
              >
                <Mail className="w-5 h-5" />
                Envoyer un e-mail
              </a>

              <button
                onClick={() => handleDeleteOrder(selectedOrder.id)}
                className="w-full py-4 rounded-xl border border-red-500/20 hover:bg-red-500/5 hover:text-red-400 text-red-500 font-bold transition-all"
              >
                Supprimer ce Lead
              </button>
            </div>
          </div>
        </>
      )}
    </main>
  )
}
