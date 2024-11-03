using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.Cosmos;
using MelenappApi.Models;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Azure.Cosmos.Linq;
using System.Net;

namespace MelenappApi.Controllers
{
    // [Authorize]
    [ApiController]
    [Route("[controller]")]
    public class ExercisesController : ControllerBase
    {

        private readonly Container _container;

        public ExercisesController(CosmosClient cosmosClient, IConfiguration configuration)
        {
            string databaseName = configuration["CosmosDb:DatabaseName"];
            string containerName = "Skills";
            _container = cosmosClient.GetContainer(databaseName, containerName);
        }


        [HttpGet]
        public async Task<IActionResult> GetSkills()
        {
            List<Skill> skills = new List<Skill>();

            try
            {
                var query = _container.GetItemLinqQueryable<Skill>()
                    //.Where(e => e.IsActive)
                    .ToFeedIterator();

                
                while (query.HasMoreResults)
                {
                    var response = await query.ReadNextAsync();
                    skills.AddRange(response);
                }
            }
            catch (System.Exception e)
            {
                
                throw e;
            }
    

            return Ok(skills);
        }


        [HttpGet("{id}")]
        public async Task<IActionResult> GetSkill(string id)
        {
            try
            {
                ItemResponse<Skill> response = await _container.ReadItemAsync<Skill>(id, new PartitionKey(id));

                if (response != null)
                {
                    return Ok(response.Resource);
                }
                
                return NotFound($"Skill with id {id} not found.");
            }
            catch (CosmosException ex) when (ex.StatusCode == HttpStatusCode.NotFound)
            {
                return NotFound($"Skill with id {id} not found.");
            }
            catch (Exception e)
            {
                throw;
            }
        }

        [HttpGet("category/{*categoryPath}")]
        public async Task<IActionResult> GetSkillsyCategory(string categoryPath)
        {
            try
            {
                // Example: Query the skills where the category matches the given path
                var query = _container.GetItemLinqQueryable<Skill>()
                            .Where(e => e.Category.StartsWith(categoryPath))
                            .ToFeedIterator();

                List<Skill> skills = new List<Skill>();
                while (query.HasMoreResults)
                {
                    var response = await query.ReadNextAsync();
                    skills.AddRange(response);
                }

                return Ok(skills);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }


        [HttpPost]
        public async Task<IActionResult> CreateSkill([FromBody] Skill skill)
        {
            if (skill == null)
            {
                return BadRequest("Skill data is missing.");
            }

            try
            {
                skill.Id = Guid.NewGuid().ToString("N").Substring(0, 8);
                ItemResponse<Skill> response = await _container.CreateItemAsync(skill);
                return Ok(response.Resource); // Return the created skill
            }
            catch (CosmosException ex)
            {
                return StatusCode((int)ex.StatusCode, ex.Message);
            }
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateSkill(string id, [FromBody] Skill updatedSkill)
        {
            if (updatedSkill == null || string.IsNullOrEmpty(id))
            {
                return BadRequest("Invalid skill data or missing ID.");
            }

            try
            {
                // Set the partition key (assuming 'Category' is the partition key)
                var partitionKey = new PartitionKey(id);

                // Fetch the current skill by ID and partition key
                ItemResponse<Skill> skillResponse = await _container.ReadItemAsync<Skill>(id, partitionKey);

                var existingSkill = skillResponse.Resource;

                // Update the fields of the existing skill
                existingSkill.Title = updatedSkill.Title;
                existingSkill.Description = updatedSkill.Description;
                existingSkill.VideoUrl = updatedSkill.VideoUrl;
                existingSkill.Level = updatedSkill.Level;
                existingSkill.Category = updatedSkill.Category;
                existingSkill.Tags = updatedSkill.Tags;
                
                // Replace the existing item with the updated version
                var response = await _container.ReplaceItemAsync(existingSkill, id, partitionKey);

                return Ok(response.Resource); // Return the updated skill
            }
            catch (CosmosException ex) when (ex.StatusCode == System.Net.HttpStatusCode.NotFound)
            {
                return NotFound($"Skill with ID {id} not found.");
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        [HttpGet("mock")]
        public async Task<IActionResult> GetSkillsMock()
        {
            List<Skill> skills = new List<Skill>{
                new Skill{
                    Id = "pija",
                    Title="Mock Skill",
                    Category="wfe",
                    Level="wef",
                    VideoUrl="wef",
                    Description="wef",
                    IsActive=true
                }
            };

            return Ok(skills);
        }

    // Other actions (POST, PUT, DELETE)
    }  
}





