import { useNavigate } from 'react-router-dom';

import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  CardActionArea
} from '@mui/material';

export default function ProductCard({ name, image, brand, category, id }) {
  const navigate = useNavigate();
  const navigateToProduct = () => navigate(`/products/${id}`);

  return (
    <Card sx={{ maxWidth: 345, height: 450 }}>
      <CardActionArea onClick={navigateToProduct}>
        <CardMedia
          component='img'
          image={image}
          alt={name}
          sx={{ maxHeight: 250, objectFit: 'contain' }}
        />
        <CardContent>
          <Typography gutterBottom variant='h5' component='div'>
            {name}
          </Typography>
          <Typography variant='body2' color='text.secondary'>
            {brand}
          </Typography>
          <Typography variant='body2' color='text.secondary'>
            {category}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
