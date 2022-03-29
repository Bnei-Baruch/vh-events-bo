import axios from 'axios';

const getEvents = () => {
    return axios.get(`${window.APP_CONFIG.VH_API_BASE_URL}/events/v1/events`).then(res => res.data.data);
}

export default getEvents;