"use client"

import { useState, useEffect } from "react"
import { fetchHoldings, fetchCapitalGains } from "@/lib/api"
import type { Holding, CapitalGains } from "@/lib/types"
import CapitalGainsCard from "./capital-gains-card"
import HoldingsTable from "./holdings-table"
import { calculateUpdatedCapitalGains } from "@/lib/utils"

export default function TaxLossHarvesting() {
  const [holdings, setHoldings] = useState<Holding[]>([])
  const [capitalGains, setCapitalGains] = useState<CapitalGains | null>(null)
  const [updatedCapitalGains, setUpdatedCapitalGains] = useState<CapitalGains | null>(null)
  const [selectedHoldings, setSelectedHoldings] = useState<Set<string>>(new Set())
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [viewAll, setViewAll] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const [holdingsData, gainsData] = await Promise.all([fetchHoldings(), fetchCapitalGains()])

        // Sort holdings by total value (price * holding)
        const sortedHoldings = holdingsData.sort(
          (a, b) => b.currentPrice * b.totalHolding - a.currentPrice * a.totalHolding,
        )

        setHoldings(sortedHoldings)
        setCapitalGains(gainsData)
        setUpdatedCapitalGains(gainsData)
        setLoading(false)
      } catch (err) {
        setError("Failed to load data. Please try again.")
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const toggleHolding = (coinId: string, isSelected: boolean) => {
    const newSelectedHoldings = new Set(selectedHoldings)

    if (isSelected) {
      newSelectedHoldings.add(coinId)
    } else {
      newSelectedHoldings.delete(coinId)
    }

    setSelectedHoldings(newSelectedHoldings)

    if (capitalGains) {
      const selectedHoldingsList = holdings.filter((holding) => newSelectedHoldings.has(holding.coin))

      const newCapitalGains = calculateUpdatedCapitalGains(capitalGains, selectedHoldingsList)

      setUpdatedCapitalGains(newCapitalGains)
    }
  }

  const toggleSelectAll = (isSelected: boolean) => {
    if (isSelected) {
      const allHoldingIds = holdings.map((holding) => holding.coin)
      setSelectedHoldings(new Set(allHoldingIds))

      if (capitalGains) {
        const newCapitalGains = calculateUpdatedCapitalGains(capitalGains, holdings)
        setUpdatedCapitalGains(newCapitalGains)
      }
    } else {
      setSelectedHoldings(new Set())
      setUpdatedCapitalGains(capitalGains)
    }
  }

  const displayedHoldings = viewAll ? holdings : holdings.slice(0, 10)
  const hasMoreHoldings = holdings.length > 10

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative" role="alert">
        <strong className="font-bold">Error: </strong>
        <span className="block sm:inline">{error}</span>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {capitalGains && (
          <>
            <CapitalGainsCard title="Pre-Harvesting" capitalGains={capitalGains} variant="dark" />
            <CapitalGainsCard
              title="After Harvesting"
              capitalGains={updatedCapitalGains || capitalGains}
              variant="blue"
              originalGains={capitalGains}
            />
          </>
        )}
      </div>

      <HoldingsTable
        holdings={displayedHoldings}
        selectedHoldings={selectedHoldings}
        toggleHolding={toggleHolding}
        toggleSelectAll={toggleSelectAll}
        allSelected={selectedHoldings.size === holdings.length}
      />

      {hasMoreHoldings && (
        <div className="flex justify-center mt-4">
          <button
            onClick={() => setViewAll(!viewAll)}
            className="text-blue-600 font-medium hover:text-blue-800 transition-colors"
          >
            {viewAll ? "View Less" : "View All"}
          </button>
        </div>
      )}
    </div>
  )
}
