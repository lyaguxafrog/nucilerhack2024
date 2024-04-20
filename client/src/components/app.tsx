import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { RouterPaths } from '../consts/router-paths';
import { LoginPage } from './login';
import { NotFoundPage } from './not-found';
import { Footer } from './footer';

export function App ():JSX.Element {
  return (
    <BrowserRouter>
      <div className='wrapper'>
      <Routes>
        <Route
          path={RouterPaths.root()}
          element={<LoginPage/>}
        />
        <Route path={RouterPaths.notFound()} element={<NotFoundPage/>}/>
      </Routes>
      </div>
      <Footer/>
    </BrowserRouter>
  );
}

