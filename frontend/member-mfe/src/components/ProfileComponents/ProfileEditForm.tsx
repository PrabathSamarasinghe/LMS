import React, { useState } from 'react'
import { Dialog, DialogTitle, DialogContent, Alert } from '@mui/material'
import { UpdateUser } from '../../services/UserAPI'
import { ProfileEditFormProps } from '../../utils/interfaces';
import { useForm } from 'react-hook-form';

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
  const defaultValues = fields.reduce((acc, field) => ({ ...acc, [field.name]: field.value }), {} as Record<string, string>)
  
  const {
    register,
    handleSubmit: handleFormSubmit,
    formState: { errors: formErrors },
  } = useForm<Record<string, string>>({
    defaultValues,
  })

  const [loading, setLoading] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [showError, setShowError] = useState(false)

  const userId = sessionStorage.getItem('userId');

  const handleSubmit = async (data: any) => {
    setLoading(true)
    setShowError(false)
    setShowSuccess(false)
    
    try {
      const dataToSubmit = { ...data }
      if (dataToSubmit.dateOfBirth) {
        dataToSubmit.dateOfBirth = new Date(dataToSubmit.dateOfBirth).toISOString()
      }
      await UpdateUser(userId, dataToSubmit);
      setShowSuccess(true)
      onSubmit(data)
      
      setTimeout(() => {
        setShowSuccess(false)
        onClose()
      }, 2000)
    } catch (err) {
      setShowError(true)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle className="text-base font-semibold text-gray-800">
        {title}
      </DialogTitle>
      <button
        onClick={onClose}
        disabled={loading}
        className="absolute top-2 right-5 text-gray-500 hover:text-gray-700"
      >
        X
      </button>

      <DialogContent className="pt-1">
        {showSuccess && (
          <Alert severity="success" className="mb-6">
            Profile updated successfully!
          </Alert>
        )}

        {(showError || error) && (
          <Alert severity="error" className="mb-6">
            {error || 'Failed to update profile. Please try again.'}
          </Alert>
        )}

        <form onSubmit={handleFormSubmit(handleSubmit)} className="space-y-1">
          {fields.map((field) => (
            <div key={field.name}>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                {field.label}
                {field.required && <span className="text-red-500 ml-0.5">*</span>}
              </label>

              {field.type === 'select' ? (
                <select
                  {...register(field.name, { 
                    required: field.required ? `${field.label} is required` : false 
                  })}
                  className="w-full px-3 py-1.5 border border-gray-300 rounded text-xs text-gray-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
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
                  {...register(field.name, { 
                    required: field.required ? `${field.label} is required` : false 
                  })}
                  placeholder={field.label}
                  className="w-full px-3 py-1.5 border border-gray-300 rounded text-xs text-gray-700 placeholder-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                />
              )}
              
              {formErrors[field.name] && (
                <p className="text-red-500 text-xs mt-1">
                  {formErrors[field.name]?.message as string}
                </p>
              )}
            </div>
          ))}

          <div className="flex gap-2 pt-3">
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="flex-1 px-3 py-1.5 border border-gray-300 text-gray-700 rounded font-medium text-xs hover:bg-gray-50 transition-colors disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading || isLoading}
              className="flex-1 px-3 py-1.5 bg-black text-white rounded font-medium text-xs outline-none hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
            >
              {(loading || isLoading) ? (
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
      </DialogContent>
    </Dialog>
  )
}
