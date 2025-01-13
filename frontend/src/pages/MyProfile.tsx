import React, { useState, useEffect } from "react";
import axios from "axios";

//mui
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Navigation from "../component/Navigation";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import EditIcon from "@mui/icons-material/Edit";

import Avatar from "@mui/material/Avatar";

const theme = createTheme();

theme.typography.h3 = {
  fontFamily: `"Roboto", "Helvetica", "Arial", sans-serif`,

  fontSize: "2rem",
  lineHeight: "1em",
  "@media (min-width:600px)": {
    fontSize: "2.5rem",
  },
  [theme.breakpoints.up("md")]: {
    fontSize: "3rem",
  },
};

export default function MyProfile() {
  const [tabindex, setTabIndex] = React.useState(0);
  const [image, setImage] = useState("");

  const [formData, setFormData] = useState({
    salutation: "",
    first_name: "",
    last_name: "",
    email_address: "",
    mobile_number: "",
    home_address: "",
    country: "",
    postal_code: "",
    nationality: "",
    date_of_birth: "",
    gender: "",
    marital_status: "",
    spouse_salutation: "",
    spouse_first_name: "",
    spouse_last_name: "",
    hobbies_and_interests: "",
    favourite_sports: "",
    preferred_music_genres: "",
    preferred_movies_shows: "",
  });

  const userid = localStorage.getItem("userid");
  const apiUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    // Fetch user data for editing (if applicable)
    axios
      .get(apiUrl + "/api/users/" + userid) // Replace 1 with dynamic user ID
      .then((res) => {
        setImage(res.data.profile_image);
        setFormData(res.data);
      })
      .catch((err) => console.error(err));
  }, []);

  interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    tabindex: number;
  }

  function TabPanel(props: TabPanelProps) {
    const { children, tabindex, index, ...other } = props;

    return (
      <div
        role="tabpanel"
        hidden={tabindex !== index}
        id={`vertical-tabpanel-${index}`}
        aria-labelledby={`vertical-tab-${index}`}
        {...other}
      >
        {tabindex === index && (
          <Box sx={{ p: { xs: 0, md: 3 } }}>
            <Typography component={"span"}>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }

  // const navigate = useNavigate();

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setTabIndex(newValue);
  };

  return (
    <ThemeProvider theme={theme}>
      <Navigation></Navigation>
      <Container className="main-container" maxWidth={false} sx={{}}>
        <Box
          sx={{
            display: "flex",
            gap: "30px",
            flexDirection: {
              xs: "column",
              md: "row",
            },
            justifyContent: "center",
          }}
        >
          <Tabs
            className="profile-sidetabs"
            orientation="vertical"
            variant="scrollable"
            value={tabindex}
            onChange={handleChange}
            aria-label="Vertical tabs"
            sx={{
              marginTop: "5%",
              marginBottom: { xs: "5%", md: "0" },
              textAlign: "left",
              flex: "0 0 25%",
              order: { xs: "1", md: "0" },

              "& .MuiButtonBase-root.MuiTab-root.Mui-selected": {
                borderBottom: "2px solid #000",
                fontWeight: 700,
                color: "#000",
              },
              "& .MuiButtonBase-root.MuiTab-root": {
                textTransform: "capitalize",
                fontSize: {
                  xs: "14px",
                  md: "16px",
                },
                maxWidth: { xs: "100%" },
              },
            }}
            TabIndicatorProps={{
              sx: { display: "none" },
            }}
          >
            <Tab
              sx={{ alignItems: "flex-start", borderTop: "1px solid #ccc" }}
              label="Basic Details"
            />
            <Tab
              sx={{ alignItems: "flex-start", borderTop: "1px solid #ccc" }}
              label="Additional Details"
            />
            {formData.marital_status != "" &&
              formData.marital_status != "Single" && (
                <Tab
                  sx={{ alignItems: "flex-start", borderTop: "1px solid #ccc" }}
                  label="Spouse Details"
                />
              )}
            <Tab
              sx={{ alignItems: "flex-start", borderTop: "1px solid #ccc" }}
              label="Personal Preferences"
            />
          </Tabs>

          <Box
            className="tab-panel-col"
            sx={{
              flex: "0 0 calc(60% - 24px)",
              order: { xs: "2", md: "1" },
            }}
          >
            <Typography
              className="main-l-title"
              sx={{
                fontWeight: 300,

                marginBottom: { xs: "5%", md: "2%" },
              }}
              variant="h3"
            >
              <Box>
                My <strong>Profile</strong>
              </Box>
            </Typography>
            <TabPanel tabindex={tabindex} index={0}>
              <Box
                className="field-wrap"
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "flex-start",
                  gap: "20px",
                }}
              >
                <Box className="left-col image-col" sx={{ flex: "0 0 25%" }}>
                  <Avatar
                    alt="Profile image"
                    src={image ? `http://localhost:3000/uploads/${image}` : ""}
                    sx={{
                      width: {
                        xs: "20vw",
                        md: "calc(14vw - 20px)",
                      },
                      height: {
                        xs: "20vw",
                        md: "calc(14vw - 20px)",
                      },
                    }}
                  />
                </Box>
                <Box className="right-col" sx={{ flex: "0 0 75%" }}>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      marginBottom: "20px",
                    }}
                  >
                    <Typography
                      sx={{ flex: "0 0 100%" }}
                      className="form-label"
                    >
                      <strong>Salutation*</strong>
                    </Typography>
                    <Box className="value">{formData.salutation}</Box>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      marginBottom: "20px",
                    }}
                  >
                    <Typography
                      sx={{ flex: "0 0 100%" }}
                      className="form-label"
                    >
                      First name*
                    </Typography>

                    <Box className="value">{formData.first_name}</Box>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      marginBottom: "20px",
                    }}
                  >
                    <Typography
                      sx={{ flex: "0 0 100%" }}
                      className="form-label"
                    >
                      Last Name *
                    </Typography>
                    <Box className="value">{formData.last_name}</Box>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      marginBottom: "20px",
                    }}
                  >
                    <Typography
                      sx={{ flex: "0 0 100%" }}
                      className="form-label"
                    >
                      Email Address *
                    </Typography>
                    <Box className="value">{formData.email_address}</Box>
                  </Box>
                </Box>
              </Box>
            </TabPanel>
            <TabPanel tabindex={tabindex} index={1}>
              <Box
                className="field-wrap"
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "flex-start",
                  gap: "30px",
                }}
              >
                <Box
                  className="left-col image-col"
                  sx={{ flex: "0 0 25%" }}
                ></Box>
                <Box className="right-col" sx={{ flex: "0 0 100%" }}>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      marginBottom: "20px",
                    }}
                  >
                    <Typography
                      sx={{ flex: "0 0 100%" }}
                      className="form-label"
                    >
                      Mobile number*
                    </Typography>
                    <Box className="value">{formData.mobile_number}</Box>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      marginBottom: "20px",
                    }}
                  >
                    <Typography
                      sx={{ flex: "0 0 100%" }}
                      className="form-label"
                    >
                      Home address*
                    </Typography>

                    <Box className="value">{formData.home_address}</Box>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      marginBottom: "20px",
                    }}
                  >
                    <Typography
                      sx={{ flex: "0 0 100%" }}
                      className="form-label"
                    >
                      Country*
                    </Typography>
                    <Box className="value">{formData.country}</Box>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      marginBottom: "20px",
                    }}
                  >
                    <Typography
                      sx={{ flex: "0 0 100%" }}
                      className="form-label"
                    >
                      Postal code*
                    </Typography>
                    <Box className="value">{formData.postal_code}</Box>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      marginBottom: "20px",
                    }}
                  >
                    <Typography
                      sx={{ flex: "0 0 100%" }}
                      className="form-label"
                    >
                      Nationality*
                    </Typography>
                    <Box className="value">{formData.nationality}</Box>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      marginBottom: "20px",
                    }}
                  >
                    <Typography
                      sx={{ flex: "0 0 100%" }}
                      className="form-label"
                    >
                      Date of birth
                    </Typography>
                    <Box className="value">{formData.date_of_birth}</Box>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      marginBottom: "20px",
                    }}
                  >
                    <Typography
                      sx={{ flex: "0 0 100%" }}
                      className="form-label"
                    >
                      Gender
                    </Typography>
                    <Box className="value">{formData.gender}</Box>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      marginBottom: "20px",
                    }}
                  >
                    <Typography
                      sx={{ flex: "0 0 100%" }}
                      className="form-label"
                    >
                      Marital status
                    </Typography>
                    <Box className="value">{formData.marital_status}</Box>
                  </Box>
                </Box>
              </Box>
            </TabPanel>
            <TabPanel tabindex={tabindex} index={2}>
              <Box
                className="field-wrap"
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "flex-start",
                  gap: "20px",
                }}
              >
                <Box
                  className="left-col image-col"
                  sx={{ flex: "0 0 25%" }}
                ></Box>
                <Box className="right-col" sx={{ flex: "0 0 75%" }}>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      marginBottom: "20px",
                    }}
                  >
                    <Typography
                      sx={{ flex: "0 0 100%" }}
                      className="form-label"
                    >
                      Salutation*
                    </Typography>
                    <Box className="value">{formData.spouse_salutation}</Box>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      marginBottom: "20px",
                    }}
                  >
                    <Typography
                      sx={{ flex: "0 0 100%" }}
                      className="form-label"
                    >
                      First name*
                    </Typography>

                    <Box className="value">{formData.spouse_first_name}</Box>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      marginBottom: "20px",
                    }}
                  >
                    <Typography
                      sx={{ flex: "0 0 100%" }}
                      className="form-label"
                    >
                      Last Name *
                    </Typography>
                    <Box className="value">{formData.spouse_last_name}</Box>
                  </Box>
                </Box>
              </Box>
            </TabPanel>
            <TabPanel tabindex={tabindex} index={3}>
              <Box
                className="field-wrap"
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "flex-start",
                  gap: "20px",
                }}
              >
                <Box
                  className="left-col image-col"
                  sx={{ flex: "0 0 25%" }}
                ></Box>
                <Box className="right-col" sx={{ flex: "0 0 75%" }}>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      marginBottom: "20px",
                    }}
                  >
                    <Typography
                      sx={{ flex: "0 0 100%" }}
                      className="form-label"
                    >
                      Hobbies and interests
                    </Typography>
                    <Box className="value">
                      {formData.hobbies_and_interests}
                    </Box>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      marginBottom: "20px",
                    }}
                  >
                    <Typography
                      sx={{ flex: "0 0 100%" }}
                      className="form-label"
                    >
                      Favourite sport(s)
                    </Typography>

                    <Box className="value">{formData.favourite_sports}</Box>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      marginBottom: "20px",
                    }}
                  >
                    <Typography
                      sx={{ flex: "0 0 100%" }}
                      className="form-label"
                    >
                      Preferred music genre(s)
                    </Typography>
                    <Box className="value">
                      {formData.preferred_music_genres}
                    </Box>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      marginBottom: "20px",
                    }}
                  >
                    <Typography
                      sx={{ flex: "0 0 100%" }}
                      className="form-label"
                    >
                      Preferred movie/TV show(s)
                    </Typography>
                    <Box className="value">
                      {formData.preferred_movies_shows}
                    </Box>
                  </Box>
                </Box>
              </Box>
            </TabPanel>
          </Box>
          <Box
            sx={{
              flex: { xs: "0 0 30px", md: "1" },
              order: { xs: "0", md: "2" },
              textAlign: { xs: "right" },
            }}
          >
            <Link
              component="a"
              sx={{ marginTop: "25px", color: "#000", fontWeight: 300 }}
              href="/edit-profile"
            >
              <Typography
                sx={{
                  justifyContent: "flex-end",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                Edit profile{" "}
                <EditIcon
                  sx={{ width: 20, verticalAlign: "middle" }}
                ></EditIcon>
              </Typography>
            </Link>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
