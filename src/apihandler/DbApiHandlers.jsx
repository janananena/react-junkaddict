import axios from "axios";

const BaseUrl = 'http://localhost:3004';

export async function getPrograms() {
    let response = await axios.get(`${BaseUrl}/programs`);
    return response.data;
}

export async function addProgram(program) {
    let headers = {headers: {'Content-Type': 'application/json'}};
    let response = await axios.post(`${BaseUrl}/programs/`, program, headers);
    return response.data;
}

export async function changeProgram(program) {
    let headers = {headers: {'Content-Type': 'application/json'}};
    let response = await axios.put(`${BaseUrl}/programs/${program.id}`, program, headers);
    return response.data;
}