import {render, screen} from "@testing-library/react";
import {JunkContextProvider} from "../../../../contexts/ProgramContext";
import DeleteJunkCardForm from "./DeleteJunkCardForm";
import {userEvent} from "@testing-library/user-event";
import {deleteProgram} from "../../../../services/DevDataApiHandlers";

const testJunk = {
    "id": "test-id-delete",
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
    "links": ["https://www.test.link/1", "https://www.test.link/2"],
    "notes": []
}

describe('DeleteJunkCardForm', () => {

    afterEach(() => {
        vi.restoreAllMocks()
    })

    it('promts with nick and name, cancel and submit work', async () => {
        render(
            <JunkContextProvider value={{
                junk: testJunk,
                setJunk: () => {
                }, removeJunk: () => {
                }
            }}>
                <DeleteJunkCardForm/>
            </JunkContextProvider>
        );

        // modal closed
        const deleteButton = screen.getByTestId('toggleDeleteJunk');
        expect(deleteButton).toBeInTheDocument();

        // click delete
        await userEvent.click(deleteButton);

        // modal open
        expect(screen.getByRole('dialog')).toBeInTheDocument();
        expect(screen.getByText('Delete Junk?')).toBeInTheDocument();
        expect(screen.getByText('Testy - Testershire McTesterson')).toBeInTheDocument();

        const buttons = screen.getAllByRole('button');
        expect(buttons[1]).toHaveProperty("name", "cancelDelete");
        expect(buttons[2]).toHaveProperty("name", "submitDelete");

        // cancel
        await userEvent.click(buttons[1]);
        expect(screen.queryByRole('dialog')).not.toBeInTheDocument();

        // reopen
        await userEvent.click(deleteButton);
        expect(screen.getByRole('dialog')).toBeInTheDocument();

        // click submit
        vi.mock("../../../../services/DevDataApiHandlers", () => {
            const deleteProgram = vi.fn();
            return {
                deleteProgram: deleteProgram,
            }
        })

        // submit
        await userEvent.click(screen.getByText('delete'));

        expect(deleteProgram).toHaveBeenCalledTimes(1);
        expect(deleteProgram).toHaveBeenCalledWith(testJunk);
        expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    })
})