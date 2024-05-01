import { FC } from "react";
import ima from "../assets/react.svg";
import { Link } from "react-router-dom";
const ErrorPage: FC = () => {
  return (
    <div className="min-h-screen bg-violet-500 font-klee flex justify-center items-center flex-col gap-10">
      <img src={ima} alt="React image" />
      <Link to="/" className="bg-sky-500 rounded-md px-6 py-2 hover:bg-sky-600">
        Back
      </Link>
    </div>
  );
};

export default ErrorPage;
