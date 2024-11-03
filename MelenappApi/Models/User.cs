using Newtonsoft.Json;

namespace MelenappApi.Models
{
    public class User
    {
        public User()
        {
            Favorites = new List<string>();
            Completed = new List<string>();
            Todos = new List<string>();
        }

        [JsonProperty("id")]
        public string Id { get; set; }

        [JsonProperty("userId")]
        public string UserId { get; set; }

        [JsonProperty("favorites")]
        public List<string> Favorites { get; set; }

        [JsonProperty("completed")]
        public List<string> Completed { get; set; }

        [JsonProperty("todos")]
        public List<string> Todos { get; set; }
    }
}