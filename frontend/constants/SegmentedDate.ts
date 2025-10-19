import { DateTime } from "luxon";
import { SegmentedDate } from "@/types";

function captitalizeFirstLetter(s:string) {
    return s.charAt(0).toUpperCase() + s.slice(1);
}

export function toSegmentedDate(time:DateTime) {
    const day = time.toFormat('d');
    const month = time.toLocaleString({month: 'long'});
    const year = time.toFormat('yyyy');
    const monthYear = captitalizeFirstLetter(month) + ', ' + year;
    const weekday = time.weekdayShort?.slice(0, 3)?.toUpperCase() || null;
    return ({monthYear, day, weekday});
}