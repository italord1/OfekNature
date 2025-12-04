import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import App from './App.jsx'
import { BaseUrlProvider } from "./Context/BaseUrl.jsx";

createRoot(document.getElementById('root')).render(
 
     <BaseUrlProvider>
      <App />
     </BaseUrlProvider>
    
  
)
