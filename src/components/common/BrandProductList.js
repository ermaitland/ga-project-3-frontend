import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { API } from '../../lib/api';
import { Link } from 'react-router-dom';

import React from 'react';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import { CardActionArea } from '@mui/material';

import ProductCard from './ProductCard';

export default function BrandProductList() {
  console.log('heollo');
  const [brandProducts, setBrandProducts] = useState(null);

  const { id } = useParams();

  useEffect(() => {
    API.GET(API.ENDPOINTS.allProductsfForBrand(id))
      .then(({ data }) => {
        setBrandProducts(data);
      })
      .catch(({ message, response }) => {
        console.error(message, response);
      });
  }, [id]);

  console.log('The information', brandProducts);
  // console.log('The information 2', brandProducts[0]);

  return (
    <Card sx={{ maxWidth: 345 }}>
      {!brandProducts ? (
        <p>Loading...</p>
      ) : (
        <CardActionArea>
          <div>
            {!brandProducts ? (
              <p>Loading...</p>
            ) : (
              <>
                <CardMedia
                  component='img'
                  height='140'
                  image='/static/images/cards/contemplative-reptile.jpg'
                  alt='green iguana'
                />
                {brandProducts?.products.map((brandProduct) => (
                  <Link to={`/products/${brandProduct._id}`}>
                    <ProductCard
                      name={brandProduct.name}
                      image={brandProduct.image}
                      brand={brandProduct.brand}
                      category={brandProduct.category}
                      key={brandProduct._id}
                    />
                  </Link>
                ))}
              </>
            )}
          </div>
        </CardActionArea>
      )}
    </Card>
  );
}
{
  /* <Link to={`/brands/${brand._id}/products`} key={brand._id}> */
}
