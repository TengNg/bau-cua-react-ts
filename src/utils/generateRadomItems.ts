export default function generateRandomItems(data: any): any[] {
    const randomItems = []
    for (let i = 0; i < 3; i++) {
        randomItems.push(data[Math.floor(Math.random() * 6)]);
    }
    return randomItems
}
