import React from 'react';
import { useGlobalContext } from '../context/Context';

const SearchForm = () => {
  const { searchTitle } = useGlobalContext();

  return (
    <div>
      this is a search input.
    </div>
  )
}

export default SearchForm
