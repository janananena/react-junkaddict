import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import {usePapaParse} from 'react-papaparse';
import {setPrograms} from "./DevDataApiHandlers";
import {useRef} from "react";

export const ExportCSV = ({data, fileName}) => {
    const {jsonToCSV} = usePapaParse();

    const convertToCSV = (json) => {
        return jsonToCSV(json, {header: true, delimiter: ';'});
    };

    const downloadCSV = () => {
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

export const ImportCSV = ({setJunks}) => {
    const {readRemoteFile} = usePapaParse();
    const hiddenFileInput = useRef(null);

    const handleClick = event => {
        hiddenFileInput.current.click();
    };

    const idsAsStrings = (results) => {
        return results.map((junk) => {
            junk.id = junk.id.toString();
            return junk;
        });
    }

    const handleResults = async (results) => {
        const res = idsAsStrings(results.data);
        const junks = await setPrograms(res);
        setJunks(junks);
        console.log('CSV parsing complete. Results: ', junks);
    }

    const handleFileChange = (e) => {
        const file = e.target.files[0];

        if (file) {
            readRemoteFile(file, {
                complete: (result) => {
                    handleResults(result);
                },
                header: true,
                dynamicTyping: true,
                skipEmptyLines: true,
            });
        }
    };

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