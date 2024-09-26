import axios from "axios";

const BaseUrl = 'http://localhost:3004';

export async function getPrograms() {
    let response = await axios.get(`${BaseUrl}/programs`);
    return response.data;
}