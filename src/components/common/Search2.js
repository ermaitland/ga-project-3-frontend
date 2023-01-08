import * as React from 'react';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Autocomplete from '@mui/material/Autocomplete';

import { useState, useEffect } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { Box } from '@mui/material';
import { API } from '../../lib/api';

export default function Search2() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [query, setQuery] = useState('');

  const navigate = useNavigate();
  const [productOption, setProductOption] = useState();
  // const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    API.GET(API.ENDPOINTS.getAllProducts)
      .then(({ data }) => {
        // console.log('DATA', data);
        setProducts(data);
      })
      .catch(({ message, response }) => console.error(message, response));
  }, []);

  useEffect(() => {
    API.GET(API.ENDPOINTS.search(query)).then(({ data }) => {
      if (query) {
        // setIsOpen(true);
        setFilteredProducts(data);
      }
    });
  }, [query]);

  // console.log('Product Data from Search2', products);
  // console.log('Filtered Product Data from Search2', filteredProducts);

  useEffect(() => {
    const clearup = () => {
      // setIsOpen(false);
      setQuery('');
      setFilteredProducts([]);
    };

    return clearup;
  }, []);

  return (
    <Stack spacing={2} sx={{ width: 300 }}>
      <Autocomplete
        options={filteredProducts.length > 0 ? filteredProducts : products}
        getOptionLabel={(product) => product.name}
        // value={productOption}
        onChange={(event, newValue) => {
          navigate(`/products/${newValue.id}`);
        }}
        // Don't use build in matching logic, as it just filters through product names, but we use API query to manually control autocomplete list
        filterOptions={(product) => product}
        renderInput={(params) => (
          <TextField
            {...params}
            onChange={(e) => {
              console.log('User is Typing', e.target.value);
              if (e.target.value !== '') {
                setQuery(e.target.value);
              } else {
                setFilteredProducts([]);
              }
            }}
            label='Search for product name or description'
          />
        )}
      />
    </Stack>
  );
}
