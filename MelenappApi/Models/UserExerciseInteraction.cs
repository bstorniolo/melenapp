using Newtonsoft.Json;

namespace MelenappApi.Models
{
    public class UserExerciseInteraction
    {
        [JsonProperty("id")]
        public string Id { get; set; } // Combination of UserId and ExerciseId

        [JsonProperty("userId")]
        public string UserId { get; set; }

        [JsonProperty("exerciseId")]
        public string ExerciseId { get; set; }

        [JsonProperty("isFavorite")]
        public bool IsFavorite { get; set; }

        [JsonProperty("isDone")]
        public bool IsDone { get; set; }

        [JsonProperty("isToDo")]
        public bool IsToDo { get; set; }

        [JsonProperty("rating")]
        public int? Rating { get; set; }

        [JsonProperty("interactedAt")]
        public DateTime InteractedAt { get; set; }
    }
}
