"use client"

import { useState } from "react"
import Link from "next/link"

export default function TrackReturnPage() {
  const [selectedPlatform, setSelectedPlatform] = useState(null)
  const [orderNumber, setOrderNumber] = useState("")

  const platforms = [
    {
      id: "amazon",
      name: "Amazon",
      icon: "🛒",
      color: "from-orange-400 to-orange-600",
      placeholder: "Enter your Amazon Order ID",
    },
    {
      id: "meesho",
      name: "Meesho",
      icon: "💎",
      color: "from-pink-400 to-pink-600",
      placeholder: "Enter your Meesho Order ID",
    },
    {
      id: "flipkart",
      name: "Flipkart",
      icon: "⚡",
      color: "from-blue-400 to-blue-600",
      placeholder: "Enter your Flipkart Order ID",
    },
  ]

  const handleTrack = () => {
    if (!selectedPlatform || !orderNumber) {
      alert("Please select a platform and enter an order number")
      return
    }
    alert(`Tracking ${selectedPlatform} order: ${orderNumber}`)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-slate-950 dark:to-slate-900">
      <header className="bg-white dark:bg-slate-900 shadow-md py-4 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2 hover:opacity-80">
            <span className="text-2xl">📊</span>
            <span className="text-xl font-bold text-slate-900 dark:text-white">
              <span className="text-blue-600">Ecom</span>Helper
            </span>
          </Link>
          <Link href="/">
            <button variant="outline">← Back to Home</button>
          </Link>
        </div>
      </header>

      <main className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-4 text-slate-900 dark:text-white">
            Track Your Return Order
          </h1>
          <p className="text-center text-gray-600 dark:text-gray-400 mb-12 text-lg">
            Select your platform and enter your order ID to track your return
          </p>

          {/* Platform Selection */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6 text-slate-900 dark:text-white">Choose Your Platform</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {platforms.map((platform) => (
                <button
                  key={platform.id}
                  onClick={() => setSelectedPlatform(platform.id)}
                  className={`p-8 rounded-xl transition-all transform hover:scale-105 ${
                    selectedPlatform === platform.id
                      ? `bg-gradient-to-br ${platform.color} text-white shadow-lg`
                      : "bg-white dark:bg-slate-800 text-slate-900 dark:text-white border-2 border-gray-200 dark:border-slate-700 hover:border-blue-400"
                  }`}
                >
                  <div className="text-5xl mb-3">{platform.icon}</div>
                  <h3 className="text-xl font-bold">{platform.name}</h3>
                </button>
              ))}
            </div>
          </div>

          {/* Order Input */}
          {selectedPlatform && (
            <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-lg border border-gray-200 dark:border-slate-700">
              <h2 className="text-2xl font-bold mb-6 text-slate-900 dark:text-white">Enter Your Order Details</h2>

              <div className="mb-6">
                <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-2">Order ID</label>
                <input
                  type="text"
                  value={orderNumber}
                  onChange={(e) => setOrderNumber(e.target.value)}
                  placeholder={platforms.find((p) => p.id === selectedPlatform)?.placeholder}
                  className="w-full px-4 py-3 border-2 border-gray-300 dark:border-slate-600 rounded-lg focus:outline-none focus:border-blue-500 dark:bg-slate-700 dark:text-white"
                />
              </div>

              <button
                onClick={handleTrack}
                className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-bold py-3 rounded-lg transition-all"
              >
                Track Return Order
              </button>
            </div>
          )}

          {/* Info Section */}
          <div className="mt-12 bg-blue-50 dark:bg-slate-800 rounded-xl p-6 border border-blue-200 dark:border-slate-700">
            <h3 className="font-bold text-slate-900 dark:text-white mb-3">💡 How it works:</h3>
            <ul className="space-y-2 text-gray-700 dark:text-gray-300">
              <li>✓ Select your ecommerce platform</li>
              <li>✓ Enter your return order ID</li>
              <li>✓ Get real-time tracking updates</li>
              <li>✓ Know exactly when your refund arrives</li>
            </ul>
          </div>
        </div>
      </main>

      <footer className="bg-slate-900 dark:bg-slate-950 text-white py-8 px-4 mt-16">
        <div className="max-w-7xl mx-auto text-center">
          <p className="mb-2">&copy; 2025 EcomHelper. All rights reserved.</p>
          <p className="text-gray-400 text-sm">Making ecommerce shopping hassle-free</p>
        </div>
      </footer>
    </div>
  )
}
