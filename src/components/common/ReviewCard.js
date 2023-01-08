import { useState } from 'react';
import ProductRating from './ProductRating';
import { AUTH } from '../../lib/auth';
import { API } from '../../lib/api';
import ProfilePicture from './ProfilePicture';
import {
  Card,
  CardContent,
  Typography,
  TextareaAutosize,
  CardActions,
  Button
} from '@mui/material';
import { Box } from '@mui/system';

export default function ReviewCard({
  text,
  reviewer,
  productId,
  reviewId,
  rating,
  setIsUpdated
}) {
  const [isEditMode, setIsEditMode] = useState(false);
  const [reviewText, setReviewText] = useState(text);
  const [reviewRating, setReviewRating] = useState(rating);

  const toggleEditMode = () => setIsEditMode(!isEditMode);

  const handleReviewTextChange = (e) => setReviewText(e.target.value);

  const saveChanges = () => {
    if (text !== reviewText || rating !== reviewRating) {
      API.PUT(
        API.ENDPOINTS.singleReview(productId, reviewId),
        { text: reviewText, rating: reviewRating },
        API.getHeaders()
      )
        .then(() => {
          toggleEditMode();
          setIsUpdated(true);
        })
        .catch((e) => console.log(e));
    }
  };

  const deleteReview = () =>
    API.DELETE(
      API.ENDPOINTS.singleReview(productId, reviewId),
      API.getHeaders()
    )
      .then(() => setIsUpdated(true))
      .catch((e) => console.log(e));

  const Rating = () =>
    isEditMode ? (
      <ProductRating
        rating={reviewRating}
        size={30}
        setRating={setReviewRating}
      />
    ) : (
      <ProductRating rating={rating} size={30} />
    );

  return (
    <Card sx={{ minWidth: 275, mb: 2 }}>
      <CardContent>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row-reverse',
            justifyContent: 'space-between'
          }}
        >
          <Box sx={{ alignSelf: 'flex-end' }}>
            {reviewer.cloudinaryImageId && (
              <ProfilePicture imageId={reviewer.cloudinaryImageId} />
            )}
          </Box>
          <Box sx={{ alignSelf: 'flex-start' }}>
            <Typography variant='h5' color='text.secondary'>
              {reviewer.username}
            </Typography>
          </Box>
        </Box>
        <Typography sx={{ fontSize: 14 }} color='text.secondary' gutterBottom />
        {isEditMode ? (
          <TextareaAutosize
            value={reviewText}
            onChange={handleReviewTextChange}
            style={{ width: '100%', height: '22px' }}
          />
        ) : (
          <Typography variant='h5' component='div'>
            {text}
          </Typography>
        )}
        <Rating />
      </CardContent>
      {(AUTH.getPayload().isAdmin || AUTH.isOwner(reviewer._id)) && (
        <CardActions>
          {AUTH.isOwner(reviewer._id) && (
            <Button size='small' onClick={toggleEditMode}>
              {isEditMode ? 'CANCEL' : 'Edit Review'}
            </Button>
          )}
          <Button
            size='small'
            onClick={isEditMode ? saveChanges : deleteReview}
          >
            {isEditMode ? 'SAVE' : 'Delete Review'}
          </Button>
        </CardActions>
      )}
    </Card>
  );
}
