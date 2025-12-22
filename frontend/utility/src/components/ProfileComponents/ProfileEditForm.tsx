import React, { useState } from 'react'

interface FormField {
  name: string
  label: string
  type: 'text' | 'email' | 'tel' | 'date' | 'select'
  value: string
  required?: boolean
  options?: { label: string; value: string }[]
}

interface ProfileEditFormProps {
  open: boolean
  onClose: () => void
  onSubmit: (data: { [key: string]: string }) => void
  fields: FormField[]
  title?: string
  isLoading?: boolean
  error?: string
  success?: string
}

export default function ProfileEditForm({
  open,
  onClose,
  onSubmit,
  fields,
  title = 'Edit Profile',
  isLoading = false,
  error,
  success,
}: ProfileEditFormProps) {
  const [formData, setFormData] = useState<{ [key: string]: string }>(
    fields.reduce((acc, field) => ({ ...acc, [field.name]: field.value }), {})
  )

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
  }

  if (!open) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-6 rounded-lg my-auto space-y-6">
      <div className="bg-white rounded-lg max-w-sm w-full mx-4 shadow-lg">
        {/* Header */}
        <div className="bg-black text-white px-6 py-4 rounded-t-lg flex justify-between items-center">
          <h2 className="text-base font-semibold">{title}</h2>
          <button
            onClick={onClose}
            className="text-white text-xl hover:text-gray-300"
          >
            ✕
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded text-xs text-red-700">
              {error}
            </div>
          )}
          {success && (
            <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded text-xs text-green-700">
              {success}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {fields.map((field) => (
              <div key={field.name}>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  {field.label}
                  {field.required && <span className="text-red-500">*</span>}
                </label>

                {field.type === 'select' ? (
                  <select
                    name={field.name}
                    value={formData[field.name]}
                    onChange={handleChange}
                    required={field.required}
                    className="w-full px-3 py-2 border border-gray-300 rounded text-xs text-gray-700 focus:border-black focus:ring-1 focus:ring-black"
                  >
                    <option value="">-- Select {field.label} --</option>
                    {field.options?.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                ) : (
                  <input
                    type={field.type}
                    name={field.name}
                    value={formData[field.name]}
                    onChange={handleChange}
                    required={field.required}
                    placeholder={field.label}
                    className="w-full px-3 py-2 border border-gray-300 rounded text-xs text-gray-700 placeholder-gray-400 focus:border-black focus:ring-1 focus:ring-black"
                  />
                )}
              </div>
            ))}

            <div className="flex gap-2 pt-4">
              <button
                type="button"
                onClick={onClose}
                disabled={isLoading}
                className="flex-1 px-3 py-2 border border-gray-300 text-gray-700 rounded text-xs font-medium hover:bg-gray-50 transition-colors disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isLoading}
                className="flex-1 px-3 py-2 bg-black text-white rounded text-xs font-medium hover:bg-gray-800 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <>
                    <div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Saving...
                  </>
                ) : (
                  'Save Changes'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
