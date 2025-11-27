// src/pages/HomePage.tsx
import React from 'react';
import useSWR from 'swr';
import { Container, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import axios from '../api/api';
// import SkillCard from '../components/SkillCard';
import SkillCarousel from '../components/SkillCarousel';
import { Exercise } from '../types/Skill';
import { useUser } from '../contexts/UserContext';

const fetcher = (url: string) => axios.get(url).then((res) => res.data);







  // ⬇️ adjust these predicates to match your real flags






const HomePage: React.FC = () => {
    const { t } = useTranslation();
    const url = '/exercises'; // The URL key used in SWR
    // const { data: exercises = [], error } = useSWR<Exercise[]>(url, fetcher);
    const { data: exercises = [], error, isLoading } = useSWR<Exercise[]>(url, fetcher);
    if (error) return <div>Error loading exercises.</div>;

  if (isLoading) return <div>Loading...</div>;

  const { user } = useUser();

  const liked = user
  ? exercises.filter((e) => user.favorites.includes(e.id))
  : [];

  const finished = user
    ? exercises.filter((e) => user.completed.includes(e.id))
    : [];

  const todo = user
    ? exercises.filter((e) => user.todos.includes(e.id))
    : [];

  return (
    // <Container maxWidth="lg" sx={{ mt: 6, mb: 6 }}>
    <Container maxWidth="md" style={{ marginTop: '50px' }}>
      <Typography variant="h4" gutterBottom>
        {t('welcome-text')}
      </Typography>
      <Typography variant="body1" gutterBottom>
        {t('welcome-desc')}
      </Typography>

      <SkillCarousel title="Liked" exercises={liked} />
      <SkillCarousel title="Finished" exercises={finished} />
      <SkillCarousel title="To do" exercises={todo} />
    </Container>
  );
        
};

export default HomePage;

















