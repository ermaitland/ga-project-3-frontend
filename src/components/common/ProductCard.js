import { useNavigate } from 'react-router-dom';

import ProductRating from './ProductRating';

import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  CardActionArea,
  Box
} from '@mui/material';

export default function ProductCard({
  name,
  image,
  brand = 'No Brand',
  category = 'No Category',
  rating,
  id
}) {
  const navigate = useNavigate();
  const navigateToProduct = () => navigate(`/products/${id}`);

  return (
    <Card sx={{ maxWidth: 400, height: 500 }}>
      <CardActionArea onClick={navigateToProduct}>
        <CardMedia
          component='img'
          image={image}
          alt={name}
          sx={{ maxHeight: 250, objectFit: 'contain' }}
        />
        <CardContent>
          <Typography gutterBottom variant='h6' component='div'>
            {name}
          </Typography>
          <Typography variant='body2' color='text.secondary'>
            {brand}
          </Typography>
          <Typography variant='body2' color='text.secondary'>
            {category}
          </Typography>
          <Box sx={{ minWidth: 'max-content' }}>
            <ProductRating rating={rating} size='sm' />
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
