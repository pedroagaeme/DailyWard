import { CalendarSearchIcon } from "@/assets/images/header-icons/date-picker-icons/calendar-search-icon";
import { Colors } from "@/constants/Colors";
import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { toSegmentedDate } from "@/constants/SegmentedDate";
import { GoDateBeforeButton } from "./GoDateBeforeButton";
import { DateTime } from "luxon";
import { GoDateAfterButton } from "./GoDateAfterButton";

export function CustomDatePicker() {
    const diaryCreationDate = DateTime.fromSQL("2025-06-01");
    const currentDate = DateTime.now().startOf('day');
    const [pickedDate, setPickedDate] = useState<DateTime>(currentDate);
    const segmentedPickedDate = toSegmentedDate(pickedDate);

    return (pickedDate &&
        <View style={styles.container}>
            <View style={styles.row}>
                <Text style={styles.text}>{segmentedPickedDate.monthYear}</Text>
                <CalendarSearchIcon/>
            </View>
            <View style={styles.row}>
                <GoDateBeforeButton pickedDate={pickedDate} setPickedDate={setPickedDate} diaryCreationDate={diaryCreationDate}/>
                <View style={styles.dayContainer}>
                    <Text style={styles.dayNumberText}>{segmentedPickedDate.day}</Text>
                    <Text style={styles.text}>{segmentedPickedDate.weekday}</Text>
                </View>
                <GoDateAfterButton pickedDate={pickedDate} setPickedDate={setPickedDate} currentDate={currentDate}/>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingTop:10,
        gap:20,
    },
    row: {
        alignItems:'center',
        justifyContent:'space-between',
        flexDirection:'row',
    },
    text: {
        color: Colors.neutral[100],
        fontFamily:'Inter_500Medium',
        fontSize:16,
    },
    dayContainer: {
        width:'100%',
        alignItems:'center',
    },
    dayNumberText: {
        color: Colors.neutral[100],
        fontFamily:'Inter_700Bold',
        fontSize:32,
    }
});