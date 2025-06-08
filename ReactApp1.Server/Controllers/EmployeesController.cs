// Controllers/EmployeesController.cs
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using ReactApp1.Server.Data;
using ReactApp1.Server.Models;

namespace ReactApp1.Server.Controllers;

[ApiController]
[Route("[controller]")]
public class EmployeesController : ControllerBase
{
    private readonly AppDbContext _context;
    public EmployeesController(AppDbContext context) => _context = context;

    //[HttpGet]
    //public async Task<ActionResult<IEnumerable<Employee>>> GetEmployees()
    //    => await _context.Employees.Include(e => e.Department).Include(e => e.Salary).ToListAsync();

    [HttpGet]
    public async Task<ActionResult<IEnumerable<EmployeeDto>>> GetEmployees()
    {
        var employees = await _context.Employees
            .Include(e => e.Department)
            .Include(e => e.Salary)
            .Select(e => new EmployeeDto
            {
                EmployeeID = e.EmployeeID,
                EmployeeName = e.EmployeeName,
                DepartmentName = e.Department != null ? e.Department.DepartmentName : null,
                HireDate = e.HireDate,
                SalaryAmount = e.Salary != null ? e.Salary.Amount : null
            })
            .ToListAsync();

        return employees;
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Employee>> GetEmployee(int id)
    {
        var employee = await _context.Employees.Include(e => e.Department).Include(e => e.Salary)
            .FirstOrDefaultAsync(e => e.EmployeeID == id);
        return employee == null ? NotFound() : employee;
    }

    [HttpPost]
    public async Task<ActionResult<Employee>> CreateEmployee(Employee employee)
    {
        _context.Employees.Add(employee);
        await _context.SaveChangesAsync();
        return CreatedAtAction(nameof(GetEmployee), new { id = employee.EmployeeID }, employee);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateEmployee(int id, Employee employee)
    {
        if (id != employee.EmployeeID) return BadRequest();
        _context.Entry(employee).State = EntityState.Modified;
        await _context.SaveChangesAsync();
        return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteEmployee(int id)
    {
        var employee = await _context.Employees.FindAsync(id);
        if (employee == null) return NotFound();
        _context.Employees.Remove(employee);
        await _context.SaveChangesAsync();
        return NoContent();
    }

    [HttpGet("custom")]
    public async Task<ActionResult<IEnumerable<EmployeeDto>>> GetEmployeesCustom()
    {
        var employees = await _context.Employees
            .Include(e => e.Department)
            .Include(e => e.Salary)
            .Where(e => e.Salary != null && e.Salary.Amount >= 300000) // šƒJƒXƒ^ƒ€ðŒ
            .Select(e => new EmployeeDto
            {
                EmployeeID = e.EmployeeID,
                EmployeeName = e.EmployeeName,
                DepartmentName = e.Department != null ? e.Department.DepartmentName : null,
                HireDate = e.HireDate,
                SalaryAmount = e.Salary != null ? e.Salary.Amount : null
            })
            .ToListAsync();

        return employees;
    }
}
