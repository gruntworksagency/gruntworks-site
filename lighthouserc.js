module.exports = {
  ci: {
    collect: {
      // Static dist dir for Next.js
      // staticDistDir: './.next',
      // If you have a static export, specify it here
      // url: ['http://localhost:3000'], // if running against a live server
      startServerCommand: 'pnpm dev',
      serverReadyPattern: 'ready on http://localhost:3000',
      url: ['http://localhost:3000'],
      numberOfRuns: 3, // Run Lighthouse 3 times
    },
    assert: {
      assertions: {
        'categories:performance': ['warn', { minScore: 0.9 }],
        'categories:accessibility': ['warn', { minScore: 0.95 }],
        'categories:best-practices': ['warn', { minScore: 0.9 }],
        'categories:seo': ['warn', { minScore: 0.9 }],
        // You can add more specific assertions here, e.g.
        // 'first-contentful-paint': ['warn', { maxNumericValue: 2000 }],
      },
    },
    upload: {
      target: 'temporary-public-storage', // Can be changed to 'filesystem' or your own server
    },
  },
}; 