const processed = new Set();

/** @param {import('webpack').Configuration} config */
function addLinaria(config) {
  const babelLoaderIndex = config.module?.rules?.findIndex(
    (rule) =>
      typeof rule !== "string" &&
      rule.loader?.toString().includes("babel-loader")
  );

  if (babelLoaderIndex !== -1) {
    const babelLoader = config.module.rules[babelLoaderIndex];
    const babelLoaderClone = (({ test, exclude, ...o }) => o)(babelLoader);

    config.module.rules[babelLoaderIndex] = {
      test: babelLoader.test,
      exclude: babelLoader.exclude,
      use: [
        babelLoaderClone,
        {
          loader: "@linaria/webpack-loader",
          options: {
            sourceMap: config.mode === "development",
          },
        },
      ],
    };
  }
}

/**
 * @param {WithReactOptions} pluginOptions
 * @returns {NxWebpackPlugin}
 */
function withLinaria() {
  /**
   * @param {import('webpack').Configuration}  config
   * @param {import('@nrwl/webpack').NxWebpackExecutionContext}  context
   * @returns {import('webpack').Configuration}
   */
  return function configure(config, context) {
    if (processed.has(config)) return config;

    addLinaria(config);

    processed.add(config);
    return config;
  };
}

module.exports = { withLinaria };
