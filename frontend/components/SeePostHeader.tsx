import React from 'react';
import { ScreenHeader } from '@/components/ScreenHeader';

interface SeePostHeaderProps {
  title?: string;
  rightComponent?: React.ReactNode;
}

export const SeePostHeader = ({ title, rightComponent }: SeePostHeaderProps) => {
  return <ScreenHeader title={title || 'Post'} rightComponent={rightComponent} />;
};

