import React, {useRef, useEffect} from 'react';
import styled from 'styled-components';
import { useGlobalContext } from '../context/Context';

const Form = styled.form`
  margin: 0 auto;
  width: 80%;
  padding: 1rem 1.5rem;
  border-radius: var(--radius);
  background-color: #f9f9f9;
  text-transform: capitalize;
  box-shadow: 2px 2px 3px 0px rgba(0,0,0,0.2);
`

const FormControl = styled.div`
  label {
    display: block;
    margin-bottom: 1rem;
    font-weight: bold;
  }

  input {
    width: 100%;
    border: none;
    padding: 0.5rem;
    background: var(--clr-grey-10);
    transition: 0.1s ease-in-out;

    &:focus {
      background-color: var(--clr-grey-9);
    }
  }
`;

const SearchForm: React.FC = () => {
  const { setSearchTitle } = useGlobalContext();
  const searchValue = useRef<HTMLInputElement>(null);

  useEffect(() => {
    searchValue.current?.focus();
  }, [])

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  const searchTitle = () => {
    if (searchValue.current) setSearchTitle(searchValue.current.value)
  }

  return (
    <section className='section search'>
      <Form onSubmit={handleFormSubmit}>
        <FormControl>
          <label htmlFor='title'>Search photo by title</label>
          <input
            type='text'
            id='title'
            ref={searchValue}
            onChange={searchTitle}
          />
        </FormControl>
      </Form>
    </section>
  );
}

export default SearchForm
