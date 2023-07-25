import {HubConnection} from '@microsoft/signalr';
import {create} from 'zustand';

interface CurrentChatState {
  connection: HubConnection | undefined;
  setConnection: (connection: HubConnection | undefined) => void;
}

export const useConnection = create<CurrentChatState>()(set => ({
  connection: undefined,
  setConnection: id => set({connection: id}),
}));
