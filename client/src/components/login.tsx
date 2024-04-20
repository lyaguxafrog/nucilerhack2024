
export const LoginPage = () => {
  return (
    <section className="login">
      <h2 className="loginTitle">WebAuthn</h2>
      <form className="loginForm" action="">
        <input type="text" className="formInput" placeholder="Username"/>
        <button className="formButton">login</button>
      </form>
    </section>
  );
};
