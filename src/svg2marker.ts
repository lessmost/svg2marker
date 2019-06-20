import svgPathParser from 'svg-path-parser';

/**
 *  Function to parse svg path to path array need by Marker symbol
 *
 * @param svgPath SVG Path string
 * @param viewBoxWidth SVG view box width, default to 1024
 * @param viewBoxHeight SVG view box height, default to 1024
 */
export default function svg2marker(
  svgPath: string,
  markerCfg: { x: number; y: number; r: number },
  viewBoxWidth: number = 1024,
  viewBoxHeight: number = 1014,
): (string | number)[][] {
  const { x, y, r } = markerCfg;
  // tslint:disable-next-line:no-unsafe-any
  const paths: ISVGPathCmd[] = svgPathParser(svgPath);

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
