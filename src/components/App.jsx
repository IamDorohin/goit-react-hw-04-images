import Searchbar from 'components/Searchbar/Searchbar';
import { useState, useEffect } from 'react';
import { Button } from './Button/Button';
import ImageGallery from './ImageGallery/ImageGallery';
import { Loader } from 'components/Loader/Loader';
import { EmptyList, MainContainer } from './App.styled';
import { fetchAPI } from '../Services/FetchAPI';

export default function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [responseArray, setResponseArray] = useState([]);
  const [queryPage, setQueryPage] = useState(0);
  const [error, setError] = useState(null);
  const [maxPageNumber, setMaxPageNumber] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchImages() {
      try {
        if (searchQuery === '') return;
        setLoading(true);
        const data = await fetchAPI(searchQuery, queryPage);
        setResponseArray(prevState => [...prevState, ...data.hits]);
        setLoading(false);
        setMaxPageNumber(Math.ceil(data.totalHits / 12));
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    }
    fetchImages();
  }, [searchQuery, queryPage]);

  const handleSearchQueryChange = searchQuery => {
    setSearchQuery(searchQuery);
    setQueryPage(1);
    setResponseArray([]);
  };

  const onLoadMore = () => {
    setQueryPage(prevState => prevState + 1);
  };

  return (
    <MainContainer>
      <Searchbar onSubmit={handleSearchQueryChange} />
      {loading && <Loader />}
      {queryPage ? (
        <ImageGallery responseArray={responseArray} />
      ) : (
        <EmptyList>You haven't made your first request yet</EmptyList>
      )}
      {error && <EmptyList>{error.message}</EmptyList>}
      {queryPage !== maxPageNumber && !loading && (
        <Button onClick={onLoadMore}>Load more</Button>
      )}
    </MainContainer>
  );
}
