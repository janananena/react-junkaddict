import {createContext, useContext} from "react";

export interface Note {
    alwaysShow: boolean,
    note: string
}

export interface JunkLink {
    alwaysShow: boolean,
    junklink: string
}

export interface DayOption {
    value: string,
    label: string
}

export interface NewJunk {
    junkname: string,
    nick: string | null,
    station: string,
    link: string,
    day: string[],
    time: string,
    category: string,
    currentSeason: boolean,
    season: string,
    seen: boolean[],
    links: JunkLink[],
    notes: Note[],
    startDate: string | null
}

export interface Junk extends NewJunk {
    id: string
}

export interface JunkContext {
    junk: Junk,
    setJunk: (junk: Junk) => void,
    removeJunk: (junk: Junk) => void
}

const ProgramContext = createContext<JunkContext>(
    {
        junk: {
            id: "",
            junkname: "",
            nick: "",
            station: "",
            link: "",
            day: [],
            time: "",
            category: "",
            currentSeason: false,
            season: "",
            seen: [],
            links: [],
            notes: [],
            startDate: ""
        },
        setJunk: () => {
        },
        removeJunk: () => {
        }
    });

export const JunkContextProvider = ProgramContext.Provider;

// eslint-disable-next-line react-refresh/only-export-components
export const useJunkContext = () => useContext(ProgramContext);