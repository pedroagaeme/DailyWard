import { createContext, useContext, useRef, useState, ReactNode } from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';

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

// Safe version that doesn't throw
export const useInteractionBlockerSafe = () => {
  return useContext(InteractionBlockerContext);
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
  backgroundColor = 'rgba(0, 0, 0, 0)',
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
        <View 
          style={[
            styles.blocker, 
            { backgroundColor, opacity }
          ]}
          pointerEvents="auto"
        >
          {showSpinner && <ActivityIndicator size="large" color="#fff" />}
        </View>
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
