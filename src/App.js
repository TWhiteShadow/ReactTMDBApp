import { useState } from "react";
import Joke from "./components/Joke";
import JokeCategory from "./components/JokeCategory";

function App() {
  const [category, setCategory] = useState()
  const changeCategory = (value) => {
    setCategory(value)
  }
  return (
    <div>
    <JokeCategory onCategoryChange={changeCategory} />
    <p>{category}</p>
    <hr />
    <Joke category={category} />
    {/* <div style={{ border: '1px solid red' }}>
      <Panel isActive={activeIndex === 1} togglePanel={(open) => setActiveIndex(open ? 1 : 0)}>je suis panel 1</Panel>
    </div>
    <div style={{ border: '1px solid red' }}>
      <Panel isActive={activeIndex === 2} togglePanel={(open) => setActiveIndex(open ? 2 : 0)}>je suis panel 2</Panel>
    </div> */}
    </div>
  );
}

export default App;
