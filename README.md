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

## FAQ
- 为什么报错`${symbol} marker is not supported.`？

因为注册的G和绘图的G不一致导致的，应该改为同一个G引用
```js
 import { G } from '@antv/g6';
 import { G } from '@antv/g2';
 
```
## LICENSE

MIT
