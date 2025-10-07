import { StyleSheet, View, Text, Pressable, FlatList } from "react-native";
import { SegmentedDate, toSegmentedDate } from "@/constants/SegmentedDate";
import { DateTime } from "luxon";
import { Colors } from "@/constants/Colors";

export interface DateItem extends SegmentedDate {
    date: DateTime;
}

interface DateItemButtonProps {
    item: DateItem, 
    index: number,
    width: number, 
    isSelected: boolean,
    isInaccessible?: boolean,
    flatListRef: React.RefObject<FlatList<DateItem> | null>
}

export function DateItemButton({item, index, width, isSelected, isInaccessible, flatListRef}: DateItemButtonProps) {
    const handlePress = () => {
        if(flatListRef) {
            flatListRef.current?.scrollToIndex({index, animated: true, viewPosition:0.5})
        }
    };
    return (
        <Pressable
            style={[styles.container, {width}, isInaccessible && styles.inaccessibleContainer]}
            onPress={handlePress}
            disabled={isInaccessible}
        >
            <View style={[isSelected ? styles.button : styles.inactiveButton, isInaccessible && styles.inaccessibleButton]}>
                <Text style={[styles.dayNumberText, {color: isSelected ? Colors.light.background[100] : Colors.light.text[30]}, isInaccessible && styles.inaccessibleText]}>{item.day}</Text>
                <Text style={[styles.weekdayText, {color: isSelected ? Colors.light.background[100] : Colors.light.text[30]}, isInaccessible && styles.inaccessibleText]}>{item.weekday}</Text>
            </View>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    container: {
        aspectRatio:0.9,
        justifyContent:'center',
    },
    button: {
        justifyContent:'center',
        backgroundColor: Colors.light.primary,
        alignItems: 'center',
        paddingVertical: 16,
        marginHorizontal: 4,
        borderRadius: 10,
        gap:4,
    },
    inactiveButton: {
        justifyContent:'center',
        alignItems: 'center',
        paddingHorizontal: 12,
        paddingVertical: 16,
        gap:4,
    },
    inaccessibleContainer: {
        opacity: 0.4,
    },
    inaccessibleButton: {
    },
    dayNumberText: {
        fontFamily: 'Inter_700Bold',
        fontSize: 16,
        lineHeight: 20,
        fontWeight: 'bold',
    },
    weekdayText: {
        fontFamily: 'Inter_600SemiBold',
        fontSize: 12,
        lineHeight: 16,
        opacity:0.8,
    },
    inaccessibleText: {
        color: Colors.light.text[30],
    },
});