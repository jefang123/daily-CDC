import { BASE_URL, DAILY_STATS } from './constants' 

// This function scrapes the CDC website using HTTP requests
// Targets attributes from the response with given reg regex expression
// This scraper scrapes for new cases by day and aggregated cases by age groups
export const scrape = async (reg) => {
  let data;
  
  // ping initial site
  await axios.get(BASE_URL+DAILY_STATS)
    .then(res=> data = res.data)
  // extract data with regex
  let matches, output = []
  while (matches = reg.exec(data)) {
    output.push(matches[1])
  }
  return output
}