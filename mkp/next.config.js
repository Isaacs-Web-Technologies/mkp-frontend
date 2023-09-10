module.exports = {
    webpack(config) {
      // Grab the existing rule that handles SVG imports
      const fileLoaderRule = config.module.rules.find((rule) =>
        rule.test?.test?.('.svg'),
      )
  
      config.module.rules.push(
        // Reapply the existing rule, but only for svg imports not ending in ?url
        {
          ...fileLoaderRule,
          test: /\.svg$/,
          resourceQuery: { not: /url/ }, // *.svg without ?url
        },
        // Convert all other *.svg imports to React components
        {
          test: /\.svg$/,
          issuer: /\.[jt]sx?$/,
          resourceQuery: /url/, // *.svg?url
          use: ['@svgr/webpack'],
        },
      )
  
      // Modify the file loader rule to ignore *.svg, since we have it handled now.
      fileLoaderRule.exclude = /\.svg$/i
  
      return config
    },
  
    // ...other config
  };
  