import { CalendarSearchIcon } from "@/assets/images/header-icons/date-picker-icons/calendar-search-icon";
import { GoDateAfterIcon } from "@/assets/images/header-icons/date-picker-icons/go-date-after-icon";
import { GoDateBeforeIcon } from "@/assets/images/header-icons/date-picker-icons/go-date-before-icon";
import { Colors } from "@/constants/Colors";
import { StyleSheet, Text, View } from "react-native";

export function CustomDatePicker() {
    return (
        <View style={styles.container}>
            <View style={styles.row}>
                <Text style={styles.text}>Janeiro, 2025</Text>
                <CalendarSearchIcon/>
            </View>
            <View style={styles.row}>
                <GoDateBeforeIcon/>
                <View style={styles.dayContainer}>
                    <Text style={styles.dayNumberText}>24</Text>
                    <Text style={styles.text}>QUA</Text>
                </View>
                <GoDateAfterIcon/>
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
        alignItems:'center',
    },
    dayNumberText: {
        color: Colors.neutral[100],
        fontFamily:'Inter_700Bold',
        fontSize:32,
    }
});