import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import axios from "axios";
import Grid from "@mui/material/Grid"; // Grid version 1
import Container from "@mui/material/Container";

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
  const { id } = useParams();
  console.log(`params: ${id}`);

  useEffect(() => {
    axios
      .get(`http://localhost:9001/institution/details/${id}`)
      .then((response) => {
        console.log(response.data);
        setInstitutionList(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  return (
    <Container>
      {institutionList.length > 0 &&
        institutionList.map((value, index) => {
          return (
            <Grid item xs={4} sm={4} md={4} key={index}>
              <h3>{value.name}</h3>
              <p>{value.country}</p>
              <p>World Rank: {value.world_rank}</p>
              <p>
                International Outlook Score:
                {value.international_outlook_score}
              </p>
              <p>Number of Students: {value.num_students}</p>
              <p>id: {value.institution_id}</p>
            </Grid>
          );
        })}
    </Container>
  );
};

export default Home;
