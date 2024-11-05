// src/pages/Blog/BlogPage.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock, Tag } from 'lucide-react';
import SearchBar from './SearchBar';
import CategoryFilter from './CategoryFilter';
import Pagination from './Pagination';
import { useLanguage } from '../contexts/LanguageContext';
import { getPosts } from '../../utils/blogUtils';
import { formatDate } from '../../utils/dateFormat';
import { getTranslation } from '../../utils/translations';

const POSTS_PER_PAGE = 9;

const BlogPage = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const { language } = useLanguage();
  const t = (key) => getTranslation(language, `blog.${key}`);


  useEffect(() => {
    const loadPosts = async () => {
      try {
        const allPosts = await getPosts();
        setPosts(allPosts);
      } catch (err) {
        setError('Failed to load blog posts');
        console.error('Error loading posts:', err);
      } finally {
        setLoading(false);
      }
    };

    loadPosts();
  }, []);

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedCategory]);

  // Get unique categories from all posts
  const categories = [...new Set(posts.flatMap(post => post.categories))];

  // Filter posts
  const filteredPosts = posts
    .filter(post => 
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.description.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter(post => 
      selectedCategory ? post.categories.includes(selectedCategory) : true
    );

  // Paginate posts
  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE);
  const paginatedPosts = filteredPosts.slice(
    (currentPage - 1) * POSTS_PER_PAGE,
    currentPage * POSTS_PER_PAGE
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-16 text-center">
          <div className="animate-pulse">
            <div className="h-8 bg-muted rounded w-1/4 mx-auto mb-4"></div>
            <div className="h-4 bg-muted rounded w-2/4 mx-auto"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-16 text-center">
          <h2 className="text-xl font-semibold text-destructive mb-2">{error}</h2>
          <p className="text-muted-foreground">Please try again later.</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen bg-background ${language.dir === 'rtl' ? 'dir-rtl' : 'dir-ltr'}`}>
      {/* Hero Section */}
      <div className="border-b">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{t('title')}</h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl">
            {t('description')}
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-4 md:items-center">
          <div className="w-full md:w-64">
            <SearchBar 
              searchTerm={searchTerm} 
              onSearch={setSearchTerm}
              placeholder={t('searchPlaceholder')}
            />
          </div>
          <CategoryFilter
            categories={categories}
            selected={selectedCategory}
            onChange={setSelectedCategory}
          />
        </div>
      </div>

       {/* Posts Grid */}
       <div className="container mx-auto px-4 py-8">
        {paginatedPosts.length === 0 ? (
          <div className="text-center py-12">
            <h3 className="text-lg font-medium mb-2">{t('noResults')}</h3>
            <p className="text-muted-foreground">
              {t('noResultsDesc')}
            </p>
          </div>
        ) : (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {paginatedPosts.map((post) => (
              <article 
                key={post.slug}
                className="group flex flex-col rounded-lg border bg-card hover:bg-card/50 transition-colors p-6"
              >
                {/* Categories */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {post.categories?.map((category) => (
                    <span
                      key={category}
                      className="inline-flex items-center text-xs font-medium px-2 py-1 rounded-full bg-primary/10 text-primary"
                    >
                      <Tag className={`w-3 h-3 ${language.dir === 'rtl' ? 'ml-1' : 'mr-1'}`} />
                      {category}
                    </span>
                  ))}
                </div>

                {/* Title */}
                <h2 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                  <Link to={`/blog/${post.slug}`} className="hover:underline">
                    {post.title}
                  </Link>
                </h2>

                {/* Description */}
                <p className="text-muted-foreground mb-4 line-clamp-2">
                  {post.description}
                </p>

                {/* Metadata */}
                <div className="mt-auto flex items-center gap-4 text-sm text-muted-foreground">
                  <span className="flex items-center">
                    <Calendar className={`w-4 h-4 ${language.dir === 'rtl' ? 'ml-1' : 'mr-1'}`} />
                    {formatDate(post.date, language.code)}
                  </span>
                  <span className="flex items-center">
                    <Clock className={`w-4 h-4 ${language.dir === 'rtl' ? 'ml-1' : 'mr-1'}`} />
                    {post.readingTime} {t('readingTime')}
                  </span>
                </div>
              </article>
            ))}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-12">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </div>
        )}
      </div>

    </div>
  );
};

export default BlogPage;