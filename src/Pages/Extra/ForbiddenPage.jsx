import { BiArrowBack, BiLock } from "react-icons/bi";
import { Link } from "react-router";


const ForbiddenPage = () => {
  return (
    <div className="flex flex-col items-center min-h-[calc(100vh-390px)] justify-center text-center px-4">
      <div className="p-10 max-w-md w-full">
        <div className="flex items-center justify-center mb-6">
          <BiLock size={70}/>
        </div>
        <h1 className="text-4xl font-bold text-gray-800 mb-4">403 Forbidden</h1>
        <p className="text-gray-600 mb-6">
          Sorry, you don’t have permission to access this page.
        </p>
        <Link
          to="/"
          className="btn btn-primary text-black"
        >
         <BiArrowBack/> Go Back Home
        </Link>
      </div>
    </div>
  );
};

export default ForbiddenPage;
