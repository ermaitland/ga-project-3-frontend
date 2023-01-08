import Filter from './Filter';

import { useState, useEffect } from 'react';

import { API } from '../../lib/api';

import { Box } from '@mui/system';

export default function FilterComp() {
  const [categories, setCatgories] = useState([]);
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
        setCatgories(data);
      })
      .catch(({ message, response }) => {
        console.error(message, response);
      });
  }, []);

  if (brands === null) {
    return <p>Brands still Loading</p>;
  } else {
    console.log('Brands Data from FilterComp', brands);
  }

  if (categories === null) {
    return <p>Categories still Loading</p>;
  } else {
    console.log('Categories Data from FilterComp', categories);
  }

  return (
    <>
      <p>Filter by</p>
      <Box sx={{ mb: 2 }}>
        <Filter
          pulledOptions={brands}
          labelLabel='Filter by brand'
          placeholderText='Brand'
        />
      </Box>
      <Filter
        pulledOptions={categories}
        labelText='Filter by category'
        placeholderText='Category'
      />
      ;
    </>
  );
}
