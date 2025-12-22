import React from 'react'
import { ProfileInfoProps } from '../../utils/interfaces'

export default function ProfileInfo({ sections }: ProfileInfoProps) {
  return (
    <div className="space-y-6">
      {/* Render each section */}
      {sections.map((section, idx) => (
        <div key={idx} className="bg-white rounded-lg border border-gray-200 p-6">
          <h2 className="text-lg font-bold text-gray-800 border-b-2 border-black pb-3 mb-4">
            {section.title}
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Render each item */}
            {section.items.map((item, itemIdx) => (
              <div key={itemIdx} className="flex flex-col">
                <label className="text-xs font-semibold text-gray-700 mb-1">
                  {item.label}
                </label>
                <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded border border-gray-200">
                  {item.value || '-'}
                </p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
