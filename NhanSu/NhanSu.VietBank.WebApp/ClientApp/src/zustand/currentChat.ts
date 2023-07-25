import {create} from 'zustand';

type IdThaoLuan = number | string | undefined | null;
interface CurrentChatState {
  idThaoLuan: IdThaoLuan;
  setIdThaoLuan: (id: IdThaoLuan) => void;
  typing: string;
  setTyping: (typing: string) => void;
}

export const useCurrentChat = create<CurrentChatState>()(set => ({
  idThaoLuan: undefined,
  setIdThaoLuan: id => set({idThaoLuan: id}),
  typing: '',
  setTyping: id => set({typing: id}),
}));
