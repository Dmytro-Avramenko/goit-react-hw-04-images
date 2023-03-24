import axios from 'axios';
import { notificationServerError } from './notification';

axios.defaults.baseURL = 'https://pixabay.com/api/';

export async function getImages({ search, page }) {
  try {
    const response = await axios.get('', {
      params: {
        key: '33715416-9eaa4d7b16ffe0e02c82fe7bc',
        q: search,
        image_type: 'photo',
        orientation: 'horizontal',
        per_page: '12',
        page: page,
      },
    });
    if (response.status !== 200) {
      notificationServerError();
      return;
    }
    return response;
  } catch (error) {
    notificationServerError();
    return;
  }
}