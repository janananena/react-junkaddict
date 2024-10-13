import {render, screen} from "@testing-library/react";
import OffAirJunkCardBody from "./OffAirJunkCardBody";
import {JunkContextProvider} from "../../../contexts/ProgramContext";
import {userEvent} from "@testing-library/user-event";

const testJunk = {
    "id": "test-id-offair",
    "junkname": "Testershire McTesterson",
    "nick": "Testy",
    "station": "ard",
    "link": "https://www.irgendeine.url/zumtesten",
    "day": "mi",
    "time": "14:45",
    "category": "tv",
    "currentSeason": false,
    "season": "3",
    "seen": [
        false,
        false,
        false
    ],
    "links": [],
    "notes": ["test note 1", "test note 2"]
}

describe('OffAirJunkCardBody', ()=> {

    it('shows notes, set on air', async () => {
        render(
            <JunkContextProvider value={{
                junk: testJunk,
                setJunk: () => {
                }, removeJunk: () => {
                }
            }}>
            <OffAirJunkCardBody/>
            </JunkContextProvider>
        );

        //show notes
        expect(screen.getByText('test note 1')).toBeInTheDocument();
        expect(screen.getByText('test note 2')).toBeInTheDocument();
        expect(screen.getByRole('button')).toHaveTextContent('Edit notes');

        //show button
        const setOnAir = screen.getByText('Neue Staffel');
        expect(setOnAir).toBeInTheDocument();

        // button opens modal
        expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
        await userEvent.click(setOnAir);
        expect(screen.getByRole('dialog')).toBeInTheDocument();
    })

})