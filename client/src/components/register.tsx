import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/typed-wrappers";
import { genSeed, registerUser } from "../store/actions";
import { useNavigate } from "react-router-dom";

export const Register = () => {

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const username = useAppSelector((state) => state.username);
  const generatedSeed = useAppSelector((state) => state.seed);
  // console.log(generatedSeed.genSeed);
  const splittedSeed = generatedSeed.split(" ");
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

  return (
    <section className="register">
      <h2 className="registerTitle">WebAuthn</h2>
      <div className="wordRow">
        <p className="word">{generatedSeed ? splittedSeed[0] : '----'}</p>
        /
        <p className="word">{generatedSeed ? splittedSeed[1] : '----'}</p>
        /
        <p className="word">{generatedSeed ? splittedSeed[2] : '----'}</p>
        /
        <p className="word">{generatedSeed ? splittedSeed[3] : '----'}</p>
        /
        <p className="word">{generatedSeed ? splittedSeed[4] : '----'}</p>
        /
        <p className="word">{generatedSeed ? splittedSeed[5] : '----'}</p>
        /
        <p className="word">{generatedSeed ? splittedSeed[6] : '----'}</p>
        /
        <p className="word">{generatedSeed ? splittedSeed[7] : '----'}</p>
        /
        <p className="word">{generatedSeed ? splittedSeed[8] : '----'}</p>
        /
        <p className="word">{generatedSeed ? splittedSeed[9] : '----'}</p>
        /
        <p className="word">{generatedSeed ? splittedSeed[10] : '----'}</p>
        /
        <p className="word">{generatedSeed ? splittedSeed[11] : '----'}</p>
        <button className="button buttonCopy"></button>
      </div>
      <div className="button-container">
        <button className="button buttonOK" onClick={submitHandler}></button>
        <button className="button buttonRefr" onClick={refreshHandler}></button>
      </div>
    </section>
  );
};

