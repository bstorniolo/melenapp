// src/components/SkillCarousel.tsx
import React from 'react';
import { Box, Typography } from '@mui/material';
import { Exercise } from '../types/Skill';
import SkillCard from './SkillCard';

interface SkillCarouselProps {
  title: string;
  exercises: Exercise[];
}

const SkillCarousel: React.FC<SkillCarouselProps> = ({ title, exercises }) => {
  if (!exercises.length) return null; // hide empty sections

  return (
    <Box sx={{ mb: 4 }}>
      <Typography variant="h5" gutterBottom>
        {title}
      </Typography>

      <Box
        sx={{
          display: 'flex',
          gap: 2,
          overflowX: 'auto',
          pb: 1,
          '&::-webkit-scrollbar': {
            height: 8,
          },
          '&::-webkit-scrollbar-thumb': {
            borderRadius: 4,
          },
        }}
      >
        {exercises.map((exercise) => (
          <Box
            key={exercise.id}
            sx={{ minWidth: { xs: 260, sm: 300, md: 340 }, flex: '0 0 auto' }}
          >
            <SkillCard exercise={exercise} />
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default SkillCarousel;