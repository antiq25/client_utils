import { AxiosResponse } from 'axios';

// modular API call wrapper to handle all calls, errors, and successes.
export const apiCall = async (type: string, call: any, successMessage: string, errorMessagePrefix: string) => {
  try {
    const response: AxiosResponse = await call();
    showSuccessMessage(type, successMessage);
    return {
      success: true,
      data: response.data
    };
  } catch (error: any) {
    const errorMessage = error.response?.data?.message || errorMessagePrefix;
    showErrorMessage(type, `${errorMessagePrefix}: ${errorMessage}`);
    return {
      success: false,
      error: errorMessage
    };
  }
};

// create the messages + allow generation for easy import in to react / bootstsrap components

export const showSuccessMessage = (type: string, message: string) => console.log(generateMessage('success', type, message));

export const showErrorMessage = (type: string, message: string) => console.log(generateMessage('error', type, message));

export const generateMessage = (messageType: string, type: string, message: string) => `[${messageType.toUpperCase()}] ${type}: ${message}`;