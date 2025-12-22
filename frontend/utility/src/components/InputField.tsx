import { UseFormRegister, FieldErrors, RegisterOptions } from "react-hook-form";

interface InputFieldProps {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  register: UseFormRegister<any>;
  errors: FieldErrors;
  validation?: RegisterOptions;
  inputFilter?: RegExp;
  className?: string;
}

const InputField = ({
  label,
  name,
  type = "text",
  placeholder,
  register,
  errors,
  validation,
  inputFilter,
  className = "flex-1",
}: InputFieldProps) => {
  return (
    <div className={className}>
      <label className="block text-xs font-semibold text-gray-700 mb-1">
        {label}
      </label>

      <input
        type={type}
        placeholder={placeholder}
        {...register(name, validation)}
        className="w-full px-3 py-1.5 border border-gray-300 rounded text-xs text-gray-700 placeholder-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
        onInput={
          inputFilter
            ? (e) => {
                const input = e.target as HTMLInputElement;
                input.value = input.value.replace(inputFilter, "");
              }
            : undefined
        }
      />

      {/* Error message */}
      {errors[name] && (
        <p className="text-red-500 text-xs mt-1 animate-fade-in appear animation-duration-500">
          {errors[name]?.message as string}
        </p>
      )}
    </div>
  );
};

export default InputField;
