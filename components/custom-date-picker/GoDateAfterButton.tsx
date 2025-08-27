import { GoDateAfterIcon } from "@/assets/images/header-icons/date-picker-icons/go-date-after-icon";
import { DateTime } from "luxon";
import { useState } from "react";
import { Pressable, StyleSheet } from "react-native";

interface Props {
    pickedDate: DateTime;
    setPickedDate: React.Dispatch<React.SetStateAction<DateTime>>;
    currentDate: DateTime;
};

export function GoDateAfterButton({pickedDate, setPickedDate, currentDate}:Props) {
    /* não permite que usuários acessem dias futuros*/
    const isDisabled = (pickedDate >= currentDate);

    const handlePress = () => {
        setPickedDate(pickedDate.plus({days: 1}))
    };

    return(
        <Pressable onPress={handlePress} style={[styles.buttonArea, (isDisabled && {opacity:0.2})]} disabled={isDisabled}>
            <GoDateAfterIcon/>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    buttonArea: {
        position:'absolute',
        right: -10,
        padding:10,
    },
});