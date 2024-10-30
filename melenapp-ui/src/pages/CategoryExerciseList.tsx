import React, { useMemo } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import axios from '../api/api';
import useSWR from 'swr';


import { Container, Typography, Grid, Button, Chip } from '@mui/material';

import BackButton from '../components/BackButton';
import SkillCard from '../components/SkillCard';
import { Exercise } from '../types/Skill';


const fetcher = (url: string) => axios.get(url).then(res => res.data);

const CategoryExerciseList: React.FC = () => {

  const { '*': categoryPath } = useParams(); // Catch all category path from URL
  const navigate = useNavigate(); 


  const url = categoryPath ? `/exercises/category/${categoryPath}` : '/exercises';
  
  const { data: exercises = [], error } = useSWR<Exercise[]>(url, fetcher);

  const { exactExercises, uniqueCategories } = useMemo(() => {
    const exactExercises = exercises.filter(exe => exe.category === categoryPath);
    
    const categories = exercises
      .filter(exe => exe.category.startsWith(categoryPath || '') && exe.category !== categoryPath)
      .map(exe => {
        const remainingPath = categoryPath ? exe.category.replace(`${categoryPath}/`, '') : exe.category;
        return remainingPath.split('/')[0];
      });
    
    const uniqueCategories = [...new Set(categories)];
    return { exactExercises, uniqueCategories };
  }, [exercises, categoryPath]);

  const handleCategoryClick = (category: string) => {
    const newPath = categoryPath ? `${categoryPath}/${category}` : category;
    navigate(`/exercises/${newPath}`);
  };

  const handleCreateClick = () => {
    navigate(`/editor`, { state: { category: categoryPath } });
  };

  if (error) return <div>Error loading exercises.</div>;

  return (
    <Container maxWidth="lg" style={{ marginTop: '50px' }}>

      <BackButton />

      {/* <Link to={`/create-exercise/${categoryPath}`}> */}
        <Button variant="contained" 
                color="primary"
                onClick={handleCreateClick}>
          Create New Exercise in {categoryPath}
        </Button>
      {/* </Link> */}

      <Typography variant="h4" gutterBottom>
        Exercises and Categories
      </Typography>


      {/* Categories Section */}
      {uniqueCategories.length > 0 && (
        <div style={{ marginBottom: '30px' }}>
          <Typography variant="h5" gutterBottom>
            Explore More Categories
          </Typography>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
            {uniqueCategories.map((category, index) => (
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
       
      {exactExercises.map((exercise) => (
        <SkillCard key={exercise.id} exercise={exercise} />
      ))}

      </Grid>
    </Container>
  );
};

export default CategoryExerciseList;
