import { useEffect, useState } from 'react';
import { API } from '../lib/api';

import { Container, Grid } from '@mui/material';

import ProductCard from './common/ProductCard';

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
    <Container maxwith='lg'>
      <Grid container spacing={2}>
        {products.map((product) => (
          <Grid items xs={4} key={product._id}>
            <ProductCard
              name={product.name}
              image={product.image}
              brand={product.brand}
              id={product._id}
            />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
