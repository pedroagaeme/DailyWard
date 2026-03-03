import { View, Text, StyleSheet, useWindowDimensions, Pressable } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors } from '@/constants/Colors';
import { WelcomeImage } from '@/assets/images/welcome-image';
import { router } from 'expo-router';
import { useEffect } from 'react';
import Animated, { useSharedValue, useAnimatedStyle, useAnimatedProps, withRepeat, withTiming, Easing, interpolateColor, processColor } from 'react-native-reanimated';
import { StatusBar, setStatusBarStyle} from 'expo-status-bar';

export default function App() {
    const insets = useSafeAreaInsets();
    const dimensions = useWindowDimensions();
    const overlayOpacity = useSharedValue(0);

    useEffect(() => {
        overlayOpacity.value = withRepeat(
            withTiming(1, { duration: 1500, easing: Easing.inOut(Easing.ease) }),
            0,
            true
        );
    }, []);

    const animatedOverlayStyle = useAnimatedStyle(() => ({
        opacity: overlayOpacity.value,
    }));

    const animatedSecondaryColor = useAnimatedProps(() => ({
        fill: interpolateColor(
            overlayOpacity.value,
            [0, 1],
            ["white", Colors.light.primary],
        ),
    }));

    const handlePress = (route: string) => {
        setStatusBarStyle('dark', true);
        router.replace(route);
    }

    return (
        <View style={[styles.container, { paddingTop: insets.top, paddingBottom: insets.bottom }]}>
            <StatusBar style='light' />
            <Animated.View style={[styles.overlay, animatedOverlayStyle]} />
            <View style={styles.imageContainer}>
                <WelcomeImage 
                    opacity={1} 
                    width={dimensions.width} 
                    height={dimensions.width} 
                    primaryColor={Colors.light.background[100]} 
                    secondaryColor={Colors.light.background[100]}
                    animatedSecondaryColor={animatedSecondaryColor}
                />
            </View>
            <View style={styles.content}>
                <View style={styles.titleContainer}>
                    <Text style={styles.titleText}>
                        Cada detalhe,
                    </Text>
                    <Text style={styles.titleText}>
                        dia após dia.
                    </Text>
                </View>
                <View style={styles.buttonsContainer}>
                    <Pressable style={styles.startButton} onPress={() => handlePress('/register')}>
                        <Text style={styles.startButtonText}>Começar</Text>
                    </Pressable>
                    <Pressable onPress={() => handlePress('/login')}>
                        <Text style={styles.loginText}>Já tem uma conta? <Text style={styles.loginLink}>Faça login</Text></Text>
                    </Pressable>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.light.primary,
        zIndex: -2
    },
    overlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
        zIndex: -1,
    },
    imageContainer: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    content: {
        flex: 1,
        justifyContent: 'space-between',
        paddingBottom: 40,
    },
    titleContainer: {
        marginTop: 20,
    },
    titleText: {
        marginHorizontal: 24,
        fontFamily: 'Inter_600SemiBold',
        fontSize: 28,
        color: Colors.light.background[100],
    },
    buttonsContainer: {
        paddingHorizontal: 24,
        gap: 16,
    },
    startButton: {
        backgroundColor: Colors.light.background[100],
        paddingVertical: 16,
        borderRadius: 20,
        alignItems: 'center',
    },
    startButtonText: {
        fontFamily: 'Inter_600SemiBold',
        fontSize: 16,
        color: Colors.light.primary,
    },
    loginText: {
        fontFamily: 'Inter_400Regular',
        fontSize: 14,
        color: Colors.light.background[80],
        textAlign: 'center',
    },
    loginLink: {
        fontFamily: 'Inter_600SemiBold',
        textDecorationLine: 'underline',
    },
});