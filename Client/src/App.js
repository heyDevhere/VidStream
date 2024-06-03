import { useState } from "react";
import styled, { ThemeProvider } from "styled-components";
import Menu from "./components/Menu";
import Navbar from "./components/Navbar";
import { darkTheme, lightTheme } from "./utils/Theme";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Video from "./pages/Video";
import SignIn from "./pages/SignIn";
import Search from "./pages/Search";
import History from "./components/History";
import WatchLater from "./components/WatchLater"
import UserInfo from "./components/UserInfo";
import Gaming from "./pages/MyTags";
import MyTags from "./pages/MyTags";
import Error from "./pages/Error";

const Container = styled.div`
  display: flex;
  overflow-x: hidden; 
  height:auto;


`;

const Main = styled.div`
  flex: 7;
height  : auto ;
  background-color: ${({ theme }) => theme.bg};
`;
const Wrapper = styled.div`
  padding: 22px 36px 22px 25px;
 
`;

function App() {
  const [darkMode, setDarkMode] = useState(true);

  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <Container>
        <BrowserRouter>
          <Menu darkMode={darkMode} setDarkMode={setDarkMode} />
          <Main>
            <Navbar />
            <Wrapper>
              <Routes>
                <Route path="/">
                  <Route index element={<Home type="random" />} />
                  <Route path="trends" element={<Home type="trend" />} />
                  <Route path="subscriptions" element={<Home type="sub" />} />

                  <Route path="music" element={<MyTags type="Music" />} />
                  <Route path="sports" element={<MyTags type="Sport" />} />
                  <Route path="gaming" element={<MyTags type="Game" />} />
                  <Route path="movies" element={<MyTags type="Movie" />} />
                  <Route path="news" element={<MyTags type="News" />} />
                  <Route path="*" element={<Error/>} />






                  <Route path="history" element={<History/>} />
                  <Route path="search" element={<Search/>} />
                  <Route path="watchlater" element={<WatchLater/>} />

                  <Route path="signin" element={<SignIn />} />
                  <Route path="video">
                    <Route path=":id" element={<Video />} />
                    <Route path="userInfo/:id" element={<UserInfo />} />
                  </Route>
                </Route>
              </Routes>
            </Wrapper>
          </Main>
        </BrowserRouter>
      </Container>
    </ThemeProvider>
  );
}

export default App;