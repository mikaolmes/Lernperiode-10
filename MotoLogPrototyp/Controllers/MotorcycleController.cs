using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MotoLogPrototyp.Models;

[ApiController]
[Route("api/[controller]")]
public class MotorcycleController : ControllerBase
{
    private readonly MotoLogDbContext _context;

    public MotorcycleController(MotoLogDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<IActionResult> GetAlle()
    {
        var motorraeder = await _context.Motorcycles.ToListAsync();
        return Ok(motorraeder);
    }

    [HttpPost]
    public async Task<IActionResult> Erstellen(Motorcycle motorcycle)
    {
        _context.Motorcycles.Add(motorcycle);
        await _context.SaveChangesAsync();
        return CreatedAtAction(nameof(GetAlle), new { id = motorcycle.Id }, motorcycle);
    }
}
