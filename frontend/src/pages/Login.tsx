import { useState, useEffect } from "react";
import axios, { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";
import { useForm, useWatch } from "react-hook-form";
import { TextFieldElement, PasswordElement } from "react-hook-form-mui";

// mui
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Navigation from "../component/Navigation";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Snackbar from "@mui/material/Snackbar";
import { setCookie, getCookie } from "typescript-cookie";

const theme = createTheme();

theme.typography.h1 = {
  fontFamily: `"Roboto", "Helvetica", "Arial", sans-serif`,

  fontSize: "3rem",
  "@media (min-width:600px)": {
    fontSize: "3.5rem",
  },
  [theme.breakpoints.up("md")]: {
    fontSize: "4.5rem",
  },
};

export default function Login() {
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(false);
  const [error_alert, setErrorAlert] = useState(false);
  const [alertContent, setAlertContent] = useState("");
  const [keepMeLoggedIn, setKeepMeLoggedIn] = useState(false);

  const { control, handleSubmit } = useForm({
    defaultValues: {
      user_id: "",
      password: "",
      password_repeat: "",
    },
  });

  const navigate = useNavigate();
  const token = getCookie("authToken");
  const apiUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    // Redirect to Home if token exists
    if (token) {
      navigate("/home", { replace: true });
    }
  }, [token, navigate]);

  // Function to handle form submission
  const onSubmit = async (data: any) => {
    let user_id,
      password = "";
    try {
      // Clear previous error messages
      user_id = data.user_id;
      password = data.password;
      // Send login request to server
      setLoading(true);
      const response = await axios.post(apiUrl + "/api/login", {
        user_id,
        password,
      });
      setLoading(false);
      // If register successful, redirect to MainPage
      if (response.status === 200) {
        setErrorAlert(false);
        setAlertContent(response.data.message);
        setAlert(true);

        // Save token to localStorage for authentication
        localStorage.setItem("token", response.data.token);

        localStorage.setItem("userid", response.data.user_id);

        if (keepMeLoggedIn) {
          setCookie("authToken", response.data.token, { expires: 365 });
        } else {
          setCookie("authToken", response.data.token);
        }

        setTimeout(() => {
          navigate("/home");
        }, 1000);
      }
    } catch (error) {
      console.error("Error:", error);
      // // If login failed, display error message
      setErrorAlert(true);
      if (error instanceof AxiosError && error.response) {
        setAlertContent(error.response.data.message);
      }
    }
  };

  const handleClose = () => {
    setAlert(false);
  };

  function Subcomponent({ control }: { control: any }) {
    const user_id = useWatch({
      control,
      name: "user_id", // without supply name will watch the entire form, or ['firstName', 'lastName'] to watch both
      defaultValue: "", // default value before the render
    });

    const password = useWatch({
      control,
      name: "password", // without supply name will watch the entire form, or ['firstName', 'lastName'] to watch both
      defaultValue: "", // default value before the render
    });

    return (
      <Button
        type="submit"
        size="medium"
        sx={{
          backgroundColor: "#000",
          marginBottom: "5%",
          width: 200,
        }}
        variant="contained"
        disabled={!user_id || !password}
      >
        Login
      </Button>
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <Navigation></Navigation>
      <Container maxWidth="lg"></Container>
      <Container
        maxWidth="md"
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Typography
          className="main-title"
          variant="h1"
          sx={{ fontWeight: 300 }}
          gutterBottom
        >
          Welcome to <strong> myApp</strong>
        </Typography>
        <Box
          sx={{
            width: "80%",
            maxWidth: 900,
          }}
        >
          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  marginBottom: "5%",
                }}
              >
                <Typography sx={{ flex: "0 0 30%" }} className="form-label">
                  User ID*
                </Typography>
                <TextFieldElement
                  control={control}
                  sx={{ flex: "0 0 70%" }}
                  required
                  id="user_id"
                  label="User ID"
                  type="text"
                  name={"user_id"}
                />
              </Box>

              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  marginBottom: "5%",
                }}
              >
                <Typography sx={{ flex: "0 0 30%" }} className="form-label">
                  Password*
                </Typography>
                <PasswordElement
                  required
                  sx={{ flex: "0 0 70%" }}
                  name={"password"}
                  label={"Password"}
                  control={control}
                />
              </Box>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  marginBottom: "5%",
                }}
              >
                <Typography
                  sx={{ flex: "0 0 30%" }}
                  className="form-label"
                ></Typography>

                <FormControlLabel
                  control={
                    <Checkbox
                      checked={keepMeLoggedIn}
                      onChange={(e) => setKeepMeLoggedIn(e.target.checked)}
                    />
                  }
                  label="Keep me logged in"
                />
              </Box>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  marginBottom: "5%",
                }}
              >
                <Typography
                  sx={{ flex: "0 0 30%" }}
                  className="form-label"
                ></Typography>
                <Subcomponent control={control} />
              </Box>
            </Box>
          </form>

          <Typography
            sx={{ fontWeight: 300, flex: "0 0 30%" }}
            className="form-label"
          >
            No account?{" "}
            <Link className="RegisterLink" color="inherit" href="/register">
              Register here.
            </Link>
          </Typography>
          {alert || error_alert ? (
            <Box
              sx={{
                marginTop: "5%",
                position: "fixed",
                width: "100%",
                bottom: 0,
                left: 0,
                right: 0,
              }}
            >
              <Snackbar
                // define location
                anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
                // open and onClose needs boolean. you can set inside useState
                open={alert || error_alert}
                onClose={handleClose}
                // after 6 seconds it will automatically close
                autoHideDuration={5000}
              >
                <Alert
                  sx={{ width: "100%", left: 0, right: 0, margin: "0 auto" }}
                  severity={error_alert ? "error" : "success"}
                >
                  {alertContent}
                </Alert>
              </Snackbar>
            </Box>
          ) : (
            <></>
          )}
        </Box>
      </Container>
    </ThemeProvider>
  );
}
