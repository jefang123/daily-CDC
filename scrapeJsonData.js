import { BASE_URL } from './constants' 
import { scrape } from './scrape'


// This function cleans string for JSON.parse
const cleanString = (str) => {
  let i=0;
  while (str[i] === ' ') {
    i++
  }
  return str.splice(i,)
}

// This function targets underlying json data files 
const extractJsonData = () => {
  groupRe =  /data-data-url="(\S+.json)"/g
  links = scrape(groupRe)
  links.forEach(link => parseJsonLink(link))
}

// This function targets underlying json config files 
// Checks for additional dataURLs
const extractChartData = () => {
  groupRe = /data-config-url="(\S+.json)"/g
  links = scrape(groupRe)
  links.forEach(link =>checkConfig(link))
}

// This function parses data from a given json link
const parseJsonLink = async (link) => {
  let jsonData;
  await axios.get(BASE_URL+link)
    .then(res => jsonData = res.data)
}

const checkConfig = async (link) => {
  let jsonData;
  await axios.get(BASE_URL+link)
    .then(res => jsonData = res.data)
  // some files may be incorrectly formatted
  jsonData = cleanString(jsonData)
} 

// finds key in object
const findKey = (obj,key) => {
  q = []
  while (Object.keys(obj).length) {
    
  }
}