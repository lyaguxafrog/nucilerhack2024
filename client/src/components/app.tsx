import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { NotFoundPage } from './not-found';
import { Footer } from './footer';
import { Login } from './login';
import { Keys } from './keyspage';

export function App ():JSX.Element {
  return (
    <BrowserRouter>
      <div className='wrapper'>
      <Routes>
        <Route
          path={'/'}
          element={<Login/>}
        />
        <Route
          path={'/keys'}
          element={<Keys/>}
        />
        <Route path={'*'} element={<NotFoundPage/>}/>
      </Routes>
      </div>
      <Footer/>
    </BrowserRouter>
  );
}

