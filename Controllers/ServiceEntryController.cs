using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MotoLogPrototyp.Models;
using System.Threading.Tasks;
using System.Linq;

namespace MotoLogPrototyp.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ServiceEntryController : ControllerBase
    {
        private readonly MotoLogDbContext _context;

        public ServiceEntryController(MotoLogDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult> GetAllServiceEntries()
        {
            var entries = await _context.ServiceEntries.ToListAsync();
            return Ok(entries);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult> GetServiceEntry(int id)
        {
            var entry = await _context.ServiceEntries.FindAsync(id);
            if (entry == null)
            {
                return NotFound();
            }
            return Ok(entry);
        }

        [HttpGet("motorcycle/{motorcycleId}")]
        public async Task<ActionResult> GetEntriesForMotorcycle(int motorcycleId)
        {

            var motorcycleExists = await _context.Motorcycles.AnyAsync(m => m.Id == motorcycleId);
            if (!motorcycleExists)
            {
                return NotFound($"Motorrad mit ID {motorcycleId} wurde nicht gefunden.");
            }

            var entries = await _context.ServiceEntries
                .Where(e => e.MotorcycleId == motorcycleId)
                .ToListAsync();

            if (entries.Count == 0)
            {

                return Ok(new
                {
                    message = $"Das Motorrad mit ID {motorcycleId} hat bisher keinen Service erhalten.",
                    data = new List<ServiceEntry>()
                });
            }
            return Ok(entries);
        }

        [HttpPost]
        public async Task<ActionResult> AddServiceEntry([FromBody] ServiceEntry serviceEntry)
        {
            
            serviceEntry.Motorcycle = null;

            try
            {
                
                var motorcycle = await _context.Motorcycles.FindAsync(serviceEntry.MotorcycleId);
                if (motorcycle == null)
                {
                    return NotFound($"Motorrad mit ID {serviceEntry.MotorcycleId} nicht gefunden.");
                }

                _context.ServiceEntries.Add(serviceEntry);
                await _context.SaveChangesAsync();

                return CreatedAtAction(nameof(GetServiceEntry), new { id = serviceEntry.Id }, serviceEntry);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }


        [HttpPut("{id}")]
        public async Task<ActionResult> PutMovie(int id, [FromBody] ServiceEntry serviceEntry)
        {
            if (id != serviceEntry.Id)
            {
                return BadRequest();
            }

            _context.Entry(serviceEntry).State = EntityState.Modified;
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!_context.Motorcycles.Any(p => p.Id == id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }
            return NoContent();
        }


        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteMovie(int id)
        {
            var movie = await _context.ServiceEntries.FindAsync(id);
            if (movie == null)
            {
                return NotFound();
            }

            _context.ServiceEntries.Remove(movie);
            await _context.SaveChangesAsync();
            return NoContent();
        }


    }
}