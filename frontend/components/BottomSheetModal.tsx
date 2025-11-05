import React, { useEffect, createContext } from "react";
import { Modal, Pressable } from "react-native";
import Animated, { useAnimatedStyle, useSharedValue, withTiming, runOnJS } from "react-native-reanimated";
import { Easing } from 'react-native-reanimated';
import { scheduleOnRN } from "react-native-worklets";

export const BottomSheetCloseContext = createContext<(callback?: () => void) => void>(() => {});

export function BottomSheetModal({
    ModalVisible,
    setModalVisible,
    children,
}: {
    ModalVisible: boolean;
    setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
    children?: React.ReactNode;
}) {
    const slideAnim = useSharedValue(250);

    const animatedStyle = useAnimatedStyle(() => {
        return {
            transform: [{ translateY: slideAnim.value }],
        };
    });

    useEffect(() => {
        if (ModalVisible) {
            slideAnim.value = withTiming(0, { duration: 200, easing: Easing.out(Easing.ease) });
        }
    }, [ModalVisible]);


    const closeModal = (callback?: () => void) => {
        const handleExitAnimationComplete = () => {
            setModalVisible(false);
            if (callback) {
                callback();
            }
        };
        slideAnim.value = withTiming(250, { duration: 200, easing: Easing.in(Easing.ease) }, () => {
            scheduleOnRN(handleExitAnimationComplete);
        });
    };

    const closeModalWithoutCallback = () => {
        closeModal();
    };

    return (
        <Modal
            statusBarTranslucent={true}
            transparent={true}
            visible={ModalVisible}
            onRequestClose={closeModalWithoutCallback}
            style={{ margin: 0 }}
        >
            <Pressable
                onPress={closeModalWithoutCallback}
                style={{ flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.5)'}}
            >
                <Animated.View style={[{ flex: 1, justifyContent: 'flex-end'}, animatedStyle]}>
                    <BottomSheetCloseContext.Provider value={closeModal}>
                        {children}
                    </BottomSheetCloseContext.Provider>
                </Animated.View>
            </Pressable>
        </Modal>
    );
}