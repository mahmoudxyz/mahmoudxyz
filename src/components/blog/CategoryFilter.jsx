import React from 'react';
import { X } from 'lucide-react';

const CategoryFilter = ({ categories, selected, onChange }) => {
  return (
    <div className="flex flex-wrap gap-2">
      {selected && (
        <button
          onClick={() => onChange('')}
          className="inline-flex items-center text-xs px-3 py-1 rounded-full bg-primary text-primary-foreground"
        >
          {selected}
          <X className="w-3 h-3 ml-1" />
        </button>
      )}
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => onChange(category)}
          className={`text-xs px-3 py-1 rounded-full transition-colors ${
            selected === category
              ? 'bg-primary text-primary-foreground'
              : 'bg-primary/10 text-primary hover:bg-primary/20'
          }`}
        >
          {category}
        </button>
      ))}
    </div>
  );
};

export default CategoryFilter;
