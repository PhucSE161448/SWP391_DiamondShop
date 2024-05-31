export const SummerCollectionData = [
    {
        id: "1",
        name: 'DIAMOND',
        img: 'src/assets/img/diamondProduct1.jpg'
    },
    {
        id: "2",
        name: 'DIAMOND',
        img: 'src/assets/img/diamondProduct2.jpg'
    },
    {
        id: "3",
        name: 'DIAMOND',
        img: 'src/assets/img/diamondProduct3.jpg'
    },
    {
        id: "4",
        name: 'DIAMOND',
        img: 'src/assets/img/diamondProduct4.jpg'
    },
    {
        id: "5",
        name: 'DIAMOND',
        img: 'src/assets/img/diamondProduct5.jpg'
    },
    {
        id: "6",
        name: 'DIAMOND',
        img: 'src/assets/img/diamondProduct6.jpg'
    },
    {
        id: "7",
        name: 'DIAMOND',
        img: 'src/assets/img/diamondProduct7.jpg'
    },
    {
        id: "8",
        name: 'DIAMOND',
        img: 'src/assets/img/diamondProduct8.jpg'
    },
    {
        id: "9",
        name: 'DIAMOND',
        img: 'src/assets/img/diamondProduct9.jpg'
    },
    {
        id: "10",
        name: 'DIAMOND',
        img: 'src/assets/img/diamondProduct10.jpg'
    },
    {
        id: "11",
        name: 'DIAMOND',
        img: 'src/assets/img/diamondProduct11.jpg'
    },
    {
        id: "12",
        name: 'DIAMOND',
        img: 'src/assets/img/diamondProduct12.jpg'
    },
];
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

shuffleArray(SummerCollectionData);