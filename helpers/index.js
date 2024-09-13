


function getTime(date) {
    const now = new Date();
    const postDate = new Date(date);
    let nowHours = now.getHours();
    let dateHours = postDate.getHours();
    let nowMinute = now.getMinutes();
    let dateMinute = postDate.getMinutes();

    let hours = nowHours - dateHours;
    let minutes = nowMinute - dateMinute;


    if (minutes < 0) {
        hours--;
        minutes += 60;
    }

    if (hours >= 1) {
        return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    } else {
        return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
    }
}
module.exports = getTime