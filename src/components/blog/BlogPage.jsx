import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock, Tag, Search, X, ChevronRight, Terminal, Laptop2, Code2 } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { getPosts } from '../../utils/blogUtils';
import { formatDate } from '../../utils/dateFormat';
import { getTranslation } from '../../utils/translations';
import PostGrid from './PostGrid';

const POSTS_PER_PAGE = 6; // Reduced for better visual layout

const BlogPage = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const { language } = useLanguage();
  const t = (key) => getTranslation(language, `blog.${key}`);

  useEffect(() => {
    const loadPosts = async () => {
      try {
        const allPosts = await getPosts();
        // Filter posts based on current language
        const languagePosts = allPosts.filter(post => {
          if (language.code === 'en') {
            return !post.slug.includes('-ar') && !post.slug.includes('-de') && !post.slug.includes('-cz');
          }
          return post.slug.includes(`-${language.code}`);
        });
        setPosts(languagePosts);
      } catch (err) {
        setError('Failed to load blog posts');
        console.error('Error loading posts:', err);
      } finally {
        setLoading(false);
      }
    };

    loadPosts();
  }, [language]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedCategories]);

  const categories = [...new Set(posts.flatMap(post => post.categories))];

  const filteredPosts = posts
    .filter(post => 
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.description.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter(post => 
      selectedCategories.length === 0 || 
      selectedCategories.some(cat => post.categories.includes(cat))
    );

  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE);
  const paginatedPosts = filteredPosts.slice(
    (currentPage - 1) * POSTS_PER_PAGE,
    currentPage * POSTS_PER_PAGE
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="rounded-xl border p-6 animate-pulse">
                <div className="h-4 bg-muted rounded w-1/4 mb-4"></div>
                <div className="h-6 bg-muted rounded w-3/4 mb-3"></div>
                <div className="h-4 bg-muted rounded w-full mb-2"></div>
                <div className="h-4 bg-muted rounded w-2/3"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background" dir={language.code === 'ar' ? 'rtl' : 'ltr'}>
      {/* Hero Section with Gradient */}
      <div className="relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-grid-slate-100/50 [mask-image:linear-gradient(0deg,transparent,black)] dark:bg-grid-slate-700/25" />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-background" />
        
        {/* Floating Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -right-4 top-1/4 w-24 h-24 bg-primary/10 rounded-full blur-2xl animate-pulse" />
          <div className="absolute left-1/4 top-1/3 w-32 h-32 bg-secondary/10 rounded-full blur-2xl animate-pulse delay-300" />
          <div className="absolute right-1/3 bottom-1/4 w-40 h-40 bg-accent/10 rounded-full blur-2xl animate-pulse delay-700" />
        </div>

        <div className="container mx-auto px-4 relative">
          <div className="py-24 md:py-32 max-w-6xl mx-auto">
            {/* Feature Icons */}
            <div className="flex justify-center gap-8 mb-8">
              <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                <Terminal className="w-4 h-4" />
                <span>Development</span>
              </div>
              <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                <Code2 className="w-4 h-4" />
                <span>Engineering</span>
              </div>
              <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                <Laptop2 className="w-4 h-4" />
                <span>Technology</span>
              </div>
            </div>

            {/* Main Title Group */}
            <div className="text-center space-y-8">
              
              <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                {t('description')}
              </p>

              {/* Quick Stats */}
              <div className="flex justify-center gap-8 pt-8">
                <div className="flex flex-col items-center">
                  <span className="text-3xl font-bold text-primary">{posts.length}</span>
                  <span className="text-sm text-muted-foreground">Articles</span>
                </div>
                <div className="w-px h-12 bg-border" />
                <div className="flex flex-col items-center">
                  <span className="text-3xl font-bold text-primary">{categories.length}</span>
                  <span className="text-sm text-muted-foreground">Categories</span>
                </div>
                <div className="w-px h-12 bg-border" />
                <div className="flex flex-col items-center">
                  <span className="text-3xl font-bold text-primary">
                    {Math.ceil(posts.reduce((acc, post) => acc + post.readingTime, 0) / 60)}
                  </span>
                  <span className="text-sm text-muted-foreground">Hours of Reading</span>
                </div>
              </div>
            </div>

            {/* Search Bar */}
            <div className="relative max-w-2xl mx-auto mt-12">
              <div className="absolute inset-0 -z-10 bg-gradient-to-r from-primary/20 via-secondary/20 to-accent/20 blur-xl" />
              <div className="relative flex items-center bg-background/80 backdrop-blur-sm rounded-2xl border shadow-lg">
                <Search className="absolute left-4 h-5 w-5 text-muted-foreground" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder={t('searchPlaceholder')}
                  className="w-full pl-12 pr-4 py-4 bg-transparent rounded-2xl focus:outline-none focus:ring-2 
                           focus:ring-primary/20 transition-all text-foreground placeholder:text-muted-foreground"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Fade */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent" />
      </div>

{console.log(paginatedPosts)}

      <PostGrid
            paginatedPosts={paginatedPosts}
            currentPage={currentPage}
            totalPages={totalPages}
            setCurrentPage={setCurrentPage}
            t={t}
            language={language}
            formatDate={formatDate}
    />

    </div>
  );
};

export default BlogPage;