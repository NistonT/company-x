import type { TGender, TMovementType } from "@/shared/model/types/base";

interface IEmployeeBase {
  tabNumber: string;
  fullName: string;
  gender: TGender;
  birthDate: string;
  hireDate: string;
  position: string;
  phone?: string;
  email?: string;
  departmentId: number;
}

export interface IEmployee extends IEmployeeBase {
  id: number;
  dismissalDate?: string;
  photoUrl?: string;
  departmentName: string;
  age: number;
  tenureYears: number;
  isActive: boolean;
}

export interface ICreateEmployeeDto extends IEmployeeBase {
  photoUrl?: string;
}

export interface IMovementDto {
  employeeId: number;
  type: Omit<TMovementType, "Hire">;
  eventDate: string;
  departmentId?: number;
  position?: string;
}

export interface IReportParams {
  startDate: string;
  endDate: string;
  type?: TMovementType;
}

export interface IReportItem {
  employeeId: number;
  tabNumber: string;
  fullName: string;
  departmentName: string;
  position: string | null;
  eventDate: string;
}

export interface IReportGroup {
  type: TMovementType;
  items: IReportItem[];
}

export type TReportResponse = IReportGroup[];
