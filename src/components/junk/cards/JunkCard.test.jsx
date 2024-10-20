import JunkCard from "./JunkCard";
import {render, screen} from "@testing-library/react";
import {JunkContextProvider} from "../../../contexts/ProgramContext";
import {userEvent} from "@testing-library/user-event";

const testJunk = {
    "id": "test-id-details",
    "junkname": "Testershire McTesterson",
    "nick": "Testy",
    "station": "ard",
    "link": "https://www.irgendeine.url/zumtesten",
    "day": ["mi"],
    "time": "14:45",
    "category": "tv",
    "currentSeason": true,
    "season": "3",
    "seen": [
        false,
        false,
        false
    ],
    "links": ["test link 1", "test link 2"],
    "notes": ["test note 1", "test note 2"]
}

describe('JunkCard', () => {

    it('bla', async () => {
        render(
            <JunkContextProvider value={{
                junk: testJunk,
                setJunk: () => {
                }, removeJunk: () => {
                }
            }}>
                <JunkCard />
            </JunkContextProvider>
        );

        // show details
        expect(screen.getByText('Testershire McTesterson')).toBeInTheDocument();

        // edit button opens modal
        expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
        const editButton = screen.getByText('Edit');
        expect(editButton).toBeInTheDocument();
        await userEvent.click(editButton);
        expect(screen.getByRole('dialog')).toBeInTheDocument();
    })
})