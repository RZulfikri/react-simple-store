# react-simple-store

React Simple Store is a lightweight and easy-to-use implementation of global state management for React applications, utilizing custom hooks. It offers a simple and efficient solution for sharing state across components while optimizing rendering processes.

## Motivation
In exploring custom hooks in React, I encountered two common approaches: one utilizing `useState()` and another using `useContext()`. However, both have limitations. The former struggles to share values across components, while the latter can lead to excessive rendering with numerous contexts.

With React Simple Store, I aimed to create a custom hook-based state management solution that addresses these limitations, allowing for:

Seamless sharing of values across components.
Optimized rendering to prevent unnecessary re-renders.

So in this implementation I want to create a customHook or state management that able to do.
1. can share value across component
2. can optimize rendering process.

## How to Install

You can install React Simple Store via npm or yarn:
```bash
# Using npm
npm install @rzulfikri/react-simple-store

# Using yarn
yarn add @rzulfikri/react-simple-store
```

## How to Use
Here's an example of how to use React Simple Store:
```jsx
import React, { useCallback } from 'react';
import { createStore, useStore } from '@rzulfikri/react-simple-store';
import apiServices from './apiServices'; // Import your API services

// Create a custom store
const customStore = createStore((set, get) => {
  return {
    user: undefined,
    getData: async () => {
      const { data } = await apiServices.getUserDetail('RZulfikri');
      set({ user: data });
    }
  };
});

// Create a custom hook for using the store
const useCustomStore = (selector) => useStore(customStore, selector);

// Define custom selectors
const customSelectors = {
  user: store => store.user,
  userName: state => state?.user?.name
};

// Component A
const ComponentA = () => {
  const value = useCustomStore(customSelectors.userName);
  return (
    <div>
      <p>{value}</p>
    </div>
  );
};

// Component B
const ComponentB = () => {
  const value = useCustomStore(customSelectors.user);
  return (
    <div>
      <p>{value?.name}</p>
    </div>
  );
};

// Container Component
const Container = () => {
  return (
    <div>
      <ComponentA />
      <ComponentB />
    </div>
  );
};

// App Component
const App = () => {
  const onClick = useCallback(() => {
    customStore.get().getData();
  }, []);

  return (
    <div>
      <Container />
      <button onClick={onClick}>
        getData
      </button>
    </div>
  );
};

export default App;
```
### Optimization
#### Direct Manipulation

Direct manipulation provides access to the store using set and get:

```javascript
const user = customStore.get().user;
const getUser = customStore.get().getData();
const setUser = customStore.set({ user: undefined });
```

#### Selectors
Selectors allow for selecting specific values, optimizing rendering:

```javscript
const customSelectors = {
  user: store => store.user,
  userName: state => state?.user?.name
};

// This hook returns the user object
const value = useCustomStore();

// This hook returns the value of user.name
const value = useCustomStore(customSelectors.userName);
```

#### Contribution
Contributions are welcome! If you find any issues or have suggestions for improvements, please feel free to open an issue or submit a pull request.