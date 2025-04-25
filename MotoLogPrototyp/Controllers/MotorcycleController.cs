using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MotoLogPrototyp.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

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
        }

        // GET: api/Motorcycle  
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Motorcycle>>> GetAll()
        {
            return await _context.Motorcycles.ToListAsync();
        }

        // GET: api/Motorcycle/5  
        [HttpGet("{id}")]
        public async Task<ActionResult<Motorcycle>> GetMotorcycle(int id)
        {
            var motorcycle = await _context.Motorcycles.FindAsync(id);
            if (motorcycle == null)
            {
                return NotFound();
            }
            return motorcycle;
        }
    }
}
