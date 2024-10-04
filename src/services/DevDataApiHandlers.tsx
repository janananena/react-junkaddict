import axios from "axios";
import {Junk, NewJunk} from "../contexts/ProgramContext";

// json-server
// eslint-disable-next-line react-refresh/only-export-components
const BaseUrl = 'http://localhost:3004';

export async function getPrograms(): Promise<Junk[]> {
    const response = await axios.get(`${BaseUrl}/programs`);
    return response.data;
}

// no replace all in json-server
export async function setPrograms(programs: Junk[]): Promise<Junk[]> {
    const oldPrograms = await axios.get(`${BaseUrl}/programs`);
    for (const program of oldPrograms.data) {
        await deleteProgram(program);
    }
    console.log('deleted all junks.');
    const res = [];
    for (const program of programs) {
        const p = await addProgram(program);
        res.push(p);
    }
    return res;
}

export async function deleteProgram(program: Junk): Promise<void> {
    await axios.delete(`${BaseUrl}/programs/${program.id}`);
}

export async function addProgram(program: NewJunk): Promise<Junk> {
    const headers = {headers: {'Content-Type': 'application/json'}};
    const response = await axios.post(`${BaseUrl}/programs/`, program, headers);
    console.log(`added junk w/ id ${response.data.id}: `, program);
    return response.data;
}

export async function changeProgram(program: Junk): Promise<Junk> {
    const headers = {headers: {'Content-Type': 'application/json'}};
    const response = await axios.put(`${BaseUrl}/programs/${program.id}`, program, headers);
    console.log(`changed junk w/ id ${program.id}: `, program);
    return response.data;
}