import {render, screen} from "@testing-library/react";
import JunkTablePage from "./JunkTablePage";
import {getPrograms} from "../services/DevDataApiHandlers";

describe('JunkTablePage', () => {

    it('renders navigation and table', async () => {

        vi.mock("../services/DevDataApiHandlers", async () => {
            const getPrograms = vi.fn().mockImplementation(async () => {
                return Promise.resolve([]);
            });
            return {
                getPrograms: getPrograms,
            };
        });

        render(<JunkTablePage/>);

        expect(getPrograms).toHaveBeenCalledTimes(1);
        //Navbar
        expect(screen.getByRole('navigation')).toBeInTheDocument();
        //Table
        expect(screen.getByText('MO')).toBeInTheDocument();
    })
})