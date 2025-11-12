import got from 'got';

// define URL for rest endpoint
const dataURL = "https://dev-cs5513-fall2025-ashsouza.pantheonsite.io/wp-json/twentytwentyone-child/v1/latest-posts/1"

// Helper function to safely fetch JSON data
async function fetchJsonData() {
  let jsonString;
  try {
    // next line uses got synchronously to retrive via https our json data from wp site
    jsonString = await got(dataURL);
    // console.log(jsonString.body);
    return jsonString.body; // Return the raw JSON string
  } catch(error) {
    console.error("Error fetching data from API:", error.message);
    // If the fetch fails, return an empty JSON array string 
    // to prevent JSON.parse from failing later.
    return "[]"; 
  }
}

// function returns ids for all json objects in array
export async function getAllIds() {
  const jsonStringBody = await fetchJsonData();
  
  // convert string from file into json array object
  const jsonObj = JSON.parse(jsonStringBody);

  // If the result is not an array (e.g., if the API returns an error object), handle it
  if (!Array.isArray(jsonObj)) {
    console.error("API returned non-array data. Returning empty ID list.");
    return [];
  }

  // use map() on array to extract just id properties into new array of obj values
  return jsonObj.map(item => {
    return {
      params: {
        id: item.ID.toString()
      }
    }
  });
}

// function returns names and ids for all json objects in array, sorted by name property
export async function getSortedList() {
  const jsonStringBody = await fetchJsonData();
  
  // convert string from file into json array object
  const jsonObj = JSON.parse(jsonStringBody);
  
  let dataArray = Array.isArray(jsonObj) ? jsonObj : [];
  
  // sort json array by name property
  dataArray.sort(function (a, b) {
    // Safely compare post_title; use empty string if undefined
    const titleA = a.post_title || '';
    const titleB = b.post_title || '';
    return titleA.localeCompare(titleB);
  });

  // use map() on array to extract just id + name properties into new array of obj values
  return dataArray.map(item => {
    return {
      id: item.ID ? item.ID.toString() : null, // Ensure ID exists before calling toString
      name: item.post_title || 'Untitled Post' // Provide a fallback name
    }
  }).filter(item => item.id !== null); // Filter out any entries without an ID
}

export async function getData(idRequested) {
  const jsonStringBody = await fetchJsonData();

  // convert string from file into json array object
  const jsonObj = JSON.parse(jsonStringBody);
  
  let dataArray = Array.isArray(jsonObj) ? jsonObj : [];

  // find object value in array that has matching id
  const objMatch = dataArray.filter(obj => {
    // Safely check ID
    return obj.ID && obj.ID.toString() === idRequested;
  });

  // extract object value in filtered array if any
  let objReturned;
  if (objMatch.length > 0) {
    objReturned = objMatch[0];
  } else {
    // Always return a predictable object shape, even if empty
    objReturned = { ID: idRequested, post_title: "Post Not Found" };
  }
  
  // return object value found
  return objReturned;
}