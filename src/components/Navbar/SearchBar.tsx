import React from 'react';
import SearchIcon from '@mui/icons-material/Search';
import { Input, InputAdornment } from '@mui/material';
import { useRecoilState } from 'recoil';
import { searchTermAtom } from '../../recoil/search/searchTermAtom';

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useRecoilState(searchTermAtom);

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
