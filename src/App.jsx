import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
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
import UniversityTracker from './pages/UniversitySearch.jsx';
import UniversityFormPage from './pages/UniversityFormPage.jsx';
import LoginPage from './components/auth/LoginPage';
import ProtectedRoute from './components/auth/ProtectedRoute';
import { useAuth } from './hooks/useAuth';
import { HelmetProvider } from 'react-helmet-async';
import MarkdownEditor from './components/blog/MarkdownEditor.jsx';
import '@fontsource/noto-sans-arabic/400.css';
import JSONLCreator from './pages/JSONLCreator.jsx';
import WorkflowJSONLCreator from './pages/WorkflowJSONLCreator.jsx';
import RetroPortfolio from './pages/RetroPortfolio.jsx';
import RoadmapComponent from './pages/RoadmapComponent.jsx';
import LinearAlgebraCalculusRoadmap from './pages/LinearAlgebraCalculusRoadmap.jsx';
import ItalianA1Roadmap from './pages/ItalianA1Roadmap.jsx';
import MLAlgorithmsRoadmap from './pages/MLAlgorithmsRoadmap.jsx';
import RoadmapHub from './pages/RoadmapHub.jsx';
import BirthdayCakeForNada from './pages/BirthdayCakeForNada.jsx';

const AuthWrapper = ({ children }) => {
  useAuth(); // This will check token validity periodically
  return children;
};

function App() {
  return (
    <HelmetProvider>
    <LanguageProvider>
      <GoalProvider>
      <LanguageProvider>
        <Router>
          <AuthWrapper>
            <ScrollToTop />
            <div>
              <main >
                <Routes>
                  {/* Public routes */}
                  <Route path="/" element={<RetroPortfolio />} />
                  <Route path="/roadmap/home" element={<RoadmapHub />} />
                  <Route path="/stats-roadmap" element={<RoadmapComponent />} />
                  <Route path="/calc-roadmap" element={<LinearAlgebraCalculusRoadmap />} />
                  <Route path="/it-roadmap" element={<ItalianA1Roadmap />} />
                  <Route path="/ml-roadmap" element={<MLAlgorithmsRoadmap />} />
                  <Route path="/experience" element={<ExperiencePage />} />
                  <Route path="/contact" element={<ContactPage />} />
                  <Route path="/watch" element={<VideoWatchPage />} />
                  <Route path="/login" element={<LoginPage />} />
                   <Route path="/nada" element={<BirthdayCakeForNada />} />


                  <Route path="/blog" element={<BlogPage />} />
                  <Route path="/blog/editor" element={<MarkdownEditor />} />

                  <Route path="/blog/:slug" element={<BlogPostPage />} />

                  <Route path="/rpg" element={<CharacterBuilder />} />
                  <Route path="/rpg-preview" element={<CharacterCreator />} />
                  <Route path="/fine-tune" element={<JSONLCreator />} />

                  <Route path="/worflow-generator" element={<WorkflowJSONLCreator />} />

                  {/* Protected routes */}
                  <Route
                    path="/goals"
                    element={
                      <ProtectedRoute>
                        <GoalsPage />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/uni"
                    element={

                        <UniversityTracker />
  
                    }
                  />
                  <Route
                    path="/uni/create"
                    element={
                      <ProtectedRoute>
                        <UniversityFormPage />
                      </ProtectedRoute>
                    }
                  />

                  {/* Catch all route */}
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </main>
            </div>
          </AuthWrapper>
        </Router>
        </LanguageProvider>
      </GoalProvider>
    </LanguageProvider>
        </HelmetProvider>

  );
}

export default App;