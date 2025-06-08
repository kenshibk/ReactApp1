namespace ReactApp1.Server.Models
{
    // Models/Employee.cs
    public class Employee
    {
        public int EmployeeID { get; set; }
        public int DepartmentID { get; set; }
        public string EmployeeName { get; set; } = string.Empty;
        public DateTime? HireDate { get; set; }
        public Department? Department { get; set; }
        public Salary? Salary { get; set; }
    }
}
