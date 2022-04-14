import axios from "axios";

const getParticipants = (query, limit = 10) => {
    return axios.get(`${window.APP_CONFIG.VH_API_BASE_URL}/events/v1/participation-statuses${query ? query + `&limit=${limit}`: `?limit=${limit}`}`).then(res => res.data.data);
}

export default getParticipants;