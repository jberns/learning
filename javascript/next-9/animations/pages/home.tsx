import Link from "next/link";
import { NextPage } from "next";

interface Props {
  userAgent?: string;
}

const Home: NextPage<Props> = ({ userAgent }) => (
  <div>
    <h1>Home</h1>
    <Link href='/'>Go back to Index</Link>
    <main>Your user agent: {userAgent}</main>
  </div>
);

Home.getInitialProps = async ({ req }) => {
  const userAgent = req ? req.headers["user-agent"] : navigator.userAgent;
  return { userAgent };
};

export default Home;
