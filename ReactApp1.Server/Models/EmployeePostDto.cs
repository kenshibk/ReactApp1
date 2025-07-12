namespace ReactApp1.Server.Models
{
    public class EmployeePostDto
    {
        
        public string EmployeeName { get; set; } = string.Empty;
        public int DepartmentID { get; set; } // DepartmentName から変更
        public DateTime? HireDate { get; set; }
        public decimal? SalaryAmount { get; set; }
    }
}