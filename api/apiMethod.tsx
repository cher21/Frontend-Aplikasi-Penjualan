import axios from "../config/endpoint";

const getAll = () => {
    return axios.get('/user');
};
const search = (id: number) => {
    return axios.get(`/user/${id}`)
}
const create = (data: any) => {
    return axios.post('/user', data);
};
const update = (id: number, data: any) => {
    const token = JSON.parse(localStorage.getItem("token") || "")
    return axios.put(`/user/${id}`, data, {
        headers: { 'Authorization': `${token.accessToken}`}
    });
};
const getById = (id: number) => {
    return axios.get(`/user/${id}`);
};
const remove = (id: number) => {
    const token = JSON.parse(localStorage.getItem("token") || "")
    return axios.delete(`/user/${id}`, {
        headers: { 'Authorization': `${token.accessToken}` }
    })
}

const ApiMethod = {
    getAll,
    create,
    update,
    getById,
    remove,
    search
}

export default ApiMethod;