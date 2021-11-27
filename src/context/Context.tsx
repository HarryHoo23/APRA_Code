import React, { useState, useCallback, useEffect, useContext } from 'react';

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
  photos: Array<PhotoType>;
  setSearchTitle: (value: string) => void;
  setPhotos: (value: Array<PhotoType>) => void;
}

const url =
  'https://jsonplaceholder.typicode.com/photos?_limit=500&title_like=';
const AppContext = React.createContext<AppContextInterface | null>(null);

const AppProvider = ({ children }: ContextProviderProps) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [searchTitle, setSearchTitle] = useState<string>('');
  const [photos, setPhotos] = useState<Array<PhotoType>>([]);

  const fetchPhotos = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${url}${searchTitle}`);
      const data = await response.json();
      const { thumbnailUrl } = data;
      if (!thumbnailUrl) setPhotos([]);
      console.log(data);
      setPhotos(data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPhotos();
  }, [searchTitle]);

  return (
    <AppContext.Provider
      value={{ loading, searchTitle, photos, setSearchTitle, setPhotos }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
