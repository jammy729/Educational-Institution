import React, { useState, useEffect } from "react";
import axios from "axios";
import Grid from "@mui/material/Grid"; // Grid version 1
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

import { Link } from "react-router-dom";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { MenuItem } from "@mui/material";

import countries from "../countries.json";

interface Institution {
  id: string;
  institution_id: string;
  name: string;
  country: string;
  world_rank: string;
  national_rank: string;
  education_quality_score: string;
  alumni_employment_rank: string;
  income_score: string;
  citation_score: string;
  research_score: string;
  influence_rank: string;
  international_outlook_score: string;
  num_students: string;
  international_students: string;
  female_male_ratio: string;
  foodName: string;
}

const Home: React.FC = () => {
  const [institutionList, setInstitutionList] = useState<Institution[]>([]);

  //   PAGINATION
  const [page, setPage] = useState<number>(1);

  const handleChangePage = (_e: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  //    FILTER
  const [countryValue, setCountryValue] = useState<string>("");

  useEffect(() => {
    console.log(countryValue);
    axios
      .get(
        `http://localhost:9001/institution/read?page=${page}?countryName=${countryValue}`
      )
      .then((response) => {
        console.log(response.data);
        setInstitutionList(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [page, countryValue]);

  const institutionLink = (id: string) => {
    console.log(`Link ${id}`);
  };

  const countryValueChange = (event: SelectChangeEvent<string>) => {
    setCountryValue(event.target.value as string);
    setPage(1);
  };

  return (
    <Container>
      <Box>
        <FormControl fullWidth>
          <InputLabel>Country</InputLabel>
          <Select
            value={countryValue}
            label="Country"
            onChange={countryValueChange}
          >
            {countries.map((country) => {
              return (
                <MenuItem key={country.code} value={country.name}>
                  {country.name}
                </MenuItem>
              );
            })}
            <MenuItem value="option1">Option 1</MenuItem>
            <MenuItem value="option2">Option 2</MenuItem>
            <MenuItem value="option3">Option 3</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <Grid container columns={{ xs: 4, sm: 8, md: 12 }}>
        {institutionList.length > 0 &&
          institutionList.map((value, index) => {
            return (
              <Grid item xs={4} sm={4} md={4} key={index}>
                <Link
                  to={`/details/${value.institution_id}`}
                  style={{ color: "black" }}
                >
                  <Box
                    onClick={() => institutionLink(value.institution_id)}
                    sx={{
                      margin: "2px",
                      padding: "10px",
                      backgroundColor: "rgb(255, 255, 255)",
                      height: 300,
                      "&:hover": {
                        backgroundColor: "#D8D8D8",
                      },
                    }}
                  >
                    <h3>{value.name}</h3>
                    <p>{value.country}</p>
                    <p>World Rank: {value.world_rank}</p>
                    <p>
                      International Outlook Score:
                      {value.international_outlook_score}
                    </p>
                    <p>Number of Students: {value.num_students}</p>
                    <p>id: {value.institution_id}</p>
                  </Box>
                </Link>
              </Grid>
            );
          })}
      </Grid>
      <Stack spacing={2} alignItems={"center"}>
        <h3>Page: {page}</h3>
        <Pagination count={21} page={page} onChange={handleChangePage} />
      </Stack>
    </Container>
  );
};

export default Home;
