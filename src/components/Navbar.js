import { AppBar, Box, Toolbar, Typography } from '@mui/material';
import { useNavigate, Link } from 'react-router-dom';
import { useAuthenticated } from '../hook/useAuthenticated';
import { AUTH } from '../lib/auth';
import '../styles/NavBar.scss';

export default function Navbar() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useAuthenticated();

  const logout = () => {
    AUTH.logout();
    setIsLoggedIn(false);
    navigate('/');
  };

  return (
    <Box sx={{ flexgrow: 1 }}>
      <AppBar position='static'>
        <Toolbar variant='dense' className='Navbar'>
          <Link to='/'>
            <Typography
              variant='h6'
              color='inherit'
              component='div'
              sx={{ mr: 2, color: 'black' }}
            >
              Home
            </Typography>
          </Link>
          <Link to='/products'>
            <Typography
              variant='h6'
              color='inherit'
              component='div'
              sx={{ mr: 2, color: 'black' }}
            >
              Products
            </Typography>
          </Link>
          <Link to='/brands'>
            <Typography
              variant='h6'
              color='inherit'
              component='div'
              sx={{ mr: 2, color: 'black' }}
            >
              Vegan Brands
            </Typography>
          </Link>
          {AUTH.getPayload().isAdmin && (
            <>
              <Link to='/categories/edit'>
                <Typography
                  variant='h6'
                  color='inherit'
                  component='div'
                  sx={{ mr: 2, color: 'black' }}
                >
                  Edit Categories
                </Typography>
              </Link>
              <Link to='/brands/create'>
                <Typography
                  variant='h6'
                  color='inherit'
                  component='div'
                  sx={{ mr: 2, color: 'black' }}
                >
                  Create Brand
                </Typography>
              </Link>
            </>
          )}

          {isLoggedIn ? (
            <>
              <Link to='/products/create'>
                <Typography
                  variant='h6'
                  color='inherit'
                  component='div'
                  sx={{ mr: 2, color: 'black' }}
                >
                  Add Product
                </Typography>
              </Link>
              <Link to='/users'>
                <Typography
                  variant='h6'
                  color='inherit'
                  component='div'
                  sx={{ mr: 2, color: 'black' }}
                >
                  Users
                </Typography>
              </Link>
              <Link to='/' onClick={logout}>
                <Typography
                  variant='h6'
                  color='inherit'
                  component='div'
                  sx={{ mr: 2, color: 'black' }}
                >
                  Logout
                </Typography>
              </Link>
            </>
          ) : (
            <>
              <Link to='/register'>
                <Typography
                  variant='h6'
                  color='inherit'
                  component='div'
                  sx={{ mr: 2, color: 'black' }}
                >
                  Register
                </Typography>
              </Link>
              <Link to='/login'>
                <Typography
                  variant='h6'
                  color='inherit'
                  component='div'
                  sx={{ mr: 2, color: 'black' }}
                >
                  Login
                </Typography>
              </Link>
            </>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
