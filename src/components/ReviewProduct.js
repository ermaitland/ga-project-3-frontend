import { TextareaAutosize, Button } from '@mui/material';
import { Box, Container } from '@mui/system';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { API } from '../lib/api';
import ProductRating from './common/ProductRating';

export default function ReviewProduct() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [textValue, setTextValue] = useState('');
  const [rating, setRating] = useState(0);

  const handleTextChange = (e) => setTextValue(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();
    API.POST(
      API.ENDPOINTS.createReview(id),
      { text: textValue, rating: rating },
      API.getHeaders()
    )
      .then(({ data }) => {
        console.log({ data });
        navigate(`/products/${id}`);
      })
      .catch((e) => console.log(e));
  };

  return (
    <Container>
      <form onSubmit={handleSubmit}>
        <Box>
          <TextareaAutosize
            name='text'
            value={textValue}
            placeholder='Leave a Review'
            label='Review'
            type='textarea'
            onChange={handleTextChange}
            minRows={10}
            style={{ width: 500 }}
          />
        </Box>
        <Box>
          <ProductRating rating={rating} setRating={setRating} />{' '}
        </Box>
        <Button type='Submit'>Send your review!</Button>
      </form>
    </Container>
  );
}