// import React from 'react';
import React from 'react';
import { Grid, CardHeader, Card, CardContent, CardMedia, IconButton } from '@mui/material';

import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Link } from 'react-router-dom';
import TagChips from './TagChips';
import { extractVideoId } from '../utils';

import SkillActions from './SkillActions';

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
 
  const tagsArray = exercise.tags ? exercise.tags.split(',') : [];


  return (
    <Grid item xs={12} sm={6} md={4}>
      <Card>
      <CardHeader
        title={exercise.title}
        subheader={exercise.level}
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
      />
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
          </Link>
          {tagsArray.length > 0 && <TagChips tags={tagsArray} />}
        </CardContent>
       
         <SkillActions skillId={exercise.id} />
      </Card>
    </Grid>
  );
};

export default ExerciseCard;