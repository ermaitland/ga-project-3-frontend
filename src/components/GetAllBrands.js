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
import { useAuthenticated } from '../hook/useAuthenticated';

export default function GetAllBrandsIndex() {
  const [brands, setBrands] = useState(null);
  const [isLoggedIn] = useAuthenticated();

  useEffect(() => {
    API.GET(API.ENDPOINTS.allBrands)
      .then(({ data }) => {
        setBrands(data);
      })
      .catch(({ message, response }) => {
        console.error(message, response);
      });
  }, []);

  return (
    <CardContent>
      <div>
        {!brands ? (
          <p>Loading...</p>
        ) : (
          <>
            {brands?.map((brand) => (
              <>
                <Link to={`/brands/${brand._id}/products`} key={brand._id}>
                  <Card sx={{ maxWidth: 345 }}>
                    <CardActionArea>
                      <CardMedia
                        component='img'
                        height='140'
                        alt='vegan food iamge'
                        image={brand?.image}
                      />
                      <CardContent>
                        <Button variant='h5' component='div'>
                          {brand?.name}
                        </Button>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                </Link>
                {isLoggedIn ? (
                  <>
                    <button
                      onClick={() => {
                        API.DELETE(
                          API.ENDPOINTS.deleteBrand(brand._id),
                          API.getHeaders()
                        )
                          .then(() => console.log('deleted successfully'))
                          .then(() =>
                            API.GET(API.ENDPOINTS.allBrands)
                              .then(({ data }) => {
                                setBrands(data);
                              })
                              .catch(({ message, response }) => {
                                console.error(message, response);
                              })
                          )
                          .catch((e) => console.log(e));
                      }}
                    >
                      {' '}
                      Delete{' '}
                    </button>
                  </>
                ) : (
                  <></>
                )}
              </>
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
