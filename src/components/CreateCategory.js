import { useEffect, useState } from 'react';
import { NOTIFY } from '../lib/notifications';
import {
  TextField,
  Container,
  Box,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography
} from '@mui/material';

import { API } from '../lib/api';

export default function CreateCategory() {
  const [formData, setFormData] = useState({
    name: ''
  });
  const [error, setError] = useState(false);
  const [availableCategories, setAvailableCategories] = useState([]);

  useEffect(() => {
    API.GET(API.ENDPOINTS.getAllCategories)
      .then(({ data }) => setAvailableCategories(data))
      .catch((e) => console.log(e));
  }, [availableCategories]);

  const handleChange = (e) => {
    console.log(e);
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = formData;

    API.POST(API.ENDPOINTS.getAllCategories, data, API.getHeaders())
      .then(({ data }) => {
        NOTIFY.SUCCESS(`Created ${data.name}`);
      })
      .catch((e) => {
        if (e.status === 301) {
          setError(true);
        }
        console.log(e);
      });
  };

  return (
    <>
      <Typography variant='h2' component='p'>
        Create a Category
      </Typography>
      <Box sx={{ mb: 2 }}>
        <p>Already Available Categories</p>
        {availableCategories.map((category) => (
          <Typography variant='h5' component='p' key={category._id}>
            {category.name}
          </Typography>
        ))}
      </Box>
      <Container
        maxWidth='lg'
        sx={{ display: 'flex', justifyContent: 'center', pt: 5 }}
      >
        <form onSubmit={handleSubmit}>
          <Box sx={{ mb: 2 }}>
            <TextField
              size='small'
              type='text'
              value={formData.name}
              onChange={handleChange}
              error={error}
              label='Name'
              name='name'
            />
          </Box>
          <Button type='submit'>ADD MY CATEGORY</Button>
        </form>
      </Container>
    </>
  );
}
