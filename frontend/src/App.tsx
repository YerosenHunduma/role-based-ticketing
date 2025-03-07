import { BrowserRouter as Router } from 'react-router-dom';

import { ToastContainer } from 'react-toastify';
import AppContent from './AppRoutes';

function App() {
    return (
        <>
            <Router>
                <AppContent />
            </Router>
            <ToastContainer />
        </>
    );
}

export default App;
