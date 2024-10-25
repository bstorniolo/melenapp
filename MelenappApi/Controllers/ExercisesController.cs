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

        private readonly Container _exercisesContainer;

        public ExercisesController(CosmosClient cosmosClient, IConfiguration configuration)
        {
            string databaseName = configuration["CosmosDb:DatabaseName"];
            string containerName = "Skills";
            _exercisesContainer = cosmosClient.GetContainer(databaseName, containerName);
        }


        [HttpGet]
        public async Task<IActionResult> GetExercises()
        {
            List<Skill> exercises = new List<Skill>();
            exercises.Add(new Skill{
                Id = "pija",
                Title="Mock Exercise",
                Category="wfe",
                Level="wef",
                VideoUrl="wef",
                Description="wef",
                IsActive=true
            });
            try
            {
                var query = _exercisesContainer.GetItemLinqQueryable<Skill>()
                    //.Where(e => e.IsActive)
                    .ToFeedIterator();

                
                while (query.HasMoreResults)
                {
                    var response = await query.ReadNextAsync();
                    exercises.AddRange(response);
                }
            }
            catch (System.Exception e)
            {
                
                throw e;
            }
    

            return Ok(exercises);
        }


        [HttpGet("{id}")]
        public async Task<IActionResult> GetExercise(string id)
        {
            try
            {
                ItemResponse<Skill> response = await _exercisesContainer.ReadItemAsync<Skill>(id, new PartitionKey(id));

                // ItemResponse<Exercise> response = await _exercisesContainer.ReadItemAsync<Exercise>(id, new PartitionKey("id"));

                if (response != null)
                {
                    return Ok(response.Resource);
                }
                
                return NotFound($"Exercise with id {id} not found.");
            }
            catch (CosmosException ex) when (ex.StatusCode == HttpStatusCode.NotFound)
            {
                return NotFound($"Exercise with id {id} not found.");
            }
            catch (Exception e)
            {
                throw;
            }
        }

        [HttpGet("category/{*categoryPath}")]
        public async Task<IActionResult> GetExercisesByCategory(string categoryPath)
        {
            try
            {
                // Example: Query the exercises where the category matches the given path
                var query = _exercisesContainer.GetItemLinqQueryable<Skill>()
                            .Where(e => e.Category.StartsWith(categoryPath))
                            .ToFeedIterator();

                List<Skill> exercises = new List<Skill>();
                while (query.HasMoreResults)
                {
                    var response = await query.ReadNextAsync();
                    exercises.AddRange(response);
                }

                return Ok(exercises);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }


        [HttpPost]
        public async Task<IActionResult> CreateExercise([FromBody] Skill exercise)
        {
            if (exercise == null)
            {
                return BadRequest("Exercise data is missing.");
            }

            try
            {
                exercise.Id = Guid.NewGuid().ToString("N").Substring(0, 8);
                ItemResponse<Skill> response = await _exercisesContainer.CreateItemAsync(exercise);
                return Ok(response.Resource); // Return the created exercise
            }
            catch (CosmosException ex)
            {
                return StatusCode((int)ex.StatusCode, ex.Message);
            }
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateExercise(string id, [FromBody] Skill updatedExercise)
        {
            if (updatedExercise == null || string.IsNullOrEmpty(id))
            {
                return BadRequest("Invalid exercise data or missing ID.");
            }

            try
            {
                // Set the partition key (assuming 'Category' is the partition key)
                var partitionKey = new PartitionKey(id);

                // Fetch the current exercise by ID and partition key
                ItemResponse<Skill> exerciseResponse = await _exercisesContainer.ReadItemAsync<Skill>(id, partitionKey);

                var existingExercise = exerciseResponse.Resource;

                // Update the fields of the existing exercise
                existingExercise.Title = updatedExercise.Title;
                existingExercise.Description = updatedExercise.Description;
                existingExercise.VideoUrl = updatedExercise.VideoUrl;
                existingExercise.Level = updatedExercise.Level;
                existingExercise.Category = updatedExercise.Category;
                existingExercise.Tags = updatedExercise.Tags;
                
                // Replace the existing item with the updated version
                var response = await _exercisesContainer.ReplaceItemAsync(existingExercise, id, partitionKey);

                return Ok(response.Resource); // Return the updated exercise
            }
            catch (CosmosException ex) when (ex.StatusCode == System.Net.HttpStatusCode.NotFound)
            {
                return NotFound($"Exercise with ID {id} not found.");
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }


         [HttpGet("mock")]
        public async Task<IActionResult> GetExercisesMock()
        {
            List<Skill> exercises = new List<Skill>{
                new Skill{
                    Id = "pija",
                    Title="Mock Exercise",
                    Category="wfe",
                    Level="wef",
                    VideoUrl="wef",
                    Description="wef",
                    IsActive=true
                }
            };
             

            return Ok(exercises);
        }



    // Other actions (POST, PUT, DELETE)
    }  
}





