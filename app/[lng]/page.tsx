import { HomePage } from "./home";

export default function Home({ params: { lng } }: { params: { lng: string } }) {
  return (
    <>
      <HomePage lng={lng} />
    </>
  );
}
