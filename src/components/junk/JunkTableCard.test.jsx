import {render, screen} from "@testing-library/react";
import JunkTableCard from "./JunkTableCard";
import {userEvent} from "@testing-library/user-event";

const testJunk1 = {
    "id": "test-id-table-1",
    "junkname": "Testname 1",
    "nick": "Testy tuesday",
    "station": "ard",
    "link": "https://www.irgendeine.url/zumtesten",
    "day": "di",
    "time": "20:45",
    "category": "tv",
    "currentSeason": true,
    "season": "1",
    "seen": [false],
    "links": [],
    "notes": []
}
const testJunk2 = {
    "id": "test-id-table-2",
    "junkname": "Testname 2",
    "nick": "Testy friday",
    "station": "ard",
    "link": "https://www.irgendeine.url/zumtesten",
    "day": "fr",
    "time": "12:15",
    "category": "tv",
    "currentSeason": true,
    "season": "1",
    "seen": [false],
    "links": [],
    "notes": []
}
const testJunk3 = {
    "id": "test-id-table-3",
    "junkname": "Testname 3",
    "nick": "Testy offline",
    "station": "ard",
    "link": "https://www.irgendeine.url/zumtesten",
    "day": "mi",
    "time": "12:15",
    "category": "tv",
    "currentSeason": false,
    "season": "",
    "seen": [],
    "links": [],
    "notes": []
}

describe('JunkTableCard', ()=> {

    it('shows cards in ordner of time when sorted', async () => {
        const func = vi.fn();
        render(<JunkTableCard displayPrograms={[testJunk1,testJunk2,testJunk3]} addNewProgram={func} changeProgram={func} removeProgram={func}/>);

        expect(screen.getByText('MO')).toBeInTheDocument();
        expect(screen.getByText('DI')).toBeInTheDocument();
        expect(screen.getByText('MI')).toBeInTheDocument();
        expect(screen.getByText('DO')).toBeInTheDocument();
        expect(screen.getByText('FR')).toBeInTheDocument();
        expect(screen.getByText('SA')).toBeInTheDocument();
        expect(screen.getByText('SO')).toBeInTheDocument();
        expect(screen.getByText('Off Air')).toBeInTheDocument();

        const card1 = screen.getByText('Testy tuesday');
        //online
        expect(screen.getByText('Di 20:45 Tv')).toBeInTheDocument();
        const card2 = screen.getByText('Testy friday');
        //online
        expect(screen.getByText('Fr 12:15 Tv')).toBeInTheDocument();
        const card3 = screen.getByText('Testy offline');

        //ordered
        expect(card1.compareDocumentPosition(card2)).toBe(Node.DOCUMENT_POSITION_FOLLOWING);
        expect(card2.compareDocumentPosition(card3)).toBe(Node.DOCUMENT_POSITION_FOLLOWING);
    })

})