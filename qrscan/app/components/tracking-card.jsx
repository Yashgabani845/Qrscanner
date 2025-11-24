"use client"

export default function TrackingCard({ title, description, icon, gradient }) {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg hover:shadow-xl transition-all hover:scale-105 p-8 border border-gray-200 dark:border-slate-700 group cursor-pointer">
      <div className={`text-6xl mb-4 transform group-hover:scale-110 transition-transform`}>{icon}</div>
      <h3 className="text-2xl font-bold mb-3 text-slate-900 dark:text-white">{title}</h3>
      <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">{description}</p>
      <button
        className={`bg-gradient-to-r ${gradient} text-white px-6 py-2 rounded-lg font-semibold hover:opacity-90 transition-opacity`}
      >
        Get Started →
      </button>
    </div>
  )
}
    