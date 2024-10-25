import axios from "axios";
import { useToken } from "./helper";
import { APIConfigProps } from "./props";
const ENV = import.meta.env;

const APIErrorResponse = (error: any) => {
    if (error?.status === 400 || error?.status === 403 || error?.status === 404) {
        return alert(error?.response?.data?.message);
    } else if (error?.code === "ERR_NETWORK") {
        return alert("Network Error");
    } else {
        return console.log(error);
    }
};

export const PostMethodAPI = async ({ variable, payload, loading }: APIConfigProps) => {
    try {
        loading(true);
        const url = `${ENV.VITE_API_URI}${variable}`;
        const token = useToken();
        const headers = token ? { "x-api-key": token } : {};
        const response = await axios.post(url, payload, { headers });
        if (response?.status === 200 || response?.status === 201) {
            return response?.data;
        }
    } catch (error: any) {
        APIErrorResponse(error);
    } finally {
        loading(false);
    }
};

export const GetMethodAPI = async ({ variable, loading }: APIConfigProps) => {
    try {
        loading(true);
        const url = `${ENV.VITE_API_URI}${variable}`;
        const token = useToken();
        const headers = token ? { "x-api-key": token } : {};
        const response = await axios.get(url, { headers });
        if (response?.status === 200) {
            return response?.data;
        }
    } catch (error: any) {
        APIErrorResponse(error);
    } finally {
        loading(false);
    }
};

export const PatchMethodAPI = async ({ variable, payload, loading }: APIConfigProps) => {
    try {
        loading(true);
        const url = `${ENV.VITE_API_URI}${variable}`;
        const token = useToken();
        const headers = token ? { "x-api-key": token } : {};
        const response = await axios.patch(url, payload, { headers });
        if (response?.status === 200) {
            return response?.data;
        }
    } catch (error: any) {
        APIErrorResponse(error);
    } finally {
        loading(false);
    }
};

export const PutMethodAPI = async ({ variable, payload, loading }: APIConfigProps) => {
    try {
        loading(true);
        const url = `${ENV.VITE_API_URI}${variable}`;
        const token = useToken();
        const headers = token ? { "x-api-key": token } : {};
        const response = await axios.put(url, payload, { headers });
        if (response?.status === 200 || response?.status === 201) {
            return response?.data;
        }
    } catch (error: any) {
        APIErrorResponse(error);
    } finally {
        loading(false);
    }
};

export const DeleteMethodAPI = async ({ variable, loading }: APIConfigProps) => {
    try {
        loading(true);
        const url = `${ENV.VITE_API_URI}${variable}`;
        const token = useToken();
        const headers = token ? { "x-api-key": token } : {};
        const response = await axios.delete(url, { headers });
        if (response?.status === 200 || response?.status === 204) {
            return response?.data;
        }
    } catch (error: any) {
        APIErrorResponse(error);
    } finally {
        loading(false);
    }
};
