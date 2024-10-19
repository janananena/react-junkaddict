import AlwaysShowForm from "./AlwaysShowForm";
import {JunkContextProvider} from "../../../../contexts/ProgramContext";
import {render, screen} from "@testing-library/react";

const testJunk = {
    "id": "test-id-always-show",
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
    "notes": [
                {
            "alwaysShow": true,
            "note": "test note 1"
        },
        {
            "alwaysShow": false,
            "note": "test note 2"
        }
    ]
}

describe('AlwaysShowForm', () => {
    it('shows notes with flag', () => {
        render(
            <JunkContextProvider value={{
                junk: testJunk,
                setJunk: () => {
                }, removeJunk: () => {
                }
            }}>
                <AlwaysShowForm/>
            </JunkContextProvider>
        );

        const notes = screen.getAllByRole('textbox');
        expect(notes).toHaveLength(1);
        expect(notes[0]).toHaveValue("test note 1");
    })
})