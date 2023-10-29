// modular API call wrapper to handle all calls, errors, and successes.
export const apiCall = async (type, call, successMessage, errorMessagePrefix) => {
    try {
        const response = await call();
        showSuccessMessage(type, successMessage);
        return {
            success: true,
            data: response.data
        };
    }
    catch (error) {
        const errorMessage = error.response?.data?.message || errorMessagePrefix;
        showErrorMessage(type, `${errorMessagePrefix}: ${errorMessage}`);
        return {
            success: false,
            error: errorMessage
        };
    }
};
// create the messages + allow generation for easy import in to react / bootstsrap components
export const showSuccessMessage = (type, message) => console.log(generateMessage('success', type, message));
export const showErrorMessage = (type, message) => console.log(generateMessage('error', type, message));
export const generateMessage = (messageType, type, message) => `[${messageType.toUpperCase()}] ${type}: ${message}`;
//# sourceMappingURL=apiHelper.js.map