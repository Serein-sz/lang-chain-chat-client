import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type Store = {
  model: string
  setCurrentModel: (model: string) => void
}

const useModelStore = create<Store>()(persist(
  (set) => ({
    model: 'qwen2.5-coder:1.5b',
    setCurrentModel: (model: string) => set({ model })
  }),
  {
    name: 'model-storage', // 存储中的项目名称，必须是唯一的
    storage: createJSONStorage(() => sessionStorage), // 使用sessionStorage作为存储
  }
))

export { useModelStore };
