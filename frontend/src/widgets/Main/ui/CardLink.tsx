import { LucideIcon } from "lucide-react";
import { m } from "motion/react";
import { Link } from "react-router";
import type { INavItems } from "../constants/navlinks";

type Props = {
  item: INavItems;
  index: number;
  Icon: LucideIcon;
};

export const CardLink = ({ item, index, Icon }: Props) => {
  return (
    <m.div key={item.to} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1, duration: 0.5 }}>
      <Link
        to={item.to}
        className={`block bg-linear-to-br ${item.color} ${item.hoverColor} rounded-2xl p-8 shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300 group`}
      >
        <div className="flex flex-col items-center gap-4">
          <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
            <Icon className="w-8 h-8" />
          </div>
          <div>
            <h3 className="text-2xl font-bold mb-2">{item.label}</h3>
            <p className="text-sm text-white/80">{item.description}</p>
          </div>
        </div>
      </Link>
    </m.div>
  );
};
