import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { ArrowLeft, Calendar, Clock, Tag } from 'lucide-react';
import { getPost } from '@/utils/blogUtils';
import { formatDate } from '@/utils/dateFormat';
import { cn } from '@/lib/utils';
import TableOfContents from './TableOfContents';
import ShareButton from './ShareButton';
import { useLanguage } from '../contexts/LanguageContext';

const CodeBlock = ({ inline, className, children, ...props }) => {
    const { language } = useLanguage();
    const isRTL = language.dir === 'rtl';
    
    if (inline) {
      return (
        <code
          className="px-1.5 py-0.5 rounded-md bg-code font-mono text-sm text-code-foreground"
          dir="ltr"
          {...props}
        >
          {children}
        </code>
      );
    }
  
    return (
      <div className={`relative my-6 ${isRTL ? 'text-left' : 'text-left'}`} dir="ltr">
        <pre
          className="rounded-lg bg-code p-4 overflow-x-auto font-mono text-sm text-code-foreground"
          {...props}
        >
          {children}
        </pre>
      </div>
    );
  };

const BlogPostPage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showToC, setShowToC] = useState(false);

  useEffect(() => {
    const loadPost = async () => {
      try {
        const postData = await getPost(slug);
        if (!postData) {
          throw new Error('Post not found');
        }
        setPost(postData);
        // Only show table of contents if there are enough headings
        setShowToC(postData.tableOfContents.length > 2);
      } catch (err) {
        setError(err.message);
        console.error('Error loading post:', err);
      } finally {
        setLoading(false);
      }
    };

    loadPost();
  }, [slug]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto">
          <div className="animate-pulse space-y-4">
            <div className="h-4 bg-muted rounded w-24" />
            <div className="h-8 bg-muted rounded w-3/4" />
            <div className="h-4 bg-muted rounded w-1/2" />
            <div className="space-y-2">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="h-4 bg-muted rounded" style={{ width: `${85 - (i * 10)}%` }} />
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
        <h2 className="text-xl font-semibold text-destructive mb-4">{error}</h2>
        <button
          onClick={() => navigate('/blog')}
          className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Return to blog
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Article Header */}
      <header className="border-b">
        <div className="container mx-auto px-4 py-16">
          {/* Back Button */}
          <Link 
            to="/blog" 
            className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-8 group"
          >
            <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
            Back to blog
          </Link>

          {/* Categories */}
          <div className="flex flex-wrap gap-2 mb-6">
            {post.categories?.map((category) => (
              <span
                key={category}
                className="inline-flex items-center text-sm font-medium px-3 py-1 rounded-full bg-primary/10 text-primary"
              >
                <Tag className="w-4 h-4 mr-1" />
                {category}
              </span>
            ))}
          </div>

          {/* Title & Description */}
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{post.title}</h1>
          <p className="text-xl text-muted-foreground mb-6">{post.description}</p>

          {/* Metadata */}
          <div className="flex items-center gap-6 text-muted-foreground">
            <span className="flex items-center">
              <Calendar className="w-5 h-5 mr-2" />
              {formatDate(post.date)}
            </span>
            <span className="flex items-center">
              <Clock className="w-5 h-5 mr-2" />
              {post.readingTime} min read
            </span>
            <ShareButton post={post} />
          </div>
        </div>
      </header>

      {/* Article Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-screen-xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-12">
            {/* Main Content */}
            <div className="prose prose-slate dark:prose-invert max-w-none">
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
                    <a {...props} className="text-primary hover:underline" />
                  ),
                  pre: ({ node, ...props }) => (
                    <pre {...props} className="rounded-lg bg-muted p-4 overflow-x-auto" />
                  ),
                  code: ({ node, inline, ...props }) => (
                    inline ? 
                      <code {...props} className="px-1.5 py-0.5 rounded-md bg-muted font-mono text-sm" /> :
                      <code {...props} className="font-mono text-sm" />
                  ),
                  img: ({ node, ...props }) => (
                    <img {...props} className="rounded-lg" loading="lazy" />
                  ),
                  pre: CodeBlock,
                  code: CodeBlock,

                }}
              >
                {post.content}
              </ReactMarkdown>
            </div>

            {/* Sidebar */}
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
  );
};

export default BlogPostPage;
