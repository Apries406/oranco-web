import { create } from "zustand";
import { User } from "../types";
import { devtools, persist } from "zustand/middleware";

type UserStore = {
  user: User | null,
  isLogin: boolean,
  token: string | null,
  setInit: ({ user, token }: { user: User | null, token: string | null }) => void,
  setToken: (token: string) => void,
  setUser: (user: User) => void,
}

export const useUserStore = create<UserStore>()(devtools(persist((set)=>({
  user: null,
  isLogin: false,
  token: null,
  setToken: (token: string) => set(() => ({ token })),
  setUser: (user: User) => set(() => ({ user })),
  setInit: ({ user, token }) => set(() => ({ user, token, isLogin: true })),}), {
  name: "user",
  version: 1,
})))