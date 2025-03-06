const mockFlats = [
    {
        id: "1",
        name: "Wohnung 1",
        floor: "1",
        numberOfRooms: 3,
        certainRooms: { bathroom: 1, toilets: 1, kitchen: 1, bedroom: 2, balconies: 1 },
        rentable: true
    },
    {
        id: "2",
        name: "Wohnung 2",
        floor: "2",
        numberOfRooms: 4,
        certainRooms: { bathroom: 1, toilets: 2, kitchen: 1, bedroom: 3, balconies: 2 },
        rentable: false
    }
];

module.exports = mockFlats;
