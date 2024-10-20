import {render, screen} from "@testing-library/react";
import JunkNavbar from "./JunkNavbar";
import {userEvent} from "@testing-library/user-event";

describe('JunkNavbar', () => {

    it('nav has brand, excel buttons, filter, lightmode', async () => {
        const setFilter = vi.fn();

        render(
            <JunkNavbar programs={[]} setPrograms={() => {
            }} searchString={"test"} setSearchString={setFilter}/>);

        //show brand
        expect(screen.getByRole('navigation')).toBeInTheDocument();
        expect(screen.getByRole('link')).toHaveProperty("href", "https://github.com/janananena/react-junkaddict");
        expect(screen.getByText('Reality Stundenplan')).toBeInTheDocument();
        //show excel buttons
        const buttons = screen.getAllByRole('button');
        expect(buttons).toHaveLength(6);
        expect(buttons[0]).toBeInTheDocument();
        expect(buttons[0]).toHaveTextContent('Add new Show');
        expect(buttons[1]).toBeInTheDocument();
        expect(buttons[1]).toHaveTextContent('Download CSV');
        expect(buttons[2]).toBeInTheDocument();
        expect(buttons[2]).toHaveTextContent('Upload CSV');
        expect(buttons[3]).toBeInTheDocument();
        expect(buttons[3]).toHaveTextContent('Video');
        expect(buttons[4]).toBeInTheDocument();
        expect(buttons[4]).toHaveTextContent('Podcast');
        //show light mode switch
        expect(buttons[5]).toBeInTheDocument();
        expect(buttons[5]).toHaveProperty("name", 'modeswitch-darkMode');
        //show given search filter
        const searchfilter = screen.getByRole('textbox');
        expect(searchfilter).toHaveProperty("name", "searchFilter");
        expect(searchfilter).toHaveValue("test");

        //change search filter
        await userEvent.clear(searchfilter);
        expect(setFilter).toBeCalledTimes(1);
        expect(setFilter).toBeCalledWith("");
        await userEvent.type(searchfilter, "jeez");
        expect(setFilter).toBeCalledTimes(5);
        expect(setFilter).toBeCalledWith("jeez");

        //toggle light mode
        await userEvent.click(buttons[5]);
        expect(buttons[5]).toHaveProperty("name", 'modeswitch-lightMode');
        await userEvent.click(buttons[5]);
        expect(buttons[5]).toHaveProperty("name", 'modeswitch-darkMode');

        //addbutton
        expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
        await userEvent.click(buttons[0]);
        expect(screen.getByRole('dialog')).toBeInTheDocument();
    })

})