// src/utils/translations.js
export const translations = {
    en: {
      blog: {
        title: 'Blog',
        description: 'Explore articles about web development, software engineering, and modern technology.',
        searchPlaceholder: 'Search articles...',
        backToBlog: 'Back to blog',
        readingTime: 'min read',
        share: 'Share',
        copyLink: 'Copy link',
        copied: 'Copied!',
        noResults: 'No posts found',
        noResultsDesc: "Try adjusting your search or filter to find what you're looking for.",
        loading: 'Loading...'
      }
    },
    ar: {
      blog: {
        title: 'المدونة',
        description: 'استكشف مقالات حول تطوير الويب والبرمجيات والتكنولوجيا الحديثة',
        searchPlaceholder: 'ابحث عن المقالات...',
        backToBlog: 'العودة إلى المدونة',
        readingTime: 'دقيقة قراءة',
        share: 'مشاركة',
        copyLink: 'نسخ الرابط',
        copied: 'تم النسخ!',
        noResults: 'لم يتم العثور على مقالات',
        noResultsDesc: 'حاول تعديل البحث أو الفلتر للعثور على ما تبحث عنه',
        loading: 'جاري التحميل...'
      }
    }
  };
  
  export const getTranslation = (language, key) => {
    const keys = key.split('.');
    let value = translations[language.code];
    
    for (const k of keys) {
      value = value?.[k];
      if (!value) break;
    }
    
    return value || key;
  };