import React, { createContext, useContext, useRef, useState, ReactNode } from 'react';
import { StyleSheet, ActivityIndicator } from 'react-native';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';

interface InteractionBlockerContextType {
  blockInteractions: (duration: number) => void;
  isBlocking: boolean;
}

const InteractionBlockerContext = createContext<InteractionBlockerContextType | undefined>(undefined);

export const useInteractionBlocker = () => {
  const context = useContext(InteractionBlockerContext);
  if (!context) {
    throw new Error('useInteractionBlocker must be used within InteractionBlockerProvider');
  }
  return context;
};

interface InteractionBlockerProviderProps {
  children: ReactNode;
  showSpinner?: boolean;
  backgroundColor?: string;
  opacity?: number;
}

export const InteractionBlockerProvider: React.FC<InteractionBlockerProviderProps> = ({
  children,
  showSpinner = false,
  backgroundColor = 'rgba(0, 0, 0, 0.2)',
  opacity = 1
}) => {
  const [isBlocking, setIsBlocking] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const blockInteractions = (duration: number) => {
    // Clear any existing timeout (overwrites previous calls)
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // Show blocker
    setIsBlocking(true);

    // Set new timeout
    timeoutRef.current = setTimeout(() => {
      setIsBlocking(false);
      timeoutRef.current = null;
    }, duration);
  };

  return (
    <InteractionBlockerContext.Provider value={{ blockInteractions, isBlocking }}>
      {children}
      {isBlocking && (
        <Animated.View 
          entering={FadeIn.duration(200)}
          exiting={FadeOut.duration(200)}
          style={[
            styles.blocker, 
            { backgroundColor, opacity }
          ]}
          pointerEvents="auto"
        >
          {showSpinner && <ActivityIndicator size="large" color="#fff" />}
        </Animated.View>
      )}
    </InteractionBlockerContext.Provider>
  );
};

const styles = StyleSheet.create({
  blocker: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 9999,
  },
});
