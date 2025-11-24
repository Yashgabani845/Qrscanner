"use client"

export default function FeaturesSection() {
  const features = [
    {
      icon: "📱",
      title: "Multi-Platform Support",
      description: "Track returns from Amazon, Meesho, Flipkart, and other popular platforms",
    },
    {
      icon: "⏱️",
      title: "Real-Time Updates",
      description: "Get instant notifications when your return status changes",
    },
    {
      icon: "💳",
      title: "Refund Tracking",
      description: "Know exactly when your refund will be credited",
    },
    {
      icon: "📊",
      title: "Order History",
      description: "View complete history of all your returns and refunds",
    },
  ]

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white dark:bg-slate-800">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-12 text-slate-900 dark:text-white">Powerful Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-slate-700 dark:to-slate-600 p-6 rounded-xl hover:shadow-lg transition-shadow"
            >
              <div className="text-4xl mb-3">{feature.icon}</div>
              <h3 className="text-lg font-semibold mb-2 text-slate-900 dark:text-white">{feature.title}</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
