import type { Configuration } from "webpack";
import type { NxWebpackExecutionContext } from "@nrwl/webpack";

/**
 * @returns {NxWebpackPlugin}
 */
declare function withLinaria(): (
  config: Configuration,
  context: NxWebpackExecutionContext
) => Configuration;
export { withLinaria };
