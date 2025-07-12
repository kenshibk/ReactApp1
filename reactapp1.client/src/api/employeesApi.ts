// src/api/employeesApi.ts

export interface Department {
    departmentID: number;
    departmentName: string;
}

export interface Employee {
    employeeID: number;
    employeeName: string;
    departmentID?: number;
    departmentName?: string;
    hireDate?: string;
    salaryAmount?: number;
}

export type EmployeeData = Omit<Employee, 'employeeID' | 'departmentName'>;


// 従業員一覧を取得
export async function fetchEmployees(): Promise<Employee[]> {
    const res = await fetch('/employees');
    if (!res.ok) throw new Error('従業員データの取得に失敗しました');
    return res.json();
}

// カスタム従業員一覧を取得
export async function fetchEmployeesCustom(): Promise<Employee[]> {
    const res = await fetch('/employees/custom');
    if (!res.ok) throw new Error('カスタム従業員データの取得に失敗しました');
    return res.json();
}

// 部署一覧を取得
export async function fetchDepartments(): Promise<Department[]> {
    const res = await fetch('/api/departments');
    if (!res.ok) throw new Error('部署データの取得に失敗しました');
    return res.json();
}

// 従業員を作成
export async function createEmployee(employeeData: EmployeeData): Promise<Employee> {
    const res = await fetch('/employees', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(employeeData),
    });
    if (!res.ok) throw new Error('従業員の作成に失敗しました');
    return res.json();
}

// 従業員を更新
export async function updateEmployee(id: number, employeeData: EmployeeData): Promise<void> {
    const res = await fetch(`/employees/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(employeeData),
    });
    if (!res.ok) throw new Error('従業員の更新に失敗しました');
}

// 従業員を削除
export async function deleteEmployee(id: number): Promise<void> {
    const res = await fetch(`/employees/${id}`, {
        method: 'DELETE',
    });
    if (!res.ok) throw new Error('従業員の削除に失敗しました');
}