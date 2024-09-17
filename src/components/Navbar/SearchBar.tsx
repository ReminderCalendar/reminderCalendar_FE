import React from 'react';
import SearchIcon from '@mui/icons-material/Search';
import { Input, InputAdornment } from '@mui/material';

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = React.useState<string>('');

  return (
    <Input
      startAdornment={
        <InputAdornment position="start">
          <SearchIcon />
        </InputAdornment>
      }
      value={searchTerm}
      onChange={e => setSearchTerm(e.target.value)}
      sx={{ marginRight: '20px' }}
    />
  );
};

export default SearchBar;
