import { dashboardAPI } from "./interDash.js";

document
  .getElementById("create-listing-form")
  .addEventListener("submit", async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const userId = formData.get("userId");
    const name = formData.get("name");
    const reviews_url = formData.get("reviews_url");
    const description = formData.get("description");

    try {
      const response = await dashboardAPI.createListing(
        userId,
        name,
        reviews_url,
        description
      );
      if (response.success) {
        alert(response.message);
      } else {
        alert(response.error);
      }
    } catch (error) {
      console.error(error);
      alert("An error occurred.");
    }
  });

document
  .getElementById("get-listing-form")
  .addEventListener("submit", async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const userId = formData.get("userId");
    const listingName = formData.get("listingName");

    try {
      const response = await dashboardAPI.getListing(userId, listingName);
      if (response.success) {
        console.log(response.data); // Display data as needed
        alert("Listing fetched successfully");
      } else {
        alert(response.error);
      }
    } catch (error) {
      console.error(error);
      alert("An error occurred.");
    }
  });

  

document
  .getElementById("fetch-reviews-form")
  .addEventListener("submit", async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const userId = formData.get("userId");
    const listingId = formData.get("listingId");
    const max_reviews = formData.get("max_reviews"); // Assuming you've added this input field
    const url = formData.get("url"); // Assuming you've added this input field

    try {
      const response = await dashboardAPI.fetchReviews(
        userId,
        listingId,
        max_reviews,
        url
      );
      if (response.success) {
        console.log(response.data); // Display data as needed
        alert("Reviews fetched successfully");
      } else {
        alert(response.error);
      }
    } catch (error) {
      console.error(error);
      alert("An error occurred.");
    }
  });

