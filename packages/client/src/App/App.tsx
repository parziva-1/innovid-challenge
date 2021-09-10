import * as React from "react";
import Card from "../Components/Card/Card";

import styles from "./App.module.scss";
type data = {
  id: number;
  load: number;
};

const App: React.FC = () => {
  const servers = 4;

  let arr = new Array(servers);

  let cards = [];

  for (let i = 0; i < servers; i++) {
    cards.push(<Card id={i + 1} key={i + 1} />);
  }
  console.log(cards);
  return (
    <main className={styles.container}>
      {cards}
      <div></div>
    </main>
  );
};

export default App;
