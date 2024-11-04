// SkillActions.tsx
import React, { useState, useEffect } from 'react';
import { IconButton, Tooltip } from '@mui/material';
import {
  FavoriteIcon,
  FavoriteBorderIcon,
  CheckCircleIcon,
  RadioButtonUncheckedIcon,
  PlaylistAddCheckIcon,
  PlaylistAddIcon,
} from '../components/icons';
import axios from '../api/api';
import { mutate } from 'swr';
import { useUser } from '../contexts/UserContext';
import { useIsAuthenticated } from '@azure/msal-react';

interface SkillActionsProps {
  skillId: string;
}

const SkillActions: React.FC<SkillActionsProps> = ({ skillId }) => {
  const { user } = useUser();
  const [isFavorite, setIsFavorite] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [isTodo, setIsTodo] = useState(false);

  const isAuthenticated = useIsAuthenticated();

  useEffect(() => {
    if (user) {
      setIsFavorite(user.favorites.includes(skillId));
      setIsCompleted(user.completed.includes(skillId));
      setIsTodo(user.todos.includes(skillId));
    }
  }, [user, skillId]);

  const updateStatus = async (statusType: string, isSet: boolean) => {
    if (!user) return;
    const url = `/users/${user.id}/${statusType}`;
    const data = { skillId, isSet };

    try {
      await axios.patch(url, data);
      mutate(`/users/${user.id}/exercises`); // Update the SWR cache if necessary
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
    <>
        {isAuthenticated && (
            <div style={{ display: 'flex', justifyContent: 'space-around' }}>
            <Tooltip title={isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}>
                <IconButton onClick={handleFavoriteToggle}>
                {isFavorite ? <FavoriteIcon color="error" /> : <FavoriteBorderIcon style={{ color: 'gray' }} />}
                </IconButton>
            </Tooltip>

            <Tooltip title={isCompleted ? 'Mark as Incomplete' : 'Mark as Completed'}>
                <IconButton onClick={handleMarkAsCompleted}>
                {isCompleted ? <CheckCircleIcon color="success" /> : <RadioButtonUncheckedIcon style={{ color: 'gray' }} />}
                </IconButton>
            </Tooltip>

            <Tooltip title={isTodo ? 'Remove from To-Do' : 'Add to To-Do'}>
                <IconButton onClick={handleAddToTodo}>
                {isTodo ? <PlaylistAddCheckIcon color="primary" /> : <PlaylistAddIcon style={{ color: 'gray' }} />}
                </IconButton>
            </Tooltip>
            </div>
        )}
    </>
  );
};

export default SkillActions;