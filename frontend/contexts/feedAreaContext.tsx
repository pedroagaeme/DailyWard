import React, { createContext, useContext, ReactNode, useRef, useEffect } from 'react';
import { SharedValue, useSharedValue, withTiming } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface FeedAreaContextValue {
  bottomPadding: SharedValue<number>;
  onItemAboutToDelete: (increaseBy: number) => void;
  onDataChange: (dataLength: number) => void;
}

const FeedAreaContext = createContext<FeedAreaContextValue | undefined>(undefined);

interface FeedAreaProviderProps {
  children: ReactNode;
}

// LinearTransition default duration is around 300ms, but we'll use a bit more to be safe
const LAYOUT_ANIMATION_DURATION = 400;

export function FeedAreaProvider({ children }: FeedAreaProviderProps) {
  const insets = useSafeAreaInsets();
  const bottomPadding = useSharedValue(insets.bottom);
  const pendingDeletionsRef = useRef<number[]>([]);
  const previousDataLengthRef = useRef<number | undefined>(undefined);
  const revertTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const revertPadding = (amount: number) => {
    bottomPadding.value = withTiming(bottomPadding.value - amount, {
      duration: 200,
    });
  };

  const onItemAboutToDelete = (increaseBy: number) => {
    pendingDeletionsRef.current.push(increaseBy);
    bottomPadding.value += increaseBy;
  };

  const onDataChange = (newDataLength: number) => {
    const previousLength = previousDataLengthRef.current;
    
    // If data length decreased, an item was deleted
    if (previousLength !== undefined && newDataLength < previousLength) {
      const deletedCount = previousLength - newDataLength;
      
      // Clear any existing timeout
      if (revertTimeoutRef.current) {
        clearTimeout(revertTimeoutRef.current);
      }
      
      // Calculate total padding to revert (from the most recent deletions)
      const totalToRevert = pendingDeletionsRef.current
        .slice(-deletedCount)
        .reduce((sum, height) => sum + height, 0);
      
      // Remove the reverted heights from pending
      pendingDeletionsRef.current = pendingDeletionsRef.current.slice(0, -deletedCount);
      
      // Schedule revert after layout animation completes
      revertTimeoutRef.current = setTimeout(() => {
        if (totalToRevert > 0) {
          revertPadding(totalToRevert);
        }
      }, LAYOUT_ANIMATION_DURATION);
    }
    
    previousDataLengthRef.current = newDataLength;
  };

  useEffect(() => {
    return () => {
      if (revertTimeoutRef.current) {
        clearTimeout(revertTimeoutRef.current);
      }
    };
  }, []);

  return (
    <FeedAreaContext.Provider value={{ bottomPadding, onItemAboutToDelete, onDataChange }}>
      {children}
    </FeedAreaContext.Provider>
  );
}

export function useFeedAreaContext() {
  const context = useContext(FeedAreaContext);
  if (context === undefined) {
    throw new Error('useFeedAreaContext must be used within a FeedAreaProvider');
  }
  return context;
}

export function useFeedAreaContextSafe() {
  const context = useContext(FeedAreaContext);
  return context;
}
