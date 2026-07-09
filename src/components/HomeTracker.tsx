"use client"

import { useEffect } from "react"
import * as tiktokPixel from "@/lib/tiktokPixel"

export function HomeTracker() {
  useEffect(() => {
    tiktokPixel.viewHome()
  }, [])
  
  return null
}
