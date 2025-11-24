"use client"

export default function HeroSection() {
  return (
    <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 text-center">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-5xl md:text-6xl font-bold mb-6 text-slate-900 dark:text-white">
          Never Lose Track of Your{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-600">
            Returns Again
          </span>
        </h2>
        <p className="text-xl text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
          Track your return orders across all major ecommerce platforms in one place. Get real-time updates and refund
          status with just a few clicks.
        </p>
        <button className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-bold py-4 px-8 rounded-lg text-lg shadow-lg hover:shadow-xl transition-all transform hover:scale-105">
          Get Started Now
        </button>
      </div>
    </section>
  )
}
