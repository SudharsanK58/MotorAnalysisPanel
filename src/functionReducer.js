import BASE_URL from "./config"; // Assuming BASE_URL is defined in config.js

// Function to get the user agent string
const getBrowserName = () => {
  return navigator.userAgent;
};

// Function to post user data to the API
export const postUserData = async () => {
  try {
    // Logic to get page name from URL endpoint
    const pageName = window.location.pathname;

    // Logic to get email from localStorage
    const email = localStorage.getItem("userName");

    let locationData = {};

    if (pageName === "/auth-login") {
      // Fetch data from ipapi if the page is /auth-login
      const ipapiResponse = await fetch("https://ipapi.co/json");
      if (!ipapiResponse.ok) {
        throw new Error("Failed to fetch location data");
      }
      locationData = await ipapiResponse.json();
    } else {
      // Set location-related fields to null
      locationData = {
        city: null,
        region: null,
        region_code: null,
        postal: null,
        latitude: null,
        longitude: null,
        timezone: null,
        utc_offset: null,
        org: null,
      };
    }

    // Get the browser user agent string
    const browserName = getBrowserName();

    // Construct the userData object
    const userData = {
      email: email,
      page: pageName,
      city: locationData.city,
      region: locationData.region,
      region_code: locationData.region_code,
      postal: locationData.postal,
      latitude: locationData.latitude,
      longitude: locationData.longitude,
      timezone: locationData.timezone,
      utc_offset: locationData.utc_offset,
      org: locationData.org,
      browser_name: browserName,
    };

    // Post the user data to the API
    const response = await fetch(`${BASE_URL}/detect_user`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    if (response.ok) {
      console.log("User data posted successfully");
    } else {
      console.error("Failed to post user data:", response.statusText);
    }
  } catch (error) {
    console.error("An error occurred while posting user data:", error);
  }
};
