
import { formatDate } from "./formatDate";

export const formatRange = (dates: Date[]) => {
    if (dates.length < 3) return "";

    return `${formatDate(dates[0])} - ${formatDate(dates[2])}`;
};