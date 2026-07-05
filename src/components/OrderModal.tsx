"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, User, Mail, Phone, CheckCircle2, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"

interface OrderModalProps {
  isOpen: boolean
  onClose: () => void
  planName: string
  planPrice: string
}

const WHATSAPP_NUMBER = "447848166907" // Replace with your actual number

export function OrderModal({ isOpen, onClose, planName, planPrice }: OrderModalProps) {
  const [form, setForm] = useState({ fullname: "", email: "", phone: "" })
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

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

    try {
      // Save to database via API
      await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullname: form.fullname,
          email: form.email,
          phone: form.phone,
          planName: planName,
          planPrice: planPrice,
        }),
      })
    } catch (err) {
      console.error("Failed to save order to database:", err)
    }

    setLoading(false)
    setSubmitted(true)

    // Build WhatsApp message
    const isTest = planPrice === "0" || planName.toLowerCase().includes("test")
    const message = encodeURIComponent(
      isTest
        ? `Bonjour Match Ce Soir Fr 👋\n\nJe souhaite demander un test gratuit de 1 heure :\n\n` +
          `📦 Forfait : ${planName}\n` +
          `👤 Nom complet : ${form.fullname}\n` +
          `📧 Email : ${form.email}\n` +
          `📱 Téléphone : ${form.phone}\n\n` +
          `Merci de m'envoyer mes accès de test !`
        : `Bonjour Match Ce Soir Fr 👋\n\nJe souhaite commander l'abonnement suivant :\n\n` +
          `📦 Forfait : ${planName} (${planPrice}€)\n` +
          `👤 Nom complet : ${form.fullname}\n` +
          `📧 Email : ${form.email}\n` +
          `📱 Téléphone : ${form.phone}\n\n` +
          `Merci de confirmer ma commande !`
    )

    setTimeout(() => {
      window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`, "_blank")
      onClose()
      setSubmitted(false)
      setForm({ fullname: "", email: "", phone: "" })
    }, 1500)
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Modal */}
          <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
            <motion.div
              key="modal"
              className="relative w-full max-w-md bg-[#0d121f] border border-white/10 rounded-3xl shadow-2xl overflow-hidden"
              initial={{ opacity: 0, y: 60, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 40, scale: 0.95 }}
              transition={{ type: "spring", stiffness: 280, damping: 28 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Purple glow top */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-1 bg-gradient-to-r from-transparent via-[#a855f7] to-transparent" />

              {/* Header */}
              <div className="px-8 pt-8 pb-6 border-b border-white/5">
                <button
                  onClick={onClose}
                  className="absolute top-5 right-5 text-gray-500 hover:text-white transition-colors p-1 rounded-full hover:bg-white/5"
                >
                  <X className="w-5 h-5" />
                </button>
                <div className="inline-flex items-center gap-2 rounded-full border border-[#a855f7]/30 bg-[#a855f7]/10 px-3 py-1 text-xs font-semibold text-[#a855f7] mb-4">
                  {planPrice === "0" || planName.toLowerCase().includes("test") ? "Test Gratuit" : "Commander"}
                </div>
                <h3 className="text-2xl font-black text-white">
                  {planPrice === "0" || planName.toLowerCase().includes("test") ? "Demander votre test" : "Finaliser votre commande"}
                </h3>
                <div className="text-gray-400 text-sm mt-1 flex flex-wrap items-baseline gap-x-1.5 gap-y-0.5">
                  <span>Forfait sélectionné :</span>
                  <span className="text-white font-semibold">{planName}</span>
                  <span className="text-gray-500">—</span>
                  <span className="text-xl md:text-2xl font-black text-[#a855f7]">
                    {planPrice !== "0" && planPrice !== "Gratuit" ? `${planPrice}€` : "Offert (1H)"}
                  </span>
                </div>
              </div>

              {/* Body */}
              <div className="px-8 py-6">
                <AnimatePresence mode="wait">
                  {!submitted ? (
                    <motion.form
                      key="form"
                      onSubmit={handleSubmit}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="space-y-5"
                    >
                      {/* Full Name */}
                      <div>
                        <label className="text-sm font-semibold text-gray-300 mb-2 block">Nom complet</label>
                        <div className="relative">
                          <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                          <input
                            type="text"
                            placeholder="Jean Dupont"
                            value={form.fullname}
                            onChange={(e) => setForm({ ...form, fullname: e.target.value })}
                            className={`w-full bg-[#070b14] border ${errors.fullname ? "border-red-500/60" : "border-white/10 focus:border-[#a855f7]/60"} rounded-xl pl-11 pr-4 py-3 text-white text-sm placeholder:text-gray-600 outline-none transition-colors`}
                          />
                        </div>
                        {errors.fullname && <p className="text-red-400 text-xs mt-1">{errors.fullname}</p>}
                      </div>

                      {/* Email */}
                      <div>
                        <label className="text-sm font-semibold text-gray-300 mb-2 block">Adresse e-mail</label>
                        <div className="relative">
                          <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                          <input
                            type="email"
                            placeholder="jean@exemple.fr"
                            value={form.email}
                            onChange={(e) => setForm({ ...form, email: e.target.value })}
                            className={`w-full bg-[#070b14] border ${errors.email ? "border-red-500/60" : "border-white/10 focus:border-[#a855f7]/60"} rounded-xl pl-11 pr-4 py-3 text-white text-sm placeholder:text-gray-600 outline-none transition-colors`}
                          />
                        </div>
                        {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
                      </div>

                      {/* Phone */}
                      <div>
                        <label className="text-sm font-semibold text-gray-300 mb-2 block">Numéro de téléphone</label>
                        <div className="relative">
                          <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                          <input
                            type="tel"
                            placeholder="+33 6 00 00 00 00"
                            value={form.phone}
                            onChange={(e) => setForm({ ...form, phone: e.target.value })}
                            className={`w-full bg-[#070b14] border ${errors.phone ? "border-red-500/60" : "border-white/10 focus:border-[#a855f7]/60"} rounded-xl pl-11 pr-4 py-3 text-white text-sm placeholder:text-gray-600 outline-none transition-colors`}
                          />
                        </div>
                        {errors.phone && <p className="text-red-400 text-xs mt-1">{errors.phone}</p>}
                      </div>

                      {/* Guarantee Badge */}
                      <div className="relative flex items-center gap-3 rounded-2xl border border-green-500/20 bg-green-500/5 px-4 py-3 overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-r from-green-500/10 via-transparent to-transparent pointer-events-none" />
                        <div className="shrink-0 w-9 h-9 rounded-xl bg-green-500/15 border border-green-500/30 flex items-center justify-center">
                          <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                          </svg>
                        </div>
                        <div>
                          <p className="text-green-400 font-bold text-sm">Garantie 7 jours</p>
                          <p className="text-gray-400 text-xs leading-snug">Remboursement intégral si vous n&apos;êtes pas satisfait dans les 7 jours suivant votre achat.</p>
                        </div>
                      </div>

                      <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} className="w-full mt-2">
                        <Button
                          type="submit"
                          disabled={loading}
                          className="w-full bg-[#25D366] hover:bg-[#20bd5a] text-white rounded-xl py-6 text-base font-bold shadow-[0_0_20px_-5px_#25D366] hover:shadow-[0_0_30px_5px_#25D366] transition-shadow duration-300"
                        >
                          {loading ? (
                            <><Loader2 className="w-5 h-5 mr-2 animate-spin" /> Traitement en cours...</>
                          ) : (
                            <>{planPrice === "0" || planName.toLowerCase().includes("test") ? "Obtenir mon Test Gratuit 🚀" : "Commander via WhatsApp 🚀"}</>
                          )}
                        </Button>
                      </motion.div>

                      <p className="text-center text-xs text-gray-600">
                        {planPrice === "0" || planName.toLowerCase().includes("test") ? "Vous serez redirigé vers WhatsApp pour recevoir votre lien de test." : "Vous serez redirigé vers WhatsApp avec votre commande pré-remplie."}
                      </p>
                    </motion.form>
                  ) : (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ type: "spring", stiffness: 200 }}
                      className="flex flex-col items-center py-8 gap-4 text-center"
                    >
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 300, delay: 0.1 }}
                      >
                        <CheckCircle2 className="w-20 h-20 text-green-400" />
                      </motion.div>
                      <h4 className="text-2xl font-black text-white">Commande enregistrée !</h4>
                      <p className="text-gray-400 text-sm">Redirection vers WhatsApp...</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  )
}
