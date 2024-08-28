import { Navigate } from 'react-router-dom';
import {useContext} from "react";
import AuthContext from "../context/AuthContext";

const ProtectedRoute: React.FC<{ element: JSX.Element }> = ({ element }) => {
    const authContext = useContext(AuthContext);
    if (!authContext) {
        throw new Error('ProtectedRoute must be used within an AuthProvider');
    }

    const { token } = authContext;
    return token ? element : <Navigate to="/sign-in" />;
};

export default ProtectedRoute;
