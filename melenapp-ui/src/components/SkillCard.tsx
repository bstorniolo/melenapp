// import React from 'react';
import React, { useState, useEffect } from 'react';
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
import { useMsal, useIsAuthenticated } from '@azure/msal-react';
import axios from '../api/api';
import { mutate } from 'swr';
import { useUser } from '../contexts/UserContext';

interface Exercise {
  id: string;
  title: string;
  videoUrl: string;
  level: string;
  tags: string;
}

interface ExerciseCardProps {
  exercise: Exercise;
}

const ExerciseCard: React.FC<ExerciseCardProps> = ({ exercise }) => {
  const { user } = useUser();
  const [isFavorite, setIsFavorite] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [isTodo, setIsTodo] = useState(false);

  const { accounts } = useMsal();
  // const userName = accounts[0]?.name || '';
  const userId = accounts[0]?.localAccountId || '';

  const isAuthenticated = useIsAuthenticated();
  const skillId = exercise.id;
  const tagsArray = exercise.tags ? exercise.tags.split(',') : [];

  useEffect(() => {
    if (user) {
      setIsFavorite(user.favorites.includes(exercise.id));
      setIsCompleted(user.completed.includes(exercise.id));
      setIsTodo(user.todos.includes(exercise.id));
    }
  }, [user, exercise.id]);

  const updateStatus = async (statusType: string, isSet: boolean) => {
    const url = `/users/${userId}/${statusType}`;
    const data = { skillId, isSet };

    try {
      await axios.patch(url,  data );
      mutate(`/users/${userId}/exercises`); // Update the SWR cache if necessary
    } catch (error) {
      console.error(`Failed to update ${statusType}:`, error);
    }
  };

  const handleFavoriteToggle = () => {
    const newValue = !isFavorite;
    setIsFavorite(newValue);
    updateStatus('favorite', newValue);
  };

  const handleMarkAsCompleted = () => {
    const newValue = !isCompleted;
    setIsCompleted(newValue);
    updateStatus('complete', newValue);
  };

  const handleAddToTodo = () => {
    const newValue = !isTodo;
    setIsTodo(newValue);
    updateStatus('todo', newValue);
  };



  return (
    <Grid item xs={12} sm={6} md={4}>
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

          {isAuthenticated && (
          <div style={{ display: 'flex', justifyContent: 'space-around' }}>
         
            <Tooltip title={'Agregar a Favoritos'}>
              <IconButton onClick={handleFavoriteToggle}>
                {isFavorite? <FavoriteIcon color="error" /> : <FavoriteBorderIcon style={{ color: 'gray' }} />}
              </IconButton>
            </Tooltip>

          
            <Tooltip title={'Marcar Completado' }>
              <IconButton onClick={handleMarkAsCompleted}>
                {isCompleted ? <CheckCircleIcon color="success" /> : <RadioButtonUncheckedIcon style={{ color: 'gray' }} />}
              </IconButton>
            </Tooltip>


            <Tooltip title={'Marcar como pendiente'}>
              <IconButton onClick={handleAddToTodo}>
                {isTodo ? <PlaylistAddCheckIcon color="primary" /> : <PlaylistAddIcon style={{ color: 'gray' }} />}
              </IconButton>
            </Tooltip>
          </div>
          )}

        </CardContent>
      </Card>
    </Grid>
  );
};

export default ExerciseCard;