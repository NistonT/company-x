import { navItems } from "@/shared/consts/navigation";
import { motion } from "motion/react";
import { useLocation } from "react-router";
import { Logo, NavLink } from "./ui";

export const Header = () => {
  const location = useLocation();

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200 shadow-sm"
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Logo />

        <nav className="flex items-center gap-1">
          {navItems.map((item) => {
            const isActive = location.pathname === item.to;
            const Icon = item.icon;

            return (
              <NavLink key={item.label} to={item.to} isActive={isActive} icon={Icon}>
                {item.label}
              </NavLink>
            );
          })}
        </nav>
      </div>
    </motion.header>
  );
};
