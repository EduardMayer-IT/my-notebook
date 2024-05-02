export const parseDate = (timestamp) => {
    const date = new Date(timestamp * 1000);

    const formatNumber = (number) => (number < 10 ? "0" + number : number);
    const day = formatNumber(date.getDate());
    const month = formatNumber(date.getMonth() + 1);
    const year = date.getFullYear();
    const hours = formatNumber(date.getHours());
    const minutes = formatNumber(date.getMinutes());

    const formattedDate = `${day}.${month}.${year}`;
    const formattedTime = `${hours}:${minutes}`;

    return `${formattedDate} ${formattedTime}`;
}