import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs'; //这两个插件可以让你加载Node.js里面的CommonJS模块
import babel from 'rollup-plugin-babel';
import json from '@rollup/plugin-json'
import { uglify } from "rollup-plugin-uglify";
const path = require('path');
const resolveFunc = _path => path.resolve(__dirname, './', _path);
import pkg from './package.json';
const outputs = [{
    file: pkg.main,
    format: 'umd',
    name: "mbdpay",
    exports: 'auto'

}, {
    file: pkg.main,
    format: 'cjs',
    name: "mbdpay",
    exports: 'auto'
}, {
    file: pkg.module,
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