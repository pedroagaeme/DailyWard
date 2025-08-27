import { SearchIcon } from "@/assets/images/search-icon"
import { Colors } from "@/constants/Colors"
import { StyleSheet, TextInput, View } from "react-native"

export function SearchBar() {
    return (
        <View style={styles.searchBar}>
            <View style={{paddingHorizontal:5}}>
                <SearchIcon height={28}/>
            </View>
            <TextInput style={styles.searchInput} placeholder="Buscar Diários"/>
        </View>
    )
}

const styles = StyleSheet.create({
    searchBar: {
        flexDirection: 'row', 
        alignItems: 'center', 
        backgroundColor: Colors.light.background[100], 
        borderRadius: 12, 
        paddingHorizontal: 16, 
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 3,
        elevation: 2,
    },
    searchInput: {
        flex: 1, 
        fontSize: 16, 
        color: '#1E293B',
        paddingVertical: 12
    },
})