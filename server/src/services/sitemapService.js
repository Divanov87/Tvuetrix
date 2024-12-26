const { SitemapStream, streamToPromise } = require('sitemap');
const { createGzip } = require('zlib');

const Blog = require('../models/Blog');
const Event = require('../models/Events');

const { CORS_ORIGIN, CORS_ORIGIN_2, CORS_ORIGIN_3, CORS_ORIGIN_4, CORS_ORIGIN_5} = require('../configs/envVariables');
const ORIGINS = [CORS_ORIGIN, CORS_ORIGIN_2, CORS_ORIGIN_3, CORS_ORIGIN_4, CORS_ORIGIN_5];


let sitemapCache = null;

/**
 * Generates the sitemap.
 * @param {string} origin - The origin (hostname) to use for the sitemap.
 * @returns {Promise<Buffer>} The gzipped sitemap as a Buffer.
 */

async function generateSitemap(origin) {
  try {
    const hostname = ORIGINS.includes(origin) ? origin : 'https://theatrix-vue.vercel.app';
    const smStream = new SitemapStream({ hostname });
    const pipeline = smStream.pipe(createGzip());

    // Static routes
    smStream.write({ url: '/', changefreq: 'daily', priority: 1.0 });
    smStream.write({ url: '/events', changefreq: 'weekly', priority: 0.8 });
    smStream.write({ url: '/events/theater', changefreq: 'weekly', priority: 0.7 });
    smStream.write({ url: '/events/concerts', changefreq: 'weekly', priority: 0.7 });
    smStream.write({ url: '/blog', changefreq: 'weekly', priority: 0.8 });
    smStream.write({ url: '/auth/register', changefreq: 'monthly', priority: 0.6 });
    smStream.write({ url: '/auth/login', changefreq: 'monthly', priority: 0.6 });
    smStream.write({ url: '/gallery', changefreq: 'monthly', priority: 0.6 });
    smStream.write({ url: '/contacts', changefreq: 'monthly', priority: 0.6 });
    smStream.write({ url: '/about', changefreq: 'monthly', priority: 0.6 });

    // Dynamic blog routes
    const blogs = await Blog.find({ isHidden: false });
    blogs.forEach(blog => {
      smStream.write({
        url: `/blog/${blog._id}`,
        changefreq: 'weekly',
        priority: 0.82
      });
    });

    // Dynamic event routes
    
    const events = await Event.find();
    events.forEach(event => {
      smStream.write({
        url: `/events/${event._id}/details`,
        changefreq: 'weekly',
        priority: 0.8
      });
    });

    // End sitemap stream
    smStream.end();

    // Store the sitemap in cache
    const sitemapBuffer = await streamToPromise(pipeline);
    sitemapCache = sitemapBuffer;

    return sitemapBuffer;
  } catch (error) {
    console.error('Error generating sitemap:', error);
    throw new Error('Sitemap generation failed');
  }
}

/**
 * Retrieves the sitemap, either from cache or by generating a new one.
 * @param {string} origin - The origin (hostname) to use for the sitemap.
 * @returns {Promise<Buffer>} The gzipped sitemap as a Buffer.
 */
async function getSitemap(origin) {
  if (sitemapCache) {
    return sitemapCache; // Return cached sitemap
  }
  return await generateSitemap(origin); // Generate a new sitemap if cache is empty
}

module.exports = {
  getSitemap,
};
