import { create } from 'zustand'

type Store = {
  messages: Message[]
  appendMessage: (message: Message) => void
  updateLastMessageContent: (content: string) => void
}

type Message = {
  id: string
  role: string
  content: string
  loading: boolean
}

const useMessageStore = create<Store>()((set) => ({
  messages: [],
  appendMessage: (message: Message) =>
    set((state) => ({ messages: [...state.messages, message] })),
  updateLastMessageContent: (content: string) =>
    set((state) => {
      const lastMessage = state.messages[state.messages.length - 1]
      lastMessage.loading = false
      lastMessage.content = lastMessage.content + content
      return { messages: [...state.messages] }
    }),
}))

export { useMessageStore } 
