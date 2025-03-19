import axios from "axios"; // Import axios for making HTTP requests.
import toast from "react-hot-toast"; // Import toast for displaying user-friendly error messages.
import { useToken } from "./helper"; // Import custom hook to retrieve authentication token.
import { APIConfigProps } from "./props"; // Import type definition for API configuration props.

const ENV = import.meta.env; // Access environment variables (e.g., API base URL).

/**
 * Handles API error responses and displays appropriate error messages.
 * @param error - The error object received from the API request.
 */
const APIErrorResponse = (error: any) => {
  if (axios.isAxiosError(error)) {
    // Check if the error is an Axios error.
    const status = error.response?.status; // Extract the HTTP status code.
    const message = error.response?.data?.message || "An error occurred"; // Extract the error message.

    // Display user-friendly messages based on the error status code.
    if ([400, 403, 404].includes(status!)) {
      toast.error(message); // Show error toast with API-provided message.
    } else if (error.code === "ERR_NETWORK") {
      toast.error("Network Error. Please check your connection."); // Handle network errors separately.
    } else {
      console.error("Unhandled API Error:", error); // Log unexpected errors.
      toast.error("Something went wrong. Please try again.");
    }
  } else {
    console.error("Unknown Error:", error); // Log unknown errors.
    toast.error("Unexpected error occurred.");
  }
};

/**
 * Makes a POST request to the specified API endpoint.
 * @param {APIConfigProps} param0 - API configuration object.
 * @returns API response data if successful, or handles errors if not.
 */
export const PostMethodAPI = async ({
  variable, // API endpoint path (e.g., "/user/login").
  payload, // Data to be sent in the request body.
  loading, // Function to toggle loading state.
}: APIConfigProps) => {
  const url = `${ENV.VITE_API_URI}${variable}`; // Construct full API URL.
  // Example: http://localhost:8800/api/user/login

  const token = useToken(); // Retrieve authentication token.
  const headers = token ? { "x-api-key": token } : {}; // Include token in headers if available.

  // Retry and timeout settings
  const maxRetries = 3; // Maximum number of retry attempts for network errors.
  const timeout = 10000; // Timeout limit (in milliseconds) for API request.
  let attempt = 0; // Track the number of retry attempts.

  try {
    loading(true); // Set loading state to true before making the request.

    while (attempt < maxRetries) {
      try {
        const response = await axios.post(url, payload, {
          headers, // Attach headers (including authentication token).
          timeout, // Set timeout duration.
        });

        if ([200, 201].includes(response.status)) {
          return response.data; // Return successful response data.
        }
      } catch (error: any) {
        // If a network error occurs and retries are still available, retry the request.
        if (
          axios.isAxiosError(error) &&
          error.code === "ERR_NETWORK" &&
          attempt < maxRetries - 1
        ) {
          attempt++; // Increment retry count.
          continue; // Retry the request.
        }
        throw error; // Throw error if it's not a network issue or max retries are reached.
      }
    }
  } catch (error: any) {
    APIErrorResponse(error); // Handle API errors using the error handler.
  } finally {
    loading(false); // Set loading state to false after request completion.
  }
};
