import { apiCall } from '../apiHelper.js'
import { apiClient } from '../apiConfig.js'

export const dashboardAPIEndpoints: IDashboardEndpoints = {
  createListing: '/dashboard/create-listing',
  getListing: '/dashboard/get-listing',
  fetchReviews: '/dashboard/fetch-reviews'
}

interface IDashboardAPI {
  createListing: (
    userId: number,
    name: string,
    reviews_url: string,
    description?: string
  ) => Promise<{ success: boolean; data?: any; error?: string }>
  getListing: (
    userId: number,
    listingName?: string
  ) => Promise<{ success: boolean; data?: any; error?: string }>
  fetchReviews: (
    userId: number,
    listingId: number,
    max_reviews: number,
    url: string
  ) => Promise<{ success: boolean; data?: any; error?: string }>
}

interface IDashboardEndpoints {
  createListing: string
  getListing: string
  fetchReviews: string
}

export const dashboardAPI: IDashboardAPI = {
  createListing: (
    userId: number,
    name: string,
    reviews_url: string,
    description?: string
  ) =>
    apiCall(
      'createListing',
      () =>
        apiClient.post(dashboardAPIEndpoints.createListing, {
          userId,
          name,
          reviews_url,
          description
        }),
      'Listing created successfully',
      'Listing creation failed'
    ),

  getListing: (userId: number, listingName?: string) =>
    apiCall(
      'getListing',
      () =>
        apiClient.get(dashboardAPIEndpoints.getListing, {
          params: { userId, listingName }
        }),
      'Listing fetched',
      'Fetching listing failed'
    ),

  fetchReviews: (
    userId: number,
    listingId: number,
    max_reviews: number,
    url: string
  ) =>
    apiCall(
      'fetchReviews',
      () =>
        apiClient.get(dashboardAPIEndpoints.fetchReviews, {
          params: { userId, listingId, max_reviews, url }
        }),
      'Reviews fetched',
      'Fetching reviews failed'
    )
}
