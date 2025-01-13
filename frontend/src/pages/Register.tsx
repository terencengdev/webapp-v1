import { useState } from "react";
import axios, { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";
import { useForm, useWatch } from "react-hook-form";
import {
  TextFieldElement,
  PasswordElement,
  PasswordRepeatElement,
  FormErrorProvider,
} from "react-hook-form-mui";

//mui
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Navigation from "../component/Navigation";
import Snackbar from "@mui/material/Snackbar";

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

export default function Register() {
  const [alert, setAlert] = useState(false);
  const [error_alert, setErrorAlert] = useState(false);
  const [alertContent, setAlertContent] = useState("");
  const [loading, setLoading] = useState(false);

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

    const password_repeat = useWatch({
      control,
      name: "password_repeat", // without supply name will watch the entire form, or ['firstName', 'lastName'] to watch both
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
        disabled={loading || !user_id || !password || !password_repeat}
      >
        Register
      </Button>
    );
  }

  const { control, handleSubmit } = useForm({
    defaultValues: {
      user_id: "",
      password: "",
      password_repeat: "",
    },
  });

  const navigate = useNavigate();
  const apiUrl = import.meta.env.VITE_API_URL;

  // Function to handle form submission
  const onSubmit = async (data: any) => {
    setLoading(true);

    let user_id,
      password = "";
    try {
      // Clear previous error messages
      user_id = data.user_id;
      password = data.password;
      // Send login request to server
      const response = await axios.post(apiUrl + "/api/register", {
        user_id,
        password,
      });
      // If register successful, redirect to MainPage
      if (response.status === 200) {
        setErrorAlert(false);
        setAlertContent(response.data.message);
        setAlert(true);
        setLoading(false);

        setTimeout(() => {
          navigate("/");
        }, 1500);
      }
    } catch (error) {
      console.error("Error:", error);
      // // If login failed, display error message
      // setErrorMessage("Your Username and\nPassword are incorrect.");
      setLoading(false);

      setErrorAlert(true);
      if (error instanceof AxiosError && error.response) {
        setAlertContent(
          error.response.data.message
            ? error.response.data.message
            : error.message
        );
      }
    }
  };

  const handleClose = () => {
    setAlert(false);
  };

  return (
    <ThemeProvider theme={theme}>
      <Navigation></Navigation>
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
          Register <strong>MyApp</strong>
        </Typography>
        <Box
          sx={{
            width: "80%",
            maxWidth: 900,
          }}
        >
          <FormErrorProvider
            onError={(error) => {
              if (error.message === "Password should match") {
                return "Your passwords do not match";
              }
              return error?.message;
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
                  <Typography sx={{ flex: "0 0 30%" }} className="form-label">
                    Confirm Password*
                  </Typography>

                  <PasswordRepeatElement
                    required
                    sx={{ flex: "0 0 70%" }}
                    name={"password_repeat"}
                    label={"Confirm Password"}
                    passwordFieldName={"password"}
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
                  <Subcomponent control={control} />
                </Box>
              </Box>
            </form>
          </FormErrorProvider>
          <Typography
            sx={{ fontWeight: 300, flex: "0 0 30%" }}
            className="form-label"
          >
            Already have an account?{" "}
            <Link className="loginLink" color="inherit" href="/">
              Login here.
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
