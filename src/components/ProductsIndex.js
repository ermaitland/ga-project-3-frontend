import { useEffect, useState } from 'react';
import { API } from '../lib/api';

import { Box, Container, Grid, useStepContext } from '@mui/material';
import '../styles/ProductIndex.scss';

import ProductCard from './common/ProductCard';
import Search from './common/Search';
import Search2 from './common/Search2';
import FilterComp from './common/FilterComp';

export default function ProductsIndex() {
  const [products, setProducts] = useState(null);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);

  useEffect(() => {
    API.GET(
      API.ENDPOINTS.getFilteredProducts(selectedCategories, selectedBrands)
    )
      .then(({ data }) => {
        console.log('DATA', data);
        setProducts(data);
      })
      .catch(({ message, response }) => console.error(message, response));
  }, [selectedBrands, selectedCategories]);

  if (products === null) {
    return <p>Loading</p>;
  }

  return (
    <Container maxwith='lg' className='ProductIndex'>
      <Search2 />
      <Box sx={{ mb: 2 }}>
        <FilterComp
          onBrandsSelected={(selectedBrandOptions) =>
            setSelectedBrands(selectedBrandOptions.map((brand) => brand._id))
          }
          onCategoriesSelected={(selectedCategories) =>
            setSelectedCategories(
              selectedCategories.map((category) => category._id)
            )
          }
        />
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
