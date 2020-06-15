import { BASE_URL } from './constants' 
import { scrape } from './scrape'


// This function cleans string for JSON.parse
const cleanString = (data) => {
  // if the data is incorrectly formateed string, fix and return JSON
  if (typeof data === "string" ) {
    let i=0;
    while (str[i] === ' ') {
      i++
    }
    return JSON.parse(str.splice(i,))
  }
  // else return the JSON object
  return data
}

// This function targets underlying json data files 
const extractJsonData = () => {
  groupRe =  /data-data-url="(\S+.json)"/g
  links = scrape(groupRe)
  links.forEach(link => {
    jsonData = parseJsonLink(link)
    // load logic here
  })
}

// This function targets underlying state json file 
// Checks for additional dataURLs
const extractStateData = () => {
  groupRe = /data-config-url="(\S+.json)"/g
  links = scrape(groupRe)
  totalCases, totalDeaths, jsonData = checkState(link[0])
  // load logic here
}

// This function parses data from a given json link
// returns jsonData
const parseJsonLink = async (link) => {
  let jsonData;
  await axios.get(BASE_URL+link)
    .then(res => jsonData = res.data)
  // jsonData is a 2D array formated for charts
  // x is columns, y is case count data
  return jsonData
}

// returns totalCases, totalDeaths, and underlying jsonData
const checkState = async (link) => {
  let premData, jsonData;
  await axios.get(BASE_URL+link)
    .then(res => premData = res.data)
  // state config file may be incorrectly formatted
  premData = cleanString(jsonData)
  // find dataUrl of config file
  dataLink = premData.dataUrl
  await axios.get(BASE_URL+link)
    .then(res => jsonData = res.data)
  jsonData = cleanString(jsonData)
  let totalCases, totalDeaths = 0
  jsonData.forEach(state => {
    // console.log(state)
    // console.log(state.Jurisdiction)
    // console.log(state["Cases Reported"])
    // console.log(state.Deaths)
    totalCases = totalCases + state["Cases Reported"]
    totalDeaths = totalDeaths + state["Deaths"]
  })
  // jsonData is an array of objects
  return totalCases, totalDeaths, jsonData
} 