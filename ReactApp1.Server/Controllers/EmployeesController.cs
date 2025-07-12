// Controllers/EmployeesController.cs
using Microsoft.AspNetCore.Mvc;
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

    [HttpGet]
    public async Task<ActionResult<IEnumerable<EmployeeDto>>> GetEmployees()
    {
        return await _context.Employees
            .Include(e => e.Department)
            .Include(e => e.Salary)
            .Select(e => new EmployeeDto
            {
                EmployeeID = e.EmployeeID,
                EmployeeName = e.EmployeeName,
                DepartmentID = e.DepartmentID,
                DepartmentName = e.Department != null ? e.Department.DepartmentName : null,
                HireDate = e.HireDate,
                SalaryAmount = e.Salary != null ? e.Salary.Amount : null
            })
            .ToListAsync();
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Employee>> GetEmployee(int id)
    {
        var employee = await _context.Employees.Include(e => e.Department).Include(e => e.Salary)
            .FirstOrDefaultAsync(e => e.EmployeeID == id);
        return employee == null ? NotFound() : employee;
    }

    [HttpPost]
    public async Task<ActionResult<Employee>> CreateEmployee(EmployeeDto employeeDto)
    {
        var employee = new Employee
        {
            EmployeeID = employeeDto.EmployeeID,
            EmployeeName = employeeDto.EmployeeName,
            HireDate = employeeDto.HireDate,
            DepartmentID = employeeDto.DepartmentID
        };

        _context.Employees.Add(employee);
        await _context.SaveChangesAsync();

        if (employeeDto.SalaryAmount.HasValue)
        {
            var salary = new Salary { EmployeeID = employee.EmployeeID, Amount = employeeDto.SalaryAmount.Value };
            _context.Salaries.Add(salary);
            await _context.SaveChangesAsync();
        }

        return CreatedAtAction(nameof(GetEmployee), new { id = employee.EmployeeID }, employee);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateEmployee(int id, EmployeeDto employeeDto)
    {
        var employee = await _context.Employees.Include(e => e.Salary).FirstOrDefaultAsync(e => e.EmployeeID == id);
        if (employee == null) return NotFound();

        employee.EmployeeName = employeeDto.EmployeeName;
        employee.HireDate = employeeDto.HireDate;
        employee.DepartmentID = employeeDto.DepartmentID;

        if (employeeDto.SalaryAmount.HasValue)
        {
            if (employee.Salary != null)
            {
                employee.Salary.Amount = employeeDto.SalaryAmount.Value;
            }
            else
            {
                var newSalary = new Salary { EmployeeID = id, Amount = employeeDto.SalaryAmount.Value };
                _context.Salaries.Add(newSalary);
            }
        }
        else if (employee.Salary != null)
        {
            _context.Salaries.Remove(employee.Salary);
        }

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
            .Where(e => e.Salary != null && e.Salary.Amount >= 300000)
            .Select(e => new EmployeeDto
            {
                EmployeeID = e.EmployeeID,
                EmployeeName = e.EmployeeName,
                DepartmentID = e.DepartmentID,
                DepartmentName = e.Department != null ? e.Department.DepartmentName : null,
                HireDate = e.HireDate,
                SalaryAmount = e.Salary != null ? e.Salary.Amount : null
            })
            .ToListAsync();

        return employees;
    }
}