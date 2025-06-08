using System.ComponentModel.DataAnnotations;

namespace ReactApp1.Server.Models
{
    // Models/Salary.cs
    public class Salary
    {
        [Key]
        public int EmployeeID { get; set; }
        public decimal Amount { get; set; }
        public DateTime EffectiveDate { get; set; }
        public Employee? Employee { get; set; }
    }
}
