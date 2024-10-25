export const useToken = () => {
    return sessionStorage.getItem("token") || "example-token";
}