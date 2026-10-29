import { LucideIcon } from "lucide-react";
import { m } from "motion/react";
import { ReactNode } from "react";
import { Link } from "react-router";

type Props = {
  to: string;
  isActive: boolean;
  icon: LucideIcon;
  children: ReactNode;
};

export const NavLink = ({ to, isActive, children, icon: Icon }: Props) => {
  return (
    <Link key={to} to={to} className="relative">
      <m.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={`
                    relative flex items-center gap-2 px-4 py-2 rounded-lg
                    text-sm font-medium transition-colors
                    ${isActive ? "text-gray-950" : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"}
                  `}
      >
        <Icon className="w-4 h-4" />
        <span>{children}</span>

        {isActive && (
          <m.div
            layoutId="activeTab"
            className="absolute inset-0 bg-gray-100 rounded-lg -z-10"
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          />
        )}
      </m.div>
    </Link>
  );
};
