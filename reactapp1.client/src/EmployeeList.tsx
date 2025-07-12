import { useEffect, useState } from "react";
import { fetchEmployees, fetchEmployeesCustom, createEmployee, updateEmployee, deleteEmployee, Employee, EmployeeData, Department } from "./api/employeesApi";
import { fetchDepartments } from "./api/employeesApi";
import EmployeeForm from "./EmployeeForm";

function EmployeeList() {
    const [employees, setEmployees] = useState<Employee[]>([]);
    const [departments, setDepartments] = useState<Department[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [isCustom, setIsCustom] = useState(false);

    const [isFormOpen, setIsFormOpen] = useState(false);
    const [editingEmployee, setEditingEmployee] = useState<Employee | null>(null);

    const loadInitialData = async () => {
        setLoading(true);
        setError(null);
        const fetcher = isCustom ? fetchEmployeesCustom : fetchEmployees;
        fetcher()
            .then(data => {
                setEmployees(data);
                setLoading(false);
            })
            .catch(err => {
                setError(err.message);
                setLoading(false);
            });

        fetchDepartments()
            .then(data => {
                setDepartments(data);
                setLoading(false);
            })
            .catch(err => {
                setError(err.message);
                setLoading(false);
            });
        //try {
        //    const fetcher = isCustom ? fetchEmployeesCustom : fetchEmployees;
        //    const employeePromise = fetcher();
        //    const departmentPromise = fetchDepartments();
            
        //    const [employeeData, departmentData] = await Promise.all([employeePromise, departmentPromise]);

        //    setEmployees(employeeData);
        //    setDepartments(departmentData);
        //} catch (err) {
        //    setError((err as Error).message);
        //} finally {
        //    setLoading(false);
        //}
    };

    useEffect(() => {
        loadInitialData();
    }, [isCustom]);

    const handleCreate = () => {
        setEditingEmployee(null);
        setIsFormOpen(true);
    };

    const handleUpdate = (id: number) => {
        const employeeToEdit = employees.find(e => e.employeeID === id);
        if (employeeToEdit) {
            setEditingEmployee(employeeToEdit);
            setIsFormOpen(true);
        }
    };

    const handleDelete = async (id: number, name: string) => {
        if (window.confirm(`従業員「${name}」(ID: ${id}) を本当に削除しますか？`)) {
            try {
                await deleteEmployee(id);
                loadInitialData();
            } catch (err) {
                setError((err as Error).message);
            }
        }
    };

    const handleSave = async (employeeData: EmployeeData) => {
        try {
            setLoading(true);
            if (editingEmployee) {
                await updateEmployee(editingEmployee.employeeID, employeeData);
            } else {
                await createEmployee(employeeData);
            }
            setIsFormOpen(false);
            loadInitialData();
        } catch (err) {
            setError((err as Error).message);
            setLoading(false);
        }
    };

    return (
        <div className="container mt-4">
            {error && (
                <div className="alert alert-danger alert-dismissible fade show" role="alert">
                    <strong>エラー:</strong> {error}
                    <button type="button" className="btn-close" onClick={() => setError(null)} aria-label="Close"></button>
                </div>
            )}

            <h2 className="mb-4">従業員一覧</h2>
            <div className="d-flex justify-content-between mb-3">
                <div>
                    <button
                        className={`btn ${!isCustom ? "btn-primary" : "btn-outline-primary"} me-2`}
                        onClick={() => setIsCustom(false)}
                        disabled={!isCustom || loading}
                    >通常一覧</button>
                    <button
                        className={`btn ${isCustom ? "btn-primary" : "btn-outline-primary"}`}
                        onClick={() => setIsCustom(true)}
                        disabled={isCustom || loading}
                    >カスタム一覧</button>
                </div>
                <button className="btn btn-success" onClick={handleCreate} disabled={loading}>+ 新規作成</button>
            </div>

            {loading && <div className="text-center mt-5"><div className="spinner-border" role="status"></div><div>処理中...</div></div>}

            {!loading && (
                 <div className="table-responsive">
                 <table className="table table-striped table-bordered table-hover align-middle">
                     <thead className="table-dark">
                         <tr>
                             <th scope="col">ID</th>
                             <th scope="col">名前</th>
                             <th scope="col">部署</th>
                             <th scope="col">入社日</th>
                             <th scope="col">給与</th>
                             <th scope="col" style={{ width: "150px" }}>操作</th>
                         </tr>
                     </thead>
                     <tbody>
                         {employees.map(e => (
                             <tr key={e.employeeID}>
                                 <td>{e.employeeID}</td>
                                 <td>{e.employeeName}</td>
                                 <td>{e.departmentID ? `${e.departmentID}: ${e.departmentName}` : 'N/A'}</td>
                                 <td>{e.hireDate ? new Date(e.hireDate).toLocaleDateString() : "N/A"}</td>
                                 <td>{e.salaryAmount?.toLocaleString() ?? "N/A"}</td>
                                 <td>
                                     <button className="btn btn-sm btn-primary me-2" onClick={() => handleUpdate(e.employeeID)}>編集</button>
                                     <button className="btn btn-sm btn-danger" onClick={() => handleDelete(e.employeeID, e.employeeName)}>削除</button>
                                 </td>
                             </tr>
                         ))}
                     </tbody>
                 </table>
             </div>
            )}

            <EmployeeForm 
                isOpen={isFormOpen}
                employee={editingEmployee}
                departments={departments}
                onSave={handleSave}
                onCancel={() => setIsFormOpen(false)}
            />

            {isFormOpen && <div className="modal-backdrop fade show"></div>}
        </div>
    );
}

export default EmployeeList;