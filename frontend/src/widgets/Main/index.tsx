import { useMain } from "./hook/useMain";
import { HeaderMain, Movements, Statistics, Transactions } from "./ui";

export const Main = () => {
  const { chartData, stats } = useMain();

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 to-gray-100">
      <HeaderMain />

      <Statistics stats={stats} />

      <div className="max-w-7xl mx-auto px-6 py-12 space-y-8">
        <Movements chartData={chartData} />

        <Transactions chartData={chartData} />
      </div>
    </div>
  );
};
