import { m } from "motion/react";
import { CardLink } from ".";
import { navItems } from "../constants/navlinks";

export const HeaderMain = () => {
  return (
    <div className="bg-linear-to-br from-gray-600 via-gray-600 to-gray-700 text-white py-20 px-6">
      <m.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="max-w-6xl mx-auto text-center">
        <h1 className="text-5xl font-bold mb-4">Система управления персоналом</h1>
        <p className="text-xl text-blue-100 mb-12">Управляйте сотрудниками, подразделениями и отчетами в одном месте</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {navItems.map((item, index) => {
            const Icon = item.icon;
            return <CardLink item={item} index={index} Icon={Icon} />;
          })}
        </div>
      </m.div>
    </div>
  );
};
