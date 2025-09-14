import { FeedArea } from "@/components/FeedArea";
import { MaterialsFeedItem, renderMaterialsFeedItem } from "@/components/FeedArea/MaterialsFeedItem";
import { SearchBar } from "@/components/SearchBar";
import { Colors } from "@/constants/Colors";
import { StyleSheet, Text, TextInput, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";


export default function Resources() {
    const insets = useSafeAreaInsets();
    
    const materials: MaterialsFeedItem[] = [
        { name: "John Doe", title: "Manual do Usuário", type: "Documento", description: "Um guia completo para novos usuários." },
        { name: "Recursos Humanos", title: "Política de Férias", type: "Documento", description: "Informações sobre a política de férias da empresa." },
        { name: "Administração", title: "Relatório Mensal", type: "Documento", description: "Relatório mensal de atividades." },
        { name: "Equipe Técnica", title: "Guia de Procedimentos", type: "Documento", description: "Procedimentos técnicos para a equipe." },
    ];
    
    return (
    <View style={[styles.container, {paddingTop: insets.top}]}>
      <View style={styles.header}>
        <Text style={styles.sectionTitle}>Recursos</Text>
        <SearchBar placeholder="Buscar Recursos..." searchFilterNames={["Anúncios", "Materiais", "Anúncis", "Maeriais", "Anncios", "Mateiais"]} />
      </View>
      <FeedArea
        items={materials}
        renderItem={renderMaterialsFeedItem}
        fadedEdges={{top: true, bottom: false}}
        overlayHeight={16}
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
    overflow: 'visible'
  },
  header: {
    alignItems:'flex-start',
    gap:24,
    paddingTop:20,
    paddingBottom:8,
  },
  contentText: {
    fontFamily:'Inter_500Medium',
    fontSize: 20,
    lineHeight:20,
    color: Colors.light.text[5],
  },
  sectionTitle: {
    marginHorizontal: 16,
    fontFamily:'Inter_600SemiBold',
    fontSize: 24,
    lineHeight: 28,
    color: Colors.light.text[5],
  },
});