import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../Context/Authcontext';
import axios from 'axios';
import { Box, Button, Typography, List, ListItem, Paper } from '@mui/material'; // Material UI imports

const Home = () => {
  const { token, logout } = useContext(AuthContext); // Extract the token from context
  const [orderHistory, setOrderHistory] = useState([]);
  const [error, setError] = useState(null); // State to capture any errors
  const [loading, setLoading] = useState(true); // State to show loading status

  useEffect(() => {
    if (token) {
      // Fetch user order history with the token
      const fetchOrderHistory = async () => {
        try {
          const response = await axios.get('https://uc-fd-auth-backend.onrender.com/user/orders', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setOrderHistory(response.data.orders);
        } catch (err) {
          setError('Failed to fetch order history.'); // Set error message
        } finally {
          setLoading(false); // Set loading to false after API call
        }
      };
      fetchOrderHistory();
    } else {
      setLoading(false); // If no token, stop loading
    }
  }, [token]);

  return (
    <Box display="flex" justifyContent="center" alignItems="center" height="100vh" p={3}>
      <Paper elevation={3} sx={{ width: 500, padding: '20px', textAlign: 'center' }}>
        {loading ? ( 
          <Typography variant="h6">Loading order history...</Typography>
        ) : error ? ( 
          <Typography variant="h6" color="error">{error}</Typography>
        ) : (
          <>
          <Typography variant="h4" gutterBottom>
              Welcome back, User!
          </Typography>
        <Button variant="contained" color="secondary" onClick={logout} sx={{ marginBottom: '20px' }} href='/login'>
              Logout
        </Button>
            <Typography variant="h5" gutterBottom>
              Order History:
        </Typography>
            <List>
              {orderHistory.length > 0 ? (
                orderHistory.map((order) => (
                  <ListItem key={order.id}>
                    <Typography variant="body1">{order.name}</Typography>
                  </ListItem>
                ))
              ) : (
                <Typography variant="body2">No orders found.</Typography>
              )}

            </List>
          </>
        )}
      </Paper>
    </Box>
  );
};

export default Home;
