import {render, screen} from "@testing-library/react";
import App from "./App";
import {getPrograms} from "./services/DevDataApiHandlers";
import {userEvent} from "@testing-library/user-event";

describe('App', () => {
    it('app renders navigation and table', async () => {
        vi.mock("./services/DevDataApiHandlers", () => {
            const getPrograms = vi.fn();
            getPrograms.mockImplementation(() => {
                return Promise.resolve([]);
            });
            const getWatchList = vi.fn();
            getWatchList.mockImplementation(() => {
                return Promise.resolve([]);
            })
            return {
                getPrograms: getPrograms,
                getWatchList: getWatchList
            };
        });

        render(<App/>);
        expect(getPrograms).toHaveBeenCalledTimes(1);
        //Navbar
        expect(screen.getByRole('navigation')).toBeInTheDocument();
        //Table
        expect(screen.getByText('MO')).toBeInTheDocument();

        //switch view
        await userEvent.click(screen.getByText('Junk Table'));
        const toWatches = screen.getByText('to Watch List');
        expect(toWatches).toBeInTheDocument();
        await userEvent.click(toWatches);
        // Watches
        expect(screen.getByText('Watch Us')).toBeInTheDocument();
    })
})