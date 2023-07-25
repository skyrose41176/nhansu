import {create} from 'zustand';

interface ResponsiveState {
  isOpenChatInfo: boolean;
  setIsOpenChatInfo: (open: boolean) => void;
  isOpenConversation: boolean;
  setIsOpenConversation: (open: boolean) => void;
}

export const useResponsive = create<ResponsiveState>()(set => ({
  isOpenChatInfo: true,
  setIsOpenChatInfo: open => set({isOpenChatInfo: open}),
  isOpenConversation: true,
  setIsOpenConversation: open => set({isOpenConversation: open}),
}));
