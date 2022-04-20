import axios from "axios";

const getParticipants = (query, limit = 10, skip) => {
    // eslint-disable-next-line
    return axios.get(`${window.APP_CONFIG.VH_API_BASE_URL}/events/v1/participation-statuses${query ? `?${query}` + `&limit=${limit}&skip=${skip}` : `?limit=${limit}&skip=${skip}`}`).then(res => res.data);
}

export default getParticipants;