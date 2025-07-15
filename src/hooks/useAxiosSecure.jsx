import axios from "axios";
import { useNavigate } from "react-router";
import useAuth from "./useAuth";
import Swal from "sweetalert2";

const axiosSecure = axios.create({
  baseURL: `${import.meta.env.VITE_serverUrl}`,
});

const useAxiosSecure = () => {
  const { logOut } = useAuth();
  const navigate = useNavigate();
  axiosSecure.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem("token");
      config.headers.Authorization = `Bearer ${token}`;
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
  axiosSecure.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      const status = error.status;
      if (status === 403) {
        logOut()
          .then(() => {
            Swal.fire("error", "Logged out for forbidden access", "error")
            navigate("/auth/login");
          })
          .catch((err) => console.log(err));
      } else if (status === 401) {
        logOut()
          .then(() => {
            navigate("/auth/login");
          })
          .catch((err) => console.log(err));
      }
      // Handle other status codes as needed
      return Promise.reject(error);
    }
  );
  return axiosSecure;
};

export default useAxiosSecure;
