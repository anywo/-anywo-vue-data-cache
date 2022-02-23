# data-cache

> 类似 keep-alive 的数据持久化组件

## 解决的问题
>使用keep-alive缓存无法做到刷新画面也保持原样，而且进入画面时缓存如何单画面清理不是特别明白。

## 应用场景
>进入画面时，调用方法clear方法清理掉缓存，直接刷新画面被缓存的数据被正常还原，进入下一个画面，返回上一页时，正确还原缓存。

## CDN引入
``` html
<script src="https://cdn.jsdelivr.net/npm/@anywo/vue-data-cache@1.0.2/util/dataCache.umd.js"></script>
<script>
  Vue.use(vueDataCache);
</script>
```

## 全局引入

```
import dataCache from '@anywo/vue-data-cache';
Vue.use(dataCache);
```

## 局部引入

```js
import dataCache from '@anywo/vue-data-cache';
<script>
export default {
  // ...
  mixins: [dataCache.mixin]
  // ...
};
</script>
```

## 例子
>npm安装后，在node_modules文件夹中找到组件文件夹，内含demo。

**Booble 传参**

```js
import dataCache from '@anywo/vue-data-cache';
<script>
export default {
  data(){
    return {
      text: '',
      value: '',
    };
  },
  dataCache: true, // 缓存data中的全部字段
  mixins: [dataCache.mixin]
};
</script>
```

**Array 传参**

```js
import dataCache from '@anywo/vue-data-cache';
<script>
export default {
  data(){
    return {
      text: '',
      value: '',
    };
  },
  dataCache: ['text'], // 缓存data中的指定字段
  mixins: [dataCache.mixin]
};
</script>
```

**Object 传参**

```js
import dataCache from '@anywo/vue-data-cache';
<script>
export default {
  data(){
    return {
      search: {
        text: '',
        value: '',
      }
    };
  },
  dataCache: {
    enabled: true, // 启动当前配置，如果混入中有配置，并且没有关闭，正常应用
    target: ["search"], // 要缓存的目标，默认：data的全部内容
    exclude: ["search.value"], // 缓存要排除的部分，search.text正常缓存，search.value不缓存
  },
  mixins: [dataCache.mixin]
};
</script>
```

**dataCacheKey**
一个画面多个组件需要使用缓存，可以使用此字段做区分

```js
import dataCache from '@anywo/vue-data-cache';
<script>
export default {
  data(){
    return {
      text: '',
      value: '',
    };
  },
  dataCacheKey: "home", // 一个画面多个组件需要使用缓存，可以使用此字段做区分
  dataCache: ['text'], // 缓存data中的指定字段
  mixins: [dataCache.mixin]
};
</script>
```

**clear**
```js
import dataCache from '@anywo/vue-data-cache';
<script>
export default {
  data(){
    return {
    };
  },
  methods:{
  	clear(){
  	  dataCache.clear(this.$route.path); // 清理指定画面
  	},
  	clearAll(){
  	  dataCache.clear(); // 清理全部缓存
	},
  }
};
</script>
```