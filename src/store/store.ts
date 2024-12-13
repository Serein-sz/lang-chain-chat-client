import { create } from 'zustand'

type Store = {
  messages: Message[]
  getMessages: () => Message[]
  appendMessage: (message: Message) => void
  updateLastMessageContent: (content: string) => void
}

type Message = {
  id: string
  role: string
  content: string
  loading: boolean
}

const useMessageStore = create<Store>()((set, get) => ({
  messages: [],
  getMessages: () => {
    const messages = get().messages
    return messages.slice(0, messages.length - 1)
  },
  appendMessage: (message: Message) =>
    set((state) => ({ messages: [...state.messages, message] })),
  updateLastMessageContent: (content: string) =>
    set((state) => {
      const lastMessage = state.messages[state.messages.length - 1]
      lastMessage.loading = false
      lastMessage.content = lastMessage.content + JSON.parse(content).message
      return { messages: [...state.messages] }
    }),
}))

export { useMessageStore } 
