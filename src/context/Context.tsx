import React, { useState, useCallback, useEffect, useContext } from 'react';
import { getPagination } from '../hooks/GetPagination';

export interface PhotoType {
  albumId: number;
  id: number;
  title: string;
  url: string;
  thumbnailUrl: string;
}

type ContextProviderProps = {
  children: React.ReactNode
}

interface AppContextInterface {
  loading: boolean;
  photos: PhotoType[] | null;
  photosPerPage: number;
  paginatedData: PhotoType[] | null;
  isOpen: boolean,
  setIsOpen: (isOpen: boolean) => void;
  setSearchTitle: (title: string) => void;
  paginate: (pageNumber: number) => void;
}

const url =
  'https://jsonplaceholder.typicode.com/photos?_limit=500&title_like=';
const AppContext = React.createContext({} as AppContextInterface);

const AppProvider = ({ children }: ContextProviderProps) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [isOpen, setIsOpen] = useState(false);
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
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }, [searchTitle]);

  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const paginatedData = getPagination(currentPage, photosPerPage, photos);
  // this function will return only the first page of data becuase of pagination.

  useEffect(() => {
    fetchPhotos();
  }, [searchTitle, fetchPhotos]);

  return (
    <AppContext.Provider
      value={{
        loading,
        photos,
        photosPerPage,
        paginatedData,
        isOpen,
        setIsOpen,
        setSearchTitle,
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
