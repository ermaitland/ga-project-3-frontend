// import {useNavigate} from 'react-router-dom';
import { Box, Card, CardContent, Typography } from '@mui/material';
import ProfilePicture from './ProfilePicture';

export default function UserCard({ name, reviews, imageId }) {
  // const navigate = useNavigate();
  // const navigateToUser = () => navigate(`/user/${id}`);
  return (
    <Card sx={{ display: 'flex' }}>
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
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
        sx={{ width: 151, alignItem: 'flex-end' }}
        imageId={imageId}
        alt='Profile Picture'
      />
    </Card>
  );
}
