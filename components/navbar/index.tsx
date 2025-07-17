import { Colors } from "@/constants/Colors";
import { StyleSheet, View } from "react-native";
import { tabIconArray } from "../../constants/TabIconArray";
import { TabButton } from "./tab-button";

export function Navbar() {
    return (
        <View style={[styles.navbar, styles.shadowNavbar]}>
            {tabIconArray.map((iconInfo, index) => 
                <View key={index} style={[styles.tabIconWrapper, (index != 0 && {opacity:0.3})]}>
                    <TabButton {...iconInfo}/>
                </View>)}
        </View>
    );
};

const styles = StyleSheet.create({
    navbar: {
        width:300,
        paddingVertical:10,
        paddingHorizontal:20,
        gap:10,
        flexDirection:'row',
        justifyContent:'space-around',
        alignSelf:'center',
        borderRadius:20,
        backgroundColor: Colors.light.primary,
    },
    shadowNavbar: {
        shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 12,
    },
    tabIconWrapper: {
        flex:1,
    },
});