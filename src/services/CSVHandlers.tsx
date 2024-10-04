import * as React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import {usePapaParse} from 'react-papaparse';
import {setPrograms} from "./DevDataApiHandlers";
import {Junk} from "../contexts/ProgramContext";
import {useRef} from "react";
import {ParseResult} from "papaparse";

interface ExportCSVProps {
    data: Junk[],
    fileName: string
}

export const ExportCSV = ({data, fileName}: ExportCSVProps) => {
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

interface ImportCSVProps {
    setJunks: (junks: Junk[]) => void
}

export const ImportCSV = ({setJunks}: ImportCSVProps) => {
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