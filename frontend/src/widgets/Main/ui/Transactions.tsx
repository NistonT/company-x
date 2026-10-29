import { TrendingUp } from "lucide-react";
import { m } from "motion/react";
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import type { TChartData } from "../model/types";

type Props = {
  chartData: TChartData[];
};

export const Transactions = ({ chartData }: Props) => {
  return (
    <m.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="bg-white rounded-2xl shadow-lg p-8">
      <div className="flex items-center gap-3 mb-6">
        <TrendingUp className="w-6 h-6 text-gray-600" />
        <h2 className="text-2xl font-bold text-gray-900">Количество операций по дням</h2>
      </div>

      <div className="h-96">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="date" stroke="#6b7280" style={{ fontSize: "12px" }} />
            <YAxis stroke="#6b7280" style={{ fontSize: "12px" }} />
            <Tooltip
              contentStyle={{
                backgroundColor: "#fff",
                border: "1px solid #e5e7eb",
                borderRadius: "8px",
              }}
            />
            <Legend />
            <Bar dataKey="Hire" fill="#10b981" name="Приемы" radius={[4, 4, 0, 0]} />
            <Bar dataKey="Transfer" fill="#3b82f6" name="Переводы" radius={[4, 4, 0, 0]} />
            <Bar dataKey="Fire" fill="#ef4444" name="Увольнения" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </m.div>
  );
};
