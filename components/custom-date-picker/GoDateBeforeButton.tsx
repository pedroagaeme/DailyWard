import { GoDateBeforeIcon } from "@/assets/images/header-icons/date-picker-icons/go-date-before-icon";
import { DateTime } from "luxon";
import { Pressable, StyleSheet } from "react-native";

interface Props {
    pickedDate: DateTime;
    setPickedDate: React.Dispatch<React.SetStateAction<DateTime>>;
    diaryCreationDate: DateTime;
};

export function GoDateBeforeButton({pickedDate, setPickedDate, diaryCreationDate}:Props) {
    const isDisabled = (pickedDate <= diaryCreationDate);
    const handlePress = () => {
        setPickedDate(pickedDate.minus({days: 1}))
    };
    return(
        <Pressable onPress={handlePress} style={[styles.buttonArea, (isDisabled && {opacity:0.2})]} disabled={isDisabled}>
            <GoDateBeforeIcon/>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    buttonArea: {
        position:'absolute',
        left: -10,
        padding:10,
    },
});