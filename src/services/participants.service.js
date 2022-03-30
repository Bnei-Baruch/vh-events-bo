import axios from "axios";

const getParticipants = (query) => {
    return axios.get(`${window.APP_CONFIG.VH_API_BASE_URL}/events/v1/participants${query ? query: ''}`).then(res => res.data.data);
}

export default getParticipants;