import axios from 'axios';
import { API_URL } from '../../var/envData';
import { API_END_POINTS } from '../../config/axios/endPoints';
import { AxiosResponseSchema } from '../../config/axios/axios';
import { Announcement } from '../../types/announcements';

export default class Announcements {
  static async fetchAnnouncements() {
    const response = await axios.get<AxiosResponseSchema<Announcement[]>>(API_URL + API_END_POINTS.FETCH_ANNOUNCEMENTS);
    return response;
  }
}
