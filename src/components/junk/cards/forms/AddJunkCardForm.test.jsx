import {render, screen} from "@testing-library/react";
import AddJunkCardForm from "./AddJunkCardForm";
import {addProgram} from "../../../../services/DevDataApiHandlers";
import {userEvent} from "@testing-library/user-event";

describe('AddJunkCardForm', () => {

    afterEach(() => {
        vi.restoreAllMocks()
    })

    it('no modal if show false', () => {
        render(
            <AddJunkCardForm showAddForm={false} toggleAddForm={() => {
            }} addNewProgram={() => {
            }}/>
        );

        expect(screen.queryAllByRole("dialog")).toHaveLength(0);
    })

    it('modal if show true, happypath', async () => {

        const toggleShow = vi.fn();
        const addNewProgram = vi.fn();

        vi.mock("../../../../services/DevDataApiHandlers", () => {
            const addProgram = vi.fn();
            addProgram.mockImplementation((junk) => {
                return Promise.resolve(junk);
            });
            return {
                addProgram: addProgram
            };
        });

        render(
            <AddJunkCardForm showAddForm={true} toggleAddForm={toggleShow} addNewProgram={addNewProgram}/>
        );

        // modal shown
        expect(screen.getByRole("dialog")).toBeInTheDocument();
        expect(screen.getByText("Add New Junk")).toBeInTheDocument();

        // buttons
        const buttons = screen.getAllByRole('button');
        expect(buttons).toHaveLength(3);
        expect(buttons[1]).toHaveProperty("name", "cancelbutton");
        expect(buttons[2]).toHaveProperty("name", "addbutton");

        // fields shown
        const inputs = screen.getAllByRole('textbox');
        expect(inputs).toHaveLength(3);
        expect(inputs[0]).toHaveProperty("name", "nick");
        expect(inputs[1]).toHaveProperty("name", "junkname");
        expect(inputs[2]).toHaveProperty("name", "link");
        expect(inputs[0]).toHaveValue("");
        expect(inputs[1]).toHaveValue("");
        expect(inputs[2]).toHaveValue("");

        const selects = screen.getAllByRole('combobox');
        expect(selects).toHaveLength(3);
        expect(selects[0]).toHaveProperty("name", "station");
        expect(selects[1]).toHaveProperty("name", "day");
        expect(selects[2]).toHaveProperty("name", "category");
        expect(selects[0]).toHaveValue("rtl");
        expect(selects[1]).toHaveValue("mo");
        expect(selects[2]).toHaveValue("tv");

        const junktime = screen.getByDisplayValue('20:15');
        expect(junktime).toBeInTheDocument();

        expect(screen.getAllByRole('option')).toHaveLength(21);

        // change values
        await userEvent.type(inputs[0], "testnick");
        await userEvent.type(inputs[1], "testname");
        await userEvent.type(inputs[2], "https://test.link");

        await userEvent.selectOptions(selects[0], "zdf");
        await userEvent.selectOptions(selects[1], "di");
        await userEvent.selectOptions(selects[2], "podcast");

        await userEvent.clear(junktime);
        await userEvent.type(junktime, "14:45");

        //submit
        await userEvent.click(buttons[2]);
        const testJunk = {
            nick: "testnick",
            junkname: "testname",
            link: "https://test.link",
            station: "zdf",
            category: "podcast",
            day: "di",
            time: "14:45",
            season: "",
            currentSeason: true,
            seen: [],
            links: [],
            notes: []
        }

        expect(addProgram).toHaveBeenCalledTimes(1);
        expect(addProgram).toHaveBeenCalledWith(testJunk);
        expect(toggleShow).toHaveBeenCalledTimes(1);
    })
})