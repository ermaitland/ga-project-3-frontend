import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { API } from '../../lib/api';
import { Link } from 'react-router-dom';

import React from 'react';
import '../styles/App.css';

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

  return (
    <div className='brand-container'>
      {!brandProducts ? (
        <p>Loading...</p>
      ) : (
        <>
          {brandProducts?.products.map((brandProduct) => (
            <Link to={`/products/${brandProduct._id}`} key={brandProduct._id}>
              <ProductCard
                name={brandProduct.name}
                image={brandProduct.image}
                description={brandProduct.description}
              />
            </Link>
          ))}
        </>
      )}
    </div>
  );
}
