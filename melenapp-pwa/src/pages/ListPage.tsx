import React, { useEffect, useState } from 'react';
import { Container, Typography, Grid, Card, CardContent, CardMedia, IconButton, Tooltip } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import PlaylistAddCheckIcon from '@mui/icons-material/PlaylistAddCheck';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import axios from '../api/api';
import { Link } from 'react-router-dom';

interface Exercise {
  id: string;
  title: string;
  thumbnailUrl: string;
  videoUrl: string;
  level: string;
  isFavorite: boolean;
  isCompleted: boolean;
  isTodo: boolean;
}

const ListPage: React.FC = () => {
  const [exercises, setExercises] = useState<Exercise[]>([]);

  const extractVideoId = (url: string) => {
    const regExp = /^.*(youtu.be\/|v\/|\/u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11 ? match[2] : null;
  };

  useEffect(() => {
    // Fetch data from the backend API
    axios
      .get('/exercises')
      .then((response) => {
        setExercises(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handleFavoriteToggle = (id: string) => {
    // Logic to handle favorite toggle
    setExercises((prevExercises) =>
      prevExercises.map((exercise) =>
        exercise.id === id ? { ...exercise, isFavorite: !exercise.isFavorite } : exercise
      )
    );
  };

  const handleMarkAsCompleted = (id: string) => {
    // Logic to handle mark as completed
    setExercises((prevExercises) =>
      prevExercises.map((exercise) =>
        exercise.id === id ? { ...exercise, isCompleted: !exercise.isCompleted } : exercise
      )
    );
  };

  const handleAddToTodo = (id: string) => {
    // Logic to handle add to to-do list
    setExercises((prevExercises) =>
      prevExercises.map((exercise) =>
        exercise.id === id ? { ...exercise, isTodo: !exercise.isTodo } : exercise
      )
    );
  };

  return (
    <Container maxWidth="lg" style={{ marginTop: '50px' }}>
      <Typography variant="h4" gutterBottom>
        Exercises
      </Typography>
      <Grid container spacing={4}>
        {exercises.map((exercise) => (
          <Grid item key={exercise.id} xs={12} sm={6} md={4}>
            <Card>
              {exercise.videoUrl && (
                <CardMedia
                  component="img"
                  height="140"
                  image={`https://img.youtube.com/vi/${extractVideoId(exercise.videoUrl)}/hqdefault.jpg`}
                  alt={exercise.title}
                />
              )}
              <CardContent>
              <Link to={`/exercise/${exercise.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
           
                <Typography variant="h6">{exercise.title}</Typography>
                <Typography variant="body2" color="textSecondary">
                  Level: {exercise.level}
                </Typography>
              </Link>
                <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                  {/* Favorite Icon */}
                  <Tooltip title={exercise.isFavorite ? 'Unfavorite' : 'Favorite'}>
                    <IconButton onClick={() => handleFavoriteToggle(exercise.id)}>
                      {exercise.isFavorite ? (
                        <FavoriteIcon color="error" />
                      ) : (
                        <FavoriteBorderIcon style={{ color: 'gray' }} />
                      )}
                    </IconButton>
                  </Tooltip>

                  {/* Completed Icon */}
                  <Tooltip title={exercise.isCompleted ? 'Mark as Incomplete' : 'Mark as Completed'}>
                    <IconButton onClick={() => handleMarkAsCompleted(exercise.id)}>
                      {exercise.isCompleted ? (
                        <CheckCircleIcon color="success" />
                      ) : (
                        <RadioButtonUncheckedIcon style={{ color: 'gray' }} />
                      )}
                    </IconButton>
                  </Tooltip>

                  {/* To-Do Icon */}
                  <Tooltip title={exercise.isTodo ? 'Remove from To-Do' : 'Add to To-Do'}>
                    <IconButton onClick={() => handleAddToTodo(exercise.id)}>
                      {exercise.isTodo ? (
                        <PlaylistAddCheckIcon color="primary" />
                      ) : (
                        <PlaylistAddIcon style={{ color: 'gray' }} />
                      )}
                    </IconButton>
                  </Tooltip>
                </div>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default ListPage;
