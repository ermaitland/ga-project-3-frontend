import { useNavigate } from 'react-router-dom';
import { Box, Card, CardActions, CardContent, Typography } from '@mui/material';
import ProfilePicture from './ProfilePicture';
import '../../styles/Users.scss';

export default function UserCard({ name, reviews, imageId, userId }) {
  const navigate = useNavigate();
  const navigateToSingleUser = () => navigate(`/profile/${userId}`);
  return (
    <Card sx={{ display: 'flex' }} className='Users'>
      <CardActions onClick={navigateToSingleUser}>
        <Box sx={{ display: 'flex', flexDirection: 'column' }} pr={9}>
          <CardContent sx={{ flex: '1 0 auto' }}>
            <Typography component='div' variant='h4'>
              {name}
            </Typography>
            <Typography
              variant='subtitle1'
              color='text.secondary'
              component='div'
            >
              Number of Reviews: {reviews}
            </Typography>
          </CardContent>
        </Box>
        <ProfilePicture
          component='img'
          sx={{ width: 151 }}
          imageId={imageId}
          alt='Profile Picture'
          className='image'
        />
      </CardActions>
    </Card>
  );
}
