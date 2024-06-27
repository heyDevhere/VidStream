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
import BackToTop from "./components/BackToTop";
import { useEffect } from "react";
import HorizontalNav from "./components/HorizontalNav";

const Container = styled.div`
  display: flex;
  overflow-x: hidden; 
  margin-top: 46px;
  min-height: 100vh;
  max-height: auto;
`;

const Main = styled.div`
  flex: 7;
  height  : auto ;
  background-color: ${({ theme }) => theme.bg};
`;
const Wrapper = styled.div`
  padding: 22px 36px 22px 25px;

  @media (max-width: 768px) {
    padding: 22px 12px 22px 15px;

  }
`;


function App() {
  const [darkMode, setDarkMode] = useState(true);
  const [menuOpen, setMenuOpen] = useState(true);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 798) {
        setMenuOpen(true);
      } else {
        setMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);

    // Set initial state
    handleResize();

    // Clean up event listener on component unmount
    return () => window.removeEventListener("resize", handleResize);
  }, []);


  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <Container>
        <BackToTop />

        <BrowserRouter>
            <Menu darkMode={darkMode} setDarkMode={setDarkMode} menuOpen={menuOpen} toggleMenu={toggleMenu} />
          <Main>
            <Navbar toggleMenu={toggleMenu} menuOpen={menuOpen} />
            <HorizontalNav menuOpen={menuOpen}/>
            <Wrapper>
              <Routes>
                <Route path="/">
                  <Route index element={<Home type="random" menuOpen={menuOpen}/>} />
                  <Route path="trends" element={<Home type="trend" menuOpen={menuOpen}/>} />
                  <Route path="subscriptions" element={<Home type="sub" menuOpen={menuOpen}/>} />

                  <Route path="music" element={<MyTags type="Music" menuOpen={menuOpen}/>} />
                  <Route path="sports" element={<MyTags type="Sport" menuOpen={menuOpen}/>} />
                  <Route path="gaming" element={<MyTags type="Game" menuOpen={menuOpen}/>} />
                  <Route path="movies" element={<MyTags type="Movie" menuOpen={menuOpen}/>} />
                  <Route path="news" element={<MyTags type="News" menuOpen={menuOpen}/>} />
                  <Route path="*" element={<Error  menuOpen={menuOpen}/>} />
                  <Route path="history" element={<History menuOpen={menuOpen}/>} />
                  <Route path="search" element={<Search  menuOpen={menuOpen} />} />
                  <Route path="watchlater" element={<WatchLater menuOpen={menuOpen}/>} />

                  <Route path="signin" element={<SignIn />} />
                  <Route path="video">
                    <Route path=":id" element={<Video />} />
                    <Route path="userInfo/:id" element={<UserInfo menuOpen={menuOpen}/>} />
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


