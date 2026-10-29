interface IDepartmentBase {
  code: string;
  fullName: string;
  abbreviation: string;
}

export interface IDepartment extends IDepartmentBase {
  id: number;
  createdDate: string;
  liquidatedDate?: string;
  parentDepartmentId?: number;
}

export interface ICreateDepartmentDto extends IDepartmentBase {
  parentId?: number;
}
