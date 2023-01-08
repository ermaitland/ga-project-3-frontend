import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { TextField, Box } from '@mui/material';
import { API } from '../../lib/api';

export default function Search() {
  const [products, setProduct] = useState([]);
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    API.GET(API.ENDPOINTS.search(query)).then(({ data }) => {
      if (query) {
        setIsOpen(true);
        setProduct(data);
      }
    });
  }, [query]);

  // console.log('Product data from search', products);

  useEffect(() => {
    const clearup = () => {
      setIsOpen(false);
      setQuery('');
      setProduct([]);
    };

    return clearup;
  }, []);

  return (
    <Box sx={{ position: 'relative' }} className='SEARCH-CONTAINER'>
      <TextField
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder='Search...'
      />
      {isOpen && (
        <Box
          sx={{ position: 'absolute', zIndex: 1, width: '250px' }}
          className='OPTIONS-CONTAINER'
        >
          <Box
            component='ul'
            sx={{ backgroundColor: '#ececec', padding: '10px', width: '100%' }}
          >
            {products.map((product) => (
              <Box component='li' key={product._id} sx={{ listStyle: 'none' }}>
                <Link to={`/products/${product._id}`}>{product.name}</Link>
              </Box>
            ))}
          </Box>
        </Box>
      )}
    </Box>
  );
}
