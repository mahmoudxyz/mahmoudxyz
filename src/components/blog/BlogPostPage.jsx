import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { ArrowLeft, Calendar, Clock, Tag, Share2 } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import LangSwitcher from './LangSwitcher';
import { checkAvailableLanguages, getPost } from '../../utils/blogUtils';
import { getSiteConfig } from '../../utils/config';
import BlogMetaTags from './BlogMetaTags';

// Helper function to format dates
const formatDate = (dateString) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

// Updated CodeBlock component to handle nesting issues
const CodeBlock = ({ inline, className, children, ...props }) => {
  const { language } = useLanguage();
  const isRTL = language.dir === 'rtl';
  
  if (inline) {
    return (
      <code
        className="px-1.5 py-0.5 rounded-md bg-black-100 dark:bg-black-800 font-mono text-sm"
        dir="ltr"
        {...props}
      >
        {children}
      </code>
    );
  }

  // Remove the wrapping div to avoid nesting issues
  return (
    <pre
      className="my-6 rounded-lg bg-black-100 dark:bg-gray-800 p-4 overflow-x-auto font-mono text-sm"
      dir="ltr"
      {...props}
    >
      <code className="block">
        {children}
      </code>
    </pre>
  );
};

// Rest of the components remain the same
const ShareButton = ({ post }) => {
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: post.title,
          text: post.description,
          url: window.location.href,
        });
      } catch (err) {
        console.error('Error sharing:', err);
      }
    }
  };

  return (
    <button
      onClick={handleShare}
      className="flex items-center text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
    >
      <Share2 className="w-5 h-5 mr-2" />
      Share
    </button>
  );
};

const TableOfContents = ({ headings }) => {
  return (
    <nav className="space-y-2">
      <h3 className="font-semibold mb-4">Table of Contents</h3>
      <ul className="space-y-2">
        {headings.map((heading) => (
          <li
            key={heading.id}
            className={`${
              heading.level === 2 ? 'ml-0' : 'ml-4'
            }`}
          >
            <a
              href={`#${heading.id}`}
              className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 transition-colors"
            >
              {heading.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

const BlogPostPage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showToC, setShowToC] = useState(false);
  const [availableLanguages, setAvailableLanguages] = useState(['en']);
  const { language } = useLanguage();



  useEffect(() => {
    const loadPost = async () => {
      try {
        const baseSlug = slug.replace(/-[a-z]{2}$/, '');
        const languages = await checkAvailableLanguages(baseSlug);
        setAvailableLanguages(languages);

        const postData = await getPost(slug);
        if (!postData) {
          throw new Error('Post not found');
        }
        setPost(postData);
        setShowToC(postData.tableOfContents?.length > 2);
      } catch (err) {
        setError(err.message);
        console.error('Error loading post:', err);
      } finally {
        setLoading(false);
      }
    };

    loadPost();
  }, [slug]);

  // Loading and error states remain the same
  if (loading) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto">
          <div className="animate-pulse space-y-4">
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-24" />
            <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-3/4" />
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2" />
            <div className="space-y-2">
              {[...Array(3)].map((_, i) => (
                <div 
                  key={i} 
                  className="h-4 bg-gray-200 dark:bg-gray-700 rounded" 
                  style={{ width: `${85 - (i * 10)}%` }} 
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h2 className="text-xl font-semibold text-red-600 dark:text-red-400 mb-4">
          {error}
        </h2>
        <button
          onClick={() => navigate('/blog')}
          className="inline-flex items-center text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Return to blog
        </button>
      </div>
    );
  }

  if (!post) return null;

  return (
    <>
      {post && <BlogMetaTags post={post} baseUrl={getSiteConfig.baseUrl} />}

    <div 
      className="min-h-screen bg-white dark:bg-gray-900" 
      dir={language.code === 'ar' ? 'rtl' : 'ltr'}
    >
      <header className="border-b border-gray-200 dark:border-gray-800">
        <div className="container mx-auto px-4 py-16">
          <div className="flex justify-between items-center mb-8">
            <Link 
              to="/blog" 
              className="inline-flex items-center text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 group"
            >
              <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
              Back to blog
            </Link>
            
            <LangSwitcher 
              availableLanguages={availableLanguages}
              currentSlug={slug}
            />
          </div>

          <div className="flex flex-wrap gap-2 mb-6">
            {post.categories?.map((category) => (
              <span
                key={category}
                className="inline-flex items-center text-sm font-medium px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200"
              >
                <Tag className="w-4 h-4 mr-1" />
                {category}
              </span>
            ))}
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            {post.title}
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-6">
            {post.description}
          </p>

          <div className="flex items-center gap-6 text-gray-500 dark:text-gray-400">
            <span className="flex items-center">
              <Calendar className="w-5 h-5 mr-2" />
              {formatDate(post.date)} {/* Format the date */}
            </span>
            <span className="flex items-center">
              <Clock className="w-5 h-5 mr-2" />
              {post.readingTime} min read
            </span>
            <ShareButton post={post} />
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-screen-xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-12">
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <ReactMarkdown 
                remarkPlugins={[remarkGfm]}
                components={{
                  h1: ({ node, ...props }) => (
                    <h1 id={props.id} className="scroll-mt-20" {...props} />
                  ),
                  h2: ({ node, ...props }) => (
                    <h2 id={props.id} className="scroll-mt-20" {...props} />
                  ),
                  h3: ({ node, ...props }) => (
                    <h3 id={props.id} className="scroll-mt-20" {...props} />
                  ),
                  a: ({ node, ...props }) => (
                    <a {...props} className="text-blue-600 dark:text-blue-400 hover:underline" />
                  ),
                  // Use the updated CodeBlock component for both pre and code tags
                  pre: CodeBlock,
                  code: CodeBlock,
                  img: ({ node, ...props }) => (
                    <img {...props} className="rounded-lg" loading="lazy" />
                  ),
                }}
              >
                {post.content}
              </ReactMarkdown>
            </div>

            {showToC && (
              <aside className="hidden lg:block">
                <div className="sticky top-4">
                  <TableOfContents headings={post.tableOfContents} />
                </div>
              </aside>
            )}
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default BlogPostPage;