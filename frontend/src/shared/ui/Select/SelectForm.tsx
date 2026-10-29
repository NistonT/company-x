import { LucideIcon } from "lucide-react";
import { forwardRef, ReactNode, SelectHTMLAttributes } from "react";
import { FieldError } from "react-hook-form";

type Props = SelectHTMLAttributes<HTMLSelectElement> & {
  icon: LucideIcon;
  error?: FieldError;
  children: ReactNode;
  label: string;
};

export const SelectForm = forwardRef<HTMLSelectElement, Props>(({ icon: Icon, error, children, label, ...props }, ref) => {
  return (
    <div className="space-y-1">
      <label className="flex items-center gap-1.5 text-xs font-medium text-gray-700">
        <Icon className="w-3 h-3 text-gray-400" />
        {label}
      </label>
      <select
        ref={ref}
        {...props}
        className={`w-full px-3 py-2 border rounded-lg text-sm transition-colors
            focus:outline-none focus:ring-2
            ${error ? "border-red-400 focus:ring-red-500" : "border-gray-950"}`}
      >
        {children}
      </select>
      {error && <p className="text-xs text-red-600">{error.message}</p>}
    </div>
  );
});
