"use client"

import type { Holding } from "@/lib/types"
import { formatCurrency, formatNumber } from "@/lib/utils"
import Image from "next/image"

interface HoldingsTableProps {
  holdings: Holding[]
  selectedHoldings: Set<string>
  toggleHolding: (coinId: string, isSelected: boolean) => void
  toggleSelectAll: (isSelected: boolean) => void
  allSelected: boolean
}

export default function HoldingsTable({
  holdings,
  selectedHoldings,
  toggleHolding,
  toggleSelectAll,
  allSelected,
}: HoldingsTableProps) {
  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    checked={allSelected}
                    onChange={(e) => toggleSelectAll(e.target.checked)}
                  />
                  <span className="ml-2">Asset</span>
                </div>
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Holdings
                <br />
                Avg Buy Price
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Current Price
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Short-Term Gain
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Long-Term Gain
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Amount to Sell
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {holdings.map((holding) => {
              const isSelected = selectedHoldings.has(holding.coin)

              return (
                <tr key={holding.coin} className={isSelected ? "bg-blue-50" : ""}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded mr-3"
                        checked={isSelected}
                        onChange={(e) => toggleHolding(holding.coin, e.target.checked)}
                      />
                      <div className="flex-shrink-0 h-10 w-10 relative">
                        <Image
                          src={holding.logo || "/placeholder.svg"}
                          alt={holding.coin}
                          fill
                          className="rounded-full object-cover"
                        />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{holding.coin}</div>
                        <div className="text-sm text-gray-500">{holding.coinName}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{formatNumber(holding.totalHolding)}</div>
                    <div className="text-sm text-gray-500">{formatCurrency(holding.averageBuyPrice)}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{formatCurrency(holding.currentPrice)}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className={`text-sm ${holding.stcg.gain >= 0 ? "text-green-600" : "text-red-600"}`}>
                      {formatCurrency(holding.stcg.gain)}
                    </div>
                    <div className="text-sm text-gray-500">{formatNumber(holding.stcg.balance)}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className={`text-sm ${holding.ltcg.gain >= 0 ? "text-green-600" : "text-red-600"}`}>
                      {formatCurrency(holding.ltcg.gain)}
                    </div>
                    <div className="text-sm text-gray-500">{formatNumber(holding.ltcg.balance)}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{isSelected ? formatNumber(holding.totalHolding) : "-"}</div>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}
