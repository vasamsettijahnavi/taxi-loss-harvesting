import TaxLossHarvesting from "@/components/tax-loss-harvesting"

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl md:text-3xl font-bold mb-6">Tax Loss Harvesting</h1>
        <TaxLossHarvesting />
      </div>
    </main>
  )
}
