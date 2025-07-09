import { useNavigate } from "react-router";

const NoDataFound = ({ message = "No data found.", redirectTo = "/", btn }) => {
  const navigate = useNavigate();

  const handleRedirect = () => {
    navigate(redirectTo);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
      <img src="https://i.ibb.co/qLk95d9z/nodata.png" alt="" />
      <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-300 mb-4">
        {message}
      </h2>
      {btn && (
        <button onClick={handleRedirect} className="btn btn-primary text-black">
          Go Back
        </button>
      )}
    </div>
  );
};

export default NoDataFound;
