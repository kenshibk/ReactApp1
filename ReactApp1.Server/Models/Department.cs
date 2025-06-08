// Models/Department.cs
using System.ComponentModel.DataAnnotations;

namespace ReactApp1.Server.Models
{
    
    public class Department
    {
        public int DepartmentID { get; set; }
        public string DepartmentName { get; set; } = string.Empty;
        public ICollection<Employee> Employees { get; set; } = new List<Employee>();
    }

    

    
}