import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { Provider } from 'react-redux';
import store from './app/store.ts';
import { GoogleOAuthProvider } from '@react-oauth/google';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <GoogleOAuthProvider clientId="73086302490-2p7rl6sp76hcsfij8sbhroaaoredu5pn.apps.googleusercontent.com">
      <App />
    </GoogleOAuthProvider>
  </Provider>
);
