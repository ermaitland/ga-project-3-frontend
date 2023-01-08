import { useEffect, useState } from 'react';
import { API } from '../lib/api';

import { Box, Container, Grid } from '@mui/material';
import '../styles/ProductIndex.scss';

import ProductCard from './common/ProductCard';
import Search from './common/Search';
import FilterComp from './common/FilterComp';
import Filter from './common/Filter';

export default function ProductsIndex() {
  const [products, setProducts] = useState(null);

  useEffect(() => {
    API.GET(API.ENDPOINTS.getAllProducts)
      .then(({ data }) => {
        console.log('DATA', data);
        setProducts(data);
      })
      .catch(({ message, response }) => console.error(message, response));
  }, []);

  if (products === null) {
    return <p>Loading</p>;
  }
  return (
    <Container maxwith='lg' className='ProductIndex'>
      <Search />
      <Box sx={{ mb: 2 }}>
        <FilterComp />
      </Box>
      <Grid container spacing={2}>
        {products.map((product) => (
          <Grid items sm={12} md={4} key={product._id}>
            <ProductCard
              name={product.name}
              image={product.image}
              brand={product.brand.name}
              category={product.category.name}
              id={product._id}
              rating={product.rating || 0}
            />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
