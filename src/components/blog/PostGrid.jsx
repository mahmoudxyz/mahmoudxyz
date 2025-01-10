import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, Clock, ChevronRight, Search, ArrowLeft, ArrowRight } from 'lucide-react';

const PostGrid = ({ paginatedPosts, currentPage, totalPages, setCurrentPage, t, language, formatDate }) => {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  if (paginatedPosts.length === 0) {
    return (
      <div className="text-center py-24">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-6"
        >
          <Search className="w-8 h-8 text-primary" />
        </motion.div>
        <motion.h3 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-2xl font-semibold mb-3"
        >
          {t('noResults')}
        </motion.h3>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-muted-foreground max-w-md mx-auto"
        >
          {t('noResultsDesc')}
        </motion.p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Featured Post */}
      {paginatedPosts.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-16"
        >
          <Link
            to={`/blog/${paginatedPosts[0].slug}`}
            className="group block relative overflow-hidden"
          >
            <div className="relative rounded-2xl border bg-card overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-primary/0 to-primary/5 group-hover:opacity-75 transition-opacity duration-300" />
              <div className="p-8 md:p-12">
                <div className="flex flex-wrap gap-2 mb-6">
                  {paginatedPosts[0].categories?.map((category) => (
                    <span
                      key={category}
                      className="inline-flex items-center text-xs font-medium px-3 py-1.5 rounded-full
                               bg-primary/10 text-primary"
                    >
                      {category}
                    </span>
                  ))}
                </div>

                <div className="max-w-3xl">
                  <h2 className="text-3xl md:text-4xl font-bold mb-4 group-hover:text-primary transition-colors">
                    {paginatedPosts[0].title}
                  </h2>
                  <p className="text-lg text-muted-foreground mb-6 line-clamp-2">
                    {paginatedPosts[0].description}
                  </p>
                  <div className="flex items-center gap-6">
                    <span className="flex items-center gap-2 text-muted-foreground">
                      <Calendar className="w-5 h-5" />
                      {formatDate(paginatedPosts[0].date, language.code)}
                    </span>
                    <span className="flex items-center gap-2 text-muted-foreground">
                      <Clock className="w-5 h-5" />
                      {paginatedPosts[0].readingTime} {t('readingTime')}
                    </span>
                    <span className="hidden md:flex items-center text-primary font-medium">
                      Read More 
                      <ChevronRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" />
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        </motion.div>
      )}

      {/* Regular Posts Grid */}
      <motion.div 
        variants={container}
        initial="hidden"
        animate="show"
        className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
      >
        {paginatedPosts.slice(1).map((post) => (
          <motion.div key={post.slug} variants={item}>
            <Link 
              to={`/blog/${post.slug}`}
              className="group flex flex-col h-full rounded-xl overflow-hidden border bg-card hover:bg-card/50 transition-all duration-300"
            >
              <div className="relative p-6 pb-4">
                <div className="flex flex-wrap gap-2 mb-4">
                  {post.categories?.map((category) => (
                    <span
                      key={category}
                      className="inline-flex items-center text-xs font-medium px-2.5 py-1 rounded-full
                               bg-secondary/20 text-secondary-foreground"
                    >
                      {category}
                    </span>
                  ))}
                </div>

                <h2 className="text-xl font-semibold mb-3 group-hover:text-primary transition-colors line-clamp-2">
                  {post.title}
                </h2>
                <p className="text-muted-foreground mb-4 line-clamp-2">
                  {post.description}
                </p>
              </div>

              <div className="mt-auto p-6 pt-4 border-t bg-muted/50">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1.5">
                      <Calendar className="w-4 h-4" />
                      {formatDate(post.date, language.code)}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Clock className="w-4 h-4" />
                      {post.readingTime} {t('readingTime')}
                    </span>
                  </div>
                  
                  <span className="flex items-center text-primary">
                    <ChevronRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </motion.div>

      {/* Pagination */}
      {totalPages > 1 && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-16 flex justify-center"
        >
          <div className="inline-flex items-center gap-2 rounded-full border bg-card p-2">
            <button
              onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
              className="p-2 rounded-full hover:bg-muted disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            
            <div className="flex items-center gap-1 px-2">
              {[...Array(totalPages)].map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`min-w-[2.5rem] h-10 rounded-full flex items-center justify-center text-sm font-medium transition-colors
                    ${currentPage === i + 1
                      ? 'bg-primary text-primary-foreground'
                      : 'hover:bg-muted'}`}
                >
                  {i + 1}
                </button>
              ))}
            </div>

            <button
              onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
              disabled={currentPage === totalPages}
              className="p-2 rounded-full hover:bg-muted disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default PostGrid;