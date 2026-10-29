import { Search, X } from "lucide-react";
import { SetStateAction } from "react";

type Props = {
  filter: string;
  setFilter: (value: SetStateAction<string>) => void;
  placeholder?: string;
};

export const SearchTable = ({ filter, setFilter, placeholder }: Props) => {
  return (
    <div className="relative flex-1">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
      <input
        type="text"
        placeholder={placeholder}
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:text-gray-950 focus:border-transparent"
      />
      {filter && (
        <button
          onClick={() => setFilter("")}
          className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center transition-colors"
        >
          <X className="w-3 h-3 text-gray-600" />
        </button>
      )}
    </div>
  );
};
