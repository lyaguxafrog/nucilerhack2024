import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { NotFoundPage } from './not-found';
import { Footer } from './footer';
import { Login } from './login';
import { Keys } from './keyspage';
import { Start } from './start';
import { Register } from './register';

export function App ():JSX.Element {
  return (
    <BrowserRouter>
      <div className='wrapper'>
      <Routes>
        <Route
          path={'/'}
          element={<Start/>}
        />
        <Route
          path={'/keys'}
          element={<Keys/>}
        />
        <Route path={'*'} element={<NotFoundPage/>}/>
        <Route
          path={'/register'}
          element={<Register/>}
        />
      </Routes>

      </div>
      <Footer/>
    </BrowserRouter>  );
}

