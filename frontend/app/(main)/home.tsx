import { FeedArea } from '@/components/FeedArea';
import { HomeFeedItem, renderHomeFeedItem } from '@/components/FeedArea/HomeFeedItem';
import { LogoutButton } from '@/components/LogoutButton';
import { SearchBar } from '@/components/SearchBar';
import { Colors } from '@/constants/Colors';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState, useEffect } from 'react';
import { API_URL } from '@/utils/AuthContext';
import axios from 'axios';

export default function Home() {
  const [topics, setTopics] = useState<HomeFeedItem[]>([]);

  useEffect(() => {
    const fetchUserTopics = async () => {
      try {
        const response = await axios.get(`${API_URL}/topics/`);
        if (response.status === 200) {
          setTopics(response.data);
        }
        else {
          throw new Error('Failed to fetch topics');
        }
      } catch (error) {
        console.error('Error fetching user topics:', error);
      }
    };

    fetchUserTopics();
  }, []);

  return (
  <View style={styles.container}>
    <SafeAreaView style={styles.header} edges={['top', 'left', 'right']}>
      <View style={styles.row}>
        <Text style={styles.feedTitleText}>Seus Diários</Text>
        <LogoutButton />
      </View>
    </SafeAreaView>
    <SearchBar placeholder='Buscar Diários...' color={Colors.light.background[100]}/>
    <FeedArea 
        items={topics} 
        renderItem={renderHomeFeedItem} 
        immersiveScreen={{top:false, bottom:true}}
        fadedEdges={{top:false, bottom:false}}
        additionalPadding={{top:12, bottom:0}}
        numColumns={1}
    />
  </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor: Colors.light.background[95],
    overflow: 'visible',
    gap:24,
  },
  header: {
    padding:16,
    paddingBottom:0,
    gap:20,
  },
  row: {
    alignItems:'center',
    justifyContent:'space-between',
    flexDirection:'row',
  },
  greetingsText: {
    fontFamily: 'Inter_400Regular',
    fontSize:16,
    color:  Colors.light.text[30],
  },
  feedTitleText: {
    fontFamily: 'Inter_600SemiBold',
    fontSize:28,
    lineHeight: 34,
    color: Colors.light.text[5],
  },
  profilePic: {
  },
});
