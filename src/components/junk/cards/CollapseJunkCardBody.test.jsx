import {render, screen} from "@testing-library/react";
import {JunkContextProvider} from "../../../contexts/ProgramContext";
import {userEvent} from "@testing-library/user-event";
import CollapseJunkCardBody from "./CollapseJunkCardBody";
import {changeProgram} from "../../../services/DevDataApiHandlers";

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
    "notes": ["test note 1", "test note 2"]
}

describe('CollapseJunkCardBody', () => {

    afterEach(() => {
        vi.restoreAllMocks()
    })

    it('shows collapsed content, expands, edit, set off air', async () => {
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
                <CollapseJunkCardBody toggleEditProgram={toggleEdit}/>
            </JunkContextProvider>
        );

        // collapsed
        const buttons = screen.getAllByRole('button');
        expect(buttons[0]).toHaveTextContent('more');
        expect(screen.getByTestId('collapse-content')).not.toHaveClass("collapse show");

        // expand
        await userEvent.click(buttons[0]);

        // expanded
        expect(buttons[0]).toHaveTextContent('less');
        expect(screen.getByTestId('collapse-content')).toHaveClass("collapse show");

        //content
        expect(screen.getByText('Season')).toBeInTheDocument();
        expect(screen.getByText('test note 1')).toBeInTheDocument();
        expect(screen.getByText('test link 1')).toBeInTheDocument();
        expect(screen.getByText('Edit links')).toBeInTheDocument();
        expect(screen.getByText('Edit notes')).toBeInTheDocument();
    })

})