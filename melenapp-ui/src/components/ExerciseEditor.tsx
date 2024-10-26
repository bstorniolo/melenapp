import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Container, TextField, Button, Select, MenuItem, InputLabel, FormControl } from '@mui/material';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import axios from '../api/api';

interface Exercise {
  id: string;
  title: string;
  description: string;
  videoUrl: string;
  level: string;
  category: string;
  tags: string;
}

const ExerciseEditor: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // Get the exercise ID from the URL params
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [videoUrl, setVideoUrl] = useState('');
  const [level, setLevel] = useState('');
  const [category, setCategory] = useState('');
  const [tags, setTags] = useState('');

  useEffect(() => {
    // If there's an ID, fetch the exercise to edit
    if (id) {
      setIsLoading(true);
      axios.get(`/exercises/${id}`)
        .then(response => {
          const exercise: Exercise = response.data;
          setTitle(exercise.title);
          setDescription(exercise.description);
          setVideoUrl(exercise.videoUrl);
          setLevel(exercise.level);
          setCategory(exercise.category);
          setTags(exercise.tags);
          setIsLoading(false);
        })
        .catch(error => {
          console.error('Error fetching exercise:', error);
          setIsLoading(false);
        });
    }
  }, [id]);

  const handleSubmit = () => {
    const exercise = {
      id,
      title,
      description,
      videoUrl,
      level,
      category,
      tags: tags.trim(),
    };

    console.log("ID: ", id);
    console.log("exercise: ", exercise);
    if (id) {
      console.log("Editing Skill... ");
      // Edit existing exercise (PUT request)
      axios.put(`/exercises/${id}`, exercise)
        .then(() => {
          console.log('Exercise updated');
          navigate(`/exercise/${id}`); // Navigate back to the exercise page
          
        })
        .catch(error => {
          console.error('Error updating exercise:', error);
        });
    } else {
      console.log("Creating Skill... ");
      // Add new exercise (POST request)
      exercise.id = "0";
      axios.post('/exercises', exercise)
        .then(() => {
          console.log('New exercise added');
          navigate('/exercises'); // Navigate to the exercises list
        })
        .catch(error => {
          console.error('Error adding exercise:', error);
        });
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Container maxWidth="md" style={{ marginTop: '50px' }}>
      <form noValidate autoComplete="off">
        <TextField
          label="Title"
          fullWidth
          margin="normal"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <ReactQuill
          value={description}
          onChange={setDescription}
          modules={{
            toolbar: [['bold', 'italic', 'underline'], [{ header: [2, 3, false] }], [{ list: 'ordered' }, { list: 'bullet' }]],
          }}
          formats={['header', 'bold', 'italic', 'underline', 'list', 'bullet']}
        />
        <TextField
          label="Video URL"
          fullWidth
          margin="normal"
          value={videoUrl}
          onChange={(e) => setVideoUrl(e.target.value)}
        />
        <FormControl fullWidth margin="normal">
          <InputLabel id="level-label">Level</InputLabel>
          <Select labelId="level-label" value={level} onChange={(e) => setLevel(e.target.value as string)}>
            <MenuItem value="Beginner">Beginner</MenuItem>
            <MenuItem value="Intermediate">Intermediate</MenuItem>
            <MenuItem value="Advanced">Advanced</MenuItem>
          </Select>
        </FormControl>
        <TextField
          label="Category"
          fullWidth
          margin="normal"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
        <TextField
          label="Tags (comma separated)"
          fullWidth
          margin="normal"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          style={{ marginTop: '20px' }}
        >
          {id ? 'Update Exercise' : 'Add Exercise'}
        </Button>
      </form>
    </Container>
  );
};

export default ExerciseEditor;
