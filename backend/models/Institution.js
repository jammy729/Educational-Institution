const mongoose = require("mongoose");

const InstitutionSchema = new mongoose.Schema({
  institution_id: String,
  name: String,
  country: String,
  world_rank: String,
  national_rank: String,
  education_quality_score: String,
  alumni_employment_rank: String,
  income_score: String,
  citation_score: String,
  research_score: String,
  influence_rank: String,
  international_outlook_score: String,
  num_students: String,
  international_students: String,
  female_male_ratio: String,
});

const Institution = mongoose.model("institution", InstitutionSchema);
module.exports = Institution;
