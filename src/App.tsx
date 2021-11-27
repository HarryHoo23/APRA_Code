import React from 'react';
import PhotoList from './components/PhotoList';
import SearchForm from './components/SearchForm';
import styled from 'styled-components';

const PageContainer = styled.main`
  max-width: 1200px;
  padding: 3.5rem 1.5rem 1.5rem;
  margin: 0 auto;
`

const Title = styled.h2`
  text-align: center;
`

const App: React.FC = () => {
  return (
    <PageContainer>
      <Title>Photo List</Title>
      <SearchForm />
      <PhotoList />
    </PageContainer>
  );
}

export default App;
