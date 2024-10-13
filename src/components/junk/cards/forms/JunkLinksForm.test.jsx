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
    "links": ["https://www.test.link/1", "https://www.test.link/2"],
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
        const linkbuttons = screen.getAllByRole("button");
        expect(linkbuttons).toHaveLength(3);
        expect(linkbuttons[0]).toHaveTextContent("https://www.test.link/1");
        expect(linkbuttons[1]).toHaveTextContent("https://www.test.link/2");
        expect(linkbuttons[2]).toHaveTextContent("Edit links");

        // click edit links
        await userEvent.click(linkbuttons[2]);

        // links displayed
        let text1 = (screen.getAllByRole("textbox"))[0];
        let text2 = (screen.getAllByRole("textbox"))[1];
        expect(text1).toHaveValue("https://www.test.link/1");
        expect(text2).toHaveValue("https://www.test.link/2");
        expect(text1).toHaveClass("form-control");
        expect(text2).toHaveClass("form-control");

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
        await userEvent.type(text2, "/edited");
        expect(text2).toHaveValue("https://www.test.link/2/edited");

        //links openable
        expect(buttons[0]).toHaveProperty("href", "https://www.test.link/1");
        expect(buttons[2]).toHaveProperty("href", "https://www.test.link/2/edited");
        // window.open is not implemented in vitest

        //links deletable
        expect(screen.getAllByRole("textbox")).toHaveLength(2);
        await userEvent.click(buttons[3]);
        let texts = screen.getAllByRole("textbox");
        expect(texts).toHaveLength(1);
        expect(texts[0]).toHaveValue("https://www.test.link/1");

        //links addable
        expect(screen.getAllByRole("textbox")).toHaveLength(1);
        // click add
        await userEvent.click(buttons[4]);
        let newTexts = screen.getAllByRole("textbox");
        // new empty row
        expect(newTexts).toHaveLength(2);
        expect(newTexts[1]).toHaveValue("");
        // add new value
        await userEvent.type(newTexts[1], "https://www.test.link/new");
        expect(newTexts[1]).toHaveValue("https://www.test.link/new");

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
        // links correct
        // !edit
        const newbuttons = screen.getAllByRole("button");
        expect(newbuttons).toHaveLength(3);
        expect(newbuttons[0]).toHaveTextContent("https://www.test.link/1");
        expect(newbuttons[1]).toHaveTextContent("https://www.test.link/new");
        expect(newbuttons[2]).toHaveTextContent("Edit links");
    })
})