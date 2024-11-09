import * as React from "react";
import {useRef} from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import {usePapaParse} from 'react-papaparse';
import {setPrograms, setWatchList} from "./DevDataApiHandlers";
import {Junk} from "../contexts/ProgramContext";
import {ParseResult} from "papaparse";
import {ToWatch} from "../contexts/WatchListContext.tsx";

interface ExportJunkCSVProps {
    data: Junk[],
    fileName: string
}

export const ExportJunkCSV = ({data, fileName}: ExportJunkCSVProps) => {
    const {jsonToCSV} = usePapaParse();

    const convertToCSV = (json: Junk[]): string => {
        return jsonToCSV(json, {header: true, delimiter: ';'});
    };

    const downloadCSV = (): void => {
        const csvData = new Blob([convertToCSV(data)], {type: 'text/csv'});
        const csvURL = URL.createObjectURL(csvData);
        const link = document.createElement('a');
        link.href = csvURL;
        link.download = `${fileName}.csv`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <Button type="button" variant="outline-secondary" onClick={downloadCSV}>Download{' '}CSV</Button>
    );
}

interface ExportWatchesCSVProps {
    data: ToWatch[],
    fileName: string
}

export const ExportWatchesCSV = ({data, fileName}: ExportWatchesCSVProps) => {
    const {jsonToCSV} = usePapaParse();

    const convertToCSV = (json: ToWatch[]): string => {
        return jsonToCSV(json, {header: true, delimiter: ';'});
    };

    const downloadCSV = (): void => {
        const csvData = new Blob([convertToCSV(data)], {type: 'text/csv'});
        const csvURL = URL.createObjectURL(csvData);
        const link = document.createElement('a');
        link.href = csvURL;
        link.download = `${fileName}.csv`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <Button type="button" variant="outline-secondary" onClick={downloadCSV}>Download{' '}CSV</Button>
    );
}

interface ImportJunkCSVProps {
    setJunks: (junks: Junk[]) => void
}

export const ImportJunkCSV = ({setJunks}: ImportJunkCSVProps) => {
    const {readRemoteFile} = usePapaParse();
    const hiddenFileInput = useRef<HTMLInputElement>(null);

    const handleClick = (event: React.FormEvent<HTMLButtonElement>): void => {
        event.preventDefault();
        hiddenFileInput.current?.click();
    };

    const idsAsStrings = (results: Junk[]): Junk[] => {
        return results.map((junk) => {
            junk.id = junk.id.toString();
            return junk;
        });
    }

    const handleResults = async (results: ParseResult<Junk>): Promise<void> => {
        const res = idsAsStrings(results.data);
        const junks = await setPrograms(res);
        setJunks(junks);
        console.log('CSV parsing complete. Results: ', junks);
    }

    function handleFileChange(e: React.ChangeEvent<HTMLInputElement>): void {
        const file = e.target.files ? e.target.files[0] : null;

        if (file) {
            readRemoteFile<Junk>(file.webkitRelativePath, {
                complete: (result: ParseResult<Junk>): void => {
                    handleResults(result).then();
                },
                download: true,
                header: true,
                dynamicTyping: true,
                skipEmptyLines: true,
            });
        }
    }

    return (
        <>
            <Button type="button" variant="outline-secondary" onClick={handleClick}>Upload{' '}CSV</Button>
            <Form.Control
                type="file"
                onChange={handleFileChange}
                ref={hiddenFileInput}
                style={{display: 'none'}} // Make the file input element invisible
            />
        </>
    );
};

interface ImportWatchCSVProps {
    setWatches: (watches: ToWatch[]) => void
}

export const ImportWatchesCSV = ({setWatches}: ImportWatchCSVProps) => {
    const {readRemoteFile} = usePapaParse();
    const hiddenFileInput = useRef<HTMLInputElement>(null);

    const handleClick = (event: React.FormEvent<HTMLButtonElement>): void => {
        event.preventDefault();
        hiddenFileInput.current?.click();
    };

    const idsAsStrings = (results: ToWatch[]): ToWatch[] => {
        return results.map((watch) => {
            watch.id = watch.id.toString();
            return watch;
        });
    }

    const handleResults = async (results: ParseResult<ToWatch>): Promise<void> => {
        const res = idsAsStrings(results.data);
        const watches = await setWatchList(res);
        setWatches(watches);
        console.log('CSV parsing complete. Results: ', watches);
    }

    function handleFileChange(e: React.ChangeEvent<HTMLInputElement>): void {
        const file = e.target.files ? e.target.files[0] : null;

        if (file) {
            readRemoteFile<ToWatch>(file.webkitRelativePath, {
                complete: (result: ParseResult<ToWatch>): void => {
                    handleResults(result).then();
                },
                download: true,
                header: true,
                dynamicTyping: true,
                skipEmptyLines: true,
            });
        }
    }

    return (
        <>
            <Button type="button" variant="outline-secondary" onClick={handleClick}>Upload{' '}CSV</Button>
            <Form.Control
                type="file"
                onChange={handleFileChange}
                ref={hiddenFileInput}
                style={{display: 'none'}} // Make the file input element invisible
            />
        </>
    );
};