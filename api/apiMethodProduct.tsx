import axios from "../config/endpoint";

const getAll = () => {
    return axios.get('/product');
};
const create = (data: any) => {
    return axios.post('product/upload',data, {
        headers:{
            "Content-Type":'multipart/form-data'
        }
    })
};
const update = (id: number, data: any) => {
    return axios.put(`/product/upload/${id}`,data, {
        headers:{
            "Content-Type":'multipart/form-data'
        }
    });
    
};
const getById = (id: number) => {
    return axios.get(`/product/${id}`);
};
const remove = (id: number) => {
    return axios.delete(`/product/upload/${id}`)
}


const ApiMethodProduct = {
    getAll,
    create,
    update,
    getById,
    remove,
}

export default ApiMethodProduct;