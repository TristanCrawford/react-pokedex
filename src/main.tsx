import React from 'react'
import ReactDOM from 'react-dom'

import { Provider } from 'react-redux'
import store from './store'

import { ApolloProvider } from '@apollo/client'
import { pokeClient } from '@features/pokemon/PokemonAPI'

import App from './App'

const rootElement = document.getElementById('root')

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ApolloProvider client={pokeClient}>
        <App />
      </ApolloProvider>
    </Provider>
  </React.StrictMode>,
  rootElement
)
