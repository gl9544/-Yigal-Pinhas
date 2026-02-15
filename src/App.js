import React, { useEffect } from "react";
import "./styles/globalStyles.css";
import { Home, BookSummery, Paper, Papers, Courses, Multimedia } from "./pages";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useParams,
  useLocation,
  useNavigate,
} from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import ScrollToTop from "./components/ScrollToTop";
import "./i18n"; // translation
import { Navbar, Footer } from "./components";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import FourOFour from "./pages/FourOFour";

const paperRoutes = [
  "קשיים-ואתגרים-בחינוך-הגופני",
  "תקציר-לסרטון-האבולוציה-של-החנג-דר-יגא",
  "גמישות-מתאוריה-למעשה",
  "ההבדלים-בין-נשים-לגברים-מבחינה-אנטומי",
  "השפעת-הפעילות-הגופנית-המתונה-או-העצימ",
  "השפעת-שילוב-מולטימדיה-בתוכנית-הוראה-ב",
  "טיפוח-תרבות-עשייה-בקרב-פרחי-הוראה-לחינ",
  "יתרונות-ומגבלות-חדר-כושר",
  "מתיחות-stretching",
  "מתווה-לשחקן-קט-רגל",
  "צעדים-מקדימים-בתוכנית-לניהול-עצמי-בגי",
  "שינה-מי-צריך-את-זה-בכלל",
];

const bookRoutes = ["המדריך-השלם-לפעילות-בחדר-הכושר"];

const OuterContainer = styled.div`
  direction: ${({lng}) => (lng === "he" ? "rtl" : "ltr")};
  text-align: ${({lng}) => (lng === "he" ? "right" : "left")};
  position: relative;
  padding-bottom: 20vh;
  min-height: 75vh;
  
  @media only screen and (max-width: 768px) {
    padding-bottom: 25vh;
  }

  @media only screen and (max-width: 345px) {
    padding-bottom: 32vh;
  }
`;

const App = () => {
  const { t, i18n } = useTranslation();

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  useEffect(() => {
    AOS.refresh();
  }, [i18n.language]);

  return (
    <OuterContainer lng={i18n.language}>
      <Router>
        {/* <LanguageUrlSync /> */}
        <Navbar />
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Navigate to="/he" replace />} />
          <Route
            path="/:lng"
            exact
            element={
              <LngHandler>
                <Home />
              </LngHandler>
            }
          />
          <Route
            path="/:lng/books/:id"
            element={
              <LngHandler>
                <BookSummery />
              </LngHandler>
            }
          />
          <Route
            path="/:lng/articles"
            element={
              <LngHandler>
                <Papers />
              </LngHandler>
            }
          />
          <Route
            path="/:lng/courses"
            element={
              <LngHandler>
                <Courses />
              </LngHandler>
            }
          />
          <Route
            path="/:lng/dvd"
            element={
              <LngHandler>
                <Multimedia />
              </LngHandler>
            }
          />
          <Route
            path="/:lng/articles/:id"
            element={
              <LngHandler>
                <Paper />
              </LngHandler>
            }
          />

          {/* Redirects for old website language switching between simillar books */}
          {/* <Route path={`/he/books/3`} element={<Navigate to="/he/books/0" />} />
          <Route path={`/en/books/0`} element={<Navigate to="/en/books/3" />} /> */}

          {/* Add the following routes */}
          <Route path={`/מאמרים_`} element={<Navigate to="/he/articles" />} />
          <Route
            path={`/מאמרים/${paperRoutes[0]}`}
            element={<Navigate to="/he/articles/0" />}
          />
          <Route
            path={`/מאמרים/${paperRoutes[1]}`}
            element={<Navigate to="/he/articles/1" />}
          />
          <Route
            path={`/מאמרים/${paperRoutes[2]}`}
            element={<Navigate to="/he/articles/2" />}
          />
          <Route
            path={`/מאמרים/${paperRoutes[3]}`}
            element={<Navigate to="/he/articles/3" />}
          />
          <Route
            path={`/מאמרים/${paperRoutes[4]}`}
            element={<Navigate to="/he/articles/4" />}
          />
          <Route
            path={`/מאמרים/${paperRoutes[5]}`}
            element={<Navigate to="/he/articles/5" />}
          />
          <Route
            path={`/מאמרים/${paperRoutes[6]}`}
            element={<Navigate to="/he/articles/8" />}
          />
          <Route
            path={`/מאמרים/${paperRoutes[7]}`}
            element={<Navigate to="/he/articles/9" />}
          />
          <Route
            path={`/מאמרים/${paperRoutes[8]}`}
            element={<Navigate to="/he/articles/10" />}
          />
          <Route
            path={`/מאמרים/${paperRoutes[9]}`}
            element={<Navigate to="/he/articles/11" />}
          />
          <Route
            path={`/מאמרים/${paperRoutes[10]}`}
            element={<Navigate to="/he/articles/12" />}
          />
          <Route
            path={`/מאמרים/${paperRoutes[11]}`}
            element={<Navigate to="/he/articles/13" />}
          />
          <Route
            path={`/${bookRoutes[0]}`}
            element={<Navigate to="/he/books/1" />}
          />

          <Route path="*" element={<FourOFour/>} />
        </Routes>
        <Footer />
      </Router>
    </OuterContainer>
  );
};

export default App;


const LngContainer = styled.div`
  direction: ${({ lng }) => (lng === "he" ? "rtl" : "ltr")};
  text-align: ${({ lng }) => (lng === "he" ? "right" : "left")};  
`

const LngHandler = ({ children }) => {
  const { lng } = useParams();
  const { i18n } = useTranslation();

  useEffect(() => {
    // Change language when URL param changes
    if (lng && (lng === "en" || lng === "he")) {
      i18n.changeLanguage(lng);
    }
  }, [lng, i18n]);
  return <LngContainer lng={lng}>
    {children}
  </LngContainer>
};

function LanguageUrlSync() {
  const location = useLocation();
  const navigate = useNavigate();
  const { i18n } = useTranslation();

  // Extract language from URL
  useEffect(() => {
    const path = location.pathname;
    const urlLang = path.split("/")[1]; // Get first path segment

    // Check if it's a valid language code
    if (urlLang && ["en", "he"].includes(urlLang)) {
      // Only change if different from current
      if (i18n.language !== urlLang) {
        i18n.changeLanguage(urlLang);
      }
    } else {
      // If no valid language in URL, redirect to current language
      const newPath = `/${i18n.language}${path}`;
      navigate(newPath, { replace: true });
    }
  }, [location.pathname, i18n, navigate]);

  // When language changes, update URL
  useEffect(() => {
    const path = location.pathname;
    const urlLang = path.split("/")[1];

    // Only redirect if URL doesn't match language
    if (urlLang !== i18n.language && ["en", "he"].includes(urlLang)) {
      // Replace language code but keep the rest of the path
      const newPath = path.replace(/^\/[^\/]+/, `/${i18n.language}`);
      navigate(newPath, { replace: true });
    }
  }, [i18n.language, location.pathname, navigate]);

  return null; // Utility component, doesn't render anything
}
