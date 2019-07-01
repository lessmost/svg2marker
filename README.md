# svg2marker

Convert SVG icon to G/Marker register

## Usage

### 对g2 3.x开源版本

```js
import { G } from '@antv/g2';
import svg2marker from '@alipay/svg2marker';
import plus from './icons/plus.svg'

// 注册 plus symbol
G.Marker.Symbols['plus'] = svg2marker(plus);

// 绘制 svg
container.addShape('Marker', {
    attrs: {
        symbol: 'plus',
        x: 10,
        y: 10,
        r: 10
    }
});
```

### 对g2 4.x TS版本

```js
import { G } from '@antv/g2';
import svg2marker from '@alipay/svg2marker';
import plus from './icons/plus.svg';

// 注册 plus symbol
G.Marker.symbolsFactory.register('rise', svg2marker(plus));

// 绘制 svg
container.addShape('Marker', {
    attrs: {
        symbol: 'plus',
        x: 10,
        y: 10,
        r: 10
    }
});
```

## LICENSE

MIT
