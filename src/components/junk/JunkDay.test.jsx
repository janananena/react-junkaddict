import {render, screen} from "@testing-library/react";
import JunkDay from "./JunkDay";

const testJunk1 = {
    "id": "test-id-day-1",
    "junkname": "Testname 1",
    "nick": "Testy later",
    "station": "ard",
    "link": "https://www.irgendeine.url/zumtesten",
    "day": ["mi"],
    "time": "20:45",
    "category": "tv",
    "currentSeason": false,
    "season": "3",
    "seen": [],
    "links": [],
    "notes": []
}
const testJunk2 = {
    "id": "test-id-day-2",
    "junkname": "Testname 2",
    "nick": "Testy earlier",
    "station": "ard",
    "link": "https://www.irgendeine.url/zumtesten",
    "day": ["mi"],
    "time": "12:15",
    "category": "tv",
    "currentSeason": false,
    "season": "3",
    "seen": [],
    "links": [],
    "notes": []
}
const testJunk3 = {
    "id": "test-id-day-3",
    "junkname": "Testname 3",
    "nick": "Testy also earlier",
    "station": "ard",
    "link": "https://www.irgendeine.url/zumtesten",
    "day": ["mi"],
    "time": "12:15",
    "category": "tv",
    "currentSeason": false,
    "season": "3",
    "seen": [],
    "links": [],
    "notes": []
}

describe('JunkDay', ()=> {

    it('shows cards in ordner of time when sorted', async () => {
        render(<JunkDay programs={[testJunk2,testJunk1]} setProgram={()=>{}} removeProgram={()=>{}}/>);

        const card1 = screen.getByText('Testy earlier');
        const card2 = screen.getByText('Testy later');
        expect(card1.compareDocumentPosition(card2)).toBe(Node.DOCUMENT_POSITION_FOLLOWING);
    })

    it('shows cards in ordner of time when not sorted', async () => {
        render(<JunkDay programs={[testJunk1,testJunk2]} setProgram={()=>{}} removeProgram={()=>{}}/>);

        const card1 = screen.getByText('Testy earlier');
        const card2 = screen.getByText('Testy later');
        expect(card1.compareDocumentPosition(card2)).toBe(Node.DOCUMENT_POSITION_FOLLOWING);
    })

    it('shows cards in alphabetical ordner when same time', async () => {
        render(<JunkDay programs={[testJunk2,testJunk3]} setProgram={()=>{}} removeProgram={()=>{}}/>);

        const card1 = screen.getByText('Testy earlier');
        const card2 = screen.getByText('Testy also earlier');
        expect(card1.compareDocumentPosition(card2)).toBe(Node.DOCUMENT_POSITION_FOLLOWING);
    })

    it('same time other way around', async () => {
        render(<JunkDay programs={[testJunk3,testJunk2]} setProgram={()=>{}} removeProgram={()=>{}}/>);

        const card1 = screen.getByText('Testy earlier');
        const card2 = screen.getByText('Testy also earlier');
        expect(card1.compareDocumentPosition(card2)).toBe(Node.DOCUMENT_POSITION_FOLLOWING);
    })

})