"use client"

import { useState } from "react"
import { X, User, Mail, Phone, CheckCircle2, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import * as tiktokPixel from "@/lib/tiktokPixel"
import { useEffect } from "react"

interface OrderModalProps {
  isOpen: boolean
  onClose: () => void
  planName: string
  planPrice: string
  planDuration: string
}

const WHATSAPP_NUMBER = "213781858983" // Replace with your actual number

export function OrderModal({ isOpen, onClose, planName, planPrice, planDuration }: OrderModalProps) {
  const [form, setForm] = useState({ fullname: "", email: "", phone: "" })
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  useEffect(() => {
    // Modal opens
  }, [isOpen])

  const validate = () => {
    const errs: Record<string, string> = {}
    if (!form.fullname.trim()) errs.fullname = "Votre nom est requis."
    if (!form.email.trim() || !/^[^@]+@[^@]+\.[^@]+$/.test(form.email)) errs.email = "Adresse e-mail invalide."
    if (!form.phone.trim() || form.phone.trim().length < 8) errs.phone = "Numéro de téléphone invalide."
    return errs
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length > 0) {
      setErrors(errs)
      return
    }
    setLoading(true)
    setErrors({})

    // Start database save in background (non-blocking)
    fetch("/api/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        fullname: form.fullname,
        email: form.email,
        phone: form.phone,
        planName: planName,
        planPrice: planPrice,
      }),
    }).catch((err) => console.error("Failed to save order to database:", err))

    // Set submitted state immediately to show success confirmation modal
    setLoading(false)
    setSubmitted(true)

    const message = encodeURIComponent(
      `Bonjour,\n\n` +
      `Je souhaite commander un abonnement Premium.\n\n` +
      `📦 Abonnement choisi : ${planName}\n\n` +
      `💶 Prix : ${planPrice}\n\n` +
      `⏳ Durée : ${planDuration}\n\n` +
      `Merci.`
    )

    // tracking
    if (planPrice.includes("Gratuit") || planName.toLowerCase().includes("essai")) {
      tiktokPixel.startTrial()
    } else {
      const numericPrice = parseFloat(planPrice.replace(/[^0-9.]/g, '')) || 0
      tiktokPixel.completePayment(planName, numericPrice.toString())
    }

    setTimeout(() => {
      window.location.href = `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`
      onClose()
      setSubmitted(false)
      setForm({ fullname: "", email: "", phone: "" })
    }, 600)
  }

  if (!isOpen) return null

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
        <div
          className="relative w-full max-w-md bg-[#0d121f] border border-white/10 rounded-3xl shadow-2xl overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Purple glow top */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-1 bg-gradient-to-r from-transparent via-[#a855f7] to-transparent" />

          {/* Header */}
          <div className="px-8 pt-8 pb-6 border-b border-white/5">
            <button
              onClick={onClose}
              className="absolute top-5 right-5 text-gray-400 hover:text-white transition-colors p-1 rounded-full hover:bg-white/5"
             aria-label="Fermer">
              <X className="w-5 h-5" />
            </button>
            <div className="inline-flex items-center gap-2 rounded-full border border-[#a855f7]/30 bg-[#9333ea]/10 px-3 py-1 text-xs font-semibold text-[#a855f7] mb-4">
              {planPrice === "0" || planName.toLowerCase().includes("essai") ? "Essai Découverte" : "Commander"}
            </div>
            <h3 className="text-2xl font-black text-white">
              {planPrice === "0" || planName.toLowerCase().includes("essai") ? "Demander votre essai" : "Finaliser votre commande"}
            </h3>
            <div className="text-gray-300 text-sm mt-1 flex flex-wrap items-baseline gap-x-1.5 gap-y-0.5">
              <span>Forfait sélectionné :</span>
              <span className="text-white font-semibold">{planName}</span>
              <span className="text-gray-400">—</span>
              <span className="text-xl md:text-2xl font-black text-[#a855f7]">
                {planPrice !== "0" && planPrice !== "Gratuit" ? `${planPrice}€` : "Gratuit"}
              </span>
            </div>
          </div>

          {/* Body */}
          <div className="px-8 py-6">
            {!submitted ? (
              <form
                onSubmit={handleSubmit}
                className="space-y-5"
              >
                {/* Full Name */}
                <div>
                  <label htmlFor="fullname" className="text-sm font-semibold text-gray-300 mb-2 block">Nom complet</label>
                  <div className="relative">
                    <User aria-hidden="true" className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      id="fullname"
                      name="fullname"
                      autoComplete="name"
                      type="text"
                      placeholder="Jean Dupont"
                      value={form.fullname}
                      onChange={(e) => setForm({ ...form, fullname: e.target.value })}
                      className={`w-full bg-[#070b14] border ${errors.fullname ? "border-red-500/60" : "border-white/10 focus:ring-2 focus:ring-[#9333ea] focus:border-transparent"} rounded-xl pl-11 pr-4 py-3 text-white text-sm placeholder:text-gray-400 outline-none transition-colors`}
                    />
                  </div>
                  {errors.fullname && <p className="text-red-400 text-xs mt-1">{errors.fullname}</p>}
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="email" className="text-sm font-semibold text-gray-300 mb-2 block">Adresse e-mail</label>
                  <div className="relative">
                    <Mail aria-hidden="true" className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      id="email"
                      name="email"
                      autoComplete="email"
                      type="email"
                      placeholder="jean@exemple.fr"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className={`w-full bg-[#070b14] border ${errors.email ? "border-red-500/60" : "border-white/10 focus:ring-2 focus:ring-[#9333ea] focus:border-transparent"} rounded-xl pl-11 pr-4 py-3 text-white text-sm placeholder:text-gray-400 outline-none transition-colors`}
                    />
                  </div>
                  {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
                </div>

                {/* Phone */}
                <div>
                  <label htmlFor="phone" className="text-sm font-semibold text-gray-300 mb-2 block">Numéro de téléphone</label>
                  <div className="relative">
                    <Phone aria-hidden="true" className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      id="phone"
                      name="phone"
                      autoComplete="tel"
                      type="tel"
                      placeholder="+33 6 00 00 00 00"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      className={`w-full bg-[#070b14] border ${errors.phone ? "border-red-500/60" : "border-white/10 focus:ring-2 focus:ring-[#9333ea] focus:border-transparent"} rounded-xl pl-11 pr-4 py-3 text-white text-sm placeholder:text-gray-400 outline-none transition-colors`}
                    />
                  </div>
                  {errors.phone && <p className="text-red-400 text-xs mt-1">{errors.phone}</p>}
                </div>

                {/* Guarantee Badge */}
                <div className="relative flex items-center gap-3 rounded-2xl border border-green-500/20 bg-green-500/5 px-4 py-3 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-green-500/10 via-transparent to-transparent pointer-events-none" />
                  <div className="shrink-0 w-9 h-9 rounded-xl bg-green-500/15 border border-green-500/30 flex items-center justify-center">
                    <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-green-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-green-400 font-bold text-sm">Support Premium</p>
                    <p className="text-gray-300 text-xs leading-snug">Équipe technique disponible et à votre écoute pour vous accompagner à tout moment.</p>
                  </div>
                </div>

                <div className="w-full mt-2">
                  <Button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-[#25D366] hover:bg-[#20bd5a] text-[#050505] rounded-xl py-6 text-base font-bold shadow-[0_0_20px_-5px_#25D366] hover:shadow-[0_0_30px_5px_#25D366] transition-shadow duration-300"
                  >
                    {loading ? (
                      <><Loader2 className="w-5 h-5 mr-2 animate-spin" /> Traitement en cours...</>
                    ) : (
                      <>{planPrice === "0" || planName.toLowerCase().includes("essai") ? "Obtenir mon Essai 🚀" : "Commander via WhatsApp 🚀"}</>
                    )}
                  </Button>
                </div>

                <p className="text-center text-xs text-gray-400">
                  {planPrice === "0" || planName.toLowerCase().includes("essai") ? "Vous serez redirigé vers WhatsApp pour recevoir votre lien." : "Vous serez redirigé vers WhatsApp avec votre commande pré-remplie."}
                </p>
              </form>
            ) : (
              <div
                className="flex flex-col items-center py-8 gap-4 text-center"
              >
                <div>
                  <CheckCircle2 className="w-20 h-20 text-green-300" />
                </div>
                <h4 className="text-2xl font-black text-white">Commande enregistrée !</h4>
                <p className="text-gray-300 text-sm">Redirection vers WhatsApp...</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}
