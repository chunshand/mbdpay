import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs'; //这两个插件可以让你加载Node.js里面的CommonJS模块
import babel from 'rollup-plugin-babel';
import json from '@rollup/plugin-json'
import { uglify } from "rollup-plugin-uglify";
const path = require('path');
const resolveFunc = _path => path.resolve(__dirname, './', _path);
const outputs = [{
    file: resolveFunc('dist/bundle.iife.js'),
    format: 'iife',
    name: "mbdpay",
    exports: 'auto'
}, {
    file: resolveFunc('dist/bundle.js'),
    format: 'umd',
    name: "mbdpay",
    exports: 'auto'

}, {
    file: resolveFunc('dist/bundle.min.js'),
    format: 'umd',
    name: "mbdpay",
    exports: 'auto'
}, {
    file: resolveFunc('dist/bundle.common.js'),
    format: 'cjs',
    name: "mbdpay",
    exports: 'auto'
}, {
    file: resolveFunc('dist/bundle.esm.js'),
    format: 'esm',
    name: "mbdpay",
    exports: 'auto'
}, ];

export default {
    input: "./src/index.js",
    external: ["axios", "md5"],
    dest: "bundle.js",
    output: outputs,
    plugins: [
        json(),
        resolve(),
        commonjs(),
        babel({
            runtimeHelpers: true,
            presets: ['@babel/preset-env'],
            exclude: 'node_modules/**' // 仅仅转译我们的源码
        }),
        // uglify()
    ],


}