export type TConfig = {
  label: string;
  color: string;
  bg: string;
};

export const typeConfig: Record<string, TConfig> = {
  Hire: { label: "Прием", color: "text-green-700", bg: "bg-green-100" },
  Transfer: { label: "Перевод", color: "text-blue-700", bg: "bg-blue-100" },
  Fire: { label: "Увольнение", color: "text-red-700", bg: "bg-red-100" },
};
