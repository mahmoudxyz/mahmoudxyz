import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import LandingPage from './pages/LandingPage';
import BlogPage from './components/blog/BlogPage';
import BlogPostPage from './components/blog/BlogPostPage';
import { LanguageProvider } from './components/contexts/LanguageContext';
import CharacterBuilder from './components/CharacterBuilder';
import CharacterCreator from './components/CharacterCreator';
import NotFound from './components/NotFound';
import ScrollToTop from './components/ScrollToTop';
import ExperiencePage from './pages/Experience';
import ContactPage from './pages/ContactPage';
import VideoWatchPage from './pages/VideoWatchPage.jsx';
import { GoalProvider } from './components/contexts/GoalContext.tsx';
import GoalsPage from './pages/GoalsPage.jsx';


function App() {
  return (
    <LanguageProvider>
            <GoalProvider>
      <Router>
      <ScrollToTop />
        <div className="min-h-screen bg-background">
          <Header />
          <main className="container mx-auto px-4 py-8">
            <Routes>
              {/* Public routes */}
              <Route path="/" element={<LandingPage />} />
              <Route path="/experience" element={<ExperiencePage />} />
              <Route path="/contact" element={<ContactPage />} />

              <Route path="/watch" element={<VideoWatchPage />} />

              <Route path="/goals" element={<GoalsPage />} />

              {/* Blog routes */}
              <Route path="/blog" element={<BlogPage />} />
              <Route path="/blog/:slug" element={<BlogPostPage />} />
              
              {/* RPG routes */}
              <Route path="/rpg" element={<CharacterBuilder />} />
              <Route path="/rpg-preview" element={<CharacterCreator />} />
              
              {/* Catch all route */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
        </div>
      </Router>
      </GoalProvider>
    </LanguageProvider>
  );
}

export default App;
