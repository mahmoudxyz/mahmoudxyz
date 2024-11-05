// App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import LandingPage from './pages/LandingPage';
import BlogPage from './components/blog/BlogPage';
import BlogPostPage from './components/blog/BlogPostPage';
import { LanguageProvider } from './components/contexts/LanguageContext';
import CharacterBuilder from './components/CharacterBuilder';
import CharacterPreview from './components/CharacterPreview';
import CharacterCreator from './components/CharacterCreator';




function App() {
  return (
    <LanguageProvider>
    <Router>
      <div className="min-h-screen bg-background">
        <Header />
        <main>
          <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/blog/:slug" element={<BlogPostPage />} />
          <Route path="/rpg" element={<CharacterBuilder />} />
          <Route path="/rpg-preview" element={<CharacterCreator />} />

          </Routes>
        </main>
      </div>
    </Router>
    </LanguageProvider>
  );
}

export default App;