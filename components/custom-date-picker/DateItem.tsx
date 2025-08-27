import { StyleSheet, View, Text, Pressable, FlatList } from "react-native";
import { SegmentedDate, toSegmentedDate } from "@/constants/SegmentedDate";
import { DateTime } from "luxon";
import { Colors } from "@/constants/Colors";

export interface DateItem extends SegmentedDate {
    date: DateTime;
}

interface DateItemButtonProps {
    item:DateItem, 
    index:number,
    width:number, 
    isSelected:boolean,
    flatListRef: React.RefObject<FlatList<DateItem> | null>
}

export function DateItemButton({item, index, width, isSelected, flatListRef}:DateItemButtonProps) {

    const handlePress = () => {
        if(flatListRef) {
            flatListRef.current?.scrollToIndex({index, animated: true, viewPosition:0.5})
        }
    };
    
    return (
        <Pressable style={[styles.container,{width}]} onPress={handlePress}>
            <View style={[isSelected ? styles.button : styles.inactiveButton]}>
                <Text style={[styles.dayNumberText, {color: isSelected ? Colors.light.background[100] : Colors.light.text[30]}]}>{item.day}</Text>
                <Text style={[styles.weekdayText, {color: isSelected ? Colors.light.background[100] : Colors.light.text[30]}]}>{item.weekday}</Text>
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
        paddingVertical: 10,
        marginHorizontal:5,
        borderRadius: 10,
        gap:5,
    },
    inactiveButton: {
        justifyContent:'center',
        alignItems: 'center',
        padding: 10,
        gap:5,
    },
    dayNumberText: {
        fontFamily: 'Inter_700Bold',
        fontSize: 16,
        fontWeight: 'bold',
    },
    weekdayText: {
        fontFamily: 'Inter_500Medium',
        fontSize: 12,
        opacity:0.6,
    },
});