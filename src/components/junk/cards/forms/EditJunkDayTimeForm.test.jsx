import EditJunkDayTimeForm from "./EditJunkDayTimeForm";
import {JunkContextProvider} from "../../../../contexts/ProgramContext";
import {render, screen} from "@testing-library/react";
import {userEvent} from "@testing-library/user-event";
import {changeProgram} from "../../../../services/DevDataApiHandlers";

const testJunk = {
    "id": "test-id-daytime",
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

const testJunkNoSeason = {
    "id": "test-id-daytime-no-season",
    "junkname": "Testershire McTesterson",
    "nick": "Testy",
    "station": "ard",
    "link": "https://www.irgendeine.url/zumtesten",
    "day": "mi",
    "time": "14:45",
    "category": "tv",
    "currentSeason": false,
    "season": "",
    "seen": [],
    "links": [],
    "notes": ["test note 1", "test note 2"]
}

describe('EditJunkDayTimeForm', () => {

    afterEach(() => {
        vi.restoreAllMocks()
    })

    it('no modal if show false', () => {
        render(
            <JunkContextProvider value={{
                junk: testJunk,
                setJunk: () => {
                }, removeJunk: () => {
                }
            }}>
                <EditJunkDayTimeForm showNewSeason={false} setOnAir={true} handleCancel={() => {
                }}/>
            </JunkContextProvider>
        );

        expect(screen.queryAllByRole("dialog")).toHaveLength(0);
    })

    it('modal if show true, happypath', async () => {
        const cancelModal = vi.fn();

        render(
            <JunkContextProvider value={{
                junk: testJunk,
                setJunk: () => {
                }, removeJunk: () => {
                }
            }}>
                <EditJunkDayTimeForm showNewSeason={true} setOnAir={true} handleCancel={cancelModal}/>
            </JunkContextProvider>
        );

        // modal shown
        expect(screen.getByRole('dialog')).toBeInTheDocument();
        // fields shown
        const day = screen.getByRole('combobox');
        expect(day).toHaveProperty("name", "day");
        expect(day).toHaveValue("mi");
        expect(screen.getAllByRole('option')).toHaveLength(7);
        const junktime = screen.getByDisplayValue('14:45');
        expect(junktime).toBeInTheDocument();
        // buttons
        const buttons = screen.getAllByRole('button');
        expect(buttons).toHaveLength(2);
        expect(buttons[0]).toHaveProperty("name", "cancelChange");
        expect(buttons[1]).toHaveProperty("name", "submitChange");

        vi.mock("../../../../services/DevDataApiHandlers", () => {
            const changeProgram = vi.fn();
            changeProgram.mockImplementation((junk) => {
                return Promise.resolve(junk);
            });
            return {
                changeProgram: changeProgram
            };
        });

        // change values
        await userEvent.selectOptions(day, "mo");
        await userEvent.clear(junktime);
        await userEvent.type(junktime, "08:15");
        expect(day).toHaveValue("mo");
        expect(junktime).toHaveValue("08:15");

        // submit
        await userEvent.click(buttons[1]);
        // changed values saved, season raised, seen.length+1, onAir
        expect(changeProgram).toHaveBeenCalledTimes(1);
        const testJunk2 = {
            ...testJunk,
            day: "mo",
            time: "08:15",
            season: "4",
            seen: [false, false, false, false],
            currentSeason: true
        }
        expect(changeProgram).toHaveBeenCalledWith(testJunk2);
        // close modal
        expect(cancelModal).toHaveBeenCalledTimes(1);
    })

    it('happypath no season', async () => {
        const cancelModalNoSeason = vi.fn();

        render(
            <JunkContextProvider value={{
                junk: testJunkNoSeason,
                setJunk: () => {
                }, removeJunk: () => {
                }
            }}>
                <EditJunkDayTimeForm showNewSeason={true} setOnAir={true} handleCancel={cancelModalNoSeason}/>
            </JunkContextProvider>
        );

        // modal shown
        expect(screen.getByRole('dialog')).toBeInTheDocument();
        // fields shown
        const day = screen.getByRole('combobox');
        expect(day).toHaveProperty("name", "day");
        expect(day).toHaveValue("mi");
        expect(screen.getAllByRole('option')).toHaveLength(7);
        const junktime = screen.getByDisplayValue('14:45');
        expect(junktime).toBeInTheDocument();
        // buttons
        const buttons = screen.getAllByRole('button');
        expect(buttons).toHaveLength(2);
        expect(buttons[0]).toHaveProperty("name", "cancelChange");
        expect(buttons[1]).toHaveProperty("name", "submitChange");

        vi.mock("../../../../services/DevDataApiHandlers", () => {
            const changeProgram = vi.fn();
            changeProgram.mockImplementation((junk) => {
                return Promise.resolve(junk);
            });
            return {
                changeProgram: changeProgram
            };
        });

        // change values
        await userEvent.selectOptions(day, "so");
        await userEvent.clear(junktime);
        await userEvent.type(junktime, "00:00");
        expect(day).toHaveValue("so");
        expect(junktime).toHaveValue("00:00");

        // submit
        await userEvent.click(buttons[1]);
        // changed values saved, onAir
        expect(changeProgram).toHaveBeenCalledTimes(1);
        const testJunk3 = {
            ...testJunkNoSeason,
            day: "so",
            time: "00:00",
            currentSeason: true
        }
        expect(changeProgram).toHaveBeenCalledWith(testJunk3);
        // close modal
        expect(cancelModalNoSeason).toHaveBeenCalledTimes(1);
    })
})