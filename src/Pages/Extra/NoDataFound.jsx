import { useNavigate } from "react-router";
import noData from '../../assets/nodata.png';

const NoDataFound = ({ message = "No data found.", redirectTo = "/", btnMsg }) => {
  const navigate = useNavigate();

  const handleRedirect = () => {
    navigate(redirectTo);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
      <img src={noData} alt="" />
      <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-300 mb-4">
        {message}
      </h2>
      {btnMsg && (
        <button onClick={handleRedirect} className="btn btn-primary text-black">
          {btnMsg}
        </button>
      )}
    </div>
  );
};

export default NoDataFound;
