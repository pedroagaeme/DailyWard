import { FeedArea } from "@/components/FeedArea";
import { ResourcesFeedItem, renderResourcesFeedItem } from "@/components/FeedArea/ResourcesFeedItem";
import { Colors } from "@/constants/Colors";
import { useTopics } from "@/utils/topicsContext";
import { axiosPrivate } from "@/utils/api";
import { AddIcon } from "@/assets/images/add-icon";
import { router } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { useCallback, useState } from "react";
import { useFocusEffect } from "expo-router";


export default function Resources() {
    const { topicState } = useTopics();
    const [resources, setResources] = useState<ResourcesFeedItem[]>([]);

    const fetchTopicResources = async (topicId: string) => {
        try {
            const response = await axiosPrivate.get(`/users/me/topics/${topicId}/resources/`);
            if (response.status === 200) {
              console.log('Fetched resources:', response.data);
              setResources(response.data.results || response.data);
            }
        } catch (error) {
            console.error('Error fetching topic resources:', error);
        }
    };

    useFocusEffect(
      useCallback(() => {
        if (topicState?.id) {
          fetchTopicResources(topicState.id);
        } 
      }, [topicState?.id])
    );
    
    return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.row}>
          <Text style={styles.sectionTitle}>Recursos</Text>
          <Pressable onPress={() => router.push('/topics/add-resource')} style={styles.button}>
            <AddIcon width={32} height={32}/>
          </Pressable>
        </View>
      </View>
      <FeedArea
        items={resources || []}
        renderItem={renderResourcesFeedItem}
        fadedEdges={{top: false, bottom: false}}
        immersiveScreen={{top: false, bottom: true}}
        additionalPadding={{top: 0, bottom: 0}}
        navbarInset={true}
      />
    </View>
    );
};

const styles = StyleSheet.create({
  container: {
    flex:1,
    alignItems:'stretch',
    justifyContent:'space-between',
    backgroundColor: Colors.light.background[100],
    overflow: 'visible',
    gap:16,
  },
  header: {
    gap:24,
    paddingTop:8,
    paddingBottom:8,
  },
  row: {
    paddingHorizontal:16,
    width:'100%',
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
  },
  contentText: {
    fontFamily:'Inter_500Medium',
    fontSize: 20,
    lineHeight:20,
    color: Colors.light.text[5],
  },
  sectionTitle: {
    fontFamily:'Inter_600SemiBold',
    fontSize: 24,
    lineHeight: 32,
    color: Colors.light.text[5],
  },
  button: {
    flexDirection: 'row',
    backgroundColor: Colors.light.primary,
    padding: 8,
    gap: 4,
    borderRadius: 24,
    alignItems: 'center',
  },
});