import React, {useContext, useEffect, useState } from 'react';
import axios from 'axios';
import SuperheroContext from './SuperheroContext';
import ErrorMessage from './ErrorMessage';


const SuperheroLoader: React.FC = () => {
  const [, setSuperheroes] = useContext(SuperheroContext);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get(
          `${process.env.REACT_APP_API_SERVER}/superheroes`
        );
        setSuperheroes(data);
      } catch (error: any) {
        setError(
          `No books loaded: ${error.message || 'An error occurred while fetching books'} ${error.response?.status}`
        );
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  if (error) {
    return <ErrorMessage message={error} />;
  }

  return isLoading ? <div>Loading...</div> : <></>;
};

export default SuperheroLoader;