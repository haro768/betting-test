import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import {store} from './redux/store';
import {Provider} from 'react-redux';
import {AuthProvider} from './context/AuthContext';
import App from './App.tsx'
import './index.css'

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <Provider store={store}>
            <AuthProvider>
                <App/>
            </AuthProvider>
        </Provider>
    </StrictMode>,
);
