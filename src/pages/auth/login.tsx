import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Button, TextField, Typography, Box } from "@mui/material";
import { useAppDispatch } from "../../Redux/Hooks/store";
import { setUserInfo } from "../../Redux/feature/authSlice";
import { useNavigate } from "react-router-dom";

// Define types for form inputs
interface LoginFormInputs {
  username: string;
  password: string;
}

const Login: React.FC = () => {
  // Initialize React Hook Form
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormInputs>();

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  // Handle form submission
  const onSubmit: SubmitHandler<LoginFormInputs> = async (data) => {
    // Mock login API call
    try {
      // Simulate an API call delay
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const userInfo = {
        user: { userName: data.username, password: data.password },
      };
      dispatch(setUserInfo(userInfo));
      navigate("/");
    } catch (error) {
      console.log(error)
    }
  };

  return (
    <Box
      sx={{
        maxWidth: "400px",
        margin: "auto",
        marginTop: "5rem",
        padding: "2rem",
        boxShadow: 3,
        borderRadius: "8px",
        backgroundColor: "white",
      }}
    >
      <Typography
        variant="h5"
        sx={{ marginBottom: "1rem", textAlign: "center" }}
      >
        Login
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        {/* Username Field */}
        <TextField
          fullWidth
          label="Username"
          variant="outlined"
          margin="normal"
          {...register("username", {
            required: "Username is required",
          })}
          error={!!errors.username}
          helperText={errors.username?.message}
        />

        {/* Password Field */}
        <TextField
          fullWidth
          type="password"
          label="Password"
          variant="outlined"
          margin="normal"
          {...register("password", {
            required: "Password is required",
            minLength: {
              value: 6,
              message: "Password must be at least 6 characters long",
            },
          })}
          error={!!errors.password}
          helperText={errors.password?.message}
        />

        {/* Submit Button */}
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{ marginTop: "1.5rem" }}
          disabled={isSubmitting}
        >
          {isSubmitting ? "Logging in..." : "Login"}
        </Button>
      </form>
    </Box>
  );
};

export default Login;
