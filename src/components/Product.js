import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { API } from '../lib/api';

import {
  Container,
  Box,
  CardActions,
  CardContent,
  Button,
  Typography
} from '@mui/material';

import '../styles/Product.scss';

export default function Product() {
  // const navigate = useNavigate();

  const { id } = useParams();
  const [singleProduct, setSingleProduct] = useState(null);

  useEffect(() => {
    API.GET(API.ENDPOINTS.getSingleProduct(id))
      .then(({ data }) => {
        setSingleProduct(data);
        console.log(`SINGLE PRODUCT DATA: ${data}`);
      })
      .catch(({ message, response }) => {
        console.error(message, response);
      });
  }, [id]);

  if (singleProduct === null) {
    return <p>Data is Loading</p>;
  }

  return (
    <>
      <div>
        <h1>this is the product page</h1>
        <p>{singleProduct.name}</p>
      </div>
      <Container maxWidth='lg' sx={{ display: 'flex' }} className='Product'>
        <Box>
          <img src={singleProduct.image} alt={singleProduct.name} />
        </Box>
      </Container>
    </>
  );
}
