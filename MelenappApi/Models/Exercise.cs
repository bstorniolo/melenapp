using Newtonsoft.Json;

namespace MelenappApi.Models
{
    public class Skill
    {
        [JsonProperty("id")]
        public string Id { get; set; }
      
        [JsonProperty("title")]
        public string Title { get; set; }

        [JsonProperty("classification")]
        public string Category { get; set; }

        [JsonProperty("tags")]
        public string Tags { get; set; }

        [JsonProperty("level")]
        public string Level { get; set; }

        [JsonProperty("videoUrl")]
        public string VideoUrl { get; set; }

        [JsonProperty("description")]
        public string Description { get; set; }

        [JsonProperty("isActive")]
        public bool IsActive { get; set; }


        [JsonIgnore]
        public bool IsFavorite { get; set; }

        [JsonIgnore]
        public bool IsDone { get; set; }
        
        [JsonIgnore]
        public bool IsToDo { get; set; }

        [JsonIgnore]
        public int Rating { get; set; }

    }
}
