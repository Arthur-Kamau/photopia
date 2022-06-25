import React, { useState } from 'react';
import ReactDOM from "react-dom/client";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import IndexPage from './pages';
import LoginPage from './pages/auth/login';
import RegisterPage from './pages/auth/register';
import HomePage from './pages/home/home';
import UploadPage from './pages/upload/upload';

import { MantineProvider, ColorSchemeProvider, ColorScheme } from '@mantine/core';

function App() {
  const [colorScheme, setColorScheme] = useState<ColorScheme>('light');
  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'));

  return (

    <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>


      <MantineProvider theme={{ colorScheme: colorScheme }} withGlobalStyles withNormalizeCSS>
        <BrowserRouter>
          <Routes >
            <Route path="/login" element={<LoginPage />}></Route>
            <Route path="/register" element={<RegisterPage />}></Route>
            <Route path="/home" element={<HomePage colorClickHandler={() => {

              let newColor = colorScheme == 'light' ? 'dark' : 'light'
              
              setColorScheme(newColor as ColorScheme);
              toggleColorScheme(newColor as ColorScheme);
            }} />}></Route>
            <Route path="/upload" element={<UploadPage />}></Route>
            <Route path="/" element={<IndexPage />}></Route>
          </Routes>
        </BrowserRouter>
      </MantineProvider>
    </ColorSchemeProvider>


  );
}

export default App;
