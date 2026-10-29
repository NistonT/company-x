import { LucideIcon } from "lucide-react";

type Props = {
  icon: LucideIcon;
  label: string;
  value: string;
  colSpan?: number;
};

export const DetailItem = ({ icon: Icon, label, value, colSpan = 1 }: Props) => (
  <div className={`flex items-start gap-3 ${colSpan === 2 ? "col-span-2" : ""}`}>
    <div className="mt-0.5 p-2 bg-gray-100 rounded-lg">
      <Icon className="w-4 h-4 text-gray-600" />
    </div>
    <div>
      <div className="text-xs text-gray-500 font-medium uppercase tracking-wide">{label}</div>
      <div className="text-sm font-semibold text-gray-900 mt-0.5">{value}</div>
    </div>
  </div>
);
