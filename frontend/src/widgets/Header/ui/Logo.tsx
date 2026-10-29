import { NAME_SITE } from "@/shared/consts/constants";
import { pageRouter } from "@/shared/consts/page-router";
import { Building2 } from "lucide-react";
import { m } from "motion/react";
import { Link } from "react-router";

export const Logo = () => {
  return (
    <Link to={pageRouter.HOME} className="flex items-center gap-2 group">
      <m.div
        whileHover={{ scale: 1.1 }}
        transition={{ type: "spring", stiffness: 300, damping: 15 }}
        className="w-9 h-9 rounded-lg bg-linear-to-br from-gray-950 to-gray-900 flex items-center justify-center shadow-md"
      >
        <Building2 className="w-5 h-5 text-white" />
      </m.div>
      <span className="text-lg font-bold text-gray-700 group-hover:text-gray-900 transition-colors">{NAME_SITE}</span>
    </Link>
  );
};
