import { Link } from "react-router-dom";

const PageNotFound: React.FC<{}> = () => {
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <h1 className="text-white text-4xl font-bold ">Page not found 404</h1>
      <Link to="/">
        <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 text-xl">
          Home
        </button>
      </Link>
    </div>
  );
};

export default PageNotFound;
