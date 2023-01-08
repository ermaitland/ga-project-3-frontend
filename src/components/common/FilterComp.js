import Filter from './Filter';

import { useState, useEffect } from 'react';

import { API } from '../../lib/api';

import { Box, Button } from '@mui/material';

export default function FilterComp({ onBrandsSelected, onCategoriesSelected }) {
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);

  useEffect(() => {
    API.GET(API.ENDPOINTS.allBrands)
      .then(({ data }) => {
        setBrands(data);
      })
      .catch(({ message, response }) => {
        console.error(message, response);
      });
  }, []);

  useEffect(() => {
    API.GET(API.ENDPOINTS.getAllCategories)
      .then(({ data }) => {
        setCategories(data);
      })
      .catch(({ message, response }) => {
        console.error(message, response);
      });
  }, []);

  if (brands === null) {
    return <p>Brands still Loading</p>;
  }
  // else {
  //   console.log('Brands Data from FilterComp', brands);
  // }

  if (categories === null) {
    return <p>Categories still Loading</p>;
  }
  // else {
  //   console.log('Categories Data from FilterComp', categories);
  // }

  return (
    <>
      <p>Filter by</p>

      <Box sx={{ mb: 2 }}>
        <Filter
          pulledOptions={brands}
          labelLabel='Filter by brand'
          placeholderText='Brand'
          onChange={(event, selectedBrandOptions) => {
            onBrandsSelected(selectedBrandOptions);
            console.log('SELECTED BRANDS', selectedBrandOptions);
          }}
        />
        <Filter
          pulledOptions={categories}
          labelText='Filter by category'
          placeholderText='Category'
          onChange={(event, selectedCategorisOptions) => {
            onCategoriesSelected(selectedCategorisOptions);
            console.log('SELECTED CATEGORIES', selectedCategorisOptions);
          }}
        />
      </Box>
      <Button type='submit'>Set Filter</Button>
    </>
  );
}
