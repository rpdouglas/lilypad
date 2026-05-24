import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const root = path.join(__dirname, '..');

const DOMAIN = 'https://lilypad.design';

// Static routes
const staticRoutes = [
  { path: '/', priority: '1.0', changefreq: 'daily' },
  { path: '/services', priority: '0.8', changefreq: 'weekly' },
  { path: '/about', priority: '0.7', changefreq: 'weekly' },
  { path: '/start', priority: '0.9', changefreq: 'monthly' },
  { path: '/work', priority: '0.8', changefreq: 'daily' },
  { path: '/insights', priority: '0.8', changefreq: 'daily' },
];

function getMdxSlugs(dir) {
  const fullDir = path.join(root, dir);
  if (!fs.existsSync(fullDir)) return [];
  return fs.readdirSync(fullDir)
    .filter(file => file.endsWith('.mdx'))
    .map(file => {
      const slug = file.replace('.mdx', '');
      const content = fs.readFileSync(path.join(fullDir, file), 'utf8');
      
      // Basic frontmatter extraction
      const fmMatch = content.match(/^---([\s\S]*?)---/);
      let date = new Date().toISOString().split('T')[0]; // fallback
      
      if (fmMatch) {
        const fm = fmMatch[1];
        const dateMatch = fm.match(/^date:\s*["']?([^"'\r\n]+)["']?/m);
        if (dateMatch) {
          date = dateMatch[1];
        }
      }
      
      return { slug, date };
    });
}

function generateSitemap() {
  const caseStudies = getMdxSlugs('src/content/case-studies');
  const blogPosts = getMdxSlugs('src/content/blog');
  
  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';
  
  const today = new Date().toISOString().split('T')[0];
  
  // 1. Static Routes
  staticRoutes.forEach(r => {
    xml += '  <url>\n';
    xml += `    <loc>${DOMAIN}${r.path}</loc>\n`;
    xml += `    <lastmod>${today}</lastmod>\n`;
    xml += `    <changefreq>${r.changefreq}</changefreq>\n`;
    xml += `    <priority>${r.priority}</priority>\n`;
    xml += '  </url>\n';
  });
  
  // 2. Case Studies
  caseStudies.forEach(cs => {
    xml += '  <url>\n';
    xml += `    <loc>${DOMAIN}/work/${cs.slug}</loc>\n`;
    xml += `    <lastmod>${cs.date}</lastmod>\n`;
    xml += '    <changefreq>weekly</changefreq>\n';
    xml += '    <priority>0.7</priority>\n';
    xml += '  </url>\n';
  });
  
  // 3. Blog Posts
  blogPosts.forEach(bp => {
    xml += '  <url>\n';
    xml += `    <loc>${DOMAIN}/insights/${bp.slug}</loc>\n`;
    xml += `    <lastmod>${bp.date}</lastmod>\n`;
    xml += '    <changefreq>weekly</changefreq>\n';
    xml += '    <priority>0.6</priority>\n';
    xml += '  </url>\n';
  });
  
  xml += '</urlset>\n';
  
  const distDir = path.join(root, 'dist');
  if (!fs.existsSync(distDir)) {
    fs.mkdirSync(distDir, { recursive: true });
  }
  
  fs.writeFileSync(path.join(distDir, 'sitemap.xml'), xml, 'utf8');
  console.log(`✔ Sitemap successfully generated at: dist/sitemap.xml (${staticRoutes.length + caseStudies.length + blogPosts.length} routes)`);
}

generateSitemap();
