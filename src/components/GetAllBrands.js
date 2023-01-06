import { useEffect, useState } from 'react';
import { API } from '../lib/api';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';

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

  console.log(brands);
  console.log('hello');

  return (
    <>
      <div>
        {!brands ? (
          <p>null</p>
        ) : (
          <>
            {brands.map((brand) => (
              <>
                <Card sx={{ maxWidth: 345 }}>
                  <CardActionArea>
                    <CardMedia
                      component='img'
                      height='140'
                      alt='vegan food iamge'
                      image={brand.image}
                    />
                    <CardContent>
                      <Typography gutterBottom variant='h5' component='div'>
                        {brand.name}
                      </Typography>
                      <Typography variant='body2' color='text.secondary'>
                        {brand.products.map((product) => (
                          <p>{product}</p>
                        ))}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </>
            ))}
            {/* <p>{brands[0].products[0]}</p> */}
          </>
        )}
      </div>
    </>
  );
}
