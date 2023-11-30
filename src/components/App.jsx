import { Component } from 'react';
import { Notify } from 'notiflix';
import Searchbar from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import Loader from './Loader/Loader';
import Modal from './Modal/Modal';
import { getItems } from './PixabayApi';
import css from './App.module.css';

class App extends Component {
  state = {
    images: [],
    query: '',
    page: 1,
    isLoading: false,
    showBtn: false,
    showModal: false,
    largeImageURL: '',
  };

  componentDidUpdate(prevProps, prevState) {
    if (
      this.state.query !== prevState.query ||
      this.state.page !== prevState.page
    ) {
      this.fetchGallery(this.state.query, this.state.page);
    }
  }

  onSubmit = query => {
    this.setState({
      query,
      isLoading: true,
      images: [],
      page: 1,
    });
  };

  nextPage = () => {
    const { page } = this.state;

    this.setState({
      page: page + 1,
      isLoading: true,
    });
  };

  openImageModal = url => {
    this.setState({ showModal: true, largeImageURL: url });
  };

  closeModal = () => {
    this.setState({ showModal: false, largeImageURL: '' });
  };

  fetchGallery = (query, page) => {
    getItems(query, page)
      .then(response => {
        this.setState(prevState => ({
          images: [...prevState.images, ...response],
          showBtn: response.length === 12,
        }));

        if (response.length === 0) {
          Notify.failure('No matches found!');
        }
      })
      .catch(error => {
        this.setState({ error });
      })
      .finally(() => {
        this.setState({ isLoading: false });
      });
  };

  render() {
    const { images, isLoading, showBtn, showModal, largeImageURL } = this.state;

    return (
      <div className={css.App}>
        <Searchbar getInputValue={this.onSubmit} />
        <ImageGallery images={images} openImageModal={this.openImageModal} />
        {isLoading && <Loader />}
        {showBtn && <Button nextPage={this.nextPage} hasMoreImages={true} />}
        {showModal && (
          <Modal largeImageURL={largeImageURL} closeModal={this.closeModal} />
        )}
      </div>
    );
  }
}

export default App;
