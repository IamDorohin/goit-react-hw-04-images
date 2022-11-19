import Searchbar from 'components/Searchbar/Searchbar';
import { useState, useEffect } from 'react';
import { Button } from './Button/Button';
import ImageGallery from './ImageGallery/ImageGallery';
import { Loader } from 'components/Loader/Loader';
import { MainContainer } from './App.styled';
import { MessageContainer } from 'components/MessageContainer/MessageContainer';
import { fetchAPI } from '../Services/FetchAPI';

export default function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [responseArray, setResponseArray] = useState([]);
  const [queryPage, setQueryPage] = useState(0);
  const [maxPageNumber, setMaxPageNumber] = useState(1);
  const [status, setStatus] = useState('idle');

  useEffect(() => {
    async function fetchImages() {
      try {
        if (searchQuery === '') return;
        setStatus('pending');

        const data = await fetchAPI(searchQuery, queryPage);

        setResponseArray(prevState => [...prevState, ...data.hits]);

        if (data.totalHits === 0) {
          throw new Error('We have not found similar pictures');
        }

        const maxPageNumber = Math.ceil(data.totalHits / 12);
        setMaxPageNumber(maxPageNumber);

        setStatus('resolved');
      } catch (error) {
        setStatus('rejected');
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
      {status === 'pending' && <Loader />}
      {status === 'rejected' && (
        <MessageContainer>
          Ooooooops, we could not find anything for your request. Try something
          else.
        </MessageContainer>
      )}
      {queryPage ? (
        <ImageGallery responseArray={responseArray} />
      ) : (
        <MessageContainer>
          You haven't made your first request yet
        </MessageContainer>
      )}
      {status === 'resolved' && queryPage < maxPageNumber && (
        <Button onClick={onLoadMore}>Load more</Button>
      )}
    </MainContainer>
  );
}
