import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { API } from '../lib/api';

import ProductRating from './common/ProductRating';
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
      </div>
      <Container maxWidth='lg' sx={{ display: 'flex' }} className='Product'>
        <Box>
          <img src={singleProduct.image} alt={singleProduct.name} />
        </Box>
        <CardActions>
          <Link to={`/products/${singleProduct?._id}/reviews`}>
            <Button size='small'>Create a Review</Button>
          </Link>
        </CardActions>
        <CardContent>
          <Typography variant='h5' component='p'>
            {singleProduct.name}
          </Typography>
          <Typography color='text.secondary'>
            Brand: {singleProduct.brand.name}
          </Typography>
          <Typography color='text.secondary'>
            Category: {singleProduct.category.name}
          </Typography>
          <Typography color='text.primary' sx={{ fontSize: 18 }} gutterBottom>
            Decription: {singleProduct.description}
          </Typography>
          <ProductRating rating={Product.rating || 0} />
        </CardContent>
      </Container>
    </>
  );
}
