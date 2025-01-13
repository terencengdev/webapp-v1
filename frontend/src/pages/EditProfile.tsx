import React, { useState, useEffect } from "react";
import axios, { AxiosError } from "axios";
import { useForm, useWatch } from "react-hook-form";
import { TextFieldElement, SelectElement } from "react-hook-form-mui";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

import { DatePickerElement } from "react-hook-form-mui/date-pickers";

//mui
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Navigation from "../component/Navigation";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Link from "@mui/material/Link";
import Avatar from "@mui/material/Avatar";
import Snackbar from "@mui/material/Snackbar";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import UploadIcon from "@mui/icons-material/Upload";
import DeleteIcon from "@mui/icons-material/Delete";
import dayjs from "dayjs";

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

export default function EditProfile() {
  const [alert, setAlert] = useState(false);
  const [alertContent, setAlertContent] = useState("");
  const [error_alert, setErrorAlert] = useState(false);
  const [tabindex, setTabIndex] = React.useState(0);
  const [marital, setMarital] = useState("");
  const [image, setImage] = useState("");
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const userid = localStorage.getItem("userid");
  const apiUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    // Fetch user data for editing (if applicable)
    axios
      .get(apiUrl + "/api/users/" + userid) // Replace 1 with dynamic user ID
      .then((res) => {
        setImage(res.data.profile_image);
        setValue("salutation", res.data.salutation);
        setValue("first_name", res.data.first_name);
        setValue("last_name", res.data.last_name);
        setValue("email_address", res.data.email_address);
        setValue("mobile_number", res.data.mobile_number);
        setValue("home_address", res.data.home_address);
        setValue("country", res.data.country);
        setValue("postal_code", res.data.postal_code);
        setValue("nationality", res.data.nationality);
        setValue("marital_status", res.data.marital_status);
        setValue("date_of_birth", res.data.date_of_birth);
        setValue("gender", res.data.gender);
        setValue("spouse_salutation", res.data.spouse_salutation);
        setValue("spouse_first_name", res.data.spouse_first_name);
        setValue("spouse_last_name", res.data.spouse_last_name);
        setValue("hobbies_and_interests", res.data.hobbies_and_interests);
        setValue("favourite_sports", res.data.favourite_sports);
        setValue("preferred_music_genres", res.data.preferred_music_genres);
        setValue("preferred_movies_shows", res.data.preferred_movies_shows);
      })
      .catch((err) => console.error(err));
  }, []);

  function Subcomponent({ control }: { control: any }) {
    const required = useWatch({
      control,
      name: [
        "salutation",
        "first_name",
        "last_name",
        "email_address",
        "mobile_number",
        "home_address",
        "country",
        "postal_code",
        "nationality",
      ],
    });

    let all_valid = required.every(
      (element) => element != "" && element !== undefined
    );
    console.log(required);
    console.log(all_valid);
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
        disabled={!all_valid}
      >
        Save & Update
      </Button>
    );
  }

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
            <Typography component="span">{children}</Typography>
          </Box>
        )}
      </div>
    );
  }

  const { control, handleSubmit, setValue } = useForm({
    defaultValues: {
      profile_image: {},
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
    },
  });

  // Function to handle form submission
  const onSubmit = async (data: any) => {
    try {
      // Send login request to server
      const formData = new FormData();

      formData.append("salutation", data.salutation);
      formData.append("first_name", data.first_name);
      formData.append("last_name", data.last_name);
      formData.append("email_address", data.email_address);
      formData.append("mobile_number", data.mobile_number);
      formData.append("home_address", data.home_address);
      formData.append("country", data.country);
      formData.append("postal_code", data.postal_code);
      formData.append("nationality", data.nationality);
      formData.append("marital_status", data.marital_status);
      formData.append(
        "date_of_birth",
        new Date(data.date_of_birth).toLocaleDateString("fr-CA", {
          timeZone: "UTC",
        })
      );
      formData.append("gender", data.gender);
      formData.append("spouse_salutation", data.spouse_salutation);
      formData.append("spouse_first_name", data.spouse_first_name);
      formData.append("spouse_last_name", data.spouse_last_name);
      formData.append("hobbies_and_interests", data.hobbies_and_interests);
      formData.append("favourite_sports", data.favourite_sports);
      formData.append("preferred_music_genres", data.preferred_music_genres);
      formData.append("preferred_movies_shows", data.preferred_movies_shows);
      formData.append("profile_image", image ? image : data.profile_image);

      const response = await axios.put(
        apiUrl + "/api/users/" + userid,
        formData,
        {
          headers: {
            "content-type": "multipart/form-data", // do not forget this
          },
        }
      );
      if (response.status === 200) {
        setErrorAlert(false);
        setAlertContent(response.data.message);
        setAlert(true);
      }
    } catch (error) {
      console.error("Error:", error);
      setErrorAlert(true);
      if (error instanceof AxiosError && error.response) {
        setAlertContent(error.response.data.message);
      }
    }
  };

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setTabIndex(newValue);
  };

  const handleMaritalChange = (event: any) => {
    console.log(event);
    setMarital(event);
  };

  const handleClose = () => {
    setAlert(false);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      console.log(event);
      const file = event.target.files[0];
      setValue("profile_image", file);
      setPreviewImage(URL.createObjectURL(file)); // Preview image
    }
  };

  const calculateAge = (value: string) => {
    if (!value) return "Date of birth is required";

    const birthDate = dayjs(value);
    const today = dayjs();
    const age = today.diff(birthDate, "year");

    return age >= 17 || "You must be at least 17 years old";
  };

  return (
    <ThemeProvider theme={theme}>
      <Navigation></Navigation>
      <Container className="main-container" maxWidth={false} sx={{}}>
        <Box
          sx={{
            display: "flex",
            gap: "20px",
            flexDirection: {
              xs: "column",
              md: "row",
            },
            justifyContent: "flex-start",
            minHeight: "100vh",
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
            {marital != "Single" && (
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
            <Box sx={{ display: "flex", gap: "30px", alignItems: "center" }}>
              <Typography
                className="main-l-title"
                sx={{
                  fontWeight: 300,
                  marginBottom: { xs: "5%", md: "2%" },
                  flex: 1,
                }}
                variant="h3"
              >
                <Box>
                  My <strong>Profile</strong>
                </Box>
              </Typography>
            </Box>
            <form onSubmit={handleSubmit(onSubmit)} id="form_edit" noValidate>
              <TabPanel tabindex={tabindex} index={0}>
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
                    sx={{
                      flex: "0 0 25%",
                      textAlign: { xs: "left", md: "center" },
                    }}
                  >
                    <Avatar
                      alt="Profile Image"
                      src={
                        previewImage
                          ? previewImage
                          : image
                          ? `http://localhost:3000/uploads/${image}`
                          : ""
                      }
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

                    <Button
                      variant="contained"
                      component="label"
                      sx={{
                        marginTop: "20px",
                        backgroundColor: "#000",
                        marginBottom: "5%",
                        width: "auto",
                      }}
                    >
                      <input
                        type="file"
                        hidden
                        accept="image/png, image/jpeg"
                        onChange={handleFileChange}
                      />
                      {image ? (
                        <DeleteIcon sx={{ marginRight: "10px" }} />
                      ) : (
                        <UploadIcon sx={{ marginRight: "10px" }} />
                      )}
                      {"Upload"}
                    </Button>
                    <Typography variant="body2">
                      (JPG or PNG format with maximum size of 1 MB)
                    </Typography>
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

                      <SelectElement
                        control={control}
                        required
                        value="Mr"
                        name="salutation"
                        options={[
                          {
                            id: "Mr.",
                            label: "Mr.",
                          },
                          {
                            id: "Ms.",
                            label: "Ms.",
                          },
                          {
                            id: "Mrs.",
                            label: "Mrs.",
                          },
                        ]}
                        sx={{
                          width: "100%",
                        }}
                      />
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

                      <TextFieldElement
                        control={control}
                        sx={{ flex: "0 0 70%" }}
                        required
                        id="first_name"
                        name="first_name"
                      />
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
                      <TextFieldElement
                        control={control}
                        sx={{ flex: "0 0 70%" }}
                        required
                        id="last_name"
                        type="text"
                        name="last_name"
                      />
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
                      <TextFieldElement
                        control={control}
                        sx={{ flex: "0 0 70%" }}
                        required
                        id="email_address"
                        type="text"
                        name="email_address"
                      />
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
                        Mobile number*
                      </Typography>

                      <TextFieldElement
                        control={control}
                        sx={{ flex: "0 0 70%" }}
                        required
                        id="mobile_number"
                        name="mobile_number"
                      />
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
                      <TextFieldElement
                        required
                        control={control}
                        sx={{ flex: "0 0 70%" }}
                        name={"home_address"}
                        multiline
                      ></TextFieldElement>
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
                      <TextFieldElement
                        control={control}
                        sx={{ flex: "0 0 70%" }}
                        required
                        id="country"
                        name="country"
                      />
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
                      <TextFieldElement
                        control={control}
                        sx={{ flex: "0 0 70%" }}
                        required
                        id="postal_code"
                        name="postal_code"
                      />
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
                      <TextFieldElement
                        control={control}
                        sx={{ flex: "0 0 70%" }}
                        required
                        id="nationality"
                        name="nationality"
                      />
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
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePickerElement
                          control={control}
                          name="date_of_birth"
                          format="YYYY-MM-DD"
                          rules={{
                            required: "Custom required message",
                            validate: { calculateAge },
                          }}
                        />
                      </LocalizationProvider>
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

                      <SelectElement
                        control={control}
                        name="gender"
                        options={[
                          {
                            id: "Male",
                            label: "Male",
                          },
                          {
                            id: "Female",
                            label: "Female",
                          },
                        ]}
                        sx={{
                          width: "100%",
                        }}
                      />
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
                      <SelectElement
                        control={control}
                        name="marital_status"
                        options={[
                          {
                            id: "Single",
                            label: "Single",
                          },
                          {
                            id: "Married",
                            label: "Married",
                          },
                        ]}
                        onChange={handleMaritalChange}
                        sx={{
                          width: "100%",
                        }}
                      />
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
                        <strong>Salutation*</strong>
                      </Typography>

                      <SelectElement
                        control={control}
                        required
                        name="spouse_salutation"
                        options={[
                          {
                            id: "Mr.",
                            label: "Mr.",
                          },
                          {
                            id: "Ms.",
                            label: "Ms.",
                          },
                          {
                            id: "Mrs.",
                            label: "Mrs.",
                          },
                        ]}
                        sx={{
                          width: "100%",
                        }}
                      />
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

                      <TextFieldElement
                        control={control}
                        sx={{ flex: "0 0 70%" }}
                        required
                        id="spouse_first_name"
                        name="spouse_first_name"
                      />
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
                      <TextFieldElement
                        control={control}
                        sx={{ flex: "0 0 70%" }}
                        required
                        id="spouse_last_name"
                        type="text"
                        name="spouse_last_name"
                      />
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
                      <TextFieldElement
                        control={control}
                        sx={{ flex: "0 0 70%" }}
                        id="hobbies_and_interests"
                        name="hobbies_and_interests"
                      />
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
                        Favorite sport(s)
                      </Typography>
                      <TextFieldElement
                        control={control}
                        sx={{ flex: "0 0 70%" }}
                        id="favourite_sports"
                        name="favourite_sports"
                      />
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
                      <TextFieldElement
                        control={control}
                        sx={{ flex: "0 0 70%" }}
                        id="preferred_music_genres"
                        name="preferred_music_genres"
                      />
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
                      <TextFieldElement
                        control={control}
                        sx={{ flex: "0 0 70%" }}
                        id="preferred_movies_shows"
                        name="preferred_movies_shows"
                      />
                    </Box>
                  </Box>
                </Box>
              </TabPanel>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: "30px",

                  padding: "24px",
                }}
              >
                <Typography
                  sx={{ flex: "0 0 25%" }}
                  className="form-label"
                ></Typography>
                <Subcomponent control={control} />
                <Button
                  href="/my-profile"
                  size="medium"
                  sx={{
                    backgroundColor: "#ccc",
                    color: "#000",
                    marginBottom: "5%",
                  }}
                  variant="contained"
                >
                  Cancel
                </Button>
              </Box>
            </form>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: { xs: "0", md: "20px" },
                flexDirection: { xs: "column", md: "row" },
                padding: "24px",
              }}
            >
              <Box
                className="left-col image-col"
                sx={{ flex: { xs: "0", md: "0 0 25%" } }}
              ></Box>
              <Box
                className="right-col"
                sx={{ flex: { xs: "0 0 100%", md: "0 0 65%" } }}
              >
                <Typography variant="body2">
                  <em>* Mandatory field</em>
                </Typography>
              </Box>
            </Box>

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
                  open={alert}
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
              href="/my-profile"
            >
              <Typography sx={{ display: "flex", alignItems: "center" }}>
                <ChevronLeftIcon sx={{ width: "20px" }}></ChevronLeftIcon>Go
                back to My Profile
              </Typography>
            </Link>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
