# svg2marker

Parser SVG path to G/Marker path array

## Usage

```js
import svg2marker from '@alipay/svg2marker';
const svgPath = "M917 211.1l-199.2 24c-6.6 0.8-9.4 8.9-4.7 13.6l59.3 59.3-226 226-101.8-101.7c-6.3-6.3-16.4-6.2-22.6 0L100.3 754.1c-3.1 3.1-3.1 8.2 0 11.3l45 45.2c3.1 3.1 8.2 3.1 11.3 0L433.3 534 535 635.7c6.3 6.2 16.4 6.2 22.6 0L829 364.5l59.3 59.3c4.7 4.7 12.8 1.9 13.6-4.7l24-199.2c0.7-5.1-3.7-9.5-8.9-8.8z"
Marker.symbolsFactory.register('rise', (x, r, r) => svg2marker(svgPath, { x, y, r}));
```

## LICENSE

MIT
