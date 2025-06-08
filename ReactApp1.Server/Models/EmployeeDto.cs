namespace ReactApp1.Server.Models
{
    // Models/EmployeeDto.cs
    public class EmployeeDto
    {
        public int EmployeeID { get; set; }
        public string EmployeeName { get; set; } = "";
        public string? DepartmentName { get; set; }
        public DateTime? HireDate { get; set; }
        public decimal? SalaryAmount { get; set; }
    }
}
