import { useState } from "react";
import ExploreMenu from "../components/ExploreMenu";
import Hero from "../components/Hero";
import FoodDisplay from "../components/FoodDisplay";
import AppDownload from "../components/AppDownload";

const Home = () => {
  const [category, setCategory] = useState("All");

  return (
    <section className="pt-[100px]">
      <Hero />
      <ExploreMenu category={category} setCategory={setCategory} />
      <FoodDisplay category={category} />
      <AppDownload />
    </section>
  );
};

export default Home;
