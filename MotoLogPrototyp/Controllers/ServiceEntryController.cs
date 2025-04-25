using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MotoLogPrototyp.Models;

[ApiController]
[Route("api/[controller]")]
public class ServiceEntryController : ControllerBase
{
    private readonly MotoLogDbContext _context;

    public ServiceEntryController(MotoLogDbContext context)
    {
        _context = context;
    }

    [HttpGet("{motorradId}")]
    public async Task<IActionResult> GetFuerMotorrad(int motorradId)
    {
        var eintraege = await _context.ServiceEntries
            .Where(e => e.MotorcycleId == motorradId)
            .ToListAsync();

        return Ok(eintraege);
    }

    [HttpPost]
    public async Task<IActionResult> Erstellen(ServiceEntry entry)
    {
        _context.ServiceEntries.Add(entry);
        await _context.SaveChangesAsync();
        return Ok(entry);
    }
}
