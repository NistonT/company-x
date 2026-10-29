import { TrendingUp } from "lucide-react";
import { m } from "motion/react";
import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import type { TChartData } from "../model/types";

type Props = {
  chartData: TChartData[];
};

export const Movements = ({ chartData }: Props) => {
  return (
    <m.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="bg-white rounded-2xl shadow-lg p-8">
      <div className="flex items-center gap-3 mb-6">
        <TrendingUp className="w-6 h-6 text-gray-600" />
        <h2 className="text-2xl font-bold text-gray-900">Динамика кадровых перемещений</h2>
      </div>

      <div className="h-96">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData}>
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
            <Line type="monotone" dataKey="Hire" stroke="#10b981" strokeWidth={2} name="Приемы" dot={{ r: 4 }} />
            <Line type="monotone" dataKey="Transfer" stroke="#3b82f6" strokeWidth={2} name="Переводы" dot={{ r: 4 }} />
            <Line type="monotone" dataKey="Fire" stroke="#ef4444" strokeWidth={2} name="Увольнения" dot={{ r: 4 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </m.div>
  );
};
