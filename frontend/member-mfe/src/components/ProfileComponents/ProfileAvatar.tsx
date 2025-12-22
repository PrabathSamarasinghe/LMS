import { ProfileAvatarProps } from '../../utils/interfaces'

export default function ProfileAvatar({
  name,
  email,
  avatar,
  role,
  onEditClick,
}: ProfileAvatarProps) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 text-center mb-6">
      {/* Avatar */}
      <div className="mb-4 flex justify-center">
        <div className="w-24 h-24 rounded-full bg-gradient-to-br from-gray-300 to-gray-400 flex items-center justify-center text-white text-3xl font-bold border-4 border-black">
          {avatar ? (
            <img src={avatar} alt={name} className="w-full h-full rounded-full object-cover" />
          ) : (
            name.charAt(0).toUpperCase()
          )}
        </div>
      </div>

      {/* User Info */}
      <h1 className="text-2xl font-bold text-gray-800 mb-1">{name}</h1>
      <p className="text-sm text-gray-600 mb-1">{email}</p>
      <div className="inline-block px-3 py-1 bg-gray-100 border border-gray-300 rounded-full text-xs font-semibold text-gray-700 mb-4 capitalize">
        {role}
      </div>

      {/* Edit Button */}
      {onEditClick && (
        <div>
          <button
            onClick={onEditClick}
            className="px-4 py-2 bg-black text-white rounded text-sm font-medium hover:bg-gray-800 transition-colors"
          >
            Edit Profile
          </button>
        </div>
      )}
    </div>
  )
}
