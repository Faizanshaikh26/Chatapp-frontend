import {
    Button,
    Container,
    Paper,
    TextField,
    Typography
  } from "@mui/material";
  import axios from 'axios'; // Import Axios
  import React, { useState } from "react";
  import toast from "react-hot-toast";
  import { useDispatch } from "react-redux";
  import { server } from "../constants/config";
  import { userExists } from "../redux/reducer/auth";
  
  function Loginn() {
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
      email: '',
      password: '',
    });
  
    const handleChange = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    };
  
    const dispatch = useDispatch();
  
    const handleLogin = async (e) => {
      e.preventDefault();
      setLoading(true); // Set loading state at the beginning
  
      if (!formData.email || !formData.password) {
        toast.error('Please provide email and password');
        setLoading(false); // Reset loading state
        return;
      }
  
      try {
        const response = await axios.post(`${server}/api/v1/user/login`, formData, {
          withCredentials: true, // Ensure credentials are included
        });
  
        const data = response.data;
  
        if (!data.success) {
          throw new Error(data.message || "Something went wrong");
        }
  
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        dispatch(userExists(true));
        toast.success(data.message);
      } catch (error) {
        toast.error(error.message || "Something went wrong");
      }
  
      setLoading(false);
    };
  
    return (
      <Container
        component={"main"}
        maxWidth="xs"
        sx={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Paper
          elevation={3}
          sx={{
            padding: 4,
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <Typography variant="h5">Login</Typography>
          <form
            style={{
              width: "100%",
              marginTop: "1rem",
            }}
            onSubmit={handleLogin}
          >
            <TextField
              required
              fullWidth
              label="E-mail"
              margin="normal"
              variant="outlined"
              name="email"
              value={formData.email}
              onChange={handleChange}
              type="email"
            />
            <TextField
              required
              fullWidth
              label="Password"
              type="password"
              margin="normal"
              variant="outlined"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
            <Button
              sx={{ marginTop: "1rem" }}
              variant="contained"
              color="primary"
              type="submit"
              fullWidth
              disabled={loading}
            >
              {loading ? 'Logging in...' : 'Login'}
            </Button>
          </form>
        </Paper>
      </Container>
    );
  }
  
  export default Loginn;
  