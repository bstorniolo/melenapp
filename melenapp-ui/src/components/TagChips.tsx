import React from 'react';
import { Chip } from '@mui/material';

interface TagChipsProps {
  tags: string[];
}

const TagChips: React.FC<TagChipsProps> = ({ tags }) => {
  return (
    <div style={{ marginTop: '20px' }}>
      <h4>Tags:</h4>
      {tags.map((tag, index) => (
        <Chip
          key={index}
          label={tag}
          style={{ marginRight: '5px', marginBottom: '5px' }}
          color="primary"
        />
      ))}
    </div>
  );
};

export default TagChips;
