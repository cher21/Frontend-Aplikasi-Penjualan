import axios from "axios";

const API_URL = "http://localhost:3005";

export const getCategories = async () => {
    const response = await axios.get(`${API_URL}/productcategory`);
    return response.data
}