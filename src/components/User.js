import { API } from '../lib/api';
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Container } from '@mui/system';
import ProfilePicture from './common/ProfilePicture';
import { Button, CardContent, Typography } from '@mui/material';
import ReviewCard from './common/ReviewCard';

export default function User() {
  const { id } = useParams();
  const { userId } = useParams();
  const [singleUser, setSingleUser] = useState(null);
  const [isUpdated, setIsUpdated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    API.POST(API.ENDPOINTS.singleUser(userId), {}, API.getHeaders())
      .then(({ data }) => {
        setSingleUser(data);
        console.log({ data });
      })
      .catch(({ message, response }) => {
        console.log(message, response);
      });
    setIsUpdated(false);
  }, [userId, isUpdated]);

  if (singleUser === null) {
    return <p>Loading User</p>;
  }
  console.log({ singleUser });

  const goBackToProducts = () => navigate('/products');

  return (
    <Container>
      <Box>
        {singleUser?.user.cloudinaryImageId && (
          <ProfilePicture imageId={singleUser?.user.cloudinaryImageId} />
        )}
      </Box>
      <Box>
        <CardContent>
          <Typography>{singleUser?.user.username}</Typography>
          {singleUser?.user.reviews && (
            <Box>
              {singleUser?.user.reviews.map((review) => (
                <ReviewCard
                  key={review._id}
                  text={review.text}
                  reviewer={review.reviewer}
                  productId={id}
                  reviewId={review._id}
                  rating={review.rating}
                  setIsUpdated={setIsUpdated}
                />
              ))}
            </Box>
          )}
        </CardContent>
        <Button onClick={goBackToProducts}>Back to Browsing!</Button>
      </Box>
    </Container>
  );
}
