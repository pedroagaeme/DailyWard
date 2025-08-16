import { View, StyleSheet, ViewProps } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import { InsetToggle } from "@/constants/HeightInsets";

interface Props extends ViewProps {
    overlayHeight: number;
    fadedEdges:InsetToggle;
};

export function FadedOverlayContainer({overlayHeight = 40, fadedEdges, ...props}:Props) {
  return (
    <View style={styles.container}>
      {fadedEdges.top &&
      <LinearGradient
        colors={[
          'rgba(236, 236, 236, 0)',
          'rgba(236, 236, 236, 0.02)',
          'rgba(236, 236, 236, 0.05)',
          'rgba(236, 236, 236, 0.1)',
          'rgba(236, 236, 236, 0.2)',
          'rgba(236, 236, 236, 0.4)',
          'rgba(236, 236, 236, 0.7)',
          'rgba(236, 236, 236, 0.9)',
          'rgba(236, 236, 236, 1)',   
        ]}
        locations={[0, 0.03, 0.07, 0.13, 0.22, 0.4, 0.65, 0.85, 1]}
        style={{ height: overlayHeight, width:'100%'}}
        pointerEvents="none"
      />}

      <View style={styles.contentContainer}/>

      {fadedEdges.bottom &&
      <LinearGradient
        colors={[
              'rgba(236, 236, 236, 1)',
              'rgba(236, 236, 236, 0.9)',
              'rgba(236, 236, 236, 0.7)',
              'rgba(236, 236, 236, 0.4)',
              'rgba(236, 236, 236, 0.2)',
              'rgba(236, 236, 236, 0.1)',
              'rgba(236, 236, 236, 0.05)',
              'rgba(236, 236, 236, 0.02)',
              'rgba(236, 236, 236, 0)',
          ]}
          locations={[0, 0.15, 0.35, 0.6, 0.78, 0.87, 0.93, 0.97, 1]}
        style={{ height: overlayHeight, width:'100%'}}
        pointerEvents="none"
      />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignSelf:'stretch',
    flex:1,
  },
  contentContainer: {
    flex:1,
    backgroundColor:'rgba(236,236,236,1)',
  }
});