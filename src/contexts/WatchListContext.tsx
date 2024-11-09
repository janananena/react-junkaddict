import {createContext, useContext} from "react";

export interface NewWatch {
    link: string,
    label: string | null,
    collection: string | null,
    seen: boolean
}

export interface ToWatch extends NewWatch{
    id: string
}

export interface WatchListContext {
    entries: ToWatch[]
}

const WatchListContext = createContext<WatchListContext>({entries: []});

export const WatchListContextProvider = WatchListContext.Provider;

// eslint-disable-next-line react-refresh/only-export-components
export const useWatchListContext = () => useContext(WatchListContext);