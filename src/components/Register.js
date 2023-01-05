import { Container, Button, TextField } from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { API } from '../lib/api';
import { AUTH } from '../lib/auth';

export default function Register() {
  const navigate = useNavigate();
  const [formFields, setFormFields] = useState({
    email: '',
    username: '',
    password: '',
    passwordConfirmation: ''
  });
  const [error, setError] = useState(false);
  const [file, setFile] = useState(null);

  const handleChange = (e) => {
    setFormFields({ ...formFields, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const imageData = new FormData();
    imageData.append('file', file);
    imageData.append(
      'upload_preset',
      process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET
    );
    try {
      const cloudinaryResponse = await API.POST(
        API.ENDPOINTS.cloudinary,
        imageData
      );

      const apiReqBody = {
        ...formFields,
        cloudinaryImageId: cloudinaryResponse.data.public_id
      };

      await API.POST(API.ENDPOINTS.register, apiReqBody);

      const loginData = await API.POST(API.ENDPOINTS.login, {
        email: formFields.email,
        password: formFields.password
      });

      AUTH.setToken(loginData.data.token);
      navigate('/');
      // When have the routes navigate to the products page
    } catch (e) {
      console.log(e);
      setError(e);
    }
  };

  return (
    <Container>
      <form onSubmit={handleSubmit}>
        <div>
          <TextField
            size='small'
            name='username'
            id='username'
            type='text'
            label='Username'
            required={true}
            value={formFields.username}
            onChange={handleChange}
            error={error}
            sx={{ mb: 2 }}
          />
        </div>
        <div>
          <TextField
            size='small'
            name='email'
            id='email'
            type='email'
            label='Email'
            required={true}
            value={formFields.email}
            onChange={handleChange}
            error={error}
            sx={{ mb: 2 }}
          />
        </div>
        <div>
          <TextField
            size='small'
            name='password'
            id='password'
            type='password'
            label='Password'
            required={true}
            value={formFields.password}
            onChange={handleChange}
            error={error}
            sx={{ mb: 2 }}
          />
        </div>
        <div>
          <TextField
            size='small'
            name='passwordConfirmation'
            id='passwordConfirmation'
            type='password'
            label='Password Confirmation'
            required={true}
            value={formFields.passwordConfirmation}
            onChange={handleChange}
            error={error}
            sx={{ mb: 2 }}
          />
        </div>
        <div>
          <TextField
            size='small'
            name='profile-picture'
            id='profile-picture'
            type='file'
            onChange={handleFileChange}
            sx={{ mb: 2 }}
          />
        </div>
        <Button type='submit'>Register!</Button>
      </form>
    </Container>
  );
}
