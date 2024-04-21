import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/typed-wrappers";
import { genSeed, registerUser, setUsername } from "../store/actions";
import { useNavigate } from "react-router-dom";

export const Register = () => {

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const username = useAppSelector((state) => state.username);
  const generatedSeed = useAppSelector((state) => state.seed);
  // console.log(generatedSeed.genSeed);
  const splittedSeed = generatedSeed.genSeed ? generatedSeed.genSeed.split(" ") : null;
  useEffect(() => {
    dispatch(genSeed())
  }, []);

  const refreshHandler = () => {
    dispatch(genSeed())
  }
  const submitHandler = () => {
    dispatch(registerUser({registerInput: {
      email: username,
      seed: generatedSeed
    }}))
    navigate('/keys');
  }

  if (!generatedSeed.genSeed) {
    <section className="register">
      <h2 className="registerTitle">WebAuthn</h2>
      <div className="wordRow">
        <p className="word">----</p>
        /
        <p className="word">----</p>
        /
        <p className="word">----</p>
        /
        <p className="word">----</p>
        /
        <p className="word">----</p>
        /
        <p className="word">----</p>
        /
        <p className="word">----</p>
        /
        <p className="word">----</p>
        /
        <p className="word">----</p>
        /
        <p className="word">----</p>
        /
        <p className="word">----</p>
        /
        <p className="word">----</p>
        <button className="button buttonCopy"></button>
      </div>
      <div className="button-container">
        <button className="button buttonOK" onClick={submitHandler}></button>
        <button className="button buttonRefr" onClick={refreshHandler}></button>
      </div>
    </section>
  } else {
    return (
      <section className="register">
        <h2 className="registerTitle">WebAuthn</h2>
        <div className="wordRow">
          <p className="word">{splittedSeed[0]}</p>
          /
          <p className="word">{splittedSeed[1]}</p>
          /
          <p className="word">{splittedSeed[2]}</p>
          /
          <p className="word">{splittedSeed[3]}</p>
          /
          <p className="word">{splittedSeed[4]}</p>
          /
          <p className="word">{splittedSeed[5]}</p>
          /
          <p className="word">{splittedSeed[6]}</p>
          /
          <p className="word">{splittedSeed[7]}</p>
          /
          <p className="word">{splittedSeed[8]}</p>
          /
          <p className="word">{splittedSeed[9]}</p>
          /
          <p className="word">{splittedSeed[10]}</p>
          /
          <p className="word">{splittedSeed[11]}</p>
          <button className="button buttonCopy"></button>
        </div>
        <div className="button-container">
          <button className="button buttonOK" onClick={submitHandler}></button>
          <button className="button buttonRefr" onClick={refreshHandler}></button>
        </div>
      </section>
    );
  }

  
};
