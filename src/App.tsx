import React from 'react';
import PhotoList from './components/PhotoList';
import SearchForm from './components/SearchForm';
import './App.css';

const App: React.FC = () => {
  return (
    <div>
      <SearchForm />
      <PhotoList />
    </div>
  );
}

export default App;
