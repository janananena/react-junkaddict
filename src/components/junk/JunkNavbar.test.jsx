import {render, screen} from "@testing-library/react";
import JunkNavbar from "./JunkNavbar";
import {userEvent} from "@testing-library/user-event";

describe('JunkNavbar', () => {

    it('nav has brand, excel buttons, filter, lightmode', async () => {
        const setFilter = vi.fn();
        const addNewProgram = vi.fn();
        const setView = vi.fn();

        render(
            <JunkNavbar programs={[]} setPrograms={() => {
            }} searchString={"test"} setSearchString={setFilter} addNewProgram={addNewProgram} setView={setView}/>);

        //show brand
        expect(screen.getByRole('navigation')).toBeInTheDocument();
        expect(screen.getByRole('link')).toHaveProperty("href", "https://github.com/janananena/react-junkaddict");
        expect(screen.getByText('Reality Stundenplan')).toBeInTheDocument();
        const buttons = screen.getAllByRole('button');
        expect(buttons).toHaveLength(7);
        //nav dropdown
        expect(buttons[0]).toBeInTheDocument();
        expect(buttons[0]).toHaveTextContent('Junk Table');
        //add junk
        expect(buttons[1]).toBeInTheDocument();
        expect(buttons[1]).toHaveTextContent('Add new Show');
        //show excel buttons
        expect(buttons[2]).toBeInTheDocument();
        expect(buttons[2]).toHaveTextContent('Download CSV');
        expect(buttons[3]).toBeInTheDocument();
        expect(buttons[3]).toHaveTextContent('Upload CSV');
        expect(buttons[4]).toBeInTheDocument();
        //filters
        expect(buttons[4]).toHaveTextContent('Video');
        expect(buttons[5]).toBeInTheDocument();
        expect(buttons[5]).toHaveTextContent('Podcast');
        //show light mode switch
        expect(buttons[6]).toBeInTheDocument();
        expect(buttons[6]).toHaveProperty("name", 'modeswitch-darkMode');
        //show given search filter
        const searchfilter = screen.getByRole('textbox');
        expect(searchfilter).toHaveProperty("name", "searchFilter");
        expect(searchfilter).toHaveValue("test");

        //open dropdown
        expect(buttons[0]).toHaveAttribute("aria-expanded", "false");
        await userEvent.click(buttons[0]);
        expect(screen.getByText('to Watch List')).toBeInTheDocument();
        expect(buttons[0]).toHaveAttribute("aria-expanded", "true");

        //close dropdown
        await userEvent.click(buttons[0]);
        expect(buttons[0]).toHaveAttribute("aria-expanded", "false");

        //change search filter
        await userEvent.clear(searchfilter);
        expect(setFilter).toBeCalledTimes(1);
        expect(setFilter).toBeCalledWith("");
        await userEvent.type(searchfilter, "jeez");
        expect(setFilter).toBeCalledTimes(5);
        expect(setFilter).toBeCalledWith("jeez");

        //toggle light mode
        await userEvent.click(buttons[6]);
        expect(buttons[6]).toHaveProperty("name", 'modeswitch-lightMode');
        await userEvent.click(buttons[6]);
        expect(buttons[6]).toHaveProperty("name", 'modeswitch-darkMode');

        //addbutton
        expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
        await userEvent.click(buttons[1]);
        expect(screen.getByRole('dialog')).toBeInTheDocument();
    })

})