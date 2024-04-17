# node.js v17 关于 OpenSSL3.0 报错的问题解决办法

根据 Node.js 官网的博客所写：Node.js v17.x、v18.x 和 v19.x 使用 OpenSSL v3，而 v14.x 和 v16.x 不会受到影响。

```shell
$ npm run dev

> vue-admin-template@4.4.0 dev
> vue-cli-service serve

 INFO  Starting development server...
10% building 2/5 modules 3 active ...ter/node_modules/webpack/hot/dev-server.jsError: error:0308010C:digital envelope routines::unsupported
    at new Hash (node:internal/crypto/hash:67:19)
    at Object.createHash (node:crypto:135:10)
    at module.exports (/Users/chen/Downloads/vue-admin-template-master/node_modules/webpack/lib/util/createHash.js:169:42)
    at NormalModule._initBuildHash (/Users/chen/Downloads/vue-admin-template-master/node_modules/webpack/lib/NormalModule.js:417:16)
    at handleParseError (/Users/chen/Downloads/vue-admin-template-master/node_modules/webpack/lib/NormalModule.js:471:10)
    at /Users/chen/Downloads/vue-admin-template-master/node_modules/webpack/lib/NormalModule.js:503:5
    at /Users/chen/Downloads/vue-admin-template-master/node_modules/webpack/lib/NormalModule.js:358:12
    at /Users/chen/Downloads/vue-admin-template-master/node_modules/loader-runner/lib/LoaderRunner.js:373:3
    at iterateNormalLoaders (/Users/chen/Downloads/vue-admin-template-master/node_modules/loader-runner/lib/LoaderRunner.js:214:10)
    at iterateNormalLoaders (/Users/chen/Downloads/vue-admin-template-master/node_modules/loader-runner/lib/LoaderRunner.js:221:10)
    at /Users/chen/Downloads/vue-admin-template-master/node_modules/loader-runner/lib/LoaderRunner.js:236:3
    at runSyncOrAsync (/Users/chen/Downloads/vue-admin-template-master/node_modules/loader-runner/lib/LoaderRunner.js:130:11)
    at iterateNormalLoaders (/Users/chen/Downloads/vue-admin-template-master/node_modules/loader-runner/lib/LoaderRunner.js:232:2)
    at Array.<anonymous> (/Users/chen/Downloads/vue-admin-template-master/node_modules/loader-runner/lib/LoaderRunner.js:205:4)
    at Storage.finished (/Users/chen/Downloads/vue-admin-template-master/node_modules/enhanced-resolve/lib/CachedInputFileSystem.js:55:16)
    at /Users/chen/Downloads/vue-admin-template-master/node_modules/enhanced-resolve/lib/CachedInputFileSystem.js:91:9
    at /Users/chen/Downloads/vue-admin-template-master/node_modules/graceful-fs/graceful-fs.js:123:16
    at FSReqCallback.readFileAfterClose [as oncomplete] (node:internal/fs/read_file_context:68:3)
node:internal/crypto/hash:67
  this[kHandle] = new _Hash(algorithm, xofLen);
                  ^

Error: error:0308010C:digital envelope routines::unsupported
    at new Hash (node:internal/crypto/hash:67:19)
    at Object.createHash (node:crypto:135:10)
    at module.exports (/Users/chen/Downloads/vue-admin-template-master/node_modules/webpack/lib/util/createHash.js:169:42)
    at NormalModule._initBuildHash (/Users/chen/Downloads/vue-admin-template-master/node_modules/webpack/lib/NormalModule.js:417:16)
    at handleParseError (/Users/chen/Downloads/vue-admin-template-master/node_modules/webpack/lib/NormalModule.js:471:10)
    at /Users/chen/Downloads/vue-admin-template-master/node_modules/webpack/lib/NormalModule.js:503:5
    at /Users/chen/Downloads/vue-admin-template-master/node_modules/webpack/lib/NormalModule.js:358:12
    at /Users/chen/Downloads/vue-admin-template-master/node_modules/loader-runner/lib/LoaderRunner.js:373:3
    at iterateNormalLoaders (/Users/chen/Downloads/vue-admin-template-master/node_modules/loader-runner/lib/LoaderRunner.js:214:10)
    at Array.<anonymous> (/Users/chen/Downloads/vue-admin-template-master/node_modules/loader-runner/lib/LoaderRunner.js:205:4)
    at Storage.finished (/Users/chen/Downloads/vue-admin-template-master/node_modules/enhanced-resolve/lib/CachedInputFileSystem.js:55:16)
    at /Users/chen/Downloads/vue-admin-template-master/node_modules/enhanced-resolve/lib/CachedInputFileSystem.js:91:9
    at /Users/chen/Downloads/vue-admin-template-master/node_modules/graceful-fs/graceful-fs.js:123:16
    at FSReqCallback.readFileAfterClose [as oncomplete] (node:internal/fs/read_file_context:68:3) {
  opensslErrorStack: [ 'error:03000086:digital envelope routines::initialization error' ],
  library: 'digital envelope routines',
  reason: 'unsupported',
  code: 'ERR_OSSL_EVP_UNSUPPORTED'
}

Node.js v17.9.1
```


解决办法：

## 方法一

```shell
$ export NODE_OPTIONS=--openssl-legacy-provider
$ npm run dev
```

## 方法二

参考博客：https://mp.weixin.qq.com/s/g6CXUQuyu-Xoe3krzbMesQ
在vue.config.js 中添加下面这段代码就能绕过那个错误。

```
const crypto = require('crypto');

/**
 * The MD4 algorithm is not available anymore in Node.js 17+ (because of library SSL 3).
 * In that case, silently replace MD4 by the MD5 algorithm.
 */
try {
  crypto.createHash('md4');
} catch (e) {
  console.warn('Crypto "MD4" is not supported anymore by this Node.js version');
  const origCreateHash = crypto.createHash;
  crypto.createHash = (alg, opts) => {
    return origCreateHash(alg === 'md4' ? 'md5' : alg, opts);
  };
}
```



## 参考博客

[nodejs新版本引起的：digital envelope routines::unsupported](https://www.cnblogs.com/hmy-666/p/16949982.html)

[Node.js Web 项目报错 digital envelope routines::unsupported 的解决方案](https://mp.weixin.qq.com/s/kZpkrBNVzTGDmR5iiLu0kQ)