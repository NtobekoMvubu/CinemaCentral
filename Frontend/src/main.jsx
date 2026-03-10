import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Home from './pages/Home.jsx'
import {ApolloClient, InMemoryCache} from '@apollo/client'
import { ApolloProvider } from '@apollo/client/react'
import { HttpLink } from '@apollo/client/link/http'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'

const client = new ApolloClient({
  link: new HttpLink({ uri: 'http://localhost:4000/' }),
  cache: new InMemoryCache(),
})

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home/>
  }
]);


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ApolloProvider client = {client}>
      <RouterProvider router={router}/>
    </ApolloProvider>
  </StrictMode>,
)