import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import useAuth from "./useAuth";

const useUserRole = () => {
  const axiosSecure = useAxiosSecure();
  const { user, loading } = useAuth();
  const email = user?.email;
  const {
    data,
    isLoading: roleLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["userRole", email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/role/${email}`);
      return res.data;
    },
    enabled: !!email,
  });

  if (!email) {
    return {
      role: undefined,
      isLoading: loading,
      isError: false,
      refetch: () => {},
    };
  }

  return {
    role: data?.role,
    isLoading: roleLoading || loading,
    isError,
    refetch,
  };
};

export default useUserRole;