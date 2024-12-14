import { v4 } from 'uuid'
import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

type Store = {
  messages: Message[]
  getMessages: () => Message[]
  saveMessage: (content: string) => void
  updateLastMessageContent: (content: string) => void
}

type Message = {
  id: string
  role: string
  content: string
  loading: boolean
}

const useMessageStore = create<Store>()(persist(
  (set, get) => ({
    messages: [],
    getMessages: () => {
      const messages = get().messages
      return messages.slice(0, messages.length - 1)
    },
    saveMessage: (content: string) => {
      const messages = [
        {
          id: v4(),
          role: 'human',
          loading: false,
          content,
        },
        {
          id: v4(),
          role: 'ai',
          loading: true,
          content: '',
        }
      ]
      set((state) => ({ messages: [...state.messages, ...messages] }))
    },
    updateLastMessageContent: (content: string) =>
      set((state) => {
        const lastMessage = state.messages[state.messages.length - 1]
        lastMessage.loading = false
        lastMessage.content = lastMessage.content + JSON.parse(content).message
        return { messages: [...state.messages] }
      }),
  }),
  {
    name: 'message-storage', // 存储中的项目名称，必须是唯一的
    storage: createJSONStorage(() => sessionStorage), // 使用sessionStorage作为存储
  }))

export { useMessageStore } 
