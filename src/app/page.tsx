import { Header } from "@/components/Header"
import { PricingCTA } from "@/components/PricingCTA"
import { HomeTracker } from "@/components/HomeTracker"
import { Card, CardContent } from "@/components/ui/card"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import {
  CheckCircle2, MessageCircle, Tv, MonitorPlay, HeadphonesIcon,
  Activity, Shield, Zap, Globe, Mail, Phone, Smartphone, Laptop, Monitor, Boxes,
  ArrowRight, Clock, Menu, X
} from "lucide-react"
import { AnimatedHero } from "@/components/AnimatedHero"

import * as tiktokPixel from "@/lib/tiktokPixel"

const WHATSAPP_NUMBER = "213781858983"
const WHATSAPP_LINK = `https://wa.me/${WHATSAPP_NUMBER}`

const features = [
  "Qualité HD / Full HD / 4K",
  "+35 000 Chaînes",
  "+20 000 Films, Séries & Famille",
  "Compatible avec toutes les applications",
  "Stable 100%",
  "Support 24/7"
]
const plans = [
  { name: "3 mois",  price: "16.99", duration: "3 mois",  features, highlighted: false },
  { name: "6 mois",  price: "24.99", duration: "6 mois",  features, highlighted: false },
  { name: "12 mois", price: "35.99", duration: "12 mois", features, highlighted: true  },
]

const premiumFeatures = [
  "Qualité HD / Full HD / 4K",
  "+75 000 Chaînes",
  "+35 000 Films, Séries & Famille",
  "Compatible avec toutes les applications",
  "Stable 100%",
  "Support 24/7"
]

const premiumPlans = [
  { name: "3 mois",  price: "25.99", duration: "3 mois",  features: premiumFeatures, highlighted: false },
  { name: "6 mois",  price: "35.99", duration: "6 mois",  features: premiumFeatures, highlighted: false },
  { name: "12 mois", price: "55.99", duration: "12 mois", features: premiumFeatures, highlighted: true  },
]

const vipFeatures = [
  "+160 000 Chaînes TV",
  "+100 000 Films, Séries, Sports",
  "Qualité d'image 4K / Ultra HD",
  "Catch Up / EPG",
  "Mise à jour automatique",
  "Serveur Stable à 100%"
]

export default function Home() {

  return (
    <main className="flex-1 flex flex-col bg-[#050505]">

      <Header />

      {/* Hero */}
      <div id="hero">
        <AnimatedHero />
      </div>

      {/* Stats */}
      <section className="py-16 border-b border-white/5 bg-[#0a0a0a]">
        <div className="container mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { icon: <Tv className="w-8 h-8" />, value: "+65K", label: "Sports en Direct, Films & Séries" },
            { icon: <MonitorPlay className="w-8 h-8" />, value: "4K UHD", label: "Qualité d'image" },
            { icon: <HeadphonesIcon className="w-8 h-8" />, value: "24/7", label: "Support Client" },
            { icon: <Activity className="w-8 h-8" />, value: "99.9%", label: "Disponibilité" },
          ].map((stat, i) => (
            <div key={i} className="flex flex-col items-center gap-4">
              <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br from-[#a855f7]/20 to-transparent border border-[#a855f7]/30 flex items-center justify-center text-[#a855f7]">
                {stat.icon}
              </div>
              <div>
                <h3 className="text-2xl sm:text-4xl font-black text-white">{stat.value}</h3>
                <p className="text-sm text-gray-400 font-medium mt-1">{stat.label}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Channels */}
      <section className="py-20 bg-[#0a0a0a] border-y border-white/5">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-4xl font-bold text-white mb-4">Chaînes Populaires Incluses</h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Accédez en direct et en haute définition aux chaînes et plateformes majeures du sport, cinéma et divertissement.
            </p>
          </div>

                                            {/* Desktop Category Grid */}
              <div className="hidden md:block bg-[#0d1929] rounded-3xl p-6 border border-white/5">
                <div className="grid grid-cols-4 gap-4">
                  {[
                    { id: 'sports', name: 'Sports en Direct', color: '#a855f7', src: '/channels/logo_sports.webp' },
                    { id: 'cinema', name: 'Cinéma Premium', color: '#00d4ff', src: '/channels/logo_cinema.webp' },
                    { id: 'series', name: 'Séries TV', color: '#e63946', src: '/channels/logo_series.webp' },
                    { id: 'general', name: 'Généraliste', color: '#ff2d55', src: '/channels/logo_generaliste.webp' },
                    { id: 'info', name: 'Information', color: '#f72585', src: '/channels/logo_info.webp' },
                    { id: 'docs', name: 'Documentaires', color: '#ff9500', src: '/channels/logo_docs.webp' },
                    { id: 'jeunesse', name: 'Jeunesse', color: '#00b4d8', src: '/channels/logo_jeunesse.webp' },
                    { id: 'musique', name: 'Musique', color: '#7b2ff7', src: '/channels/logo_musique.webp' }
                  ].map((cat) => (
                    <div
                      key={cat.id}
                      className="channel-card group relative bg-black rounded-2xl border border-white/10 aspect-video flex items-center justify-center overflow-hidden cursor-pointer transition-all duration-300 shadow-md hover:border-[var(--hover-color)]"
                      style={{ '--hover-color': cat.color } as React.CSSProperties}
                    >
                      <img src={cat.src} alt={cat.name} width={400} height={225} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end justify-center pb-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <span className="text-white font-bold text-sm">{cat.name}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Mobile Category Grid */}
              <div className="block md:hidden bg-[#0d1929] rounded-2xl p-3 border border-white/5 mx-2 shadow-inner">
                <div className="grid grid-cols-2 gap-2.5">
                  {[
                    { id: 'sports', src: '/channels/logo_sports_mobile.webp' },
                    { id: 'cinema', src: '/channels/logo_cinema_mobile.webp' },
                    { id: 'series', src: '/channels/logo_series_mobile.webp' },
                    { id: 'general', src: '/channels/logo_generaliste_mobile.webp' },
                    { id: 'info', src: '/channels/logo_info_mobile.webp' },
                    { id: 'docs', src: '/channels/logo_docs_mobile.webp' },
                    { id: 'jeunesse', src: '/channels/logo_jeunesse_mobile.webp' },
                    { id: 'musique', src: '/channels/logo_musique_mobile.webp' }
                  ].map((cat) => (
                    <div
                      key={cat.id}
                      className="relative bg-[#0d121f] rounded-xl border border-white/10 aspect-square overflow-hidden shadow-lg"
                    >
                      <img
                        src={cat.src}
                        alt={cat.id}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              </div>
          <div className="text-center mt-12">
            <a
              href="/chaines"
              className="inline-flex items-center justify-center bg-[#a855f7] hover:bg-[#9333ea] text-white rounded-full px-8 py-5 text-base md:text-lg font-bold shadow-[0_0_30px_rgba(168,85,247,0.3)] hover:shadow-[0_0_45px_rgba(168,85,247,0.5)] transition-all duration-300 gap-2.5 group cursor-pointer"
              aria-label="Explorer toutes nos chaînes"
            >
              <span>Explorer toutes nos chaînes</span>
              <svg
                className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={3}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </a>
          </div>

        </div>
      </section>

      {/* How to Install */}
      <section id="comment-installer" className="py-20 bg-[#0a0a0a] border-t border-white/5 scroll-mt-16">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Guide d'Installation Simple</h2>
            <p className="text-gray-400">Une configuration simple en 3 étapes, compatible avec tous vos appareils.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 text-center">
            {[
              { step: "1", title: "Choisissez un Forfait", desc: "Sélectionnez l'abonnement qui vous convient et effectuez votre paiement sécurisé." },
              { step: "2", title: "Recevez vos Identifiants", desc: "Recevez instantanément vos identifiants de connexion par e-mail et WhatsApp." },
              { step: "3", title: "Profitez du Service", desc: "Installez l'application sur votre Smart TV, PC ou Smartphone et commencez à regarder." },
            ].map((s) => (
              <div key={s.step} className="flex flex-col items-center">
                <div className="w-16 h-16 bg-[#050505] border border-[#a855f7]/30 rounded-full flex items-center justify-center mb-6 shadow-[0_0_15px_-5px_#a855f7]">
                  <span className="text-2xl font-black text-[#a855f7]">{s.step}</span>
                </div>
                <h4 className="text-xl font-bold text-white mb-3">{s.title}</h4>
                <p className="text-gray-500 text-sm">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="abonnements" className="py-24 bg-[#050505] relative scroll-mt-16">
        <div className="hidden md:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-[#a855f7]/8 blur-[120px] rounded-full pointer-events-none" />
        <div className="container mx-auto px-4 relative z-10">

          {/* Main Pricing Introduction */}
          <div className="text-center mb-20 mx-auto">
            <h2 className="text-2xl sm:text-4xl md:text-6xl lg:text-7xl font-black mb-6 text-white tracking-tight uppercase">
              NOS OFFRES DE DIVERTISSEMENT
            </h2>
            <p className="text-gray-300 text-base md:text-xl leading-relaxed font-medium">
              Choisissez notre abonnement Premium 4K <strong className="text-[#a855f7]">Match Ce Soir Fr</strong> et plongez dans une expérience de divertissement total. Profitez d'un accès à des milliers de chaînes de Sport en Direct, Films Récents, Séries TV, et Divertissement en Famille, le tout en qualité exceptionnelle HD, UHD et 4K. Conçu pour les utilisateurs exigeants, cet abonnement vous offre une stabilité parfaite, une qualité d’image irréprochable et une grande variété de contenus.
            </p>
            <div className="mt-12 relative rounded-3xl overflow-hidden border border-white/10 shadow-2xl group max-w-2xl mx-auto">
              <img 
                src="/packs-banner.webp" 
                alt="Nos Packs Abonnement Premium - Match Ce Soir Fr" 
                className="w-full h-auto object-contain rounded-3xl transition-transform duration-700 group-hover:scale-[1.02]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
            </div>
          </div>

          {/* Title */}
          <div id="tarifs" className="text-center mb-10 border-t border-white/5 pt-12 scroll-mt-16">
            <h3 className="text-3xl md:text-5xl font-black mb-4 text-white tracking-tight">Abonnement Standard</h3>
            <p className="text-gray-400 text-base max-w-2xl mx-auto">Paiement unique, activation immédiate, sans aucun contrat.</p>
          </div>

          {/* Trust badges */}
          <div className="flex flex-wrap justify-center gap-3 mb-14">
            <span className="trust-badge px-5 py-2 bg-green-500 text-white rounded-full text-sm font-bold flex items-center gap-2 shadow-lg">
              <CheckCircle2 className="w-4 h-4" /> Support Client Réactif
            </span>
            <span className="trust-badge px-5 py-2 bg-[#a855f7] text-white rounded-full text-sm font-bold flex items-center gap-2 shadow-lg">
              <Shield className="w-4 h-4" /> Paiement sécurisé
            </span>
            <span className="trust-badge px-5 py-2 bg-orange-500 text-white rounded-full text-sm font-bold flex items-center gap-2 shadow-lg">
              <Zap className="w-4 h-4" /> Livraison rapide
            </span>
          </div>

          {/* Cards */}
          <style>{`
            @keyframes badgePulse {
              0%, 100% { box-shadow: 0 0 0 0 rgba(239,68,68,0.5), 0 0 12px rgba(239,68,68,0.4); }
              50% { box-shadow: 0 0 0 6px rgba(239,68,68,0), 0 0 24px rgba(239,68,68,0.6); }
            }
            .badge-pulse { animation: badgePulse 2s ease-in-out infinite; }
            .channel-card {
              transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), border-color 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important;
              position: relative;
              transform: scale(1) !important;
            }
            .channel-card:hover {
              transform: scale(1.15) !important;
              border-color: #a855f7 !important;
              z-index: 50 !important;
            }
            .trust-badge {
              transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important;
              cursor: pointer;
            }
            .trust-badge:hover {
              transform: scale(1.15) !important;
              box-shadow: 0 12px 20px -5px rgba(0, 0, 0, 0.3) !important;
            }
          `}</style>
          <div className="grid md:grid-cols-3 gap-5 max-w-5xl mx-auto">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className={`relative flex flex-col rounded-2xl transition-all duration-300 hover:-translate-y-1 ${
                  plan.highlighted
                    ? "bg-gradient-to-b from-[#7c3aed] to-[#5b21b6] shadow-[0_0_40px_-10px_#a855f7]"
                    : "bg-[#151c2c] border border-white/10 hover:border-white/20"
                }`}
              >
                {/* Popular badge */}
                {plan.highlighted && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-20">
                    <span className="badge-pulse bg-red-500 text-white text-xs font-black px-5 py-2 rounded-full uppercase tracking-widest whitespace-nowrap flex items-center gap-2 shadow-xl">
                      👑 LE PLUS POPULAIRE
                    </span>
                  </div>
                )}

                <div className={`p-7 flex flex-col flex-1 ${plan.highlighted ? "pt-8" : ""}`}>
                  {/* Header */}
                  <div className="text-center mb-6 pb-6 border-b border-white/10">
                    <h3 className={`text-xl font-black mb-1 ${plan.highlighted ? "text-white" : "text-white"}`}>
                      Standard {plan.name}
                    </h3>
                    <p className={`text-xs font-semibold tracking-widest uppercase mb-4 ${plan.highlighted ? "text-white/70" : "text-gray-500"}`}>
                      1 ÉCRAN
                    </p>
                    <div className="flex justify-center items-start gap-0.5">
                      <span className={`text-2xl font-bold mt-2 ${plan.highlighted ? "text-white" : "text-white/90"}`}>€</span>
                      <span className={`font-black leading-none tracking-tighter ${
                        plan.highlighted ? "text-6xl sm:text-7xl text-white" : "text-5xl sm:text-6xl text-white"
                      }`}>{plan.price.split('.')[0]}</span>
                      {plan.price.includes('.') && (
                        <span className={`text-2xl font-bold mt-2 ${plan.highlighted ? "text-white" : "text-white/90"}`}>
                          ,{plan.price.split('.')[1]}
                        </span>
                      )}
                    </div>
                    <p className={`text-sm mt-2 ${plan.highlighted ? "text-white/70" : "text-gray-500"}`}>{plan.duration}</p>
                  </div>

                  {/* Features */}
                  <ul className="space-y-3 mb-8 flex-1">
                    {plan.features.map((f, i) => (
                      <li key={i} className="flex items-center gap-3">
                        <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center shrink-0">
                          <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <span className={`text-sm font-medium ${plan.highlighted ? "text-white" : "text-gray-300"}`}>{f}</span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA */}
                  <PricingCTA
                    planName={"Standard " + plan.name}
                    planPrice={plan.price}
                    planDuration={plan.duration}
                    highlighted={plan.highlighted}
                  />

                  {/* Footer note */}
                  <p className={`text-center text-xs mt-4 ${plan.highlighted ? "text-white/60" : "text-gray-600"}`}>
                    Paiement unique • Sans engagement
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Premium Pricing Section */}
      <section id="abonnements-premium" className="py-24 bg-[#080808] relative border-t border-white/5">
        <div className="hidden md:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-[#ef4444]/6 blur-[120px] rounded-full pointer-events-none" />
        <div className="container mx-auto px-4 relative z-10">

          {/* Title */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 rounded-full border border-red-500/30 bg-red-500/10 px-4 py-1.5 text-sm font-semibold text-red-400 mb-4">
              🔥 LE CHOIX SUPRÊME
            </div>
            <h2 className="text-4xl md:text-6xl font-black mb-4 text-white tracking-tight">Premium 4K</h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              L&apos;expérience fluide ultime avec +75 000 chaînes mondiales et une bibliothèque de vidéos et programmes géante.
            </p>
          </div>

          {/* Trust badges */}
          <div className="flex flex-wrap justify-center gap-3 mb-14">
            <span className="trust-badge px-5 py-2 bg-green-500 text-white rounded-full text-sm font-bold flex items-center gap-2 shadow-lg">
              <CheckCircle2 className="w-4 h-4" /> Support Client Réactif
            </span>
            <span className="trust-badge px-5 py-2 bg-[#e11d48] text-white rounded-full text-sm font-bold flex items-center gap-2 shadow-lg">
              <Shield className="w-4 h-4" /> Stable à 100%
            </span>
            <span className="trust-badge px-5 py-2 bg-orange-500 text-white rounded-full text-sm font-bold flex items-center gap-2 shadow-lg">
              <Zap className="w-4 h-4" /> Support H24
            </span>
          </div>

          {/* Cards */}
          <div className="grid md:grid-cols-3 gap-5 max-w-5xl mx-auto">
            {premiumPlans.map((plan) => (
              <div
                key={plan.name}
                className={`relative flex flex-col rounded-2xl transition-all duration-300 hover:-translate-y-1 ${
                  plan.highlighted
                    ? "bg-gradient-to-b from-[#e11d48] to-[#9f1239] shadow-[0_0_40px_-10px_#e11d48]"
                    : "bg-[#181112] border border-white/10 hover:border-red-500/20"
                }`}
              >
                {/* Popular badge */}
                {plan.highlighted && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-20">
                    <span className="badge-pulse bg-white text-[#e11d48] text-xs font-black px-5 py-2 rounded-full uppercase tracking-widest whitespace-nowrap flex items-center gap-2 shadow-xl">
                      👑 LE PLUS POPULAIRE
                    </span>
                  </div>
                )}

                <div className={`p-7 flex flex-col flex-1 ${plan.highlighted ? "pt-8" : ""}`}>
                  {/* Header */}
                  <div className="text-center mb-6 pb-6 border-b border-white/10">
                    <h3 className="text-xl font-black mb-1 text-white">
                      Premium {plan.name}
                    </h3>
                    <p className={`text-xs font-semibold tracking-widest uppercase mb-4 ${plan.highlighted ? "text-white/70" : "text-gray-500"}`}>
                      1 ÉCRAN
                    </p>
                    <div className="flex justify-center items-start gap-0.5">
                      <span className={`text-2xl font-bold mt-2 ${plan.highlighted ? "text-white" : "text-white/90"}`}>€</span>
                      <span className={`font-black leading-none tracking-tighter ${
                        plan.highlighted ? "text-6xl sm:text-7xl text-white" : "text-5xl sm:text-6xl text-white"
                      }`}>{plan.price.split('.')[0]}</span>
                      {plan.price.includes('.') && (
                        <span className={`text-2xl font-bold mt-2 ${plan.highlighted ? "text-white" : "text-white/90"}`}>
                          ,{plan.price.split('.')[1]}
                        </span>
                      )}
                    </div>
                    <p className={`text-sm mt-2 ${plan.highlighted ? "text-white/70" : "text-gray-500"}`}>{plan.duration}</p>
                  </div>

                  {/* Features */}
                  <ul className="space-y-3 mb-8 flex-1">
                    {plan.features.map((f, i) => (
                      <li key={i} className="flex items-center gap-3">
                        <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center shrink-0">
                          <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <span className={`text-sm font-medium ${plan.highlighted ? "text-white" : "text-gray-300"}`}>{f}</span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA */}
                  <PricingCTA
                    planName={"Premium " + plan.name}
                    planPrice={plan.price}
                    planDuration={plan.duration}
                    highlighted={plan.highlighted}
                  >
                    ACHETER
                  </PricingCTA>

                  {/* Footer note */}
                  <p className={`text-center text-xs mt-4 ${plan.highlighted ? "text-white/60" : "text-gray-600"}`}>
                    Paiement unique • Sans engagement
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* VIP Pricing Section */}
      <section id="abonnement-vip" className="py-24 bg-[#040404] relative border-t border-white/5">
        <div className="hidden md:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#f59e0b]/5 blur-[120px] rounded-full pointer-events-none" />
        <div className="container mx-auto px-4 relative z-10">

          {/* Title */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#f59e0b]/30 bg-[#f59e0b]/10 px-4 py-1.5 text-sm font-semibold text-[#f59e0b] mb-4">
              ✨ OFFRE ÉLITE
            </div>
            <h2 className="text-2xl sm:text-4xl md:text-6xl font-black mb-4 text-white tracking-tight">VIP +</h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Le abonnement de haute qualité pour regarder la TV en direct et contenus en 4K/FHD, vidéos, programmes et sport en streaming fluide.
            </p>
          </div>

          {/* Single Centered VIP Card */}
          <div className="max-w-md mx-auto">
            <div className="relative flex flex-col rounded-3xl bg-gradient-to-b from-[#f59e0b] to-[#b45309] shadow-[0_0_50px_-10px_#f59e0b] p-8 border border-[#fbbf24]/30 hover:scale-[1.02] transition-transform duration-300">
              
              {/* Gold Crown popular badge */}
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-20">
                <span className="bg-white text-[#d97706] text-xs font-black px-6 py-2.5 rounded-full uppercase tracking-widest whitespace-nowrap flex items-center gap-2 shadow-xl">
                  👑 ACCÈS VIP PREMIUM
                </span>
              </div>

              <div className="flex flex-col flex-1 pt-4">
                {/* Header */}
                <div className="text-center mb-6 pb-6 border-b border-white/20">
                  <h3 className="text-2xl font-black mb-1 text-white">
                    VIP+ (12 mois)
                  </h3>
                  <p className="text-xs font-semibold tracking-widest uppercase mb-4 text-white/80">
                    ACCÈS EXCLUSIF • 1 AN
                  </p>
                  <div className="flex justify-center items-start gap-0.5">
                    <span className="text-2xl font-bold mt-2 text-white">€</span>
                    <span className="font-black leading-none tracking-tighter text-7xl text-white">89</span>
                    <span className="text-2xl font-bold mt-2 text-white">,99</span>
                  </div>
                  <p className="text-sm mt-2 text-white/80">Paiement annuel unique</p>
                </div>

                {/* Features */}
                <ul className="space-y-4 mb-8 flex-1">
                  {vipFeatures.map((f, i) => (
                    <li key={i} className="flex items-center gap-3">
                      <div className="w-6 h-6 rounded-full bg-white flex items-center justify-center shrink-0 shadow-sm">
                        <svg className="w-3.5 h-3.5 text-[#b45309]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={4}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span className="text-sm font-semibold text-white">{f}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <PricingCTA
                  planName="VIP+ (12 mois)"
                  planPrice="89.99"
                  planDuration="12 mois"
                  highlighted={true}
                  className="bg-white text-[#b45309] hover:bg-gray-100 shadow-[0_0_40px_-10px_#f59e0b] hover:shadow-[0_0_60px_-10px_#f59e0b]"
                >
                  Devenir VIP 🚀
                </PricingCTA>

                {/* Footer note */}
                <p className="text-center text-xs mt-4 text-white/70">
                  Activation prioritaire • Sans engagement
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Guarantee note */}
      <div className="bg-[#050505] py-8 border-b border-white/5">
        <p className="text-center text-gray-400 text-sm max-w-2xl mx-auto px-4 leading-relaxed">
          <strong className="text-white">Support Client Réactif :</strong> Testez notre service sans risque. Remboursement intégral sous 7 jours si vous n&apos;êtes pas satisfait. Après ce délai, aucun remboursement ne sera possible.
        </p>
      </div>

      {/* Device Compatibility */}
      <section id="compatibilite" className="py-20 bg-black text-center border-b border-white/5 scroll-mt-16">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-black text-white mb-4 tracking-tight">Compatible avec tous vos appareils</h2>
          <p className="text-gray-400 text-lg mb-12">Profitez de votre service de streaming sur n&apos;importe quel appareil, n&apos;importe où</p>

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4 mx-auto mb-10">
            {[
              { name: "Android", icon: <Smartphone className="w-7 h-7 text-white" /> },
              { name: "iOS", icon: <Smartphone className="w-7 h-7 text-white" /> },
              { name: "Smart TV", icon: <Tv className="w-7 h-7 text-white" /> },
              { name: "PC/Mac", icon: <Laptop className="w-7 h-7 text-white" /> },
              { name: "Firestick", icon: <Monitor className="w-7 h-7 text-white" /> },
              { name: "Android Box", icon: <Boxes className="w-7 h-7 text-white" /> },
              { name: "MAG", icon: <Boxes className="w-7 h-7 text-white" /> },
              { name: "Enigma2", icon: <Boxes className="w-7 h-7 text-white" /> },
            ].map((device, i) => (
              <div key={i} className="feature-card bg-white rounded-2xl py-6 px-4 flex flex-col items-center justify-center shadow-lg hover:scale-105 transition-all duration-300 cursor-pointer">
                <div className="feature-icon w-14 h-14 rounded-2xl bg-[#8c52ff] flex items-center justify-center shadow-[0_8px_24px_rgba(140,82,255,0.45)] mb-4">
                  {device.icon}
                </div>
                <span className="feature-title text-white font-black text-sm md:text-base leading-none">{device.name}</span>
              </div>
            ))}
          </div>

          <p className="text-gray-400 text-sm font-medium">
            Installation simple et rapide. Assistance incluse pour la configuration de vos appareils.
          </p>
        </div>
      </section>

      {/* Features Detail — single merged card */}
      <section id="fonctionnalites" className="py-24 bg-[#070707] scroll-mt-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-14">
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-black text-white mb-6">Fonctionnalités Premium</h2>
            <p className="text-gray-400 text-lg max-w-3xl mx-auto leading-relaxed">
              Découvrez pourquoi <strong className="text-white">Match Ce Soir Fr</strong> est le service de divertissement de référence en Europe. En tant que fournisseur du <strong className="text-white">abonnement de haute qualité</strong>, nous vous offrons une qualité de diffusion exceptionnelle, un accès illimité à des milliers de chaînes en direct, vidéos, programmes et événements sportifs. Que vous soyez passionné de football, de cinéma, de documentaires ou de divertissement, profitez d&apos;une expérience fluide, stable et d&apos;une immense bibliothèque de contenus du monde entier, réunie sur une seule plateforme.
            </p>
          </div>

          {/* One big feature card */}
          <div className="group relative bg-[#0d1929] border border-white/5 rounded-3xl p-5 sm:p-10 hover:border-[#a855f7]/30 transition-all duration-500 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-[#a855f7]/5 via-transparent to-[#7c3aed]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl" />
            <div className="hidden md:block absolute top-0 right-0 w-72 h-72 bg-[#a855f7]/5 blur-[80px] rounded-full pointer-events-none" />
            <div className="relative z-10">

              {/* Header */}
              <div className="flex flex-wrap items-center gap-3 mb-10">
                <h3 className="text-3xl md:text-4xl font-black text-white">matchcesoirfr</h3>
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#a855f7]/20 text-[#a855f7] border border-[#a855f7]/30">Tout-en-un</span>
              </div>

              {/* Features grid */}
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">

                {/* Prix */}
                <div className="feature-card group flex flex-col gap-3 bg-white text-white p-6 rounded-2xl shadow-sm border border-black/5 hover:scale-[1.02] transition-all duration-300">
                  <div className="feature-icon w-11 h-11 rounded-xl bg-[#a855f7]/10 flex items-center justify-center text-[#a855f7] shrink-0 transition-all duration-300 group-hover:bg-[#a855f7] group-hover:text-white group-hover:scale-110 group-hover:rotate-6">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h4 className="feature-title text-white font-bold text-lg">Prix Imbattables</h4>
                  <p className="text-gray-700 text-sm leading-relaxed">Brise les barrières avec des tarifs qui défient toute concurrence, sans jamais compromettre la qualité ou le service.</p>
                </div>

                {/* Support 24/7 */}
                <div className="feature-card group flex flex-col gap-3 bg-white text-white p-6 rounded-2xl shadow-sm border border-black/5 hover:scale-[1.02] transition-all duration-300">
                  <div className="feature-icon w-11 h-11 rounded-xl bg-[#a855f7]/10 flex items-center justify-center text-[#a855f7] shrink-0 transition-all duration-300 group-hover:bg-[#a855f7] group-hover:text-white group-hover:scale-110 group-hover:rotate-6">
                    <HeadphonesIcon className="w-5 h-5" />
                  </div>
                  <h4 className="feature-title text-white font-bold text-lg">Support 24/7</h4>
                  <p className="text-gray-700 text-sm leading-relaxed">Notre équipe est disponible 24h/24 et 7j/7 pour répondre à vos questions, vous guider dans l&apos;installation et résoudre tout problème technique.</p>
                </div>

                {/* Chaînes & VOD */}
                <div className="feature-card group flex flex-col gap-3 bg-white text-white p-6 rounded-2xl shadow-sm border border-black/5 hover:scale-[1.02] transition-all duration-300">
                  <div className="feature-icon w-11 h-11 rounded-xl bg-[#a855f7]/10 flex items-center justify-center text-[#a855f7] shrink-0 transition-all duration-300 group-hover:bg-[#a855f7] group-hover:text-white group-hover:scale-110 group-hover:rotate-6">
                    <Tv className="w-5 h-5" />
                  </div>
                  <h4 className="feature-title text-white font-bold text-lg">+65K Chaînes: Sports, Films, Famille</h4>
                  <p className="text-gray-700 text-sm leading-relaxed">Chaînes françaises, belges, suisses, arabes, sportives, documentaires et programmes enfants — une sélection pour chacun. Notre bibliothèque de Films et Séries TV est mise à jour quotidiennement en VF et VOSTFR.</p>
                </div>

                {/* HD & Stabilité */}
                <div className="feature-card group flex flex-col gap-3 bg-white text-white p-6 rounded-2xl shadow-sm border border-black/5 hover:scale-[1.02] transition-all duration-300">
                  <div className="feature-icon w-11 h-11 rounded-xl bg-[#a855f7]/10 flex items-center justify-center text-[#a855f7] shrink-0 transition-all duration-300 group-hover:bg-[#a855f7] group-hover:text-white group-hover:scale-110 group-hover:rotate-6">
                    <MonitorPlay className="w-5 h-5" />
                  </div>
                  <h4 className="feature-title text-white font-bold text-lg">Qualité HD & 4K UHD</h4>
                  <p className="text-gray-700 text-sm leading-relaxed">Imaginez une clarté d&apos;image si parfaite qu&apos;elle vous transporte au cœur de l&apos;action. Oubliez les interruptions — votre confort est notre priorité.</p>
                </div>

                {/* Anti-Freeze */}
                <div className="feature-card group flex flex-col gap-3 bg-white text-white p-6 rounded-2xl shadow-sm border border-black/5 hover:scale-[1.02] transition-all duration-300">
                  <div className="feature-icon w-11 h-11 rounded-xl bg-[#a855f7]/10 flex items-center justify-center text-[#a855f7] shrink-0 transition-all duration-300 group-hover:bg-[#a855f7] group-hover:text-white group-hover:scale-110 group-hover:rotate-6">
                    <Shield className="w-5 h-5" />
                  </div>
                  <h4 className="feature-title text-white font-bold text-lg">Technologie Anti-Freeze</h4>
                  <p className="text-gray-700 text-sm leading-relaxed">Serveurs européens surpuissants garantissant une diffusion fluide et sans buffering, même pendant les pics de trafic.</p>
                </div>

                {/* Contenu International */}
                <div className="feature-card group flex flex-col gap-3 bg-white text-white p-6 rounded-2xl shadow-sm border border-black/5 hover:scale-[1.02] transition-all duration-300">
                  <div className="feature-icon w-11 h-11 rounded-xl bg-[#a855f7]/10 flex items-center justify-center text-[#a855f7] shrink-0 transition-all duration-300 group-hover:bg-[#a855f7] group-hover:text-white group-hover:scale-110 group-hover:rotate-6">
                    <Globe className="w-5 h-5" />
                  </div>
                  <h4 className="feature-title text-white font-bold text-lg">Contenu International</h4>
                  <p className="text-gray-700 text-sm leading-relaxed">En tant que abonnement de haute qualité, notre plateforme vous donne un accès illimité à une bibliothèque mondiale de contenus, disponible partout et à tout moment.</p>
                </div>

              </div>
            </div>
          </div>

        </div>
      </section>





      {/* FAQ */}
      <section id="faq" className="py-24 bg-[#050505] border-t border-white/5 scroll-mt-16">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-black text-white mb-4">Questions Fréquentes</h2>
            <p className="text-gray-400">Tout ce que vous devez savoir sur notre service de divertissement.</p>
          </div>

          <div className="grid md:grid-cols-12 gap-8 items-center">
            {/* Left Column: Image */}
            <div className="md:col-span-5 relative group">
              <div className="absolute inset-0 bg-[#e11d48]/10 blur-2xl rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              <img 
                src="/faq-family.webp" 
                alt="Famille regardant la télévision" 
                className="w-full h-auto object-contain rounded-3xl border border-white/10 shadow-2xl relative z-10 transition-transform duration-500 group-hover:scale-[1.02]"
              />
            </div>

            {/* Right Column: Accordion */}
            <div className="md:col-span-7 bg-[#0d121f] border border-white/5 rounded-3xl p-6 md:p-8 shadow-2xl relative overflow-hidden">
              <div className="hidden md:block absolute top-0 right-0 w-48 h-48 bg-[#e11d48]/5 blur-3xl rounded-full pointer-events-none" />
              
              <Accordion className="w-full space-y-3 relative z-10">
                {[
                  { q: "Comment ça marche ?", a: "Après votre achat, vous recevez instantanément par email et WhatsApp vos identifiants de connexion. Il suffit de télécharger une application de lecture compatible (nous vous recommandons les meilleures), d'entrer vos identifiants, et de profiter de plus de 65 000 chaînes immédiatement." },
                  { q: "Modes de paiement disponibles ?", a: "Nous acceptons les modes de paiement sécurisés suivants : CashApp, PayPal, Credit Card (Cartes Bancaires) et Crypto." },
                  { q: "NOS OFFRES DE DIVERTISSEMENT", a: "Nos abonnements vous donnent accès à plus de 75 000 chaînes en direct et une immense bibliothèque de vidéos et programmes mis à jour quotidiennement en Full HD et 4K, sans engagement." },
                  { q: "Compatibilité Smart TV", a: "Compatible avec toutes les Smart TV (Samsung, LG, Sony, etc.). Il vous suffit d'installer une application de lecture (comme Smart One, IBO Player ou similaires) et d'entrer vos identifiants." },
                  { q: "Comment je reçois mon abonnement ?", a: "Après validation de votre paiement, vous recevez immédiatement un email contenant vos identifiants de connexion (nom d'utilisateur, mot de passe et URL du serveur). La livraison est instantanée." },
                  { q: "Que faire si mon abonnement ne fonctionne pas ?", a: "Notre équipe support est disponible 24/7 pour vous aider. Contactez-nous par WhatsApp, email ou via notre formulaire de contact. Nous résolvons généralement les problèmes en quelques minutes." },
                  { q: "Combien d'appareils puis-je utiliser simultanément ?", a: "Chaque abonnement permet une seule connexion simultanée. Vous pouvez installer l'application sur plusieurs appareils, mais vous ne pouvez utiliser qu'un seul appareil à la fois. Si vous essayez de vous connecter sur un second appareil, la première connexion sera automatiquement déconnectée." },
                ].map((item, i) => (
                  <AccordionItem key={i} value={`item-${i}`} className="bg-[#050505] border border-white/5 rounded-2xl px-6 data-[state=open]:border-[#a855f7]/30 transition-colors">
                    <AccordionTrigger className="text-[#a855f7] font-bold hover:no-underline py-5 text-left text-base md:text-lg w-full">
                      {item.q}
                    </AccordionTrigger>
                    <AccordionContent className="text-gray-300 pb-6 leading-relaxed text-sm">
                      {item.a}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-28 bg-[#050505] relative scroll-mt-16 overflow-hidden border-t border-white/5" style={{
        backgroundImage: `
          linear-gradient(to right, rgba(255, 255, 255, 0.02) 1px, transparent 1px),
          linear-gradient(to bottom, rgba(255, 255, 255, 0.02) 1px, transparent 1px)
        `,
        backgroundSize: '40px 40px'
      }}>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.1)_0%,transparent_70%)] pointer-events-none" />
        
        <div className="container mx-auto px-4 max-w-4xl relative z-10">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 rounded-full border border-sky-500/30 bg-sky-500/10 px-4 py-1.5 text-sm font-semibold text-sky-400 mb-6">
              <HeadphonesIcon className="w-4 h-4" /> Contact & Support
            </div>
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-black text-white mb-4">Besoin d'aide ?</h2>
            <p className="text-gray-400 text-lg">Choisissez votre moyen de contact préféré</p>
          </div>

          <div className="max-w-lg mx-auto bg-[#0a1120] border border-white/10 rounded-[32px] p-6 md:p-8 shadow-2xl">
            <div className="flex flex-col gap-4">
              {/* WhatsApp */}
              <a
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="group w-full flex items-center justify-between bg-[#22c55e] text-white rounded-2xl p-4 cursor-pointer btn-glow-whatsapp transition-transform duration-300 hover:scale-[1.02] active:scale-[0.98]"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center border border-white/20 shrink-0">
                    <MessageCircle className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-left">
                    <h4 className="font-black text-lg leading-tight">WhatsApp</h4>
                    <p className="text-white/80 text-sm mt-0.5">Réponse instantanée</p>
                  </div>
                </div>
                <ArrowRight className="w-6 h-6 text-white transition-transform group-hover:translate-x-1" />
              </a>

              {/* Email */}
              <a
                href="mailto:matchcesoir.fr@gmail.com"
                className="group w-full flex items-center justify-between bg-[#3b82f6] text-white rounded-2xl p-4 cursor-pointer btn-glow-email transition-transform duration-300 hover:scale-[1.02] active:scale-[0.98]"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center border border-white/20 shrink-0">
                    <Mail className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-left">
                    <h4 className="font-black text-lg leading-tight">Email</h4>
                    <p className="text-white/80 text-sm mt-0.5">matchcesoir.fr@gmail.com</p>
                  </div>
                </div>
                <ArrowRight className="w-6 h-6 text-white transition-transform group-hover:translate-x-1" />
              </a>

              {/* Support 24/7 */}
              <div
                className="w-full flex items-center justify-between bg-[#e11d48] text-white rounded-2xl p-4 border border-white/5 shadow-md"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center border border-white/20 shrink-0">
                    <Clock className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-left">
                    <h4 className="font-black text-lg leading-tight">Support 24/7</h4>
                    <p className="text-white/80 text-sm mt-0.5">Toujours disponible</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="flex h-2.5 w-2.5 relative">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-white"></span>
                  </span>
                  <span className="text-sm font-semibold text-white/95 whitespace-nowrap">En ligne</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#0d121f] border-t border-white/10 pt-16 pb-8">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-12 gap-8 mb-12">
            {/* Left Col */}
            <div className="md:col-span-5 flex flex-col gap-5">
              <a href="#hero" className="flex items-center gap-2 text-2xl font-extrabold tracking-tight hover:opacity-90 transition-opacity inline-flex">
                <img src="/logo.webp?v=3" alt="Match Ce Soir Fr Logo" width={64} height={64} className="h-10 md:h-16 w-auto object-contain" />
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-300">
                  MATCH CE SOIR
                </span>
                <span className="text-xs bg-[#a855f7] text-white px-2 py-0.5 rounded-md font-black shadow-[0_0_10px_rgba(168,85,247,0.5)]">
                  FR
                </span>
              </a>
              <p className="text-gray-400 text-sm leading-relaxed max-w-sm">
                Le service de streaming premium #1 en France et en Europe. Plus de 65 000 chaînes et VOD en Full HD et 4K.
              </p>
              <p className="text-gray-400 text-sm font-semibold mt-1">
                Support disponible 24/7 pour tous nos clients.
              </p>
            </div>

            {/* Middle Col */}
            <div className="md:col-span-3">
              <h4 className="text-white font-bold mb-4">Navigation</h4>
              <ul className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm text-gray-500">
                <li><a href="#hero" className="hover:text-[#a855f7] transition-colors">Accueil</a></li>
                <li><a href="/chaines" className="hover:text-[#a855f7] transition-colors text-[#a855f7] font-semibold">Chaînes</a></li>

                <li><a href="#comment-installer" className="hover:text-[#a855f7] transition-colors">Installation</a></li>
                <li><a href="#abonnements" className="hover:text-[#a855f7] transition-colors">Nos Packs</a></li>
                <li><a href="#tarifs" className="hover:text-[#a855f7] transition-colors">Tarifs</a></li>
                <li><a href="#compatibilite" className="hover:text-[#a855f7] transition-colors">Compatibilité</a></li>
                <li><a href="#fonctionnalites" className="hover:text-[#a855f7] transition-colors">Avantages</a></li>
                <li><a href="#faq" className="hover:text-[#a855f7] transition-colors">FAQ</a></li>
                <li><a href="#contact" className="hover:text-[#a855f7] transition-colors">Contact</a></li>
              </ul>
            </div>

            {/* Right Col */}
            <div className="md:col-span-4 flex flex-col gap-3">
              <h4 className="text-white font-bold mb-1">Contact</h4>
              <ul className="space-y-2.5 text-sm text-gray-400 font-medium">
                <li>
                  <span className="text-gray-500">Email:</span>{" "}
                  <a href="mailto:matchcesoir.fr@gmail.com" className="text-white hover:text-[#a855f7] transition-colors">
                    matchcesoir.fr@gmail.com
                  </a>
                </li>
                <li>
                  <span className="text-gray-500">Support:</span>{" "}
                  <span className="text-white">24/7 disponible</span>
                </li>
                <li>
                  <span className="text-gray-500">WhatsApp:</span>{" "}
                  <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="text-white hover:text-green-400 transition-colors">
                    +213 781 858 983
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Disclaimer Box */}
          <div className="border border-white/10 bg-black/25 rounded-2xl p-6 md:p-8 mb-12 relative overflow-hidden">
            <div className="flex gap-4 items-start">
              <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                <Shield className="w-5 h-5 text-gray-400" />
              </div>
              <div>
                <h4 className="text-white font-bold text-lg mb-2">Disclaimer</h4>
                <p className="text-gray-400 text-sm leading-relaxed">
                  Match Ce Soir Fr est un service de streaming légal qui respecte toutes les réglementations européennes en vigueur. Nous nous engageons à respecter la propriété intellectuelle et travaillons uniquement avec des fournisseurs de contenu autorisés. Notre service est conforme aux normes de sécurité et de confidentialité des données. Tous les paiements sont sécurisés via des plateformes certifiées (PayPal, Stripe).
                </p>
              </div>
            </div>
          </div>

          {/* Copyright Section */}
          <div className="text-center pt-8 border-t border-white/5 flex flex-col gap-2">
            <p className="text-gray-400 font-semibold text-sm">
              Copyright © 2026 Match Ce Soir Fr. Tous droits réservés.
            </p>
            <p className="text-gray-500 text-xs flex flex-wrap justify-center gap-x-2 gap-y-1">
              <span>Paiements sécurisés</span>
              <span>•</span>
              <span>SSL 256-bit</span>
              <span>•</span>
              <span>Service client dédié 7j/7</span>
            </p>
          </div>
        </div>
      </footer>

      {/* Order Modal */}
<HomeTracker />
    </main>
  )
}
