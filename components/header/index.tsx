import { View, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { DiaryNameDisplay } from './DiaryNameDisplay';
import { DailyWardLogo } from '@/assets/images/header-icons/dailyward-logo';
import { GoBackIcon } from '@/assets/images/header-icons/go-back-icon';
import { SettingsIcon } from '@/assets/images/header-icons/settings-icon';
import { Colors } from '@/constants/Colors';
import { CustomDatePicker } from './custom-date-picker';

export function Header() {
    return(
        <View style={[styles.header, styles.shadowHeader]}>
            <SafeAreaView style={styles.headerContentWrapper} edges={["top", "right", "left"]}>
                <View style={styles.row}>
                    <GoBackIcon/>
                    <View style={styles.logoOverlay}>
                        <DailyWardLogo width={60} height={60}/>
                    </View>
                    <SettingsIcon/>
                </View>
                <View style={styles.row}>
                    <DiaryNameDisplay name={'Diário de Pedro'}></DiaryNameDisplay>
                </View>
                <CustomDatePicker/>
            </SafeAreaView>
        </View>
    );
};

const styles = StyleSheet.create({
    header: {
        width: '100%',
        backgroundColor: Colors.light.primary,
        borderBottomRightRadius: 20,
        borderBottomLeftRadius: 20,
        paddingHorizontal:20,
        paddingBottom:30,
        paddingTop:10,
    },
    row: {
        alignItems:'center',
        justifyContent:'space-between',
        flexDirection:'row',
    },
    shadowHeader: {
        shadowColor: '#000',
        shadowOffset: {
        width: 0,
        height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 8,
    },
    headerContentWrapper: {
        gap:15,
    },
    logoOverlay: {
        position:'absolute', 
        width:'100%', 
        alignItems:'center',
    },
});