import { NextPage } from "next";
import React from "react";

const Home: NextPage = () => {
  const [counter, setCounter] = React.useState(0);
  return <div>Hello Next.js {counter}</div>;
};

export default Home;
