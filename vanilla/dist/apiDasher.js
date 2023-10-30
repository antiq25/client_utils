import { apiCall } from "../dist/apiHelper.js";
import { apiClient } from "../dist/apiConfig.js";

export const dashboardAPIEndpoints = {
  getListing: (name) => `/api/v1/dashboard/get-listing?name=${name}`,
  fetchReviews: (listingId, max) =>
    `/api/v1/dashboard/fetch-reviews?listingId=${listingId}&max=${max}`,
};

export const dashboardAPI = {
  getListing: (name) =>
    apiCall(
      "getListing",
      () => apiClient.get(dashboardAPIEndpoints.getListing(name)),
      "Listing fetched",
      "Fetching listing failed"
    ),
  fetchReviews: (listingId, max) =>
    apiCall(
      "fetchReviews",
      () => apiClient.get(dashboardAPIEndpoints.fetchReviews(listingId, max)),
      "Reviews fetched",
      "Fetching reviews failed"
    ),
};
