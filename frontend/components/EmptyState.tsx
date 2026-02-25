import { Colors } from '@/constants/Colors';
import { StyleSheet, Text, View } from 'react-native';
import { EmptyStateIcon } from '@/assets/images/empty-state-icon';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';
import { useEffect } from 'react';
import { useInteractionBlockerSafe } from '@/contexts';

interface EmptyStateProps {
  title?: string;
  subtitle?: string;
}

export function EmptyState({ 
  title = 'Nenhum item encontrado',
  subtitle
}: EmptyStateProps) {
  const interactionBlocker = useInteractionBlockerSafe();

  useEffect(() => {
    if (interactionBlocker) {
      interactionBlocker.blockInteractions(400);
    }
  }, []);

  return (
    <Animated.View style={styles.container} entering={FadeIn} exiting={FadeOut}>
      <EmptyStateIcon width={250} height={250} color={Colors.light.background[70]} />
      <View style={styles.textContainer}>
        <Text style={styles.title}>{title}</Text>
        {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  textContainer: {
    gap: 12,
    alignItems: 'center',
  },
  title: {
    fontFamily: 'Inter_600SemiBold',
    letterSpacing: -0.5,
    fontSize: 28,
    lineHeight: 40,
    color: Colors.light.text[5],
    textAlign: 'center',
  },
  subtitle: {
    fontFamily: 'Inter_400Regular',
    fontSize: 14,
    lineHeight: 22,
    color: Colors.light.text[30],
    textAlign: 'center',
  },
});
