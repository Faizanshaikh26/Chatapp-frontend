import { useFileHandler, useInputValidation } from '6pp';
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import {
  Avatar,
  Button,
  Container,
  IconButton,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { VisuallyHiddeninput } from "../components/styles/StyledComponents";
import { server } from "../constants/config";
import { userExists } from "../redux/reducer/auth";
import { usernameValidator } from "../utils/Validators";

function Signup() {
  const [isLogin, setIsLogin] = useState(true);
  const username = useInputValidation("", usernameValidator);
  const avatar = useFileHandler("single");
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    bio: "",
    name: "",
  });

  const [loading, setLoading] = useState(false);

  const handleSignup = async (e) => {
    e.preventDefault();

    if (!avatar.file) {
      toast.error("Please upload an avatar");
      return;
    }

    const formDataToSend = new FormData();
    formDataToSend.append("username", formData.username);
    formDataToSend.append("email", formData.email);
    formDataToSend.append("password", formData.password);
    formDataToSend.append("bio", formData.bio);
    formDataToSend.append("name", formData.name);
    formDataToSend.append("avatar", avatar.file);

    try {
      const response = await fetch(`${server}/api/v1/user/signup`, {
        method: "POST",
        body: formDataToSend,
        withCredentials: true,  // Ensure credentials are included
      });

      const responsedata = await response.json();
      if (responsedata.success) {
        localStorage.setItem("auth-token", responsedata.token);
        dispatch(userExists(true));
        toast.success(responsedata.message);
      } else {
        toast.error(responsedata.error);
      }
    } catch (error) {
      toast.error(error.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handlechange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
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
        <Typography variant="h5">Sign Up</Typography>
        <form
          style={{
            width: "100%",
            marginTop: "1rem",
          }}
          onSubmit={handleSignup}
        >
          <Stack position={"relative"} width={"6rem"} margin={"auto"}>
            <Avatar
              sx={{
                width: "6rem",
                height: "6rem",
                objectFit: "contain",
              }}
              src={avatar.preview}
            />
            <IconButton
              sx={{
                position: "absolute",
                bottom: "1px",
                right: "-6px",
                color: "white",
                bgcolor: "rgba(0,0,0,0.5)",
                ":hover": {
                  bgcolor: "rgba(0,0,0,0.7)",
                },
                width: '30px',
                height: '30px'
              }}
              component='label'
            >
              <>
                <CameraAltIcon sx={{ width: '15px', height: '15px' }} />
                <VisuallyHiddeninput type="file" onChange={avatar.changeHandler} />
              </>
            </IconButton>
          </Stack>
          <TextField
            required
            fullWidth
            label="Name"
            margin="normal"
            variant="outlined"
            value={formData.name}
            onChange={handlechange}
            name="name"
          />
          <TextField
            required
            fullWidth
            label="Bio"
            margin="normal"
            variant="outlined"
            value={formData.bio}
            onChange={handlechange}
            name="bio"
          />
          <TextField
            required
            fullWidth
            label="Username"
            margin="normal"
            variant="outlined"
            value={formData.username}
            onChange={handlechange}
            name="username"
          />
          {username.error && (
            <Typography color="error" variant="caption">
              {username.error}
            </Typography>
          )}
          <TextField
            required
            fullWidth
            label="E-mail"
            margin="normal"
            variant="outlined"
            value={formData.email}
            onChange={handlechange}
            name="email"
            type="email"
          />
          <TextField
            required
            fullWidth
            label="Password"
            type="password"
            margin="normal"
            variant="outlined"
            value={formData.password}
            onChange={handlechange}
            name="password"
          />
          <Button
            sx={{ marginTop: "1rem" }}
            variant="contained"
            color="primary"
            type="submit"
            fullWidth
          >
            Sign Up
          </Button>
          <Typography textAlign={"center"} m={"1rem"}>
            Or
          </Typography>
          <Button variant="text" fullWidth>
            Login
          </Button>
        </form>
      </Paper>
    </Container>
  )
}

export default Signup;
