import { View, TextInput, StyleSheet } from "react-native"
import { Colors } from "@/constants/Colors"
import { SearchIcon } from "@/assets/images/search-icon"

export function SearchBar() {
    return (
        <View style={styles.searchBar}>
            <View style={{paddingHorizontal:5}}>
                <SearchIcon height={28}/>
            </View>
            <TextInput style={styles.searchInput} placeholder="Pesquisar"/>
        </View>
    )
}

const styles = StyleSheet.create({
    searchBar: {
        flexDirection:'row',
        alignItems:'center',
        width:'100%',
        backgroundColor: Colors.light.tertiary,
        borderRadius: 25,
        paddingHorizontal:10,
        paddingVertical:5,
        gap:5,
    },
    searchInput: {
        flex: 1,
        fontSize:14,
        paddingRight: 10,
        paddingLeft: 0,
        color: '#424242',
    },
})