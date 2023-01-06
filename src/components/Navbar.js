import { AppBar, Box, Toolbar, Typography, Link } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuthenticated } from '../hook/useAuthenticated';
import { AUTH } from '../lib/auth';

export default function Navbar() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useAuthenticated;

  const logout = () => {
    AUTH.logout();
    setIsLoggedIn(false);
    navigate('/');
  };

  return (
    <Box>
      <AppBar>
        <Toolbar>
          <Link>
            <Typography>Home</Typography>
          </Link>
          <Link>
            <Typography>Vegan Products</Typography>
          </Link>
          <Link>
            <Typography>Vegan Brands</Typography>
          </Link>
          <Link>
            <Typography>Register</Typography>
          </Link>
          <Link>
            <Typography>Login</Typography>
          </Link>
          <Link>
            <Typography>Logout</Typography>
          </Link>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
