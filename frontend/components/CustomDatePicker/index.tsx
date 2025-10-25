import { Colors } from "@/constants/Colors";
import { toSegmentedDate } from "@/constants/SegmentedDate";
import { DateTime } from "luxon";
import { useEffect, useRef, useState } from "react";
import { Dimensions, FlatList, StyleSheet, Text, View, ViewToken } from "react-native";
import { DateItem, DateItemButton } from "./components/DateItem";

interface CustomDatePickerProps {
    chosenDate:DateItem | undefined, 
    setChosenDate:React.Dispatch<React.SetStateAction<DateItem>>
    topicCreationDate: DateTime,
}

export function CustomDatePicker({chosenDate, setChosenDate, topicCreationDate}:CustomDatePickerProps) {
    const windowDimensions = Dimensions.get("window");
    const [dayItemWidth, setDayItemWidth] = useState<number>(0);
    const [items, setItems] = useState<DateItem[]>([])
    const dateFlatListRef= useRef<FlatList<DateItem>>(null);

    useEffect(() => {
        setDayItemWidth(windowDimensions.width / 5);
        const startDate = topicCreationDate.startOf("day");
        const currentDate = DateTime.now().startOf("day");
        const endDate = currentDate.plus({ days: 2 });
        const daysCount = endDate.diff(startDate, "days").days;

        const validDates: DateItem[] = Array.from({ length: Math.ceil(daysCount) + 3 }, (_, i) => {
            const date = endDate.minus({ days: i });
            return {
                date,
                ...toSegmentedDate(date)
            };
        });
        
        setItems(validDates);

        setChosenDate({date:currentDate, ...toSegmentedDate(currentDate)});
    }, [topicCreationDate.toISO()]);

    const renderDateItem = ({item, index}:{item:DateItem, index:number}) => (
        <DateItemButton 
            item={item} 
            index={index} 
            width={dayItemWidth} 
            isSelected={chosenDate ? item.date.equals(chosenDate.date) : false}
            isInaccessible={index >= items.length - 2 || index < 2}
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
                onViewableItemsChanged={onViewableItensChange}
                overScrollMode="never"
            />
        </View>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        paddingBottom:12,
    },
    text: {
        fontFamily: 'Inter_500Medium',
        fontSize: 16,
        color: Colors.light.text[30],
    },
})