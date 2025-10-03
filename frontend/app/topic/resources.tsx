import { AddResourceButton } from "@/components/AddResourceButton";
import { FeedArea } from "@/components/FeedArea";
import { ResourcesFeedItem, renderResourcesFeedItem } from "@/components/FeedArea/ResourcesFeedItem";
import { SearchBar } from "@/components/SearchBar";
import { Colors } from "@/constants/Colors";
import { StyleSheet, Text, TextInput, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";


export default function Resources() {
    const insets = useSafeAreaInsets();

    const resources: ResourcesFeedItem[] = [
        { name: "John Doe", title: "Manual do Usuário", type: "Documento", description: "Um guia completo para novos usuários." },
        { name: "Recursos Humanos", title: "Política de Férias", type: "Documento", description: "Informações sobre a política de férias da empresa." },
        { name: "Administração", title: "Relatório Mensal", type: "Documento", description: "Relatório mensal de atividades." },
        { name: "Equipe Técnica", title: "Guia de Procedimentos", type: "Documento", description: "Procedimentos técnicos para a equipe." },
    ];
    
    return (
    <View style={[styles.container, {paddingTop: insets.top}]}>
      <View style={styles.header}>
        <View style={styles.row}>
          <Text style={styles.sectionTitle}>Recursos</Text>
        </View>
        <SearchBar placeholder="Buscar Recursos..." />
      </View>
      <FeedArea
        items={resources}
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
    paddingTop:20,
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
    fontSize: 28,
    lineHeight: 34,
    color: Colors.light.text[5],
  },
});