import { SearchIcon } from "@/assets/images/search-icon"
import { Colors } from "@/constants/Colors"
import { StyleSheet, TextInput, View, FlatList} from "react-native"
import { SearchFilter } from "./SearchFilter"

interface SearchBarProps {
    placeholder?: string;
    searchFilterNames?: string[];
    color?: string;
}

export function SearchBar({ placeholder, searchFilterNames, color }: SearchBarProps) {
    const renderSearchFilter = ({ item }: { item: string }) => (
        <SearchFilter name={item} />
    );

    return (
        <View style={styles.wrapper}>
            <View style={[styles.searchBar, { backgroundColor: color || Colors.light.background[95]}]}>
                <TextInput style={styles.searchInput} placeholder={placeholder}/>
                <SearchIcon />
            </View>
            {searchFilterNames && (
                <FlatList
                    contentContainerStyle={{ gap:8, paddingHorizontal:16 }} 
                    horizontal={true} 
                    data={["Todos", ...searchFilterNames]} 
                    renderItem={renderSearchFilter} 
                    keyExtractor={item => item}
                    showsHorizontalScrollIndicator={false}
                />
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        gap: 16,
        width: '100%',
    },
    searchBar: {
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 12,
        paddingHorizontal: 16,
        marginHorizontal: 16,
        paddingVertical: 4,
        color: Colors.light.text[5],
    },
    searchInput: {
        flex: 1, 
        fontSize: 16,
        fontFamily: 'Inter_400Regular',
        color: '#1E293B',
    },
})