import {render, screen} from "@testing-library/react";
import App from "./App";
import {getPrograms} from "./services/DevDataApiHandlers";

describe('App', () => {
    it('app renders navigation and table', () => {
        vi.mock("./services/DevDataApiHandlers", () => {
            const getPrograms = vi.fn();
            getPrograms.mockImplementation(() => {
                return Promise.resolve([]);
            });
            return {
                getPrograms: getPrograms
            };
        });

        render(<App/>);
        expect(getPrograms).toHaveBeenCalledTimes(1);
        //Navbar
        expect(screen.getByRole('navigation')).toBeInTheDocument();
        //Table
        expect(screen.getByText('MO')).toBeInTheDocument();
        // Addbutton
        expect(screen.getByText('Add')).toBeInTheDocument();

    })
})