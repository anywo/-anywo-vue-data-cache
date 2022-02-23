/**
 * 添加页面数据缓存配置，重新进入画面时，还原制定数据
 * @author anywo <1377593732@qq.com>
 * @license MIT
 * @version 1.0.0
 * 
 * @example 
 * {
 *  data(){
 *    return {
 *      search:{
 *        name: ''
 *      }
 *    };
 *  },
 *  ...
 *  dataCacheKey: "home", // 一个画面多个组件需要使用缓存，可以使用此字段
 *  ...
 *  dataCache: true, // 缓存全部
 *  dataCache: ['search.name'], // 缓存的目标列表
 *  dataCache: {
 *    enabled: true, // 是否启用此配置
 *    target: ['search'], // 持久化目标，默认：全部
 *    exclude: ['search'], // 要排除目标，默认：空
 *  },
 *  ...
 * }
 */

(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD
    define(["lodash"], factory);
  } else if (typeof exports === 'object') {
    // Node, CommonJS-like
    module.exports = factory(require('lodash'));
  } else {
    // Browser globals (root is window)
    root.vueDataCache = factory(root._);
  }
}(this, function (_) {
  let a = { a: { a: 1, b: 1 } };
  const dataCacheKey = "___dataCache___"; // sessionStorage存储用的key
  let dataCache = dataCacheInit();

  /**
   * 获取对象的所有的原型链对象
   * @param {Object} obj 目标
   * @returns 原型链数组
   */
  function getPrototypes(obj) {
    const res = [obj];
    while (res[res.length - 1].__proto__) {
      res.push(res[res.length - 1].__proto__);
    }
    return res;
  }

  /**
   * 初始化持久化对象的方法
   */
  function dataCacheInit() {
    const cache = sessionStorage.getItem(dataCacheKey);
    return cache ? JSON.parse(cache) : {};
  }

  /**
   * 获取缓存用的key，添加key配置支持
   */
  function getKey(path, key) {
    if (_.isNil(key)) {
      return path;
    }
    return `${path}____${key}`;
  }

  const mixin = {
    // 在data初始化之前，将持久化的数据还原
    beforeCreate() {
      const that = this;
      const old = this.$options.data;
      if (old && that.$route) {
        // 支持实例与混入的混合使用
        const dataCacheOptions = getPrototypes(this.$options).filter(x => x.dataCache).map(x => x.dataCache);
        if (dataCacheOptions.length > 0) {
          this.$options.data = function () {
            let data = old.apply(that, arguments);
            const cache = dataCache[getKey(that.$route.path, that.$options.dataCacheKey)];
            if (cache) {
              data = _.defaultsDeep(cache, data);
            }
            return data;
          };
        }
      }
    },
    // 注册触发持久化目标的监听
    created() {
      if (!this.$route) return;
      // 支持实例与混入的混合使用
      const dataCacheOptions = getPrototypes(this.$options).filter(x => x.dataCache).map(x => x.dataCache);
      if (dataCacheOptions.length > 0) {
        // 收集持久化配置
        const target = [];
        const exclude = [];
        dataCacheOptions.forEach(option => {
          if (typeof option == "boolean" && option) {
            target.push(...Object.keys(this.$data));
          } else if (option instanceof Array) {
            target.push(...option);
          } else if (typeof option == "object" && option.enabled != false) {
            target.push(...(option.target ? option.target : Object.keys(this.$data)));
            option.exclude && exclude.push(...option.exclude);
          }
        });

        // 添加监听
        let currDataCache = {};
        const cacheKey = getKey(this.$route.path, this.$options.dataCacheKey);
        const temp = _(target).difference(exclude).uniq().compact().value(); // 排除完全一致的属性
        temp.forEach(key => {
          _.set(currDataCache, key, _.get(this, key));
          this.$watch(key, (val) => {
            _.set(currDataCache, key, val);
            dataCache[cacheKey] = _.omit(currDataCache, exclude); // 排除被包含的属性
            sessionStorage.setItem(dataCacheKey, JSON.stringify(dataCache));
          }, { deep: true })
        });
        dataCache[cacheKey] = _.omit(currDataCache, exclude); // 排除被包含的属性
        sessionStorage.setItem(dataCacheKey, JSON.stringify(dataCache));
      }
    }
  };

  /**
   * 注册全局混入时使用
   * @param {Object} Vue 
   */
  function install(Vue) {
    Vue.mixin(mixin);
  }

  /**
   * 清空指定地址的持久化数据
   * 不传参时，清空全部
   * @param {String} path 路由地址
   */
  function clear(path) {
    if (path) {
      delete dataCache[path];
      // 清除当前画面使用了dataCacheKey的组件的缓存
      const key = getKey(path, "");
      Object.keys(dataCache).forEach(x => {
        if (x.startsWith(key)) {
          delete dataCache[x];
        }
      });
      sessionStorage.setItem(dataCacheKey, JSON.stringify(dataCache));
    } else {
      sessionStorage.removeItem(dataCacheKey);
      dataCache = dataCacheInit();
    }
  }

  return { mixin, install, clear };
}));