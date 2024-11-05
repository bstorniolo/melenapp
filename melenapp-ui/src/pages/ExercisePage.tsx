import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from '../api/api';
import { 
  Button, 
  Container, 
  Typography, 
  Card, 
  CardContent, 
  CardMedia, 
  Box, 
  Divider, 
  Grid 
} from '@mui/material';
import TagChips from '../components/TagChips';
import SkillActions from '../components/SkillActions';
import { convertYoutubeUrl } from '../utils';

interface Exercise {
  id: string;
  title: string;
  description: string;
  category: string;
  level: string;
  tags: string;
  videoUrl: string;
}

const ExercisePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [exercise, setExercise] = useState<Exercise | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`/exercises/${id}`)
      .then(response => setExercise(response.data))
      .catch(error => console.error('Error fetching exercise:', error));
  }, [id]);

  if (!exercise) {
    return <Typography variant="h6" align="center">Loading...</Typography>;
  }

  const url = convertYoutubeUrl(exercise.videoUrl);
  const tagsArray = exercise.tags ? exercise.tags.split(',') : [];

  const handleEditClick = () => navigate(`/editor/${exercise.id}`);

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Card raised>
        <CardContent>
          <Typography variant="h4" component="h1" gutterBottom>
            {exercise.title}
          </Typography>

          <Grid container spacing={2} sx={{ mb: 3 }}>
            <Grid item xs={6}>
              <Typography variant="body2" color="textSecondary">
                <strong>Category:</strong> {exercise.category}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body2" color="textSecondary">
                <strong>Level:</strong> {exercise.level}
              </Typography>
            </Grid>
          </Grid>

          <Divider sx={{ mb: 2 }} />

          <Box mb={2}>
            <Typography variant="body1" component="div" color="textSecondary">
              <strong>Description:</strong>
              <Box 
                component="div" 
                dangerouslySetInnerHTML={{ __html: exercise.description }} 
                sx={{ mt: 1, p: 1, bgcolor: 'background.default', borderRadius: 1 }}
              />
            </Typography>
          </Box>

          {tagsArray.length > 0 && (
            <Box sx={{ mb: 2 }}>
              <TagChips tags={tagsArray} />
            </Box>
          )}

          {exercise.videoUrl && (
            <CardMedia
              component="iframe"
              src={url}
              title={exercise.title}
              sx={{ width: '100%', height: 315, border: 'none', mt: 2 }}
            />
          )}

          <Divider sx={{ mt: 3, mb: 2 }} />

          <Box display="flex" justifyContent="space-between" alignItems="center">
            <SkillActions skillId={exercise.id} />
            <Button
              variant="contained"
              color="primary"
              onClick={handleEditClick}
              sx={{ mt: 2 }}
            >
              Edit Skill
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
};

export default ExercisePage;