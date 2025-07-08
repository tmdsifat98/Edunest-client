import axios from "axios";

const axiosLocal = axios.create({
  baseURL: `${import.meta.env.VITE_serverUrl}`,
});

const useAxiosLocal = () => {
  return axiosLocal;
};

export default useAxiosLocal;