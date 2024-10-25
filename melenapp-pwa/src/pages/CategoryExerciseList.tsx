import React, { useEffect, useState } from 'react';

import { Container, Typography, Grid, Card, CardContent, CardMedia, IconButton, Tooltip, Button, Chip } from '@mui/material';

import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import PlaylistAddCheckIcon from '@mui/icons-material/PlaylistAddCheck';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import axios from '../api/api';
import { Link, useParams, useNavigate } from 'react-router-dom';
import BackButton from '../components/BackButton';
import TagChips from '../components/TagChips';

interface Exercise {
  id: string;
  title: string;
  thumbnailUrl: string;
  videoUrl: string;
  level: string;
  category: string;
  tags: string;
  isFavorite: boolean;
  isCompleted: boolean;
  isTodo: boolean;
}

const CategoryExerciseList: React.FC = () => {
  const [exactExercises, setExercises] = useState<Exercise[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const { '*': categoryPath } = useParams(); // Catch all category path from URL
  const navigate = useNavigate(); 

  console.log("Category Path: ", categoryPath);

  var url = `/exercises/category/${categoryPath}`;
  
  if (!!!categoryPath) {
    url = '/exercises';
  }
  



  const extractVideoId = (url: string) => {
    const regExp = /^.*(youtu.be\/|v\/|\/u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11 ? match[2] : null;
  };

  useEffect(() => {
    // Fetch exercises based on the category path from the URL
    axios.get(url)
      .then(response => {
        // 
        const exercises: Exercise[] = response.data;
        console.log("All exercises: ", exercises);

        const exactExercises = exercises.filter(exe => exe.category === categoryPath);

        console.log("exact: ", exactExercises)
        setExercises(exactExercises);

        const categories2 = exercises
          .filter(exe => 
            (exe.category !== categoryPath && exe.category.startsWith(categoryPath || '') )
          );
          console.log("categories2: ", categories2)
          const categories = categories2.map(exe => {
            // Extract the next level in the path after the categoryPath
            const remainingPath = !categoryPath ? exe.category : exe.category.replace(categoryPath + '/', '');

            console.log("remainingPath: ", remainingPath)
            const lele = remainingPath.split('/')[0];  // Get the next part of the path
            console.log("Category to show: ", lele);
            return lele;
          });


          const uniqueCategories = [...new Set(categories)];
          
          console.log("Categories: ", uniqueCategories)
          setCategories(uniqueCategories);

      })
      .catch(error => {
        console.error('Error fetching exercises:', error);
      });
  }, [categoryPath, url]);





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

  const handleCategoryClick = (category: string) => {
    const newPath = categoryPath ? `${categoryPath}/${category}` : category;
    navigate(`/exercises/${newPath}`);
  };

  return (
    <Container maxWidth="lg" style={{ marginTop: '50px' }}>

      <BackButton />
      <Typography variant="h4" gutterBottom>
        Exercises and Categories
      </Typography>


      {/* Categories Section */}
      {categories.length > 0 && (
        <div style={{ marginBottom: '30px' }}>
          <Typography variant="h5" gutterBottom>
            Explore More Categories
          </Typography>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
            {categories.map((category, index) => (
              <Chip
                key={index}
                label={category}
                clickable
                onClick={() => handleCategoryClick(category)}
                color="primary"
                style={{ fontSize: '16px' }}
              />
            ))}
          </div>
        </div>
      )}

      <Grid container spacing={4}>
       
      {exactExercises.map((exercise) => {
        const tagsArray = exercise.tags ? exercise.tags.split(',') : [];

        return (
          <Grid item key={exercise.id} xs={12} sm={6} md={4}>
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
        )})}
      </Grid>
    </Container>
  );
};

export default CategoryExerciseList;
