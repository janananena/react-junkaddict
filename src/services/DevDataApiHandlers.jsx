import axios from "axios";

// json-server
const BaseUrl = 'http://localhost:3004';

export async function getPrograms() {
    let response = await axios.get(`${BaseUrl}/programs`);
    return response.data;
}

// no replace all in json-server
export async function setPrograms(programs){
    let oldPrograms = await axios.get(`${BaseUrl}/programs`);
    for (const program of oldPrograms.data) {
            await axios.delete(`${BaseUrl}/programs/${program.id}`);
        }
    console.log('deleted all junks.');
    const res = [];
    for (const program of programs) {
        let p = await addProgram(program);
        res.push(p);
    }
    return res;
}

export async function addProgram(program) {
    let headers = {headers: {'Content-Type': 'application/json'}};
    let response = await axios.post(`${BaseUrl}/programs/`, program, headers);
    console.log(`added junk w/ id ${program.id}: `, program);
    return response.data;
}

export async function changeProgram(program) {
    let headers = {headers: {'Content-Type': 'application/json'}};
    let response = await axios.put(`${BaseUrl}/programs/${program.id}`, program, headers);
    console.log(`changed junk w/ id ${program.id}: `, program);
    return response.data;
}