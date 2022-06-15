import axios from "axios";

const getEvents = () => {
  return axios
    .get(`${window.APP_CONFIG.VH_API_BASE_URL}/events/v1/events`)
    .then((res) => res.data.data);
};
export const getEventsAnalytics = (eventId) => {
  return axios
    .get(
      `${window.APP_CONFIG.VH_API_BASE_URL}/events/v1/analytics/participants${
        eventId ? `?event_id=${eventId}` : ""
      }`
    )
    .then((res) => res.data.data);
};

export const getEventsPaymentsAnalytics = () => {
  return axios
    .get(`${window.APP_CONFIG.VH_API_BASE_URL}/pay/orders/count/0522`)
    .then((res) => res.data.data);
};

export const createEvent = body => {
  return axios.post(`${window.APP_CONFIG.VH_API_BASE_URL}/events/v1/event`, body).then(res => res);
}

export const editEvent = (id, body) => {
  return axios.patch(`${window.APP_CONFIG.VH_API_BASE_URL}/events/v1/event/${id}`, body).then(res => res);
}

export const deleteEvent = eventId => {
  return axios.delete(`${window.APP_CONFIG.VH_API_BASE_URL}/events/v1/event/${eventId}`).then(res => res);
}
export default getEvents;
