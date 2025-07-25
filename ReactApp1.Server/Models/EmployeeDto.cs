namespace ReactApp1.Server.Models
{
    public class EmployeeDto
    {
        public int EmployeeID { get; set; }
        public string EmployeeName { get; set; } = string.Empty;
        public int? DepartmentID { get; set; } // 追加
        public string? DepartmentName { get; set; }
        public DateTime? HireDate { get; set; }
        public decimal? SalaryAmount { get; set; }
    }
}