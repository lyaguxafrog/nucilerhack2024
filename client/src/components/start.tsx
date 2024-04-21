import { useState } from "react";
import { useAppDispatch } from "../hooks/typed-wrappers";
import { setUsername } from "../store/actions";
import { useNavigate } from "react-router-dom";

export const Start = () => {
  const [inputValue, setInputValue] = useState('');

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const buttonHandler = () => {
    dispatch(setUsername(inputValue))
    navigate('/register')
  }
  const buttonHandler2 = () => {
    dispatch(setUsername(inputValue))
    navigate('/login')
  }

  return (
    <section className="start">
      <h2 className="title">WebAuthn</h2>
      <div className="buttonStartRow">
        <input
          type="text"
          value={inputValue}
          onChange={(event) => setInputValue(event.target.value)}
          placeholder="Username"
        />
        <button className="button" onClick={buttonHandler2}></button>
        <button className="button buttonRegister" onClick={buttonHandler}></button>
      </div>
    </section>
  );
};
