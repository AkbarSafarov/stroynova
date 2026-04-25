import { defineConfig } from 'vite';
import path from 'path';
import nunjucks from 'vite-plugin-nunjucks';
import nunjucksLib from 'nunjucks';

const templatesDir = path.resolve(__dirname, 'src/templates');
const pagesDir = path.resolve(__dirname, 'src/pages');

/**
 * При изменении любого .njk или .html файла шаблонов — полная перезагрузка страницы.
 */
function nunjucksHmrPlugin() {
  return {
    name: 'nunjucks-hmr',
    apply: 'serve',
    handleHotUpdate({ file, server }) {
      if (file.endsWith('.njk')) {
        server.moduleGraph.invalidateAll();
        server.ws.send({ type: 'full-reload' });
        return [];
      }
    },
  };
}

/**
 * Убирает атрибут crossorigin из тегов скриптов и стилей в билде,
 * чтобы файлы можно было открывать напрямую через file:// протокол.
 */
function removeCrossOriginPlugin() {
  return {
    name: 'remove-crossorigin',
    apply: 'build',
    transformIndexHtml(html) {
      return html.replace(/\s+crossorigin(?:="[^"]*")?/g, '');
    },
  };
}

export default defineConfig({
  root: pagesDir,
  base: './',
  publicDir: path.resolve(__dirname, 'public'),
  plugins: [
    nunjucksHmrPlugin(),
    nunjucks({
      templatesDir,
      nunjucksEnvironment: new nunjucksLib.Environment(
        new nunjucksLib.FileSystemLoader(templatesDir, { noCache: true }),
        { noCache: true }
      ),
    }),
    removeCrossOriginPlugin(),
  ],
  css: {
    devSourcemap: true,
    preprocessorOptions: {
      scss: {
        silenceDeprecations: ['legacy-js-api'],
      },
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    outDir: path.resolve(__dirname, 'dist'),
    emptyOutDir: true,
    minify: 'esbuild',
    cssMinify: true,
    rollupOptions: {
      input: {
        index: path.resolve(pagesDir, 'index.html'),
        projects: path.resolve(pagesDir, 'projects/index.html'),
        catalog: path.resolve(pagesDir, 'catalog/index.html'),
        apartments: path.resolve(pagesDir, 'apartments/index.html'),
        storage: path.resolve(pagesDir, 'storage/index.html'),
        purchase: path.resolve(pagesDir, 'purchase/index.html'),
        promotions: path.resolve(pagesDir, 'promotions/index.html'),
        faq: path.resolve(pagesDir, 'faq/index.html'),
        favorites: path.resolve(pagesDir, 'favorites/index.html'),
        documents: path.resolve(pagesDir, 'documents/index.html'),
        news: path.resolve(pagesDir, 'news/index.html'),
        'news-item': path.resolve(pagesDir, 'news-item/index.html'),
        '404': path.resolve(pagesDir, '404/index.html'),
        privacy: path.resolve(pagesDir, 'privacy/index.html'),
        about: path.resolve(pagesDir, 'about/index.html'),
        contacts: path.resolve(pagesDir, 'contacts/index.html'),
      },
      output: {
        assetFileNames: 'assets/[name]-[hash][extname]',
        chunkFileNames: 'assets/[name]-[hash].js',
        entryFileNames: 'assets/[name]-[hash].js',
      },
    },
  },
  server: {
    port: 3000,
    open: true,
    fs: {
      allow: [path.resolve(__dirname, 'src'), path.resolve(__dirname, 'public')],
    },
  },
});
