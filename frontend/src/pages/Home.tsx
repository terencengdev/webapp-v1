import { useEffect, useState } from "react";
import axios from "axios";

import Navigation from "../component/Navigation";
import Container from "@mui/material/Container";
import InputLabel from "@mui/material/InputLabel";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid2";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Link from "@mui/material/Link";
import Pagination from "@mui/material/Pagination";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import CircularProgress from "@mui/material/CircularProgress";

export default function Home() {
  const [listdata, SetListData] = useState<any[]>([]);
  const [filteredList, SetFilteredList] = useState<any[]>([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const [gender, setGender] = useState("");
  const [nationality, setNationality] = useState("");

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

  const countries = [
    { code: "AU", label: "Australia" },
    { code: "BR", label: "Brazil" },
    { code: "CA", label: "Canada" },
    { code: "CH", label: "Switzerland" },
    { code: "DE", label: "Germany" },
    { code: "DK", label: "Denmark" },
    { code: "ES", label: "Spain" },
    { code: "FI", label: "Finland" },
    { code: "FR", label: "France" },
    { code: "GB", label: "United Kingdom" },
    { code: "IE", label: "Ireland" },
    { code: "IN", label: "India" },
    { code: "IR", label: "Iran" },
    { code: "MX", label: "Mexico" },
    { code: "NL", label: "Netherlands" },
    { code: "NO", label: "Norway" },
    { code: "NZ", label: "New Zealand" },
    { code: "RS", label: "Serbia" },
    { code: "TR", label: "Turkey" },
    { code: "UA", label: "Ukraine" },
    { code: "US", label: "United States" },
  ];

  useEffect(() => {
    setLoading(true);
    axios
      .get("https://randomuser.me/api/?results=100&seed=contactlist&exc=login")
      .then((response) => {
        SetListData(response.data.results);

        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    let filtered = listdata;

    if (gender && gender !== "all") {
      filtered = filtered.filter((item) => item.gender === gender);
    }
    if (nationality && nationality !== "all") {
      filtered = filtered.filter((item) => item.nat === nationality);
    }
    SetFilteredList(filtered);
  }, [gender, nationality, listdata]);

  const handleChange = (event: SelectChangeEvent) => {
    setGender(event.target.value);
  };
  const handleNatChange = (event: SelectChangeEvent) => {
    setNationality(event.target.value);
  };

  //Pagination
  const itemsPerPage = 9;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const resultList = filteredList.slice(startIndex, endIndex);
  const totalPages = Math.ceil(filteredList.length / itemsPerPage);

  return (
    <>
      <ThemeProvider theme={theme}>
        <Navigation></Navigation>
        <Container className="main-container" maxWidth={false} sx={{}}>
          <Typography
            className="main-l-title"
            sx={{ fontWeight: 300, marginBottom: "2%" }}
            variant="h3"
          >
            <Box>
              My <strong>Contacts</strong>
            </Box>
          </Typography>

          <Box className="contact-filters">
            <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
              <InputLabel id="genderlabel">Gender</InputLabel>

              <Select
                labelId="genderlabel"
                id="gender-select"
                value={gender}
                label="Gender"
                onChange={handleChange}
              >
                <MenuItem value={"all"}>All</MenuItem>
                <MenuItem value={"female"}>Female</MenuItem>
                <MenuItem value={"male"}>Male</MenuItem>
              </Select>
            </FormControl>
            <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
              <InputLabel id="natLabel">Nationality</InputLabel>
              <Select
                labelId="natLabel"
                id="gender-select"
                value={nationality}
                label="Nationality"
                onChange={handleNatChange}
              >
                <MenuItem value={"all"}>All</MenuItem>

                {countries.map((item, index) => {
                  return (
                    <MenuItem key={index} value={item.code}>
                      {item.label}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </Box>
          <Box sx={{ flexGrow: 1 }}>
            {loading ? (
              <Box
                className="loading-box"
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  minHeight: "50vh",
                }}
              >
                <CircularProgress color="inherit" />
              </Box>
            ) : (
              <Grid
                container
                spacing={{ xs: 2, md: 3 }}
                columns={{ xs: 2, sm: 4, md: 12 }}
              >
                {resultList.map((item, index) => {
                  return (
                    <Grid key={index} size={{ xs: 2, sm: 2, md: 4 }}>
                      <Card>
                        <CardContent className="my-contact-wrap">
                          <Box className="img-col">
                            <CardMedia
                              component="img"
                              alt="name"
                              sx={{
                                height: {
                                  xs: "20vw", // theme.breakpoints.up('xs')
                                  sm: "11vw", // theme.breakpoints.up('sm')
                                  md: "9vw", // theme.breakpoints.up('md')
                                },
                              }}
                              image={item.picture.large}
                            />
                          </Box>
                          <Box className="text-col">
                            {" "}
                            <Typography
                              gutterBottom
                              variant="body1"
                              sx={{ fontWeight: 700 }}
                              component="div"
                            >
                              {item.name.first} {item.name.last}
                            </Typography>
                            <Link
                              gutterBottom
                              component="a"
                              variant="body2"
                              className="contact-list-email"
                              href={`mailto:${item.email}`}
                              sx={{ display: "block" }}
                            >
                              {item.email}
                            </Link>
                            <Link
                              gutterBottom
                              component="a"
                              variant="body2"
                              className="contact-list-phone"
                              href={`mailto:${item.email}`}
                              sx={{ display: "block" }}
                            >
                              {item.phone}
                            </Link>
                            <Typography
                              className="contact-list-add"
                              gutterBottom
                              variant="body2"
                              component="div"
                            >
                              {item.location.street.number}{" "}
                              {item.location.street.name}
                            </Typography>
                          </Box>
                        </CardContent>
                      </Card>
                    </Grid>
                  );
                })}
              </Grid>
            )}
            <Box
              sx={{
                paddingY: "30px",
                display: "flex",
                justifyContent: "center",
              }}
            >
              {totalPages > 1 && (
                <Pagination
                  count={totalPages}
                  variant="outlined"
                  color="primary"
                  onChange={(_e, value) => setCurrentPage(value)}
                />
              )}
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    </>
  );
}
