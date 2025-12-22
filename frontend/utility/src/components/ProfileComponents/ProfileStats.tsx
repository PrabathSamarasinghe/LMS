import React from 'react'

interface StatItem {
  label: string
  value: string | number
  icon: string
}

interface ProfileStatsProps {
  stats: StatItem[]
}

export default function ProfileStats({ stats }: ProfileStatsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
      {stats.map((stat, idx) => (
        <div
          key={idx}
          className="bg-white rounded-lg border border-gray-200 p-4 text-center hover:shadow-md transition-shadow"
        >
          <div className="text-2xl mb-2">{stat.icon}</div>
          <p className="text-xs text-gray-600 mb-1">{stat.label}</p>
          <p className="text-xl font-bold text-gray-800">{stat.value}</p>
        </div>
      ))}
    </div>
  )
}
