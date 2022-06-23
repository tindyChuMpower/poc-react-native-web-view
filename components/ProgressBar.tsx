import React from 'react';
import * as Progress from 'react-native-progress';
import create from 'zustand';

type TProcessStore = {
  progress: number;
  setProgress: (progress: number) => void;
};

export const progressBarStore = create<TProcessStore>(set => ({
  progress: 0,
  setProgress: (progress: number) => {
    if (progress === 1) {
      set({progress});
      setTimeout(() => set({progress: 0}), 800);
    } else {
      set({progress});
    }
  },
}));

export default function ProgressBar() {
  const progress = progressBarStore(state => state.progress);

  return (
    <Progress.Bar
      progress={progress}
      width={null}
      borderWidth={0}
      borderRadius={0}
      color={progress === 0 ? '#fff' : '#7c8'}
    />
  );
}
