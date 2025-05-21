import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

import type { Holding, CapitalGains } from "./types"

export function formatCurrency(value: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 2,
    minimumFractionDigits: 0,
  }).format(value)
}

export function formatNumber(value: number): string {
  if (value < 0.0001 && value > 0) {
    return value.toExponential(4)
  }
  return new Intl.NumberFormat("en-IN", {
    maximumFractionDigits: 4,
  }).format(value)
}

export function calculateUpdatedCapitalGains(originalGains: CapitalGains, selectedHoldings: Holding[]): CapitalGains {
  // Create a deep copy of the original gains
  const updatedGains: CapitalGains = {
    stcg: { ...originalGains.stcg },
    ltcg: { ...originalGains.ltcg },
  }

  // Process each selected holding
  selectedHoldings.forEach((holding) => {
    // Short-term gains
    if (holding.stcg.gain > 0) {
      updatedGains.stcg.profits += holding.stcg.gain
    } else if (holding.stcg.gain < 0) {
      updatedGains.stcg.losses += Math.abs(holding.stcg.gain)
    }

    // Long-term gains
    if (holding.ltcg.gain > 0) {
      updatedGains.ltcg.profits += holding.ltcg.gain
    } else if (holding.ltcg.gain < 0) {
      updatedGains.ltcg.losses += Math.abs(holding.ltcg.gain)
    }
  })

  return updatedGains
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
