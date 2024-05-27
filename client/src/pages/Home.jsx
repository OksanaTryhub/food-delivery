import { useState } from "react";
// import { useSelector } from "react-redux";
import ExploreMenu from "../components/ExploreMenu";
import Hero from "../components/Hero";
import FoodDisplay from "../components/FoodDisplay";
import AppDownload from "../components/AppDownload";

const Home = () => {
  // const food = useSelector((store) => store.food);
  // console.log("🚀 ~ Home ~ food:", food);

  const [category, setCategory] = useState("All");

  return (
    <section>
      <Hero />
      <ExploreMenu category={category} setCategory={setCategory} />
      <FoodDisplay category={category} />
      <AppDownload />
    </section>
  );
};

export default Home;
