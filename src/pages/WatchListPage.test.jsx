import {render, screen} from "@testing-library/react";
import {getWatchList} from "../services/DevDataApiHandlers";
import WatchListPage from "./WatchListPage";

describe('WatchListPage', () => {

    it('renders navigation and table', async () => {

        vi.mock("../services/DevDataApiHandlers", async () => {
            const getPrograms = vi.fn().mockImplementation(async () => {
                return Promise.resolve([]);
            });
            const getWatchList = vi.fn().mockImplementation(async () => {
                return Promise.resolve([]);
            });
            return {
                getPrograms: getPrograms,
                getWatchList: getWatchList,
            };
        });

        render(<WatchListPage/>);

        expect(getWatchList).toHaveBeenCalledTimes(1);
        //Navbar
        expect(screen.getByRole('navigation')).toBeInTheDocument();
        //Table
        expect(screen.getByText('Watch Us')).toBeInTheDocument();
    })
})