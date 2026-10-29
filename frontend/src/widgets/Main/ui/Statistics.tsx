import { ArrowRightLeft, UserMinus, UserPlus, Users } from "lucide-react";
import { TStats } from "../model/types";
import { StatCard } from "./";

type Props = {
  stats: TStats;
};

export const Statistics = ({ stats }: Props) => {
  return (
    <div className="max-w-7xl mx-auto px-6 -mt-10">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <StatCard icon={Users} label="Активных сотрудников" value={stats.activeEmployees} color="bg-green-500" />
        <StatCard icon={UserPlus} label="Приемов за 30 дней" value={stats.totalHire} color="bg-blue-500" />
        <StatCard icon={ArrowRightLeft} label="Переводов за 30 дней" value={stats.totalTransfer} color="bg-purple-500" />
        <StatCard icon={UserMinus} label="Увольнений за 30 дней" value={stats.totalFire} color="bg-red-500" />
      </div>
    </div>
  );
};
