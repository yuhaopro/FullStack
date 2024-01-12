import ReactDOM from 'react-dom/client'
import App from './App'
import {QueryClient, QueryClientProvider } from "@tanstack/react-query"

// initialize the use of QueryClient for this app
const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')).render(
  <QueryClientProvider client={queryClient}>
  <App />    
  </QueryClientProvider>

)