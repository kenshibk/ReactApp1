using System.ComponentModel.DataAnnotations.Schema; // この行を追加

namespace ReactApp1.Server.Models
{
    public class Employee
    {
        [DatabaseGenerated(DatabaseGeneratedOption.None)] // この属性を追加
        public int EmployeeID { get; set; }
        public int? DepartmentID { get; set; }
        public string EmployeeName { get; set; } = string.Empty;
        public DateTime? HireDate { get; set; }
        public Department? Department { get; set; }
        public Salary? Salary { get; set; }
    }
}