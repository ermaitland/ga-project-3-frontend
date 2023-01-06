import { API } from '../lib/api';
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Container } from '@mui/system';
import ProfilePicture from './common/ProfilePicture';
import { Button, CardContent, Typography } from '@mui/material';
import { useAuthenticated } from '../hook/useAuthenticated';

export default function User() {
  const [isLoggedIn] = useAuthenticated();
  const { userId } = useParams();
  const [singleUser, setSingleUser] = useState('');
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
          {isLoggedIn && <Typography>{singleUser?.user.reviews}</Typography>}
        </CardContent>
        <Button onClick={goBackToProducts}>Back to Browsing!</Button>
      </Box>
    </Container>
  );
}
