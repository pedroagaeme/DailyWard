import { Dimensions, FlatList, View, Text, StyleSheet, ViewToken } from "react-native";
import { DateItem, DateItemButton } from "./DateItem";
import { useState, useEffect, useRef} from "react";
import { DateTime } from "luxon";
import { toSegmentedDate } from "@/constants/SegmentedDate";
import { Colors } from "@/constants/Colors";

interface CustomDatePickerProps {
    chosenDate:DateItem | undefined, 
    setChosenDate:React.Dispatch<React.SetStateAction<DateItem | undefined>>
}

export function CustomDatePicker({chosenDate, setChosenDate}:CustomDatePickerProps) {
    const windowDimensions = Dimensions.get("window");
    const [dayItemWidth, setDayItemWidth] = useState<number>(0);
    const [items, setItems] = useState<DateItem[]>([])
    const dateFlatListRef= useRef<FlatList<DateItem>>(null);

    useEffect(() => {
        setDayItemWidth(windowDimensions.width / 5);
        const startDate = DateTime.fromISO("2022-01-01").startOf("day");
        const currentDate = DateTime.now().startOf("day");
        const endDate = currentDate;
        const daysCount = endDate.diff(startDate, "days").days;

        const validDates: DateItem[] = Array.from({ length: Math.ceil(daysCount) + 1 }, (_, i) => {
            const date = endDate.minus({ days: i });
            return {
                date,
                ...toSegmentedDate(date)
            };
        });
        
        setItems(validDates);

        setChosenDate({date:currentDate, ...toSegmentedDate(currentDate)});
    }, []);

    const renderDateItem = ({item, index}:{item:DateItem, index:number}) => (
        <DateItemButton 
            item={item} 
            index={index} 
            width={dayItemWidth} 
            isSelected={chosenDate ? item.date.equals(chosenDate.date) : false}
            flatListRef={dateFlatListRef}
        />
    );

    const onViewableItensChange = (
        { viewableItems, changed }: {
            viewableItems:ViewToken<DateItem>[], 
            changed:ViewToken<DateItem>[]
        }) => {
            if(viewableItems[2] && viewableItems.length >= 5) {
                setChosenDate(viewableItems[2].item)
            }
            else if (viewableItems[1] && viewableItems.length >= 4) {
                setChosenDate(viewableItems[1].item)
            }
            else if (viewableItems[0]){
                setChosenDate(viewableItems[0].item)
            }
        }
    return (
        <View style={styles.wrapper}>
            <FlatList
                ref={dateFlatListRef}
                horizontal={true}
                inverted={true}
                snapToInterval={dayItemWidth}
                decelerationRate="fast"
                extraData={{dayItemWidth, chosenDate}}
                data={items}
                renderItem={renderDateItem}
                keyExtractor={(item) => item.date.toString()}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{paddingHorizontal:dayItemWidth * 2}}
                onViewableItemsChanged={onViewableItensChange}
                overScrollMode="never"
            />
        </View>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        paddingBottom:8,
        borderBottomWidth:1.5,
        borderColor: Colors.light.background[90],
    },
    text: {
        fontFamily: 'Inter_500Medium',
        fontSize: 16,
        color: Colors.light.text[30],
    },
})