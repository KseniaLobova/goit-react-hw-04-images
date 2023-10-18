import { useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';

import { Button } from './Button/Button';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Searchbar } from './Searchbar/Searchbar';
import { fetchImages } from './api';
import { Loader } from './Loader/Loader';

export const App = () => {
  const [gallery, setGallery] = useState([]);
  const [page, setPage] = useState(1);
  const [loader, setLoader] = useState(false);
  const [query, setQuery] = useState('');
  const [error, setError] = useState(false);
  const [totalPage, setTotalPage] = useState(0);

  const onchangeInput = inValue => {
    setQuery(inValue);
    setPage(1);
    setGallery([]);
  };

  const handleLoadMore = () => {
    setPage(prevState => prevState + 1);
  };
  useEffect(() => {
    if (query === '') {
      return;
    }
    const fetchGallery = async () => {
      try {
        setLoader(true);

        const images = await fetchImages(page, query);
        const totalPage = Math.floor(images.totalHits / 12);
        setTotalPage(totalPage);
        const imagesGallery = images.hits;
        console.log(imagesGallery);

        if (!imagesGallery.length) {
          setError(true);
          toast.error(
            'Sorry, there are no images matching your search query. Please try again.'
          );
        }

        setGallery(prevState => [...prevState, ...imagesGallery]);
      } catch (error) {
        setError(true);
        toast.error('Whoops! Error! Please reload this page!');
      } finally {
        setLoader(false);
      }
    };
    fetchGallery();
  }, [query, page]);

  return (
    <div>
      <Searchbar onChange={onchangeInput} />
      {gallery.length > 0 && <ImageGallery images={gallery} />}
      {gallery.length > 0 && page < totalPage && (
        <Button loadMore={handleLoadMore} />
      )}
      {loader === true && <Loader />}
      {error === true && <Toaster />}
    </div>
  );
};
