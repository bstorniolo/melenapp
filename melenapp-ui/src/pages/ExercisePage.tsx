import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from '../api/api';
import { Button } from '@mui/material';
import TagChips from '../components/TagChips';

interface Exercise {
  id: string;
  title: string;
  description: string;
  category: string;
  level: string;
  tags: string;
  videoUrl: string;
}
import { convertYoutubeUrl } from '../utils';

const ExercisePage: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // Get the id from the URL
  const [exercise, setExercise] = useState<Exercise | null>(null);
  const navigate = useNavigate(); // Hook to navigate to other pages

  useEffect(() => {
    // Fetch the exercise details using the id
    axios.get(`/exercises/${id}`)
      .then(response => {
        setExercise(response.data);
      })
      .catch(error => {
        console.error('Error fetching exercise:', error);
      });
  }, [id]);

  if (!exercise) {
    return <div>Loading...</div>;
  }
  const url = convertYoutubeUrl(exercise.videoUrl);
  const tagsArray = exercise.tags ? exercise.tags.split(',') : [];

  const handleEditClick = () => {
    // Navigate to the Edit Page for the exercise
    navigate(`/editor/${exercise.id}`);
  };

  return (
    <div>
      <h1>{exercise.title}</h1>
      <p><strong>Category:</strong> {exercise.category}</p>
      <p><strong>Level:</strong> {exercise.level}</p>
      <p><strong>Description:</strong></p>

      <div dangerouslySetInnerHTML={{ __html: exercise.description }} />
      {tagsArray.length > 0 && <TagChips tags={tagsArray} />}
      {exercise.videoUrl && (
        <div>
          <h3>Video:</h3>
          <iframe
            width="560"
            height="315"
            src={url}
            title={exercise.title}
            allowFullScreen
          />
        </div>
      )}
       <Button
        variant="contained"
        color="primary"
        onClick={handleEditClick}
        style={{ marginTop: '20px' }}
      >
        Edit Exercise
      </Button>
    </div>
  );
};

export default ExercisePage;
