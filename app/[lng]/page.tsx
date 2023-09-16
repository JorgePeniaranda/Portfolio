import { HomePage } from "./home";

const Home = ({ params: { lng } }: { params: { lng: string } }) => {
  return (
    <>
      <HomePage lng={lng} />
    </>
  );
};

export default Home;
