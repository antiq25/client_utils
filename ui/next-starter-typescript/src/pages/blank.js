import React, { useEffect, useState, forwardRef } from 'react';
import { useRouter } from 'next/router';
import {
  Card,
  CardHeader,
  CardContent,
  TextField,
  FormHelperText,
  Link,
  Button,
  Snackbar,
  Container,
  Stack,
  Typography,
  Alert as MuiAlert
} from '@mui/material';
import { Seo } from 'src/components/seo';
import { useSettings } from 'src/hooks/use-settings';
import { apiHandler } from '../api/bundle';
import { VerticalLayout } from 'src/layouts/dashboard/vertical-layout/vertical-layout';

const Alert = forwardRef((props, ref) => (
  <MuiAlert elevation={6}
ref={ref}
variant="filled"
{...props} />
));
Alert.displayName = 'Alert';

const LoginPage = () => {
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);
  
  useEffect(() => {
    setIsClient(true);
  }, []);

  const settings = useSettings();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);

  if (!isClient) {
    return null;
  }

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');
    
    try {
      const response = await apiHandler.handleLogin(email, password);
      console.log('Login successful:', response);
      // Assuming the response will have a specific field on success. Adjust as needed.
      if (response.success) {
        setOpenSnackbar(true);
        setTimeout(() => {
          router.push('/');
        }, 2000);
      } else {
        // Handle the scenario where response is not successful
        setError(response.message || 'Login failed: Please try again.');
      }
    } catch (error) {
      // Handle the scenario where there is an exception during the API call
      setError('Login failed: Invalid credentials or server error');
      console.error('Login error:', error);
    }
  
    setIsSubmitting(false);
  };
  
  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackbar(false);
  };

  return (
    <VerticalLayout sections={[]}
navColor={settings.navColor}>
      <Seo title="Login" />
      <Container maxWidth={settings.stretch ? false : 'xl'}>
        <Card elevation={16}>
          <CardHeader
            subheader={
              <Typography color="text.secondary"
variant="body2">
                Don&apos;t have an account? &nbsp;
                <Link href="/register"
variant="body2">Register</Link>
              </Typography>
            }
            title="Log in"
          />
          <CardContent>
            <form onSubmit={handleLogin}
noValidate>
              <Stack spacing={3}>
                <TextField
                  autoFocus
                  error={Boolean(error)}
                  fullWidth
                  label="Email Address"
                  name="email"
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  value={email}
                />
                <TextField
                  error={Boolean(error)}
                  fullWidth
                  label="Password"
                  name="password"
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  value={password}
                />
              </Stack>
              {error && (
                <FormHelperText error
sx={{ mt: 3 }}>
                  {error}
                </FormHelperText>
              )}
              <Button
                disabled={isSubmitting}
                fullWidth
                size="large"
                sx={{ mt: 2 }}
                type="submit"
                variant="contained"
              >
                Log In
              </Button>
            </form>
          </CardContent>
        </Card>
      </Container>
      <Snackbar open={openSnackbar}
autoHideDuration={6000}
onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar}
severity="success"
sx={{ width: '100%' }}>
          Login successful! Redirecting...
        </Alert>
      </Snackbar>
    </VerticalLayout>
  );
};

export default LoginPage;
