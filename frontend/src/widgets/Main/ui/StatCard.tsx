import { LucideIcon } from "lucide-react";
import { m } from "motion/react";

type Props = {
  icon: LucideIcon;
  label: string;
  value: number;
  color: string;
};

export const StatCard = ({ icon: Icon, label, value, color }: Props) => (
  <m.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-xl shadow-lg p-6 flex items-center gap-4">
    <div className={`w-12 h-12 ${color} rounded-lg flex items-center justify-center`}>
      <Icon className="w-6 h-6 text-white" />
    </div>
    <div>
      <div className="text-sm text-gray-500 font-medium">{label}</div>
      <div className="text-2xl font-bold text-gray-900">{value}</div>
    </div>
  </m.div>
);
