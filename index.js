import { useEffect, useMemo, useState } from "react"

// is a variable to store the main state
let storeData = {}

// is a variable to hold the setState value from any useState/hook implemtation
let holders = []

/**
 * 
 * @param {*} store ia an Object that store value and function to manipulate the value
 * @returns An object with `get` and `set` functions for accessing the store object.
 */
const createStore  = (store) => {
  const set = (params) => {
    storeData = {
      ...storeData,
      ...params
    }
    holders.map(func => func(storeData))
  }
  
  const get = () => {
    return storeData
  }

  storeData = store(set, get)
  
  return {
    set, get
  }
}

/**
 * 
 * @param {*} store is a store instance from createStore() function
 * @param {*} selector is an optional function to select spesific key from the store. e.g (state) => state.user
 * @returns it return value that stored or value that you select using selector
 */
const useStore = (store, selector) => {
  const storeData = useMemo(() => {
    return selector ? selector(store) : store
  }, [store, selector])
  
  const [value, setValue] = useState(storeData)

  useEffect(() => {
    let index = holders.length - 1
    if (selector) {
      const setSelectorValue = (val  ) => {
        const selectorVal = selector(val)
        setValue(selectorVal)
      }
      holders.push(setSelectorValue)
    } else {
      holders.push(setValue)
    }

    return () => {
      holders = holders.splice(index, 1)
    }
  }, [])

  return value
}

export {
  useStore,
  createStore
}