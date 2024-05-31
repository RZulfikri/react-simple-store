import React, {useCallback} from 'react'
import { customSelectors, customStore, useCustomStore } from './store'

const ComponentA = () => {
  const value = useCustomStore(customSelectors.userName)
  return (
    <div>
      <p>{value}</p>
    </div>
  )
}

const ComponentB = () => {
  const value = useCustomStore(customSelectors.user)
  return (
    <div>
      <p>{value?.name}</p>
    </div>
  )
}

const Container = () => {
  
  return (
    <div>
    <ComponentA />
    <ComponentB />
    </div>
  )
}

const App = () => {
  const onClick = useCallback(() => {
    customStore.get().getData()
  }, [])

  return (
    <div>
      <Container />
      <button  onClick={onClick}>
        getData
      </button>
    </div>
  )
}

export default App