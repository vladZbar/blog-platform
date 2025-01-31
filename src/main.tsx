import { createRoot } from 'react-dom/client'
import App from './components/App/App.tsx'
import { Provider } from 'react-redux'
import { store } from './components/store/index.ts'

createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <App />
  </Provider>
)
