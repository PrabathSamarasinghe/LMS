interface NewPasswordFormProps {
  newPassword: string;
  confirmPassword: string;
  isLoading: boolean;
  passwordMismatch: boolean;
  onNewPasswordChange: (value: string) => void;
  onConfirmPasswordChange: (value: string) => void;
  onSubmit: () => void;
}

const NewPasswordForm = ({
  newPassword,
  confirmPassword,
  isLoading,
  passwordMismatch,
  onNewPasswordChange,
  onConfirmPasswordChange,
  onSubmit,
}: NewPasswordFormProps) => {
  const isFormValid = newPassword && confirmPassword && !passwordMismatch;

  return (
    <>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Set Your New Password
        </label>
        <input
          type="password"
          placeholder="Enter new password"
          value={newPassword}
          onChange={(e) => onNewPasswordChange(e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-gray-200 focus:border-gray-400 transition-colors"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Confirm Password
        </label>
        <input
          type="password"
          placeholder="Confirm your password"
          value={confirmPassword}
          onChange={(e) => onConfirmPasswordChange(e.target.value)}
          className={`w-full px-4 py-3 border rounded-2xl focus:outline-none focus:ring-2 focus:border-gray-400 transition-colors ${
            passwordMismatch
              ? "border-red-500 focus:ring-red-200"
              : "border-gray-300 focus:ring-gray-200"
          }`}
          required
        />
        {passwordMismatch && (
          <p className="text-red-500 text-xs mt-1">Passwords do not match</p>
        )}
      </div>

      <button
        type="button"
        onClick={onSubmit}
        disabled={isLoading || !isFormValid}
        className="w-full bg-black text-white py-3 px-4 rounded-2xl font-medium hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? (
          <div className="flex items-center justify-center">
            <svg
              className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            Setting Password...
          </div>
        ) : (
          "SET PASSWORD"
        )}
      </button>
    </>
  );
};

export default NewPasswordForm;
