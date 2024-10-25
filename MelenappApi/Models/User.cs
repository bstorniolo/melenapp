using Newtonsoft.Json;

namespace MelenappApi.Models
{
    public class User
    {
        [JsonProperty("id")]
        public string Id { get; set; }

        // Add other properties as previously defined
    }
}