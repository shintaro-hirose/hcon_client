export function getCurrentContestId() {
    const now = new Date().toLocaleString('en-GB',{ timeZone: 'Asia/Tokyo' });
    let year = now.slice(6,10);
    let month = now.slice(3,5);
    let date = now.slice(0,2);
    const contestId = year + month + date;
    return contestId;
}

export function getYesterdayContestId() {
    const nowDate = new Date();
    nowDate.setDate(nowDate.getDate() - 1);
    const now = nowDate.toLocaleString('en-GB',{ timeZone: 'Asia/Tokyo' });
    let year = now.slice(6,10);
    let month = now.slice(3,5);
    let date = now.slice(0,2);
    const contestId = year + month + date;
    return contestId;
}