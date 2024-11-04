using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.Cosmos;
using MelenappApi.Models;
using User = MelenappApi.Models.User;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Azure.Cosmos.Linq;
using System.Net;

namespace MelenappApi.Controllers
{
    [ApiController]
    // [Route("api/users")]
    [Route("[controller]")]
    public class UsersController : ControllerBase
    {
        private readonly Container _container;

        public UsersController(CosmosClient client, IConfiguration configuration)
        {
            string databaseName = configuration["CosmosDb:DatabaseName"];
            string containerName = "Users";
            _container = client.GetContainer(databaseName, containerName);
        }

        [HttpGet]
        public async Task<IActionResult> GetSkills()
        {
            List<User> users = new List<User>();

            try
            {
                var query = _container.GetItemLinqQueryable<User>()
                    //.Where(e => e.IsActive)
                    .ToFeedIterator();

                while (query.HasMoreResults)
                {
                    var response = await query.ReadNextAsync();
                    users.AddRange(response);
                }
            }
            catch (System.Exception e)
            {
                throw e;
            }
    
            return Ok(users);
        }


        [HttpGet("{userId}")]
        public async Task<IActionResult> GetUserAsync(string userId)
        {
            try
            {
                var user = await GetUserByIdAsync(userId);

                // ItemResponse<User> response = await _container.ReadItemAsync<User>(userId, new PartitionKey(userId));
                return Ok(user);
            }
            catch (CosmosException ex) when (ex.StatusCode == System.Net.HttpStatusCode.NotFound)
            {
                return NotFound($"user with userId {userId} not found.");
            }
        }

        private async Task<User> GetUserByIdAsync(string userId)
        {
            try
            {
                ItemResponse<User> response = await _container.ReadItemAsync<User>(userId, new PartitionKey(userId));
                return response.Resource;
            }
            catch (CosmosException ex) when (ex.StatusCode == System.Net.HttpStatusCode.NotFound)
            {
                // User does not exist, create a new one
                var newUser = new User 
                { 
                    Id = userId,
                    UserId = userId
                };
                await _container.CreateItemAsync(newUser);
                return newUser;
            }
        }

        [HttpPatch("{userId}/favorite")]
        public async Task<IActionResult> UpdateFavoriteStatusAsync(string userId, [FromBody] UpdateStatusRequest request)
        {
            var user = await GetUserByIdAsync(userId);

            if (request.IsSet)
            {
                if (!user.Favorites.Contains(request.SkillId))
                {
                    user.Favorites.Add(request.SkillId);
                }
            }
            else
            {
                user.Favorites.Remove(request.SkillId);
            }

            await _container.UpsertItemAsync(user);
            return Ok();
        }


        [HttpPatch("{userId}/complete")]
        public async Task<IActionResult> UpdateCompletedStatusAsync(string userId, [FromBody] UpdateStatusRequest request)
        {
            var user = await GetUserByIdAsync(userId);

            if (request.IsSet)
            {
                if (!user.Completed.Contains(request.SkillId))
                {
                    user.Completed.Add(request.SkillId);
                }
            }
            else
            {
                user.Completed.Remove(request.SkillId);
            }

            await _container.UpsertItemAsync(user);
            return Ok();
        }


        [HttpPatch("{userId}/todo")]
        public async Task<IActionResult> UpdateTodoStatusAsync(string userId, [FromBody] UpdateStatusRequest request)
        {
            var user = await GetUserByIdAsync(userId);

            if (request.IsSet)
            {
                if (!user.Todos.Contains(request.SkillId))
                {
                    user.Todos.Add(request.SkillId);
                }
            }
            else
            {
                user.Todos.Remove(request.SkillId);
            }

            await _container.UpsertItemAsync(user);
            return Ok();
        }




        // [HttpPost("{userId}/favorite")]
        // public async Task<IActionResult> FavoriteAsync(string userId, [FromBody] string skillId)
        // {
        //     var user = await GetUserByIdAsync(userId);

        //     if (!user.Favorites.Contains(skillId))
        //     {
        //         user.Favorites.Add(skillId);
        //         await _container.UpsertItemAsync(user);
        //     }
            
        //     return Ok();
        // }

        // [HttpPost("{userId}/unfavorite")]
        // public async Task<IActionResult> UnFavoriteAsync(string userId, [FromBody] string skillId)
        // {
        //     var user = await GetUserByIdAsync(userId);

        //     if (user.Favorites.Remove(skillId))
        //     {
        //         await _container.UpsertItemAsync(user);
        //     }
            
        //     return Ok();
        // }



        // [HttpPost("{userId}/complete")]
        // public async Task<IActionResult> CompleteAsync(string userId, [FromBody] string skillId)
        // {
        //     var user = await GetUserByIdAsync(userId);

        //     if (!user.Completed.Contains(skillId))
        //     {
        //         user.Completed.Add(skillId);
        //         await _container.UpsertItemAsync(user);
        //     }
            
        //     return Ok();
        // }

        // [HttpPost("{userId}/uncomplete")]
        // public async Task<IActionResult> UnCompleteAsync(string userId, [FromBody] string skillId)
        // {
        //     var user = await GetUserByIdAsync(userId);

        //     if (user.Completed.Remove(skillId))
        //     {
        //         await _container.UpsertItemAsync(user);
        //     }
            
        //     return Ok();
        // }



        // [HttpPost("{userId}/todo")]
        // public async Task<IActionResult> TodoAsync(string userId, [FromBody] string skillId)
        // {
        //     var user = await GetUserByIdAsync(userId);

        //     if (!user.Todos.Contains(skillId))
        //     {
        //         user.Todos.Add(skillId);
        //         await _container.UpsertItemAsync(user);
        //     }
            
        //     return Ok();
        // }

        // [HttpPost("{userId}/untodo")]
        // public async Task<IActionResult> UnTodoAsync(string userId, [FromBody] string skillId)
        // {
        //     var user = await GetUserByIdAsync(userId);

        //     if (user.Todos.Remove(skillId))
        //     {
        //         await _container.UpsertItemAsync(user);
        //     }
            
        //     return Ok();
        // }

    }
}