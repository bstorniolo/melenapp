import React from 'react';
import { Grid, Card, CardContent, CardMedia, Typography, IconButton, Tooltip } from '@mui/material';
import { 
    FavoriteIcon, 
    FavoriteBorderIcon, 
    CheckCircleIcon, 
    RadioButtonUncheckedIcon, 
    PlaylistAddCheckIcon, 
    PlaylistAddIcon 
  } from '../components/icons';
  
import { Link } from 'react-router-dom';
import TagChips from './TagChips';
import { extractVideoId } from '../utils';

interface Exercise {
  id: string;
  title: string;
  videoUrl: string;
  level: string;
  tags: string;
  isFavorite: boolean;
  isCompleted: boolean;
  isTodo: boolean;
}

interface ExerciseCardProps {
  exercise: Exercise;
}

const ExerciseCard: React.FC<ExerciseCardProps> = ({
  exercise
}) => {
  const tagsArray = exercise.tags ? exercise.tags.split(',') : [];


  // TODO: Handlers for icons
  const handleFavoriteToggle = (id: string) => {
    console.log("handleFavoriteToggle: ", id);
    // mutate(url, exercises => exercises.map(exercise => exercise.id === id ? { ...exercise, isFavorite: !exercise.isFavorite } : exercise), false);
  };

  const handleMarkAsCompleted = (id: string) => {
    console.log("handleMarkAsCompleted: ", id);
    // mutate(url, exercises => exercises.map(exercise => exercise.id === id ? { ...exercise, isCompleted: !exercise.isCompleted } : exercise), false);
  };

  const handleAddToTodo = (id: string) => {
    console.log("handleAddToTodo: ", id);
    // mutate(url, exercises => exercises.map(exercise => exercise.id === id ? { ...exercise, isTodo: !exercise.isTodo } : exercise), false);
  };


  return (
    <Grid item xs={12} sm={6} md={4} key={exercise.id}>
      <Card>
        <CardContent>
          <Link to={`/exercise/${exercise.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
            {exercise.videoUrl && (
              <CardMedia
                component="img"
                height="140"
                image={`https://img.youtube.com/vi/${extractVideoId(exercise.videoUrl)}/hqdefault.jpg`}
                alt={exercise.title}
              />
            )}
            <Typography variant="h6">{exercise.title}</Typography>
            <Typography variant="body2" color="textSecondary">
              Level: {exercise.level}
            </Typography>
          </Link>
          {tagsArray.length > 0 && <TagChips tags={tagsArray} />}
          <div style={{ display: 'flex', justifyContent: 'space-around' }}>
            {/* Favorite Icon */}
            <Tooltip title={exercise.isFavorite ? 'Unfavorite' : 'Favorite'}>
              <IconButton onClick={() => handleFavoriteToggle(exercise.id)}>
                {exercise.isFavorite ? <FavoriteIcon color="error" /> : <FavoriteBorderIcon style={{ color: 'gray' }} />}
              </IconButton>
            </Tooltip>

            {/* Completed Icon */}
            <Tooltip title={exercise.isCompleted ? 'Mark as Incomplete' : 'Mark as Completed'}>
              <IconButton onClick={() => handleMarkAsCompleted(exercise.id)}>
                {exercise.isCompleted ? <CheckCircleIcon color="success" /> : <RadioButtonUncheckedIcon style={{ color: 'gray' }} />}
              </IconButton>
            </Tooltip>

            {/* To-Do Icon */}
            <Tooltip title={exercise.isTodo ? 'Remove from To-Do' : 'Add to To-Do'}>
              <IconButton onClick={() => handleAddToTodo(exercise.id)}>
                {exercise.isTodo ? <PlaylistAddCheckIcon color="primary" /> : <PlaylistAddIcon style={{ color: 'gray' }} />}
              </IconButton>
            </Tooltip>
          </div>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default ExerciseCard;