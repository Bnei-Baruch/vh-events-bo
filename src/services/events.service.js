import axios from 'axios';

const getEvents = () => {
    return axios.get(`${window.APP_CONFIG.VH_API_BASE_URL}/events/v1/events`).then(res => res.data.data);
}
export const getEventsAnalytics = (eventId) => {
    return axios.get(`${window.APP_CONFIG.VH_API_BASE_URL}/events/v1/analytics/participants${eventId ? `?event_id=${eventId}` : ''}`).then(res => res.data.data);
}

export const getEventsPaymentsAnalytics = () => {
    return axios.get(`${window.APP_CONFIG.VH_API_BASE_URL}/pay/orders/count/0522`).then(res => res.data.data);
}
export default getEvents;