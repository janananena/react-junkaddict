import {JunkContextProvider} from "../../../../contexts/ProgramContext";
import {fireEvent, render, screen} from "@testing-library/react";
import {userEvent} from "@testing-library/user-event";
import {changeProgram} from "../../../../services/DevDataApiHandlers";
import EditJunkCardForm from "./EditJunkCardForm";

const testJunk = {
    "id": "test-id-edit",
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
    "links": ["test link 1"],
    "notes": ["test note 1"]
}

const testJunkNoNick = {
    "id": "test-id-edit-no-nick",
    "nick": null,
    "junkname": "Testershire McTesterson",
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
    "links": ["test link 1"],
    "notes": ["test note 1"]
}

describe('EditJunkCardForm', () => {

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
                <EditJunkCardForm showEditProgram={false} toggleEditProgram={() => {}}/>
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
                <EditJunkCardForm showEditProgram={true} toggleEditProgram={cancelModal}/>
            </JunkContextProvider>
        );

        // modal shown
        expect(screen.getByRole('dialog')).toBeInTheDocument();
        expect(screen.getByText('Edit Junk')).toBeInTheDocument();
        // fields shown
        const inputs = screen.getAllByRole('textbox');
        expect(inputs).toHaveLength(3);
        expect(inputs[0]).toHaveProperty("name", "nick");
        expect(inputs[1]).toHaveProperty("name", "junkname");
        expect(inputs[2]).toHaveProperty("name", "link");
        expect(inputs[0]).toHaveValue("Testy");
        expect(inputs[1]).toHaveValue("Testershire McTesterson");
        expect(inputs[2]).toHaveValue("https://www.irgendeine.url/zumtesten");

        const selects = screen.getAllByRole('combobox');
        expect(selects).toHaveLength(3);
        expect(selects[0]).toHaveProperty("name", "station");
        expect(selects[1]).toHaveProperty("name", "day");
        expect(selects[2]).toHaveProperty("name", "category");
        expect(selects[0]).toHaveValue("ard");
        expect(selects[1]).toHaveValue("mi");
        expect(selects[2]).toHaveValue("tv");

        expect(screen.getAllByRole('option')).toHaveLength(21);

        const junktime = screen.getByDisplayValue('14:45');
        expect(junktime).toBeInTheDocument();

        const season = screen.getByRole('spinbutton');
        expect(season).toHaveProperty("name", "season");
        expect(season).toHaveValue(3);

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
        await userEvent.type(inputs[0], " - edited");
        await userEvent.type(inputs[1], " - edited");
        await userEvent.type(inputs[2], "/edited");

        await userEvent.selectOptions(selects[0], "zdf");
        await userEvent.selectOptions(selects[1], "di");
        await userEvent.selectOptions(selects[2], "podcast");

        await userEvent.clear(junktime);
        await userEvent.type(junktime, "08:15");
        fireEvent.change(season, {target: {value: '2'}});

        expect(inputs[0]).toHaveValue("Testy - edited");
        expect(inputs[1]).toHaveValue("Testershire McTesterson - edited");
        expect(inputs[2]).toHaveValue("https://www.irgendeine.url/zumtesten/edited");
        expect(selects[0]).toHaveValue("zdf");
        expect(selects[1]).toHaveValue("di");
        expect(selects[2]).toHaveValue("podcast");
        expect(junktime).toHaveValue("08:15");
        expect(season).toHaveValue(2);

        // submit
        await userEvent.click(buttons[1]);
        // changed values saved, season raised, seen.length+1, onAir
        expect(changeProgram).toHaveBeenCalledTimes(1);
        const testJunk2 = {
            ...testJunk,
            nick: "Testy - edited",
            junkname: "Testershire McTesterson - edited",
            link: "https://www.irgendeine.url/zumtesten/edited",
            station: "zdf",
            category: "podcast",
            day: "di",
            time: "08:15",
            season: "2",
        }
        expect(changeProgram).toHaveBeenCalledWith(testJunk2);
        // close modal
        expect(cancelModal).toHaveBeenCalledTimes(1);
    })

    it('happypath no nick', async () => {
        const cancelModalNoNick = vi.fn();

        render(
            <JunkContextProvider value={{
                junk: testJunkNoNick,
                setJunk: () => {
                }, removeJunk: () => {
                }
            }}>
                <EditJunkCardForm showEditProgram={true} toggleEditProgram={cancelModalNoNick}/>
            </JunkContextProvider>
        );

        // modal shown
        expect(screen.getByRole('dialog')).toBeInTheDocument();
        expect(screen.getByText('Edit Junk')).toBeInTheDocument();
        // fields shown
        const inputs = screen.getAllByRole('textbox');
        expect(inputs).toHaveLength(3);
        expect(inputs[0]).toHaveProperty("name", "nick");
        expect(inputs[1]).toHaveProperty("name", "junkname");
        expect(inputs[2]).toHaveProperty("name", "link");
        expect(inputs[0]).toHaveValue("");
        expect(inputs[1]).toHaveValue("Testershire McTesterson");
        expect(inputs[2]).toHaveValue("https://www.irgendeine.url/zumtesten");

        const selects = screen.getAllByRole('combobox');
        expect(selects).toHaveLength(3);
        expect(selects[0]).toHaveProperty("name", "station");
        expect(selects[1]).toHaveProperty("name", "day");
        expect(selects[2]).toHaveProperty("name", "category");
        expect(selects[0]).toHaveValue("ard");
        expect(selects[1]).toHaveValue("mi");
        expect(selects[2]).toHaveValue("tv");

        expect(screen.getAllByRole('option')).toHaveLength(21);

        const junktime = screen.getByDisplayValue('14:45');
        expect(junktime).toBeInTheDocument();

        const season = screen.getByRole('spinbutton');
        expect(season).toHaveProperty("name", "season");
        expect(season).toHaveValue(3);

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
        await userEvent.type(inputs[1], " - edited");
        await userEvent.type(inputs[2], "/edited");

        await userEvent.selectOptions(selects[0], "zdf");
        await userEvent.selectOptions(selects[1], "di");
        await userEvent.selectOptions(selects[2], "podcast");

        await userEvent.clear(junktime);
        await userEvent.type(junktime, "08:15");
        fireEvent.change(season, {target: {value: '2'}});

        expect(inputs[1]).toHaveValue("Testershire McTesterson - edited");
        expect(inputs[2]).toHaveValue("https://www.irgendeine.url/zumtesten/edited");
        expect(selects[0]).toHaveValue("zdf");
        expect(selects[1]).toHaveValue("di");
        expect(selects[2]).toHaveValue("podcast");
        expect(junktime).toHaveValue("08:15");
        expect(season).toHaveValue(2);

        // submit
        await userEvent.click(buttons[1]);
        // changed values saved, season raised, seen.length+1, onAir
        expect(changeProgram).toHaveBeenCalledTimes(1);
        const testJunk2 = {
            ...testJunkNoNick,
            nick: null,
            junkname: "Testershire McTesterson - edited",
            link: "https://www.irgendeine.url/zumtesten/edited",
            station: "zdf",
            category: "podcast",
            day: "di",
            time: "08:15",
            season: "2",
        }
        expect(changeProgram).toHaveBeenCalledWith(testJunk2);
        // close modal
        expect(cancelModalNoNick).toHaveBeenCalledTimes(1);
    })
})