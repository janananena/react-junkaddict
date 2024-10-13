import {render, screen} from "@testing-library/react";
import {JunkContextProvider} from "../../../contexts/ProgramContext";
import {userEvent} from "@testing-library/user-event";
import OnAirJunkCardBody from "./OnAirJunkCardBody";
import {changeProgram} from "../../../services/DevDataApiHandlers";

const testJunk = {
    "id": "test-id-onair",
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
    "links": ["test link 1", "test link 2"],
    "notes": ["test note 1", "test note 2"]
}

describe('OnAirJunkCardBody', () => {

    afterEach(() => {
        vi.restoreAllMocks()
    })

    it('shows collapsed content, expands, edit, set off air', async () => {
        const toggleEdit = vi.fn();

        vi.mock("../../../services/DevDataApiHandlers", () => {
            const changeProgram = vi.fn();
            changeProgram.mockImplementation((junk) => {
                return Promise.resolve(junk);
            });
            return {
                changeProgram: changeProgram
            };
        });

        render(
            <JunkContextProvider value={{
                junk: testJunk,
                setJunk: () => {
                }, removeJunk: () => {
                }
            }}>
                <OnAirJunkCardBody toggleEditProgram={toggleEdit}/>
            </JunkContextProvider>
        );

        // show day time category
        expect(screen.getByText('Mi 14:45 Tv')).toBeInTheDocument();
        // collapsed
        expect(screen.getByRole('button')).toHaveTextContent('more');
        expect(screen.queryByText('Season')).not.toBeInTheDocument();
        expect(screen.queryByText('test note 1')).not.toBeInTheDocument();
        expect(screen.queryByText('test link 1')).not.toBeInTheDocument();
        // show buttons
        const editButton = screen.getByText('Edit');
        expect(editButton).toBeInTheDocument();
        const offAirButton = screen.getByText('Staffel Ende');
        expect(offAirButton).toBeInTheDocument();

        // edit button opens modal
        await userEvent.click(editButton);
        expect(toggleEdit).toHaveBeenCalledTimes(1);

        //expand shows seasons form, notes, links
        await userEvent.click(screen.getByRole('button'));
        expect(screen.getAllByRole('button')[0]).toHaveTextContent('less');
        expect(screen.getByText('Season')).toBeInTheDocument();
        expect(screen.getByText('test note 1')).toBeInTheDocument();
        expect(screen.getByText('test link 1')).toBeInTheDocument();
        expect(editButton).toBeInTheDocument();
        expect(offAirButton).toBeInTheDocument();

        // off air button
        await userEvent.click(offAirButton);
        expect(changeProgram).toHaveBeenCalledTimes(1);
        expect(changeProgram).toHaveBeenCalledWith({...testJunk, currentSeason: false});
    })

})