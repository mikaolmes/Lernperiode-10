using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MotoLogPrototyp.Models;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Linq;
using System;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;

namespace MotoLogPrototyp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MotorcycleController : ControllerBase
    {
        private readonly MotoLogDbContext _context;

        public MotorcycleController(MotoLogDbContext context)
        {
            _context = context;
            _context.Database.EnsureCreated();
        }

        [HttpGet]
        public async Task<ActionResult> GetAllMotorcycles()
        {
            var motorcycles = await _context.Motorcycles.ToListAsync();
            return Ok(motorcycles);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult> GetMotorcycle(int id)
        {
            var motorcycle = await _context.Motorcycles.FindAsync(id);
            if (motorcycle == null)
            {
                return NotFound();
            }
            return Ok(motorcycle);
        }

        [HttpPost]
        public async Task<ActionResult> PostMotorcycle([FromBody] Motorcycles motorcycle)
        {
            if (motorcycle == null)
            {
                return BadRequest("Motorcycle data is null");
            }

            motorcycle.ServiceEntries = motorcycle.ServiceEntries ?? new List<ServiceEntry>();

            try
            {
                _context.Motorcycles.Add(motorcycle);
                await _context.SaveChangesAsync();

                return CreatedAtAction(nameof(GetMotorcycle), new { id = motorcycle.Id }, motorcycle);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }           
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> PutMotorcycle(int id, [FromBody] Motorcycles motorcycles)
        {
            if (id != motorcycles.Id)
            {
                return BadRequest();
            }

            _context.Entry(motorcycles).State = EntityState.Modified;
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
        public async Task<ActionResult> DeleteMotorcycle(int id)
        {
            var movie = await _context.Motorcycles.FindAsync(id);
            if (movie == null)
            {
                return NotFound();
            }

            _context.Motorcycles.Remove(movie);
            await _context.SaveChangesAsync();
            return NoContent();
        }


    }
}