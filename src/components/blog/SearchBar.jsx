import React from 'react';
import { Search } from 'lucide-react';

const SearchBar = ({ searchTerm, onSearch }) => {
  return (
    <div className="relative">
      <input
        type="text"
        placeholder="Search articles..."
        value={searchTerm}
        onChange={(e) => onSearch(e.target.value)}
        className="w-full pl-10 pr-4 py-2 bg-background border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
      />
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
    </div>
  );
};

export default SearchBar;
