import {render, screen} from "@testing-library/react";
import {JunkContextProvider} from "../../../../contexts/ProgramContext";
import JunkLinksForm from "./JunkLinksForm";
import {userEvent} from "@testing-library/user-event";

const testJunk = {
    "id": "test-id-links",
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
    "links": [
        {
            "alwaysShow": true,
            "junklink": "https://www.test.link/1"
        },
        {
            "alwaysShow": false,
            "junklink": "https://www.test.link/2"
        }
    ],
    "notes": []
}

describe('JunkLinksForm', () => {

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
                <JunkLinksForm/>
            </JunkContextProvider>
        );
        const checkboxes = screen.getAllByRole('checkbox');
        expect(checkboxes).toHaveLength(2);
        expect(checkboxes[0]).toBeChecked();
        expect(checkboxes[1]).not.toBeChecked();

        const linkbuttons = screen.getAllByRole("button");
        expect(linkbuttons).toHaveLength(3);
        expect(linkbuttons[0]).toHaveTextContent("https://www.test.link/1");
        expect(linkbuttons[1]).toHaveTextContent("https://www.test.link/2");
        expect(linkbuttons[2]).toHaveTextContent("Edit links");

        // click edit links
        await userEvent.click(linkbuttons[2]);

        // always show
        const editCheckboxes = screen.getAllByRole('checkbox');
        expect(editCheckboxes[0]).toBeChecked();
        expect(editCheckboxes[1]).not.toBeChecked();
        // links displayed
        const editLinks = screen.getAllByRole("textbox");
        expect(editLinks[0]).toHaveValue("https://www.test.link/1");
        expect(editLinks[1]).toHaveValue("https://www.test.link/2");
        expect(editLinks[0]).toHaveClass("form-control");
        expect(editLinks[1]).toHaveClass("form-control");

        //buttons
        let buttons = screen.getAllByRole("button");
        expect(buttons).toHaveLength(6);
        // show, delete buttons
        expect(buttons[0]).toHaveProperty("name", "form-button-0");
        expect(buttons[1]).toHaveProperty("name", "form-delete-0");
        expect(buttons[2]).toHaveProperty("name", "form-button-1");
        expect(buttons[3]).toHaveProperty("name", "form-delete-1");
        expect(buttons[4]).toHaveProperty("name", "addLinkButton");
        expect(buttons[5]).toHaveProperty("name", "submitLinksButton");

        //links editable
        await userEvent.type(editLinks[1], "/edited");
        expect(editLinks[1]).toHaveValue("https://www.test.link/2/edited");

        //links openable
        expect(buttons[0]).toHaveProperty("href", "https://www.test.link/1");
        expect(buttons[2]).toHaveProperty("href", "https://www.test.link/2/edited");
        // window.open is not implemented in vitest

        //links deletable
        expect(editLinks).toHaveLength(2);
        await userEvent.click(buttons[3]);
        let texts = screen.getAllByRole('textbox');
        expect(texts).toHaveLength(1);
        expect(texts[0]).toHaveValue("https://www.test.link/1");

        //links addable
        expect(texts).toHaveLength(1);
        // click add
        await userEvent.click(buttons[4]);
        let newTexts = screen.getAllByRole('textbox');
        // new empty row
        expect(newTexts).toHaveLength(2);
        expect(newTexts[1]).toHaveValue("")
        const newTextCheckbox = screen.getAllByRole('checkbox');
        expect(newTextCheckbox).toHaveLength(2);
        expect(newTextCheckbox[1]).not.toBeChecked();
        // add new value
        await userEvent.type(newTexts[1], "https://www.test.link/new");
        expect(newTexts[1]).toHaveValue("https://www.test.link/new");
        await userEvent.click(newTextCheckbox[1]);
        expect(newTextCheckbox[1]).toBeChecked();

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
        await userEvent.click(buttons[5]);
        // !edit
        const newCheckbox = screen.getAllByRole('checkbox');
        expect(newCheckbox).toHaveLength(2);
        expect(newCheckbox[0]).toBeChecked();
        expect(newCheckbox[1]).toBeChecked();
        const newbuttons = screen.getAllByRole("button");
        expect(newbuttons).toHaveLength(3);
        expect(newbuttons[0]).toHaveTextContent("https://www.test.link/1");
        expect(newbuttons[1]).toHaveTextContent("https://www.test.link/new");
        expect(newbuttons[2]).toHaveTextContent("Edit links");
    })
})