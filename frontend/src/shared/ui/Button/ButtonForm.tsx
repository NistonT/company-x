import { Loader2, Plus } from "lucide-react";
import { ButtonHTMLAttributes, forwardRef, ReactNode } from "react";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  isLoading: boolean;
  children: ReactNode;
  className?: string;
};

export const ButtonForm = forwardRef<HTMLButtonElement, Props>(({ isLoading, children, className, ...props }, ref) => {
  return (
    <button
      ref={ref}
      disabled={isLoading}

      {...props}
      className={`inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium text-white bg-gray-950 hover:bg-gray-700 disabled:opacity-60 disabled:cursor-not-allowed transition-colors shadow-sm ${className}`}
    >
      {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />}
      {isLoading ? "Загрузка..." : `${children}`}
    </button>
  );
});
