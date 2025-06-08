// src/api/employeesApi.ts
export interface Employee {
    employeeID: number;
    employeeName: string;
    departmentName?: string;
    hireDate?: string;
    salaryAmount?: number;
}

// 従業員一覧を取得
export async function fetchEmployees(): Promise<Employee[]> {
    const res = await fetch('/employees');
    if (!res.ok) throw new Error('従業員データの取得に失敗しました');
    return res.json();
}

// 新しいAPI呼び出し関数を追加
export async function fetchEmployeesCustom(): Promise<Employee[]> {
    const res = await fetch('/employees/custom');
    if (!res.ok) throw new Error('カスタム従業員データの取得に失敗しました');
    return res.json();
}