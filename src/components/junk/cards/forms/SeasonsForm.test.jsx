import SeasonsForm from "./SeasonsForm";
import {JunkContextProvider} from "../../../../contexts/ProgramContext";
import {fireEvent, render, screen} from "@testing-library/react";
import {userEvent} from "@testing-library/user-event";

const testJunk = {
    "id": "test-id-seasons",
    "junkname": "Testershire McTesterson",
    "nick": "Testy",
    "station": "ard",
    "link": "https://www.irgendeine.url/zumtesten",
    "day": ["mi"],
    "time": "14:15",
    "category": "tv",
    "currentSeason": true,
    "season": "3",
    "seen": [
        false,
        true,
        false
    ],
    "links": [],
    "notes": ["test note 1", "test note 2"]
}

const testJunkNoSeasons = {
    "id": "test-id-seasons-no-seasons",
    "junkname": "Testershire McTesterson",
    "nick": "Testy",
    "station": "ard",
    "link": "https://www.irgendeine.url/zumtesten",
    "day": ["mi"],
    "time": "14:15",
    "category": "tv",
    "currentSeason": true,
    "season": "",
    "seen": [],
    "links": [],
    "notes": ["test note 1", "test note 2"]
}

describe('SeasonsForm', () => {

    afterEach(() => {
        vi.restoreAllMocks()
    })

    it('renders seasons, edit works', async () => {
        render(
            <JunkContextProvider value={{
                junk: testJunk,
                setJunk: () => {
                }, removeJunk: () => {
                }
            }}>
                <SeasonsForm/>
            </JunkContextProvider>
        );
        // seasons displayed
        const seasons = screen.getByRole("spinbutton");
        expect(seasons).toHaveValue(3);
        expect(seasons).toBeDisabled();
        //edit button displayed
        const editbutton = screen.getByRole("button");
        expect(editbutton).toHaveProperty("name", "editSeasonsButton");
        // checkboxes displayed
        const checkboxes = screen.getAllByRole("checkbox");
        expect(checkboxes).toHaveLength(3);
        // correct values
        expect(checkboxes[0]).toHaveProperty("checked", false);
        expect(checkboxes[1]).toHaveProperty("checked", true);
        expect(checkboxes[2]).toHaveProperty("checked", false);
        // disabled
        expect(checkboxes[0]).toBeDisabled();
        expect(checkboxes[1]).toBeDisabled();
        expect(checkboxes[2]).toBeDisabled();

        // click edit
        await userEvent.click(editbutton);
        expect(seasons).not.toBeDisabled();
        expect(checkboxes[0]).not.toBeDisabled();
        expect(checkboxes[1]).not.toBeDisabled();
        expect(checkboxes[2]).not.toBeDisabled();
        expect(editbutton).not.toBeInTheDocument();

        const submitbutton = screen.getByRole("button");
        expect(submitbutton).toHaveProperty("name", "submitSeasonsButton");

        // lower seasons value
        fireEvent.change(seasons, {target: {value: '2'}});
        const editcheckboxes = screen.queryAllByRole("checkbox");
        expect(editcheckboxes).toHaveLength(2);
        // old values
        expect(editcheckboxes[0]).toHaveProperty("checked", false);
        expect(editcheckboxes[1]).toHaveProperty("checked", true);

        // higher seasons value
        fireEvent.change(seasons, {target: {value: '4'}});
        const editcheckboxes2 = screen.queryAllByRole("checkbox");
        expect(editcheckboxes2).toHaveLength(4);
        // old values
        expect(editcheckboxes2[0]).toHaveProperty("checked", false);
        expect(editcheckboxes2[1]).toHaveProperty("checked", true);
        // added false
        expect(editcheckboxes2[2]).toHaveProperty("checked", false);
        expect(editcheckboxes2[3]).toHaveProperty("checked", false);

        // delete seasons
        await userEvent.clear(seasons);
        expect(screen.queryAllByRole("checkbox")).toHaveLength(0);

        // fill seasons
        await userEvent.type(seasons, "2");
        const newCheckboxes = screen.getAllByRole("checkbox");
        expect(newCheckboxes).toHaveLength(2);
        expect(newCheckboxes[0]).toHaveProperty("checked", false);
        expect(newCheckboxes[1]).toHaveProperty("checked", false);

        // click season 1
        await userEvent.click(newCheckboxes[0]);
        expect(newCheckboxes[0]).toHaveProperty("checked", true);

        // submit
        vi.mock("../../../../services/DevDataApiHandlers", () => {
            const changeProgram = vi.fn();
            changeProgram.mockImplementation((junk) => {
                return Promise.resolve(junk);
            });
            return {
                changeProgram: changeProgram,
            }
        })
        await userEvent.click(submitbutton);

        expect(seasons).toBeDisabled();
        expect(newCheckboxes[0]).toBeDisabled();
        expect(newCheckboxes[1]).toBeDisabled();
        expect(submitbutton).not.toBeInTheDocument();
        expect(editbutton).not.toBeInTheDocument();
    })

    it('no seasons, edit works', async () => {
        render(
            <JunkContextProvider value={{
                junk: testJunkNoSeasons,
                setJunk: () => {
                }, removeJunk: () => {
                }
            }}>
                <SeasonsForm/>
            </JunkContextProvider>
        );
        // no seasons displayed
        const seasons = screen.getByRole("spinbutton");
        expect(seasons).toHaveValue(null);
        expect(seasons).toBeDisabled();
        // edit button displayed
        const editbutton = screen.getByRole("button");
        expect(editbutton).toHaveProperty("name", "editSeasonsButton");
        // no checkboxes displayed
        const checkboxes = screen.queryAllByRole("checkbox");
        expect(checkboxes).toHaveLength(0);

        // click edit
        await userEvent.click(editbutton);
        expect(seasons).not.toBeDisabled();
        expect(editbutton).not.toBeInTheDocument();

        const submitbutton = screen.getByRole("button");
        expect(submitbutton).toHaveProperty("name", "submitSeasonsButton");

        // submit
        vi.mock("../../../../services/DevDataApiHandlers", () => {
            const changeProgram = vi.fn();
            changeProgram.mockImplementation((junk) => {
                return Promise.resolve(junk);
            });
            return {
                changeProgram: changeProgram,
            }
        })
        await userEvent.click(submitbutton);

        expect(seasons).toBeDisabled();
        expect(submitbutton).not.toBeInTheDocument();
        expect(editbutton).not.toBeInTheDocument();
    })
})