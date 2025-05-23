import axios from "axios";
import {Junk, NewJunk} from "../contexts/ProgramContext";
import {NewWatch, ToWatch} from "../contexts/WatchListContext.tsx";

// json-server
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

export async function getWatchList(): Promise<ToWatch[]> {
    const response = await axios.get(`${BaseUrl}/watchList`);
    return response.data;
}

// no replace all in json-server
export async function setWatchList(watches: ToWatch[]): Promise<ToWatch[]> {
    const oldWatches = await axios.get(`${BaseUrl}/watchList`);
    for (const watch of oldWatches.data) {
        await deleteWatch(watch);
    }
    console.log('deleted all watches.');
    const res = [];
    for (const watch of watches) {
        const p = await addWatch(watch);
        res.push(p);
    }
    return res;
}

export async function addWatch(watch: NewWatch): Promise<ToWatch> {
    const headers = {headers: {'Content-Type': 'application/json'}};
    const response = await axios.post(`${BaseUrl}/watchList/`, watch, headers);
    console.log(`added watch w/ id ${response.data.id}: `, watch);
    return response.data;
}

export async function changeWatch(watch: ToWatch): Promise<ToWatch> {
    const headers = {headers: {'Content-Type': 'application/json'}};
    const response = await axios.put(`${BaseUrl}/watchList/${watch.id}`, watch, headers);
    console.log(`changed watch w/ id ${watch.id}: `, watch);
    return response.data;
}

export async function deleteWatch(watch: ToWatch): Promise<void> {
    await axios.delete(`${BaseUrl}/watchList/${watch.id}`);
}