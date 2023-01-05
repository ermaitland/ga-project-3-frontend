import { useEffect, useState } from 'react';
import { API } from '../lib/api';
// import Card from '@mui/material/Card';
// import CardActions from '@mui/material/CardActions';
// import CardContent from '@mui/material/CardContent';
// import CardMedia from '@mui/material/CardMedia';
// import Button from '@mui/material/Button';
// import Typography from '@mui/material/Typography';

// import { Container, Grid } from '@mui/material';

export default function GetAllBrandsIndex() {
  const [brands, setBrands] = useState(null);

  useEffect(() => {
    API.GET(API.ENDPOINTS.allBrands)
      .then(({ data }) => {
        setBrands(data);
      })
      .catch(({ message, response }) => {
        console.error(message, response);
      });
  }, []);

  console.log({ brands });
  console.log('hello');

  return { brands: [0] };
}
