import { InviteToDiaryIcon } from "@/assets/images/invite-to-diary-icon";
import { FeedArea } from "@/components/FeedArea";
import { ContactsFeedItem, renderContactsFeedItem } from "@/components/FeedArea/ContactsFeedItem";
import { Colors } from "@/constants/Colors";
import { inviteButtonBottomMargin, inviteButtonMaxHeight, navbarMaxHeight } from "@/constants/HeightInsets";
import { StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const sampleData: ContactsFeedItem[] = [
  {
    name: "John Doe",
    lastMessage: "Amazing sunset at the beach today!"
  },
  {
    name: "John Doe",
    lastMessage: "Amazing sunset at the beach today!"
  },
  {
    name: "John Doe",
    lastMessage: "Amazing sunset at the beach today!"
  },
  {
    name: "John Doe",
  },
  {
    name: "John Doe",
    lastMessage: "Amazing sunset at the beach today!"
  },
  {
    name: "John Doe",
    lastMessage: "Amazing sunset at the beach today!"
  },
  {
    name: "John Doe",
    lastMessage: "Amazing sunset at the beach today!"
  },
  {
    name: "John Doe",
  },
  {
    name: "John Doe",
    lastMessage: "Amazing sunset at the beach today!"
  },
  {
    name: "John Doe",
    lastMessage: "Amazing sunset at the beach today!"
  },
  {
    name: "John Doe",
    lastMessage: "Amazing sunset at the beach today!"
  },
  {
    name: "John Doe",
  },
];


export default function Contacts() {
    const insets = useSafeAreaInsets();
    const buttonBottomInset = insets.bottom + navbarMaxHeight + inviteButtonBottomMargin;
    const feedAreaAdditionalPadding = inviteButtonBottomMargin + inviteButtonMaxHeight;
    return (
    <View style={styles.container}>
        <View style={styles.overlay}>
            <View style={[styles.button, styles.shadow, {bottom:buttonBottomInset}]}>
                <InviteToDiaryIcon/>
                <Text style={styles.text}>Convidar Contatos</Text>
            </View>
        </View>
        <FeedArea 
            items={sampleData} 
            renderItem={renderContactsFeedItem} 
            fadedEdges={{top:true, bottom:true}} 
            immersiveScreen={{top:true, bottom:true}}
            overlayHeight={75}
            additionalPadding={feedAreaAdditionalPadding}
            navbarInset={true}
        />
    </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex:1,
        justifyContent:'space-between',
        backgroundColor: Colors.light.background, 
        overflow: 'visible'
    },
    overlay: {
        zIndex:1,
        position:'absolute',
        width:'100%',
        height:'100%',
        pointerEvents:'box-none',
        alignItems:'center',
    },
    button: {
        position:'absolute',
        alignItems:'center',
        flexDirection:'row',
        borderWidth:1,
        backgroundColor:'white',
        borderColor: Colors.light.primary,
        borderRadius:10,
        padding:15,
        gap:10,
    },
    text: {
        fontFamily:'Inter_500Medium',
        fontSize: 18,
        lineHeight:20,
        color: Colors.light.primary,
    },
    shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
});