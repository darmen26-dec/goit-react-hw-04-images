import axios from 'axios';

const apiKey = '39862305-3eae03d438ad95f2b3e72075a';
const baseUrl = 'https://pixabay.com/api/';

export const getItems = async (query, page, perPage = 12) => {
  const { data } = await axios.get(baseUrl, {
    params: {
      key: apiKey,
      q: query,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
      per_page: perPage,
      page,
    },
  });

  return data.hits;
};
