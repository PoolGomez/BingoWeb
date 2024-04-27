// components/TagButton.tsx
import React, { useState } from 'react';

interface TagButtonProps {
  tagText: string;
  onClick: (tagText: string, isActive: boolean) => void;
}

const TagButtonText: React.FC<TagButtonProps> = ({ tagText, onClick }) => {
  const [isActive, setIsActive] = useState<boolean>(false);

  const handleClick = () => {
    setIsActive(!isActive);
    onClick(tagText, !isActive);
  };

  return (
    <button className='rounded-md border p-1 bg-gray-200 text-xs' type='button' onClick={handleClick} style={{ backgroundColor: isActive ? 'gray' : 'white', color: isActive ? 'white' : 'black' }}>
      {tagText}
    </button>
  );
};

export default TagButtonText;