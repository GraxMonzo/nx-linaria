import type { Configuration } from "webpack";
import type { NxWebpackExecutionContext } from "@nx/webpack";

/**
 * @returns {NxWebpackPlugin}
 */
declare function withLinaria(): (
  config: Configuration,
  context: NxWebpackExecutionContext
) => Configuration;
export { withLinaria };
