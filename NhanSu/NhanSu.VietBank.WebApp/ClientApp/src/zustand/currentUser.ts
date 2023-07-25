import {create} from 'zustand';

interface CurrentUserState {}

export const useCurrentUser = create<CurrentUserState>()(set => ({}));
