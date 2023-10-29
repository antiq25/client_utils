# API Utility Functions

This file contains utility functions for making API calls and handling responses. The functions are designed to be generic and reusable across different API endpoints.

## apiCall
This function acts as a wrapper around any given API call. It takes in the type of the API call, the actual API call function, a success message, and an error message prefix. It executes the provided API call, logs the result (either success or error), and returns an object indicating the success status and the returned data or error.

### Parameters
- `type` (string): The type of the API call being made.
- `apiCallFunc` (function): The function that makes the API call.
- `successMsg` (string): The message to log if the API call is successful.
- `errorMsgPrefix` (string): The prefix to add to the error message if the API call fails.

### Returns
An object with the following properties:
- `success` (boolean): Whether the API call was successful or not.
- `data` (any): The data returned by the API call, if successful.
- `error` (string): The error message returned by the API call, if unsuccessful.

## handleAPIRequest
This is a higher-order function designed to encapsulate any API call, execute it, handle potential errors, and log appropriate messages. It uses the apiCall function internally.

### Parameters
- `apiCallFunc` (function): The function that makes the API call.
- `successMsg` (string): The message to log if the API call is successful.
- `errorMsgPrefix` (string): The prefix to add to the error message if the API call fails.

### Returns
A function that takes in the arguments for the API call and executes it.

## authAPI
This object houses several methods that directly interact with authentication-related API endpoints. Each method in authAPI typically:

- Takes in relevant data or parameters (like user details or verification code).
- Calls the apiCall function, passing in the relevant endpoint, HTTP method (like POST or GET), data, and success/failure messages.
- For example, the login method within authAPI sends a POST request to the login endpoint with user credentials. If the login is successful and a token is returned, it stores this token in local storage.

### Methods
- `login`: Logs in a user with the provided credentials.
- `logout`: Logs out the current user.
- `register`: Registers a new user with the provided details.
- `verify`: Verifies a user's email or phone number with the provided verification code.
