"use client"

import { m } from "framer-motion"
import { Button } from "@/components/ui/button"
import { useOrderModal } from "@/context/OrderModalContext"

interface PricingCTAProps {
  planName: string
  planPrice: string
  planDuration: string
  highlighted: boolean
  className?: string
  children?: React.ReactNode
}

export function PricingCTA({
  planName,
  planPrice,
  planDuration,
  highlighted,
  className = "",
  children = "Abonnez-vous"
}: PricingCTAProps) {
  const { openModal } = useOrderModal()

  return (
    <m.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }} className="w-full">
      <Button
        onClick={() => openModal(planName, planPrice, planDuration)}
        className={`w-full font-bold text-base py-6 rounded-xl transition-shadow duration-300 ${
          highlighted
            ? "bg-white text-[#7c3aed] hover:bg-gray-100 shadow-[0_0_40px_-10px_#a855f7] hover:shadow-[0_0_60px_-10px_#a855f7]"
            : "bg-[#7c3aed] hover:bg-[#6d28d9] text-white shadow-[0_0_15px_-5px_#a855f7] hover:shadow-[0_0_25px_-5px_#a855f7]"
        } ${className}`}
      >
        {children}
      </Button>
    </m.div>
  )
}
