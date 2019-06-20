import { memoize } from 'lodash';
import svgPathParser from 'svg-path-parser';

// tslint:disable-next-line:no-unsafe-any
const parser: (path: string) => ISVGPathCmd[] = memoize(svgPathParser);

/**
 *  Function to parse svg path to path array need by Marker symbol
 *
 * @param svgPath SVG Path string
 * @param viewBoxWidth SVG view box width, default to 1024
 * @param viewBoxHeight SVG view box height, default to 1024
 */
export function svg2marker(
  svgPath: string,
  markerCfg: IMarkerCfg,
  viewBoxWidth: number = 1024,
  viewBoxHeight: number = 1014,
): (string | number)[][] {
  const { x, y, r } = markerCfg;
  const paths: ISVGPathCmd[] = parser(svgPath);

  return paths.map((path: ISVGPathCmd) => {
    const arr: (string | number)[] = [];
    arr.push(path.relative === true ? path.code.toLowerCase() : path.code.toUpperCase());
    const pairs: IPointPair[] = [[path.x1, path.y1], [path.x2, path.y2], [path.x, path.y]];
    pairs.forEach((pair: IPointPair) => {
      const [px, py] = pair;
      if (px !== undefined) {
        arr.push(
          path.relative === true
            ? (px / viewBoxWidth) * 2 * r
            : x - r + r * 2 * (px / viewBoxWidth),
        );
      }
      if (py !== undefined) {
        arr.push(
          path.relative === true
            ? (py / viewBoxHeight) * 2 * r
            : y - r + r * 2 * (py / viewBoxHeight),
        );
      }
    });

    return arr;
  });
}

export function iconfont2marker(icon: string, markCfg: IMarkerCfg): (string | number)[][] {
  const pathMatch: RegExpMatchArray | null = /<path\s+d="(.*?)"/i.exec(icon);
  const viewBoxMatch: RegExpExecArray | null = /viewBox="\d+\s+\d+\s+(\d+)\s+(\d+)"/i.exec(icon);
  if (pathMatch === null || pathMatch.length < 2) {
    return [];
  }
  let width: number = 1024;
  let height: number = 1024;
  if (viewBoxMatch !== null && viewBoxMatch.length >= 3) {
    if (!isNaN(parseInt(viewBoxMatch[1], 10))) {
      width = parseInt(viewBoxMatch[1], 10);
    }
    if (!isNaN(parseInt(viewBoxMatch[2], 10))) {
      height = parseInt(viewBoxMatch[2], 10);
    }
  }

  return svg2marker(pathMatch[1], markCfg, width, height);
}

export default svg2marker;

type IMarkerCfg = {
  x: number;
  y: number;
  r: number;
};

type IPointPair = [number | undefined, number | undefined];

interface ISVGPathCmd {
  code: string;
  command: string;
  relative?: boolean;
  x?: number;
  y?: number;
  x1?: number;
  y1?: number;
  x2?: number;
  y2?: number;
}
