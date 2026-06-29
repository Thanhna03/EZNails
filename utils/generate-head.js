import site from '@/data/site.json';
import langSetting from '@/data/lang-setting.json';

export default function (pageData, route) {
  const langDefault = langSetting.find(lang => lang.isDefault === true);

  let siteData = {};
  for (const key of Object.keys(site)) {
    if (route.path.includes(key)) {
      siteData = site[key];
      break;
    } else {
      siteData = site[langDefault.value];
    }
  }

  const seo = pageData.seo || {};
  const featured_image_post = pageData.thumb_img || {}
  const pageDescription = seo.page_description || siteData.description;

  const baseUrl = siteData.BaseURL.endsWith('/') ? siteData.BaseURL.slice(0, -1) : siteData.BaseURL;

  const canonicalUrl = baseUrl + (`/${(seo.canonical_url || route.path)}`.replace(/\/+/g, '/'));

  const metaData = [
    {
      'http-equiv': 'content-language',
      content: langDefault.value
    },
    {
      name: 'description',
      content: pageDescription
    },
    {
      property: 'og:description',
      content: pageDescription
    },
    {
      property: 'og:title',
      content: pageData.title
    },
    {
      property: 'og:type',
      content: seo.open_graph_type || 'website'
    },
    {
      property: 'og:image',
      content: seo.featured_image || featured_image_post.image || siteData.image
    },
    {
      name: 'twitter:title',
      content: pageData.title
    },
    {
      name: 'twitter:image',
      content: seo.featured_image || featured_image_post.image || siteData.twitter_image || siteData.image
    },
    {
      name: 'twitter:creator',
      content: seo.author_twitter_handle || siteData.twitter_site
    },
    {
      name: 'twitter:card',
      content: 'summary_large_image'
    },
    {
      name: 'twitter:site',
      content: siteData.twitter_site
    },
    {
      itemprop: 'priceRange',
      name: 'priceRange',
      content: siteData.price_range
    }
  ]

  const htmlAttrs = {
    itemscope: true,
    itemtype: siteData.business_type
  };

  // Add robots no index
  if (seo.no_index) {
    metaData.push({
      name: 'robots',
      content: 'noindex'
    },
    {
      name: 'googlebot',
      content: 'noindex'
    });
  }

  return {
    title: `${pageData.title}`,
    meta: metaData,
    htmlAttrs: htmlAttrs,
    link: [{
      hid: 'canonical',
      rel: 'canonical',
      href: canonicalUrl
    },
    {
      rel: 'icon',
      type: 'image/x-icon',
      href: siteData.favicon_icon
    }]
  }
}
