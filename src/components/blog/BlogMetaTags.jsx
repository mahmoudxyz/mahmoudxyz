import React from 'react';
import { Helmet } from 'react-helmet-async';

const BlogMetaTags = ({ post, baseUrl }) => {
  const previewImageUrl = `${baseUrl}/api/og?title=${encodeURIComponent(post.title)}&description=${encodeURIComponent(post.description)}&categories=${encodeURIComponent(post.categories.join(','))}`;

  return (
    <Helmet>
      <title>{post.title}</title>
      <meta name="title" content={post.title} />
      <meta name="description" content={post.description} />
      
      <meta property="og:type" content="article" />
      <meta property="og:url" content={`${baseUrl}/blog/${post.slug}`} />
      <meta property="og:title" content={post.title} />
      <meta property="og:description" content={post.description} />
      <meta property="og:image" content={previewImageUrl} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={`${baseUrl}/blog/${post.slug}`} />
      <meta name="twitter:title" content={post.title} />
      <meta name="twitter:description" content={post.description} />
      <meta name="twitter:image" content={previewImageUrl} />

      <meta property="article:published_time" content={post.date} />
      {post.categories.map(category => (
        <meta key={category} property="article:tag" content={category} />
      ))}
    </Helmet>
  );
};

export default BlogMetaTags;