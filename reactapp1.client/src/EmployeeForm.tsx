import { useState, useEffect } from 'react';
import { Employee, EmployeeData, Department } from './api/employeesApi';

interface EmployeeFormProps {
    employee?: Employee | null;
    departments: Department[];
    onSave: (employee: EmployeeData) => void;
    onCancel: () => void;
    isOpen: boolean;
}

function EmployeeForm({ employee, departments, onSave, onCancel, isOpen }: EmployeeFormProps) {
    const [formData, setFormData] = useState<EmployeeData & { employeeID?: number }>({
        employeeID: undefined,
        employeeName: '',
        departmentID: undefined,
        hireDate: '',
        salaryAmount: 0
    });

    useEffect(() => {
        if (isOpen) {
            if (employee) {
                setFormData({
                    employeeID: employee.employeeID,
                    employeeName: employee.employeeName,
                    departmentID: employee.departmentID,
                    hireDate: employee.hireDate ? new Date(employee.hireDate).toISOString().split('T')[0] : '',
                    salaryAmount: employee.salaryAmount ?? 0,
                });
            } else {
                setFormData({ employeeID: undefined, employeeName: '', departmentID: undefined, hireDate: '', salaryAmount: 0 });
            }
        }
    }, [employee, isOpen]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        let valueToSet: any = value;
        if (name === 'salaryAmount' || name === 'departmentID' || name === 'employeeID') {
            valueToSet = value === '' ? undefined : Number(value);
        }
        setFormData(prev => ({ ...prev, [name]: valueToSet }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave(formData);
    };

    if (!isOpen) return null;

    return (
        <div className="modal fade show" tabIndex={-1} style={{ display: 'block' }} aria-modal="true" role="dialog">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <form onSubmit={handleSubmit}>
                        <div className="modal-header">
                            <h5 className="modal-title">{employee ? '従業員情報の編集' : '新規従業員の作成'}</h5>
                            <button type="button" className="btn-close" onClick={onCancel} aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            {/* 新規追加時だけID入力欄を表示 */}
                            {!employee && (
                                <div className="mb-3">
                                    <label htmlFor="employeeID" className="form-label">従業員ID</label>
                                    <input
                                        type="number"
                                        className="form-control"
                                        id="employeeID"
                                        name="employeeID"
                                        value={formData.employeeID ?? ''}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                            )}
                            <div className="mb-3">
                                <label htmlFor="employeeName" className="form-label">名前</label>
                                <input type="text" className="form-control" id="employeeName" name="employeeName" value={formData.employeeName} onChange={handleChange} required />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="departmentID" className="form-label">部署</label>
                                <select
                                    className="form-select"
                                    id="departmentID"
                                    name="departmentID"
                                    value={formData.departmentID ?? ''}
                                    onChange={handleChange}
                                >
                                    <option value="">部署を選択...</option>
                                    {departments.map(dep => (
                                        <option key={dep.departmentID} value={dep.departmentID}>
                                            {dep.departmentID}: {dep.departmentName}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="hireDate" className="form-label">入社日</label>
                                <input type="date" className="form-control" id="hireDate" name="hireDate" value={formData.hireDate ?? ''} onChange={handleChange} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="salaryAmount" className="form-label">給与</label>
                                <input type="number" className="form-control" id="salaryAmount" name="salaryAmount" value={formData.salaryAmount ?? ''} onChange={handleChange} />
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" onClick={onCancel}>キャンセル</button>
                            <button type="submit" className="btn btn-primary">保存</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default EmployeeForm;
