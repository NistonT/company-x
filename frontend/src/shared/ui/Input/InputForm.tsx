import { AlertCircle, LucideIcon } from "lucide-react";
import { m } from "motion/react";
import { forwardRef, InputHTMLAttributes, ReactNode } from "react";
import { FieldError } from "react-hook-form";

type Props = InputHTMLAttributes<HTMLInputElement> & {
  children: ReactNode;
  icon: LucideIcon;
  error?: FieldError;
};

export const InputForm = forwardRef<HTMLInputElement, Props>(({ children, error, icon: Icon, ...props }, ref) => {
  return (
    <div className="space-y-1">
      <label className="flex items-center gap-1.5 text-xs font-medium text-gray-700">
        <Icon className="w-3 h-3 text-gray-400" />
        {children}
      </label>
      <input
        ref={ref}
        className={`w-full px-3 py-2 border rounded-lg text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-gray-950 ${error ? "border-red-400 focus:ring-red-500" : "border-gray-300 focus:border-gray-700"}`}
        {...props}
      />
      {error && (
        <m.p initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-1 text-xs text-red-600">
          <AlertCircle className="w-3 h-3 shrink-0" />
          {error.message}
        </m.p>
      )}
    </div>
  );
});
