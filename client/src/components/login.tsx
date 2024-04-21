import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/typed-wrappers";
import { tokenAuth } from "../store/actions";
import { useNavigate } from "react-router-dom";

export const Login = () => {

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [words, setWords] = useState<string[]>(Array(12).fill(''));
  const username = useAppSelector((state) => state.username);
  const tokenGet = useAppSelector((state) => state.tokenGet);
  useEffect(() => {
    if (tokenGet) {
      navigate('/keys')
    }
  }, [tokenGet])
  const handleChange = (index: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
    const newWords = [...words];
    newWords[index] = event.target.value;
    setWords(newWords);

    // Если введен пробел, переключаем фокус на следующее поле ввода
    if (event.target.value.endsWith(' ')) {
      const nextInput = document.getElementById(`input-${index + 1}`);
      if (nextInput) {
        nextInput.focus();
      }
    }

    // Вызываем обработчик изменения слов
    //onWordsChange(newWords.filter(word => word.trim() !== ''));
 };
 const buttonHandler = () => {
  dispatch(tokenAuth({tokenAuthInput: {
    username: username,
    password: words.filter(word => word.trim() !== '').join(' ')
  }}));
 }
  return (
    <section className="register">
      <h2 className="registerTitle">WebAuthn</h2>
      <div className="wordsRow">
      {words.map((word, index) => (
        <input
          key={index}
          id={`input-${index}`}
          type="text"
          value={word}
          onChange={handleChange(index)}
          className="input"
        />
      ))}
      </div>
      <button className="button" onClick={buttonHandler}></button>
    </section>
  );
};
  
  