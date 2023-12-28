import { Configuration, RuleSetRule } from "webpack";

const processed = new Set();

function addLinaria(config: Configuration) {
  const rules = config.module?.rules as RuleSetRule[];
  const babelLoaderIndex = rules?.findIndex(
    (rule) =>
      typeof rule !== "string" &&
      (rule as RuleSetRule).loader?.toString().includes("babel-loader")
  );

  if (typeof babelLoaderIndex === "number" && babelLoaderIndex !== -1) {
    const babelLoader = rules[babelLoaderIndex];
    const babelLoaderClone = (({ test, exclude, ...o }) => o)(babelLoader);

    rules[babelLoaderIndex] = {
      test: babelLoader.test,
      exclude: babelLoader.exclude,
      use: [
        babelLoaderClone,
        {
          loader: "@wyw-in-js/webpack-loader",
          options: {
            sourceMap: config.mode === "development",
          },
        },
      ],
    };
  } else {
    throw new Error(
      `NX Linaria: No \`babel-loader\` found. Make sure you have \`babel\` compiler selected in your \`project.json\`\n
      https://nx.dev/packages/webpack/executors/webpack#compiler`
    );
  }
}

export function withLinaria() {
  return function configure(config: Configuration): Configuration {
    if (processed.has(config)) return config;

    addLinaria(config);

    processed.add(config);
    return config;
  };
}
