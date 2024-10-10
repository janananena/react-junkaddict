import {render, screen} from "@testing-library/react";
import {JunkContextProvider} from "../../../../contexts/ProgramContext";
import JunkNotesForm from "./JunkNotesForm";
import {userEvent} from "@testing-library/user-event";

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
    "notes": ["test note 1", "test note 2"]
}

describe('JunkNotesForm', () => {

    it('renders !edit, edit works', async () => {
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
        expect(screen.getByText("test note 1")).toBeInTheDocument();
        expect(screen.getByText("test note 2")).toBeInTheDocument();
        expect(screen.getByRole("button")).toHaveTextContent(/Edit notes/);

        // click edit notes
        await userEvent.click(screen.getByRole("button"));

        // notes displayed
        let text1 = (screen.getAllByRole("textbox"))[0];
        let text2 = (screen.getAllByRole("textbox"))[1];
        expect(text1).toHaveValue("test note 1");
        expect(text2).toHaveValue("test note 2");
        expect(text1).toHaveClass("form-control");
        expect(text2).toHaveClass("form-control");

        //buttons
        let buttons = screen.getAllByRole("button");
        expect(buttons).toHaveLength(4);
        // delete buttons
        expect(buttons[0]).toHaveProperty("name", "form-delete-0");
        expect(buttons[1]).toHaveProperty("name", "form-delete-1");
        expect(buttons[2]).toHaveProperty("name", "addNoteButton");
        expect(buttons[3]).toHaveProperty("name", "submitNotesButton");

        //notes editable
        await userEvent.type(text2, " - edited");
        expect(text2).toHaveValue("test note 2 - edited");

        //notes deletable
        expect(screen.getAllByRole("textbox")).toHaveLength(2);
        await userEvent.click(buttons[1]);
        let texts = screen.getAllByRole("textbox");
        expect(texts).toHaveLength(1);
        expect(texts[0]).toHaveValue("test note 1");

        //notes addable
        expect(screen.getAllByRole("textbox")).toHaveLength(1);
        // click add
        await userEvent.click(buttons[2]);
        let newTexts = screen.getAllByRole("textbox");
        // new empty row
        expect(newTexts).toHaveLength(2);
        expect(newTexts[1]).toHaveValue("");
        // add new value
        await userEvent.type(newTexts[1], "a new note");
        expect(newTexts[1]).toHaveValue("a new note");

        // click submit
        vi.mock("../../../../services/DevDataApiHandlers", () => {
            const changeProgram = vi.fn();
            changeProgram.mockImplementation((junk) => {
                return Promise.resolve(junk);
            });
            return {
                changeProgram: changeProgram,
            }
        })
        await userEvent.click(buttons[3]);
        // notes correct
        expect(screen.getByText("test note 1")).toBeInTheDocument();
        expect(screen.getByText("a new note")).toBeInTheDocument();
        // !edit
        expect(screen.getByRole("button")).toHaveTextContent(/Edit notes/);
    })
})