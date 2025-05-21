import type { CapitalGains } from "@/lib/types"
import { formatCurrency } from "@/lib/utils"

interface CapitalGainsCardProps {
  title: string
  capitalGains: CapitalGains
  variant: "dark" | "blue"
  originalGains?: CapitalGains
}

export default function CapitalGainsCard({ title, capitalGains, variant, originalGains }: CapitalGainsCardProps) {
  const { stcg, ltcg } = capitalGains

  const stcgNet = stcg.profits - stcg.losses
  const ltcgNet = ltcg.profits - ltcg.losses
  const totalRealised = stcgNet + ltcgNet

  let savings = 0
  if (
    originalGains &&
    totalRealised <
      originalGains.stcg.profits - originalGains.stcg.losses + originalGains.ltcg.profits - originalGains.ltcg.losses
  ) {
    savings =
      originalGains.stcg.profits -
      originalGains.stcg.losses +
      originalGains.ltcg.profits -
      originalGains.ltcg.losses -
      totalRealised
  }

  const bgColor = variant === "dark" ? "bg-gray-900" : "bg-blue-600"
  const textColor = "text-white"

  return (
    <div className={`${bgColor} ${textColor} rounded-lg p-6 shadow-lg`}>
      <h2 className="text-xl font-bold mb-4">{title}</h2>

      <div className="space-y-6">
        <div className="space-y-3">
          <h3 className="text-lg font-semibold">Short-term</h3>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <p className="text-gray-300 text-sm">Profits</p>
              <p className="font-medium">{formatCurrency(stcg.profits)}</p>
            </div>
            <div>
              <p className="text-gray-300 text-sm">Losses</p>
              <p className="font-medium">{formatCurrency(stcg.losses)}</p>
            </div>
          </div>
          <div>
            <p className="text-gray-300 text-sm">Net Capital Gains</p>
            <p className="font-medium">{formatCurrency(stcgNet)}</p>
          </div>
        </div>

        <div className="space-y-3">
          <h3 className="text-lg font-semibold">Long-term</h3>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <p className="text-gray-300 text-sm">Profits</p>
              <p className="font-medium">{formatCurrency(ltcg.profits)}</p>
            </div>
            <div>
              <p className="text-gray-300 text-sm">Losses</p>
              <p className="font-medium">{formatCurrency(ltcg.losses)}</p>
            </div>
          </div>
          <div>
            <p className="text-gray-300 text-sm">Net Capital Gains</p>
            <p className="font-medium">{formatCurrency(ltcgNet)}</p>
          </div>
        </div>

        <div className="pt-4 border-t border-gray-700">
          <p className="text-gray-300 text-sm">Realised Capital Gains</p>
          <p className="text-xl font-bold">{formatCurrency(totalRealised)}</p>
        </div>

        {savings > 0 && variant === "blue" && (
          <div className="bg-green-500 bg-opacity-20 p-3 rounded-md mt-4">
            <p className="text-white font-medium">You're going to save {formatCurrency(savings)}</p>
          </div>
        )}
      </div>
    </div>
  )
}
