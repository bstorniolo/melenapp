import React from 'react';
import useSWR from 'swr';
import { Container, Typography, Grid } from '@mui/material';

import axios from '../api/api';


import SkillCard from '../components/SkillCard';
import { Exercise } from '../types/Skill';

const fetcher = (url: string) => axios.get(url).then((res) => res.data);


const ListPage: React.FC = () => {
  const url = '/exercises'; // The URL key used in SWR
  const { data: exercises = [], error } = useSWR<Exercise[]>(url, fetcher);
  if (error) return <div>Error loading exercises.</div>;

  return (
    <Container maxWidth="lg" style={{ marginTop: '50px' }}>
      <Typography variant="h4" gutterBottom>
        Exercises
      </Typography>
      <Grid container spacing={4}>
        {exercises.map((exercise) => (
          <SkillCard key={exercise.id} exercise={exercise} />
        ))}
        
      </Grid>
    </Container>
  );
};

export default ListPage;
