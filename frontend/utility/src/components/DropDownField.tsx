import { UseFormRegister, FieldErrors, RegisterOptions } from "react-hook-form";
interface DropDownFieldProps {
  label: string;
  name: string;
  register: UseFormRegister<any>;
  errors: FieldErrors;
  validation?: RegisterOptions;
  className?: string;
  options?: { value: string | number; label: string }[];
}

const DropDownField = (props: DropDownFieldProps) => {
  return (
    <div className="flex-1">
      <label className="block text-xs font-semibold text-gray-700 mb-1">
        {props.label}
      </label>
      <select
        name={props.name}
        {...props.register(props.name, props.validation)}
        className="w-full px-3 py-1.5 border border-gray-300 rounded text-xs text-gray-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
      >
        <option value="">Select an option</option>
        {props.options?.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      {/* Error message */}
      {props.errors[props.name] && (
        <p className="text-red-500 text-xs mt-1 animate-fade-in appear animation-duration-500">
          {props.errors[props.name]?.message as string}
        </p>
      )}
    </div>
  );
};

export default DropDownField;
