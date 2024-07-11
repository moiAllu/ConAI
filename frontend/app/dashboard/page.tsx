import Body from "./components/body";
import Head from "./components/head";

const Dashboard = () => {
  return (
    <div className="w-full h-full max-h-screen flex flex-col space-y-5 justify-evenly">
      <Head />
      <Body />
    </div>
  );
};

export default Dashboard;
