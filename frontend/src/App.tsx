import { BrowserRouter as Router } from 'react-router-dom';

import { ToastContainer } from 'react-toastify';
import AppContent from './AppRoutes';
import Header from './components/Header';

function App() {
    return (
        <>
            <Router>
                <Header />
                <AppContent />
            </Router>
            <ToastContainer />
        </>
    );
}

export default App;
