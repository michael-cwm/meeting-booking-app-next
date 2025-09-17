export const getDates = (offset: number, count: number = 3): Date[] => {
    const today = new Date();
    const dates: Date[] = [];

    for (let i = 0; i < count; i++) {
        const date = new Date(today);
        date.setDate(today.getDate() + offset + i);
        dates.push(date);
    }

    return dates;
};
