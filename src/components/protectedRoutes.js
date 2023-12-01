import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const PrivateRoute = ({ children, userType, ...rest }) => {
  const token = localStorage.getItem('accessToken');
  const navigate = useNavigate();

  
  
  if (!token) {
    navigate('/login');
    return null;
  }
  
  const decodedToken = jwtDecode(token);
  const tokenScope = decodedToken.scope || '';

  console.log(tokenScope[0]);

  if (tokenScope[0] !== localStorage.getItem('currentUser')) {
    navigate('/login');
    return null;
  }

  return children;
};

export default PrivateRoute;