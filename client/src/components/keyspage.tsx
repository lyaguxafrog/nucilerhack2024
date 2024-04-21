import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/typed-wrappers";
import { allKeys } from "../store/actions";

export const Keys = () => {

  const dispatch = useAppDispatch();
  const keysData = useAppSelector((state) => state.keysData).keys;

  useEffect(() => {
    dispatch(allKeys());
  }, []);

  return (
    <section className="keys">
      <h2 className="keysTitle">keys</h2>
      <div className="yellowLine"></div>
      <ul className="keysTable">
        {keysData ? keysData.map((key) => (
          <li>
            {key.service}
            <button className="removeButton">
              <img src="/img/close.svg" />
            </button>
          </li>
        )) : false}
      </ul>
      <button className="addButton">
        add key
        <img src="/img/add.svg"/>
      </button>
      <div className="whiteLine"></div>
    </section>
  );
};