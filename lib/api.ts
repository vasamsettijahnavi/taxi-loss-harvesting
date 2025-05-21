import type { Holding, CapitalGains } from "./types"
import holdingsData from "./mock-data/holdings.json"
import capitalGainsData from "./mock-data/capital-gains.json"

// Simulate API delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

export async function fetchHoldings(): Promise<Holding[]> {
  await delay(800) // Simulate network delay
  return holdingsData as Holding[]
}

export async function fetchCapitalGains(): Promise<CapitalGains> {
  await delay(800) // Simulate network delay
  return capitalGainsData.capitalGains as CapitalGains
}
