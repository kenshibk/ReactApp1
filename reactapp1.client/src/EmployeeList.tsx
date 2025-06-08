import { useEffect, useState } from "react";
import { fetchEmployees, Employee } from "./api/employeesApi";

function EmployeeList() {
    const [employees, setEmployees] = useState<Employee[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetchEmployees()
            .then(data => {
                setEmployees(data);
                setLoading(false);
            })
            .catch(err => {
                setError(err.message);
                setLoading(false);
            });
    }, []);

    if (loading) return <div className="text-center mt-5"><div className="spinner-border" role="status"></div><div>読み込み中...</div></div>;
    if (error) return <div className="alert alert-danger mt-3">エラー: {error}</div>;

    return (
        <div className="container">
            <h2 className="mb-4">従業員一覧</h2>
            <div className="table-responsive">
                <table className="table table-striped table-bordered align-middle">
                    <thead className="table-primary">
                        <tr>
                            <th>ID</th>
                            <th>名前</th>
                            <th>部署</th>
                            <th>入社日</th>
                            <th>給与</th>
                        </tr>
                    </thead>
                    <tbody>
                        {employees.map(e => (
                            <tr key={e.employeeID}>
                                <td>{e.employeeID}</td>
                                <td>{e.employeeName}</td>
                                <td>{e.departmentName ?? ""}</td>
                                <td>{e.hireDate ? new Date(e.hireDate).toLocaleDateString() : ""}</td>
                                <td>{e.salaryAmount?.toLocaleString() ?? ""}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default EmployeeList;