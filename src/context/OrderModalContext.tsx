"use client"

import React, { createContext, useContext, useState } from "react"
import { OrderModal } from "@/components/OrderModal"

interface OrderModalContextType {
  openModal: (name: string, price: string, duration: string) => void
  closeModal: () => void
}

const OrderModalContext = createContext<OrderModalContextType | undefined>(undefined)

export function OrderModalProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)
  const [planName, setPlanName] = useState("")
  const [planPrice, setPlanPrice] = useState("")
  const [planDuration, setPlanDuration] = useState("")

  const openModal = (name: string, price: string, duration: string) => {
    setPlanName(name)
    setPlanPrice(price)
    setPlanDuration(duration)
    setIsOpen(true)
  }

  const closeModal = () => {
    setIsOpen(false)
  }

  return (
    <OrderModalContext.Provider value={{ openModal, closeModal }}>
      {children}
      <OrderModal
        isOpen={isOpen}
        onClose={closeModal}
        planName={planName}
        planPrice={planPrice}
        planDuration={planDuration}
      />
    </OrderModalContext.Provider>
  )
}

export function useOrderModal() {
  const context = useContext(OrderModalContext)
  if (!context) {
    throw new Error("useOrderModal must be used within an OrderModalProvider")
  }
  return context
}
