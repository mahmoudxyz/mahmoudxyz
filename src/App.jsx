import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import LandingPage from './pages/LandingPage';
import BlogPage from './components/blog/BlogPage';
import BlogPostPage from './components/blog/BlogPostPage';
import { LanguageProvider } from './components/contexts/LanguageContext';
import CharacterBuilder from './components/CharacterBuilder';
import CharacterPreview from './components/CharacterPreview';
import CharacterCreator from './components/CharacterCreator';
import NotFound from './components/NotFound';
import ScrollToTop from './components/ScrollToTop';

function App() {
  return (
    <LanguageProvider>
      <Router>
      <ScrollToTop />
        <div className="min-h-screen bg-background">
          <Header />
          <main className="container mx-auto px-4 py-8">
            <Routes>
              {/* Public routes */}
              <Route path="/" element={<LandingPage />} />
              
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
    </LanguageProvider>
  );
}

export default App;
