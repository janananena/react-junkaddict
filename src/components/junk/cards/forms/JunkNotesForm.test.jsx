import {render, screen} from "@testing-library/react";
import {JunkContextProvider} from "../../../../contexts/ProgramContext";
import JunkNotesForm from "./JunkNotesForm";


const testJunk = {
    "id": "test-id-notes",
    "junkname": "Testershire McTesterson",
    "nick": "Testy",
    "station": "ard",
    "link": "https://www.irgendeine.url/zumtesten",
    "day": "mi",
    "time": "14:15",
    "category": "tv",
    "currentSeason": true,
    "season": "3",
    "seen": [
        false,
        false,
        false
    ],
    "links": [],
    "notes": ["test note 1"]
}

describe('JunkNotesForm', () => {
    it('renders the notes', () => {
        render(
            <JunkContextProvider value={{
                junk: testJunk,
                setJunk: () => {
                }, removeJunk: () => {
                }
            }}>
                <JunkNotesForm/>
            </JunkContextProvider>
        );

        screen.debug();
        expect(screen.getByText('test note 1')).toBeInTheDocument();
    })
})