
export const formatDate = (date: Date): string => {
    const options: Intl.DateTimeFormatOptions = {
        day: "2-digit",
        month: "short",
    };

    const formatted = date.toLocaleDateString("sv-SE", options);

    return formatted.replace(".", "");
};
