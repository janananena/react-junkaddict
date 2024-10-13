import {render, screen} from "@testing-library/react";
import {JunkContextProvider} from "../../../contexts/ProgramContext";
import {userEvent} from "@testing-library/user-event";
import JunkCardDetails from "./JunkCardDetails";
import {changeProgram} from "../../../services/DevDataApiHandlers";

const testJunk = {
    "id": "test-id-details",
    "junkname": "Testershire McTesterson",
    "nick": "Testy",
    "station": "ard",
    "link": "https://www.irgendeine.url/zumtesten",
    "day": "mi",
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

const testJunkOffline = {
    "id": "test-id-details-offline",
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

const testJunkNoNick = {
    "id": "test-id-details-no-nick",
    "junkname": "Testershire McTesterson",
    "nick": null,
    "station": "ard",
    "link": "https://www.irgendeine.url/zumtesten",
    "day": "mi",
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

describe('JunkCardDetails', () => {

    afterEach(() => {
        vi.restoreAllMocks()
    })

    it('shows on air details', async () => {
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
                <JunkCardDetails toggleEditProgram={toggleEdit}/>
            </JunkContextProvider>
        );

        //show nick and name
        expect(screen.getByText('Testy')).toBeInTheDocument();
        expect(screen.getByText('Testershire McTesterson')).toBeInTheDocument();

        // show on air details
        expect(screen.getByText('Mi 14:45 Tv')).toBeInTheDocument();

        // show delete button
        expect(screen.getByTestId('toggleDeleteJunk')).toBeInTheDocument();

        // set offline
        const offAirButton = screen.getByText('Staffel Ende');
        await userEvent.click(offAirButton);
        expect(changeProgram).toHaveBeenCalledTimes(1);
        expect(changeProgram).toHaveBeenCalledWith({...testJunk, currentSeason: false});
    })

    it('shows off air details', async () => {
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
                junk: testJunkOffline,
                setJunk: () => {
                }, removeJunk: () => {
                }
            }}>
                <JunkCardDetails toggleEditProgram={toggleEdit}/>
            </JunkContextProvider>
        );

        //show nick and name
        expect(screen.getByText('Testy')).toBeInTheDocument();
        expect(screen.getByText('Testershire McTesterson')).toBeInTheDocument();

        // show off air details
        expect(screen.getByText('test note 1')).toBeInTheDocument();

        // show delete button
        expect(screen.getByTestId('toggleDeleteJunk')).toBeInTheDocument();

        // set online opens modal
        const onAirButton = screen.getByText('Neue Staffel');
        expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
        await userEvent.click(onAirButton);
        expect(screen.getByRole('dialog')).toBeInTheDocument();
    })

    it('shows details without nick', async () => {
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
                junk: testJunkNoNick,
                setJunk: () => {
                }, removeJunk: () => {
                }
            }}>
                <JunkCardDetails toggleEditProgram={toggleEdit}/>
            </JunkContextProvider>
        );

        //show name only
        expect(screen.getByText('Testershire McTesterson')).toBeInTheDocument();

        // show on air details
        expect(screen.getByText('Mi 14:45 Tv')).toBeInTheDocument();
    })

})