import { createStore, useStore } from ".."
import apiServices from "./api-services"

const customStore = createStore((set, get) => {
  return {
    user: undefined,
    getData: async () => {
      const {data} = await apiServices.getUserDetail('RZulfikri')
      set({user: data})
    }
  }
})

const useCustomStore = (selector) => useStore(customStore, selector)

const customSelectors = {
  user: store => store.user,
  userName: state => state?.user?.name
}

export {
  customStore,
  useCustomStore,
  customSelectors
}