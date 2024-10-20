import {render, screen} from "@testing-library/react";
import OfflineDay from "./OfflineDay";

const testJunk1 = {
    "id": "test-id-offday-1",
    "junkname": "Testname 1",
    "nick": "Testy always note",
    "station": "ard",
    "link": "https://www.irgendeine.url/zumtesten",
    "day": ["mi"],
    "time": "20:45",
    "category": "tv",
    "currentSeason": false,
    "season": "3",
    "seen": [],
    "links": [],
    "notes": [
        {
            "alwaysShow": true,
            "note": "test note 1"
        }
    ]
}
const testJunk2 = {
    "id": "test-id-offday-2",
    "junkname": "Testname 2",
    "nick": "Testy always link",
    "station": "ard",
    "link": "https://www.irgendeine.url/zumtesten",
    "day": ["mi"],
    "time": "12:15",
    "category": "tv",
    "currentSeason": false,
    "season": "3",
    "seen": [],
    "links": [
        {
            "alwaysShow": true,
            "junklink": "test link 1"
        }
    ],
    "notes": []
}
const testJunk3 = {
    "id": "test-id-offday-3",
    "junkname": "Testname 3",
    "nick": "Testy no always",
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
const testJunk4 = {
    "id": "test-id-offday-4",
    "junkname": "Testname 4",
    "nick": "Testy also no always",
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

describe('OfflineDay', () => {

    it('note before no note', async () => {
        render(<OfflineDay programs={[testJunk3, testJunk1]} setProgram={() => {
        }} removeProgram={() => {
        }}/>);

        const card1 = screen.getByText('Testy always note');
        const card2 = screen.getByText('Testy no always');
        expect(card1.compareDocumentPosition(card2)).toBe(Node.DOCUMENT_POSITION_FOLLOWING);
    })

    it('note before no note ordered', async () => {
        render(<OfflineDay programs={[testJunk1, testJunk3]} setProgram={() => {
        }} removeProgram={() => {
        }}/>);

        const card1 = screen.getByText('Testy always note');
        const card2 = screen.getByText('Testy no always');
        expect(card1.compareDocumentPosition(card2)).toBe(Node.DOCUMENT_POSITION_FOLLOWING);
    })

    it('link before no link', async () => {
        render(<OfflineDay programs={[testJunk3, testJunk2]} setProgram={() => {
        }} removeProgram={() => {
        }}/>);

        const card1 = screen.getByText('Testy always link');
        const card2 = screen.getByText('Testy no always');
        expect(card1.compareDocumentPosition(card2)).toBe(Node.DOCUMENT_POSITION_FOLLOWING);
    })

    it('link before no link ordered', async () => {
        render(<OfflineDay programs={[testJunk2, testJunk3]} setProgram={() => {
        }} removeProgram={() => {
        }}/>);

        const card1 = screen.getByText('Testy always link');
        const card2 = screen.getByText('Testy no always');
        expect(card1.compareDocumentPosition(card2)).toBe(Node.DOCUMENT_POSITION_FOLLOWING);
    })

    it('shows cards in alphabetical ordner when link or note, note first', async () => {
        render(<OfflineDay programs={[testJunk1, testJunk2]} setProgram={() => {
        }} removeProgram={() => {
        }}/>);

        const card1 = screen.getByText('Testy always note');
        const card2 = screen.getByText('Testy always link');
        expect(card1.compareDocumentPosition(card2)).toBe(Node.DOCUMENT_POSITION_FOLLOWING);
    })

    it('shows cards in alphabetical ordner when link or note, link first', async () => {
        render(<OfflineDay programs={[testJunk2, testJunk1]} setProgram={() => {
        }} removeProgram={() => {
        }}/>);

        const card1 = screen.getByText('Testy always link');
        const card2 = screen.getByText('Testy always note');
        expect(card1.compareDocumentPosition(card2)).toBe(Node.DOCUMENT_POSITION_PRECEDING);
    })

    it('shows cards in alphabetical order when no links or notes ordered', async () => {
        render(<OfflineDay programs={[testJunk3, testJunk4]} setProgram={() => {
        }} removeProgram={() => {
        }}/>);

        const card1 = screen.getByText('Testy no always');
        const card2 = screen.getByText('Testy also no always');
        expect(card1.compareDocumentPosition(card2)).toBe(Node.DOCUMENT_POSITION_FOLLOWING);
    })

        it('shows cards in alphabetical order when no links or notes', async () => {
        render(<OfflineDay programs={[testJunk4, testJunk3]} setProgram={() => {
        }} removeProgram={() => {
        }}/>);

        const card1 = screen.getByText('Testy no always');
        const card2 = screen.getByText('Testy also no always');
        expect(card1.compareDocumentPosition(card2)).toBe(Node.DOCUMENT_POSITION_FOLLOWING);
    })
})