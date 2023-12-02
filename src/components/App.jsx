import React, { useState, useEffect, useCallback } from 'react';
import { Notify } from 'notiflix';
import Searchbar from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import Loader from './Loader/Loader';
import Modal from './Modal/Modal';
import { getItems } from './PixabayApi';
import css from './App.module.css';

const App = () => {
  const [images, setImages] = useState([]);
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [showBtn, setShowBtn] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [largeImageURL, setLargeImageURL] = useState('');
  const [error, setError] = useState(null);

  const fetchGallery = useCallback(() => {
    getItems(query, page)
      .then(response => {
        setImages(prevImages => [...prevImages, ...response]);
        setShowBtn(response.length === 12);

        if (response.length === 0) {
          Notify.failure('No matches found!');
        }
      })
      .catch(error => {
        setError(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [query, page]);

  useEffect(() => {
    if (query !== '' || page !== 1) {
      setIsLoading(true);
      setImages([]);
      setError(null);
      fetchGallery();
    }
  }, [query, page, fetchGallery]);

  const onSubmit = newQuery => {
    setQuery(newQuery);
    setIsLoading(true);
    setImages([]);
    setPage(1);
  };

  const nextPage = () => {
    setPage(prevPage => prevPage + 1);
    setIsLoading(true);
  };

  const openImageModal = url => {
    setShowModal(true);
    setLargeImageURL(url);
  };

  const closeModal = () => {
    setShowModal(false);
    setLargeImageURL('');
  };

  return (
    <div className={css.App}>
      <Searchbar getInputValue={onSubmit} />
      <ImageGallery images={images} openImageModal={openImageModal} />
      {isLoading && <Loader />}
      {showBtn && <Button nextPage={nextPage} hasMoreImages={true} />}
      {showModal && (
        <Modal largeImageURL={largeImageURL} closeModal={closeModal} />
      )}
      {error && <div>Error occurred: {error.message}</div>}
    </div>
  );
};

export default App;
