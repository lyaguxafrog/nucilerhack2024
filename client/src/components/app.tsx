import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { LoginPage } from './login';
import { NotFoundPage } from './not-found';
import { Footer } from './footer';

export function App ():JSX.Element {
  return (
    <BrowserRouter>
      <div className='wrapper'>
      <Routes>
        <Route
          path={'/'}
          element={<LoginPage/>}
        />
        <Route path={'*'} element={<NotFoundPage/>}/>
      </Routes>
      </div>
      <Footer/>
    </BrowserRouter>
  );
}

