import React from "react";
import pcOn from "../../assets/pc-on.gif";
import pcOff from "../../assets/pc-off.png";
import styles from "./Card.module.scss";

interface Props {
  id?: number;
  seconds?: number;
}
type data = {
  id: number | string;
  load: number;
};

const Card: React.FC<Props> = ({ id }) => {
  const [state, setState] = React.useState<data>({ id: "", load: 0 });
  const [status, setStatus] = React.useState<boolean>(true);
  React.useEffect(() => {
    const interval = setInterval(() => {
      fetch(`http://localhost:8000/status/${id}`)
        .then((res) => res.json())
        .then((data: data) => {
          setState((state) => data);
        })
        .catch((err) => console.log(err));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  React.useEffect(() => {
    fetch(`http://localhost:8000/status/${id}`)
      .then((res) => res.json())
      .then((data: data) => {
        setState((state) => data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className={styles.container}>
      <div className="window" style={{ width: 320, margin: "auto" }}>
        <div className="title-bar">
          <div className="title-bar-text">Server #{id}</div>
        </div>
        <div className="window-body">
          <img
            src={status ? pcOn : pcOff}
            alt={pcOn + "-" + id}
            className={styles.windowImg}
          ></img>
          <div className="status-bar">
            <p className="status-bar-field">Status: {status ? "ON" : "OFF"}</p>
            <p
              className={`status-bar-field ${styles.change}`}
              onClick={() => setStatus((state) => !state)}
            >
              {status ? "shut down" : "turn on"}
            </p>
            <p className="status-bar-field">
              CPU Usage: {status ? state.load : 0}%
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
