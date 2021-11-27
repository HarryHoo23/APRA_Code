import React, { useState, useCallback, useEffect, useContext } from 'react';
import { getPagination } from '../GetPagination';

export interface PhotoType {
  albumId: number | null;
  id: number | null;
  title: string | null;
  url: string | null;
  thumbnailUrl: string | null;
}

type ContextProviderProps = {
  children: React.ReactNode
}

interface AppContextInterface {
  loading: boolean;
  searchTitle: string | null;
  photos: PhotoType[] | null;
  photosPerPage: number;
  paginatedData: PhotoType[] | null;
  setSearchTitle: (title: string) => void;
  setPhotos: (value: PhotoType[]) => void;
  paginate: (pageNumber: number) => void;
}

const url =
  'https://jsonplaceholder.typicode.com/photos?_limit=500&title_like=';
const AppContext = React.createContext({} as AppContextInterface);

const AppProvider = ({ children }: ContextProviderProps) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [searchTitle, setSearchTitle] = useState<string>('');
  const [photos, setPhotos] = useState<PhotoType[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const photosPerPage: number = 20;

  const fetchPhotos = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch(`${url}${searchTitle}`);
      const data = await response.json();
      setPhotos(data);
      setLoading(false);
      console.log(data);
      
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }, [searchTitle]);

  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const paginatedData = getPagination(currentPage, photosPerPage, photos);

  useEffect(() => {
    fetchPhotos();
  }, [searchTitle]);

  return (
    <AppContext.Provider
      value={{
        loading,
        searchTitle,
        photos,
        photosPerPage,
        paginatedData,
        setSearchTitle,
        setPhotos,
        paginate,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
