import type { IDepartment } from "@/entities/departments/model/types";
import type { IEmployee } from "@/entities/employees/model/types";

export type TMovementType = "Hire" | "Transfer" | "Fire";

export type TGender = "Male" | "Female";

export const isEmployee = (item: IDepartment | IEmployee): item is IEmployee => {
  return "isActive" in item;
};
