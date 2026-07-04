"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import {
  CheckCircle2, MessageCircle, Tv, MonitorPlay, HeadphonesIcon,
  Activity, Shield, Zap, Globe, Mail, Phone
} from "lucide-react"
import { AnimatedHero } from "@/components/AnimatedHero"
import { OrderModal } from "@/components/OrderModal"

const WHATSAPP_NUMBER = "33600000000"
const WHATSAPP_LINK = `https://wa.me/${WHATSAPP_NUMBER}`

const plans = [
  { name: "3 mois", price: "25", features: ["+65k Chaînes Et VOD", "Qualité 4K / Full HD", "Anti-Freeze Pro", "Support 24/7"], highlighted: false },
  { name: "6 mois", price: "39", features: ["+65k Chaînes Et VOD", "Qualité 4K / Full HD", "Anti-Freeze Pro", "Support 24/7"], highlighted: false },
  { name: "12 mois", price: "59", features: ["+65k Chaînes Et VOD", "Qualité 4K / Full HD", "Anti-Freeze Pro", "Support VIP 24/7", "Mise à jour Auto"], highlighted: true },
  { name: "24 mois", price: "89", features: ["+65k Chaînes Et VOD", "Qualité 4K / Full HD", "Anti-Freeze Pro", "Support 24/7"], highlighted: false },
]

export default function Home() {
  const [modalOpen, setModalOpen] = useState(false)
  const [selectedPlan, setSelectedPlan] = useState({ name: "", price: "" })

  const openModal = (name: string, price: string) => {
    setSelectedPlan({ name, price })
    setModalOpen(true)
  }

  return (
    <main className="flex-1 flex flex-col bg-[#050505]">

      {/* Navbar */}
      <header className="sticky top-0 z-50 w-full border-b border-white/5 bg-[#050505]/80 backdrop-blur-md">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <a href="#hero" className="flex items-center gap-1 text-2xl font-black tracking-tighter">
            <span className="text-white">LE MONDE</span><span className="text-[#a855f7]">IPTV</span>
          </a>
          <nav className="hidden md:flex items-center gap-6 text-sm text-gray-400 font-medium">
            <a href="#abonnements" className="hover:text-white transition-colors">Abonnements</a>
            <a href="#faq" className="hover:text-white transition-colors">FAQ</a>
            <a href="#contact" className="hover:text-white transition-colors">Contact</a>
          </nav>
          <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer">
            <Button className="bg-[#25D366] hover:bg-[#25D366]/90 text-white gap-2 rounded-full font-semibold shadow-[0_0_15px_-3px_#25D366]">
              <MessageCircle className="w-5 h-5" />
              WhatsApp
            </Button>
          </a>
        </div>
      </header>

      {/* Hero */}
      <div id="hero">
        <AnimatedHero onOrderClick={() => openModal("12 mois", "59")} />
      </div>

      {/* Stats */}
      <section className="py-16 border-b border-white/5 bg-[#0a0a0a]">
        <div className="container mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { icon: <Tv className="w-8 h-8" />, value: "+65K", label: "Chaînes Et VOD" },
            { icon: <MonitorPlay className="w-8 h-8" />, value: "4K UHD", label: "Qualité d'image" },
            { icon: <HeadphonesIcon className="w-8 h-8" />, value: "24/7", label: "Support Client" },
            { icon: <Activity className="w-8 h-8" />, value: "99.9%", label: "Disponibilité" },
          ].map((stat, i) => (
            <div key={i} className="flex flex-col items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#a855f7]/20 to-transparent border border-[#a855f7]/30 flex items-center justify-center text-[#a855f7]">
                {stat.icon}
              </div>
              <div>
                <h3 className="text-4xl font-black text-white">{stat.value}</h3>
                <p className="text-sm text-gray-400 font-medium mt-1">{stat.label}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Why Us */}
      <section className="py-24 bg-[#050505]">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-8 text-white">Pourquoi Choisir Le Monde IPTV ?</h2>
          <p className="text-gray-400 text-lg leading-relaxed mb-12">
            En tant que fournisseur du <strong className="text-white">meilleur abonnement IPTV en France</strong>, nous nous engageons à offrir une qualité de diffusion inégalée. Que vous soyez fan de football, de cinéma ou de documentaires, notre plateforme vous donne un accès illimité à une bibliothèque mondiale de contenus.
          </p>
          <div className="grid md:grid-cols-3 gap-6 text-left">
            {[
              { icon: <Shield className="w-8 h-8 text-[#a855f7] mb-4" />, title: "Technologie Anti-Freeze", desc: "Serveurs européens surpuissants garantissant une diffusion fluide et sans buffering, même pendant les pics de trafic." },
              { icon: <Globe className="w-8 h-8 text-[#a855f7] mb-4" />, title: "Contenu International", desc: "Chaînes françaises, belges, suisses, arabes, sportives et bouquet cinéma complet à portée de main." },
              { icon: <Zap className="w-8 h-8 text-[#a855f7] mb-4" />, title: "Mise à jour Auto", desc: "Notre VOD est mise à jour quotidiennement avec les dernières sorties cinéma en VF et VOSTFR." },
            ].map((item, i) => (
              <div key={i} className="bg-[#0a0a0a] p-6 rounded-2xl border border-white/5 hover:border-[#a855f7]/20 transition-colors">
                {item.icon}
                <h4 className="text-white font-bold mb-2">{item.title}</h4>
                <p className="text-gray-500 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Channels */}
      <section className="py-16 bg-[#0a0a0a] border-y border-white/5">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-4xl font-bold text-center mb-12 text-white">Chaînes Populaires Incluses</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
            {["Canal+", "Prime Video", "Netflix", "BeIN Sports", "RMC Sport", "Disney+"].map((channel, idx) => (
              <div key={idx} className="bg-[#111] border border-white/10 rounded-xl h-24 flex items-center justify-center font-black text-sm text-white/50 hover:text-white hover:border-[#a855f7]/50 hover:bg-[#a855f7]/5 transition-all cursor-pointer px-2 text-center">
                {channel}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="abonnements" className="py-32 bg-[#050505] relative scroll-mt-16">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#a855f7]/10 blur-[100px] rounded-full pointer-events-none" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-6xl font-black mb-6 text-white tracking-tight">Nos Abonnements</h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">Paiement unique, activation immédiate, sans aucun contrat.</p>
            <div className="flex flex-wrap justify-center gap-4 mt-8">
              <span className="px-4 py-2 bg-green-500/10 text-green-400 rounded-full text-sm font-semibold border border-green-500/20 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" /> Garantie 7 jours
              </span>
              <span className="px-4 py-2 bg-[#a855f7]/10 text-[#a855f7] rounded-full text-sm font-semibold border border-[#a855f7]/20 flex items-center gap-2">
                <Shield className="w-4 h-4" /> Paiement sécurisé
              </span>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto items-center">
            {plans.map((plan) =>
              plan.highlighted ? (
                <Card key={plan.name} className="bg-gradient-to-b from-[#1a0b2e] to-[#0a0a0a] border-[#a855f7] text-white flex flex-col relative transform lg:-translate-y-6 shadow-[0_0_40px_-15px_#a855f7]">
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-[#a855f7] to-[#d8b4fe] text-black text-xs font-black px-4 py-1.5 rounded-full uppercase tracking-widest shadow-lg whitespace-nowrap">
                    LE PLUS POPULAIRE
                  </div>
                  <CardContent className="p-8 flex-1 flex flex-col">
                    <div className="text-center mb-8 border-b border-[#a855f7]/30 pb-8 pt-2">
                      <h3 className="text-lg text-[#d8b4fe] font-medium mb-2">Abonnement</h3>
                      <p className="text-3xl font-bold mb-4">{plan.name}</p>
                      <div className="flex justify-center items-start gap-1">
                        <span className="text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-300">{plan.price}</span>
                        <span className="text-2xl font-bold text-gray-400">€</span>
                      </div>
                    </div>
                    <ul className="space-y-5 mb-8 flex-1">
                      {plan.features.map((f, i) => (
                        <li key={i} className="flex items-center gap-3 text-base text-white font-medium">
                          <CheckCircle2 className="w-5 h-5 text-[#a855f7] shrink-0" /> {f}
                        </li>
                      ))}
                    </ul>
                    <Button
                      onClick={() => openModal(plan.name, plan.price)}
                      className="w-full bg-[#a855f7] hover:bg-[#9333ea] text-white font-bold text-lg py-6 shadow-[0_0_20px_-5px_#a855f7]"
                    >
                      Commander Maintenant
                    </Button>
                  </CardContent>
                </Card>
              ) : (
                <Card key={plan.name} className="bg-[#0a0a0a] border-white/10 text-white flex flex-col hover:border-white/20 transition-all">
                  <CardContent className="p-8 flex-1 flex flex-col">
                    <div className="text-center mb-8 border-b border-white/10 pb-8">
                      <h3 className="text-lg text-gray-400 font-medium mb-2">Abonnement</h3>
                      <p className="text-2xl font-bold mb-4">{plan.name}</p>
                      <div className="flex justify-center items-start gap-1">
                        <span className="text-5xl font-black">{plan.price}</span>
                        <span className="text-xl font-bold text-gray-400">€</span>
                      </div>
                    </div>
                    <ul className="space-y-5 mb-8 flex-1">
                      {plan.features.map((f, i) => (
                        <li key={i} className="flex items-center gap-3 text-sm text-gray-300 font-medium">
                          <CheckCircle2 className="w-5 h-5 text-[#a855f7] shrink-0" /> {f}
                        </li>
                      ))}
                    </ul>
                    <Button
                      variant="outline"
                      onClick={() => openModal(plan.name, plan.price)}
                      className="w-full border-white/20 text-white hover:bg-white hover:text-black"
                    >
                      S'abonner
                    </Button>
                  </CardContent>
                </Card>
              )
            )}
          </div>
        </div>
      </section>

      {/* How to Install */}
      <section className="py-20 bg-[#0a0a0a] border-t border-white/5">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Comment Installer Votre IPTV ?</h2>
            <p className="text-gray-400">Une configuration simple en 3 étapes, compatible avec tous vos appareils.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 text-center">
            {[
              { step: "1", title: "Choisissez un Forfait", desc: "Sélectionnez l'abonnement qui vous convient et effectuez votre paiement sécurisé." },
              { step: "2", title: "Recevez vos Identifiants", desc: "Recevez instantanément vos codes d'accès IPTV par e-mail et WhatsApp." },
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

      {/* FAQ */}
      <section id="faq" className="py-24 bg-[#050505] border-t border-white/5 scroll-mt-16">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-white mb-4">Questions Fréquentes</h2>
            <p className="text-gray-400">Tout ce que vous devez savoir sur notre abonnement IPTV.</p>
          </div>
          <Accordion type="single" collapsible className="w-full space-y-4">
            {[
              { q: "Le service est-il garanti sans coupures ?", a: "Oui, notre technologie Anti-Freeze et nos serveurs européens garantissent une stabilité à 99.9%, même pendant les événements sportifs majeurs." },
              { q: "Quels appareils sont compatibles ?", a: "Smart TV (Samsung, LG, Android TV), Apple TV, Firestick, Smartphones (iOS & Android), PC/Mac, et les boîtiers MAG/Enigma2." },
              { q: "Comment obtenir un remboursement ?", a: "Nous offrons une garantie \"Satisfait ou Remboursé\" de 7 jours. Contactez notre support via WhatsApp ou e-mail pour un remboursement intégral." },
              { q: "Avez-vous des chaînes et des films en VOD ?", a: "Oui ! Plus de 65 000 chaînes dont toutes les françaises, plus une bibliothèque VOD de milliers de films mis à jour quotidiennement en VF et VOSTFR." },
              { q: "Puis-je utiliser le service sur plusieurs appareils ?", a: "Chaque abonnement est valable pour 1 connexion simultanée. Vous pouvez cependant installer l'application sur autant d'appareils que vous voulez." },
            ].map((item, i) => (
              <AccordionItem key={i} value={`item-${i}`} className="bg-[#0a0a0a] border border-white/10 rounded-xl px-6 data-[state=open]:border-[#a855f7]/50 transition-colors">
                <AccordionTrigger className="text-white font-bold hover:no-underline hover:text-[#a855f7] py-5 text-left">{item.q}</AccordionTrigger>
                <AccordionContent className="text-gray-400 pb-6 leading-relaxed">{item.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 bg-[#0a0a0a] border-t border-white/5 scroll-mt-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-white mb-4">Besoin d'aide ?</h2>
            <p className="text-gray-400">Notre équipe est disponible 24h/24, 7j/7 pour vous accompagner.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {/* WhatsApp */}
            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col items-center gap-4 bg-[#050505] border border-white/10 hover:border-[#25D366]/50 rounded-2xl p-8 text-center transition-all hover:bg-[#25D366]/5"
            >
              <div className="w-16 h-16 rounded-2xl bg-[#25D366]/10 border border-[#25D366]/30 flex items-center justify-center group-hover:bg-[#25D366]/20 transition-colors">
                <MessageCircle className="w-8 h-8 text-[#25D366]" />
              </div>
              <div>
                <h4 className="text-white font-bold text-lg mb-1">WhatsApp</h4>
                <p className="text-gray-500 text-sm">Réponse en moins de 5 min</p>
                <p className="text-[#25D366] text-sm font-semibold mt-2">Contacter →</p>
              </div>
            </a>

            {/* Email */}
            <a
              href="mailto:service@lemondeiptv.fr"
              className="group flex flex-col items-center gap-4 bg-[#050505] border border-white/10 hover:border-[#a855f7]/50 rounded-2xl p-8 text-center transition-all hover:bg-[#a855f7]/5"
            >
              <div className="w-16 h-16 rounded-2xl bg-[#a855f7]/10 border border-[#a855f7]/30 flex items-center justify-center group-hover:bg-[#a855f7]/20 transition-colors">
                <Mail className="w-8 h-8 text-[#a855f7]" />
              </div>
              <div>
                <h4 className="text-white font-bold text-lg mb-1">Email</h4>
                <p className="text-gray-500 text-sm">service@lemondeiptv.fr</p>
                <p className="text-[#a855f7] text-sm font-semibold mt-2">Envoyer un email →</p>
              </div>
            </a>

            {/* Support */}
            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col items-center gap-4 bg-[#050505] border border-white/10 hover:border-orange-500/50 rounded-2xl p-8 text-center transition-all hover:bg-orange-500/5"
            >
              <div className="w-16 h-16 rounded-2xl bg-orange-500/10 border border-orange-500/30 flex items-center justify-center group-hover:bg-orange-500/20 transition-colors">
                <HeadphonesIcon className="w-8 h-8 text-orange-400" />
              </div>
              <div>
                <h4 className="text-white font-bold text-lg mb-1">Support 24/7</h4>
                <p className="text-gray-500 text-sm">À votre service à tout moment</p>
                <p className="text-orange-400 text-sm font-semibold mt-2">Obtenir de l'aide →</p>
              </div>
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#020202] border-t border-white/10 pt-16 pb-8">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-12">
            <div className="col-span-2">
              <a href="#hero" className="flex items-center gap-1 text-2xl font-black tracking-tighter mb-4">
                <span className="text-white">LE MONDE</span><span className="text-[#a855f7]">IPTV</span>
              </a>
              <p className="text-gray-500 text-sm max-w-sm leading-relaxed">
                Le fournisseur #1 d'abonnement IPTV en France. Qualité 4K, zapping rapide et 65 000+ chaînes pour tous vos divertissements.
              </p>
            </div>
            <div>
              <h4 className="text-white font-bold mb-4">Navigation</h4>
              <ul className="space-y-2 text-sm text-gray-500">
                <li><a href="#hero" className="hover:text-[#a855f7] transition-colors">Accueil</a></li>
                <li><a href="#abonnements" className="hover:text-[#a855f7] transition-colors">Abonnements</a></li>
                <li><a href="#faq" className="hover:text-[#a855f7] transition-colors">FAQ</a></li>
                <li><a href="#contact" className="hover:text-[#a855f7] transition-colors">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold mb-4">Légal</h4>
              <ul className="space-y-2 text-sm text-gray-500">
                <li><a href="#" className="hover:text-white transition-colors">Conditions Générales</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Politique de confidentialité</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Politique de remboursement</a></li>
              </ul>
            </div>
          </div>
          <div className="text-center pt-8 border-t border-white/5">
            <p className="text-gray-600 text-xs">
              Copyright © 2025 Le Monde IPTV. Tous droits réservés. •
              Paiements sécurisés SSL 256-bit • Garantie 7 jours
            </p>
          </div>
        </div>
      </footer>

      {/* Order Modal */}
      <OrderModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        planName={`Abonnement ${selectedPlan.name}`}
        planPrice={selectedPlan.price}
      />
    </main>
  )
}
