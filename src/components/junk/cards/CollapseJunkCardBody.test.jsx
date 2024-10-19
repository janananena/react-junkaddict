import {getAllByRole, getByRole, getByText, render, screen} from "@testing-library/react";
import {JunkContextProvider} from "../../../contexts/ProgramContext";
import {userEvent} from "@testing-library/user-event";
import CollapseJunkCardBody from "./CollapseJunkCardBody";

const testJunk = {
    "id": "test-id-collapse",
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

describe('CollapseJunkCardBody', () => {

    afterEach(() => {
        vi.restoreAllMocks()
    })

    it('shows collapsed content, expands, edit, set off air', async () => {

        render(
            <JunkContextProvider value={{
                junk: testJunk,
                setJunk: () => {
                }, removeJunk: () => {
                }
            }}>
                <CollapseJunkCardBody/>
            </JunkContextProvider>
        );

        // always show
        const alwaysShowDiv = screen.getByTestId('collapse-content-always');
        expect(alwaysShowDiv).toHaveClass("collapse show");
        const texts = getAllByRole(alwaysShowDiv, 'textbox');
        expect(texts).toHaveLength(1);
        expect(texts[0]).toHaveValue("test note 1");

        // collapsed
        const buttons = screen.getAllByRole('button');
        expect(buttons[0]).toHaveTextContent('more');
        const collapseContent = screen.getByTestId('collapse-content');
        expect(collapseContent).not.toHaveClass("collapse show");

        // expand
        await userEvent.click(buttons[0]);

        // expanded
        expect(buttons[0]).toHaveTextContent('less');
        expect(collapseContent).toHaveClass("collapse show");

        //content
        expect(getByText(collapseContent, 'Season')).toBeInTheDocument();
        const opentexts = getAllByRole(collapseContent, 'textbox')
        expect(opentexts).toHaveLength(2);
        expect(opentexts[0]).toHaveValue('test note 1');
        expect(opentexts[1]).toHaveValue('test note 2');
        expect(getByText(collapseContent, 'test link 1')).toBeInTheDocument();
        expect(getByText(collapseContent, 'Edit links')).toBeInTheDocument();
        expect(getByText(collapseContent, 'Edit notes')).toBeInTheDocument();
    })

})