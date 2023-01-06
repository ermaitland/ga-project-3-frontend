import { useEffect, useState } from 'react';
import { API } from '../lib/api';
import { Link } from 'react-router-dom';

import {
  CardActionArea,
  Card,
  CardContent,
  CardMedia,
  Button
} from '@mui/material';

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
    <CardContent>
      <div>
        {!brands ? (
          <p>null</p>
        ) : (
          <>
            {brands?.map((brand) => (
              <Link to={`/brands/${brand._id}/products`}>
                <Card sx={{ maxWidth: 345 }}>
                  <CardActionArea>
                    <CardMedia
                      component='img'
                      height='140'
                      alt='vegan food iamge'
                      image={brand?.image}
                    />
                    <CardContent>
                      <Button gutterBottom variant='h5' component='div'>
                        {brand?.name}
                      </Button>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Link>
            ))}
          </>
        )}
      </div>
    </CardContent>
  );
}

// {
//   /* {brand.products.map((product) => (
// <p>{product}</p> */
// }
// {
//   /* ))} */
// }
