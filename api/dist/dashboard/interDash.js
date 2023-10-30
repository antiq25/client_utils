import { apiCall } from '../apiHelper';
import { apiClient } from '../apiConfig';
export const dashboardAPIEndpoints = {
    createListing: '/dashboard/create-listing',
    getListing: '/dashboard/get-listing',
    fetchReviews: '/dashboard/fetch-reviews'
};
export const dashboardAPI = {
    createListing: (userId, name, reviews_url, description) => apiCall('createListing', () => apiClient.post(dashboardAPIEndpoints.createListing, { userId, name, reviews_url, description }), 'Listing created successfully', 'Listing creation failed'),
    getListing: (userId, listingName) => apiCall('getListing', () => apiClient.get(dashboardAPIEndpoints.getListing, { params: { userId, listingName } }), 'Listing fetched', 'Fetching listing failed'),
    fetchReviews: (userId, listingId, max_reviews, url) => apiCall('fetchReviews', () => apiClient.get(dashboardAPIEndpoints.fetchReviews, { params: { userId, listingId, max_reviews, url } }), 'Reviews fetched', 'Fetching reviews failed')
};
//# sourceMappingURL=interDash.js.map