// components/TagButton.tsx
import React from 'react';

interface TagButtonProps {
  tagText: string;
  tagValue:string;
  onClick: (tagText: string) => void;
}

const TagButton: React.FC<TagButtonProps> = ({ tagText,tagValue, onClick }) => {
  return (
    <button className='rounded-md border p-1 bg-gray-200 hover:bg-gray-400 text-xs' type='button' onClick={() => onClick(tagValue)}>
      {tagText}
    </button>
  );
};

export default TagButton;