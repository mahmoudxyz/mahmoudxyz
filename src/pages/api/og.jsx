// pages/api/og.jsx
import { ImageResponse } from '@vercel/og';

export const config = {
  runtime: 'edge',
};

export default async function handler(req) {
  try {
    const { searchParams } = new URL(req.url);

    // Get dynamic params
    const title = searchParams.get('title') || 'Blog Title';
    const description = searchParams.get('description') || 'Blog Description';
    const categories = (searchParams.get('categories') || '').split(',').filter(Boolean);

    return new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: '#1a1a1a',
            padding: '48px 48px',
          }}
        >
          {/* Gradient Background */}
          <div
            style={{
              position: 'absolute',
              top: '0',
              left: '0',
              right: '0',
              bottom: '0',
              background: 'linear-gradient(135deg, #13547a 0%, #80d0c7 100%)',
              opacity: '0.1',
            }}
          />

          {/* Content Container */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              height: '100%',
              zIndex: 1,
            }}
          >
            {/* Categories */}
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              {categories.map((category) => (
                <div
                  key={category}
                  style={{
                    backgroundColor: 'rgba(255,255,255,0.1)',
                    padding: '6px 12px',
                    borderRadius: '16px',
                    fontSize: '16px',
                    color: '#fff',
                  }}
                >
                  {category}
                </div>
              ))}
            </div>

            {/* Main Content */}
            <div style={{ marginTop: 'auto', marginBottom: 'auto' }}>
              <h1
                style={{
                  fontSize: '64px',
                  fontWeight: 'bold',
                  color: '#fff',
                  lineHeight: 1.2,
                  marginBottom: '24px',
                  display: '-webkit-box',
                  WebkitLineClamp: '2',
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden',
                }}
              >
                {title}
              </h1>
              <p
                style={{
                  fontSize: '24px',
                  color: 'rgba(255,255,255,0.8)',
                  lineHeight: 1.5,
                  display: '-webkit-box',
                  WebkitLineClamp: '2',
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden',
                }}
              >
                {description}
              </p>
            </div>

            {/* Footer */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              {/* Logo */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                }}
              >
                <img
                  src="YOUR_LOGO_URL"
                  alt="Logo"
                  width={40}
                  height={40}
                  style={{ borderRadius: '50%' }}
                />
                <span
                  style={{
                    fontSize: '20px',
                    color: '#fff',
                    fontWeight: '500',
                  }}
                >
                  Your Blog Name
                </span>
              </div>

              {/* URL */}
              <span
                style={{
                  fontSize: '18px',
                  color: 'rgba(255,255,255,0.8)',
                }}
              >
                yourdomain.com
              </span>
            </div>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      },
    );
  } catch (e) {
    return new Response(`Failed to generate image`, {
      status: 500,
    });
  }
}