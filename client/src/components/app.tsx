import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { RouterPaths } from '../consts/router-paths';
import { NotFoundPage } from './not-found';
import { Footer } from './footer';
import { Login } from './login';
import { Start } from './start';

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
          path={'/login'}
          element={<Login/>}
        />
        <Route path={RouterPaths.notFound()} element={<NotFoundPage/>}/>
      </Routes>
      </div>
      <Footer/>
    </BrowserRouter>
  );
}

