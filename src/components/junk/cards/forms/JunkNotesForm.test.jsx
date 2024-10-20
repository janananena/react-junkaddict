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
    "day": ["mi"],
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

describe('JunkNotesForm', () => {

    afterEach(() => {
        vi.restoreAllMocks()
    })

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
        const checkboxes = screen.getAllByRole('checkbox');
        expect(checkboxes).toHaveLength(2);
        expect(checkboxes[0]).toBeChecked();
        expect(checkboxes[1]).not.toBeChecked();
        const listItems = screen.getAllByRole('textbox');
        expect(listItems).toHaveLength(2);
        expect(listItems[0]).toHaveValue("test note 1");
        expect(listItems[1]).toHaveValue("test note 2");
        const editNotesButton = screen.getByRole("button");
        expect(editNotesButton).toHaveTextContent("Edit notes");

        // click edit notes
        await userEvent.click(editNotesButton);

        // notes displayed
        const editCheckboxes = screen.getAllByRole('checkbox');
        expect(editCheckboxes[0]).toBeInTheDocument();
        expect(editCheckboxes[1]).toBeInTheDocument();
        const editListItems = screen.getAllByRole('textbox');
        expect(editListItems[0]).toBeInTheDocument();
        expect(editListItems[1]).toBeInTheDocument();
        expect(editCheckboxes[0]).toBeChecked();
        expect(editCheckboxes[1]).not.toBeChecked();
        expect(listItems[0]).toHaveValue("test note 1");
        expect(listItems[1]).toHaveValue("test note 2");

        // buttons
        const editButtons = screen.getAllByRole("button");
        expect(editButtons).toHaveLength(4);
        expect(editButtons[0]).toHaveProperty("name", "form-delete-0");
        expect(editButtons[1]).toHaveProperty("name", "form-delete-1");
        expect(editButtons[2]).toHaveProperty("name", "addNoteButton");
        expect(editButtons[3]).toHaveProperty("name", "submitNotesButton");

        //notes editable
        await userEvent.type(editListItems[1], " - edited");
        expect(editListItems[1]).toHaveValue("test note 2 - edited");

        //notes deletable
        expect(editListItems).toHaveLength(2);
        await userEvent.click(editButtons[1]);
        const newEditListItems = screen.getAllByRole('textbox');
        expect(newEditListItems).toHaveLength(1);
        expect(newEditListItems[0]).toHaveValue("test note 1");

        //notes addable
        await userEvent.click(editButtons[2]);
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
        await userEvent.click(editButtons[3]);
        // notes correct
        const finalListItems = screen.getAllByRole('textbox');
        expect(finalListItems[0]).toHaveValue("test note 1");
        expect(finalListItems[1]).toHaveValue("a new note");
        // !edit
        const finalButton = screen.getByRole('button');
        expect(finalButton).toHaveTextContent("Edit notes");
    })
})