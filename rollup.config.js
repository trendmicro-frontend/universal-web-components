import fs from 'fs'
import babel from 'rollup-plugin-babel'

import vue from 'rollup-plugin-vue'
import stylus from 'rollup-plugin-stylus-css-modules'
import scss from 'rollup-plugin-scss'
import uglify from 'rollup-plugin-uglify'

import resolve from 'rollup-plugin-node-resolve'
import multiEntry from 'rollup-plugin-multi-entry'
import livereload from 'rollup-plugin-livereload'
import serve from 'rollup-plugin-serve'

import commonjs from 'rollup-plugin-commonjs'

const production = process.env.NODE_ENV === 'production';

const plugins = [
    resolve({
        jsnext: false,
        main: true,
        browser: true
    }),
    vue({
        autoStyles: true,
        styleToImports: false,
        compileTemplate: false,
        css(style, styles, compiler) {
            // fs.writeFileSync('dist/components.css', style.trim())
        }
    }),
    // commonjs({
    //     exclude: [ 'vendor/jquery.ui.widget.js' ]
    // }),
    stylus(),
    scss(),
    // babel(),
    !production && livereload(),
    !production && serve('dist')
    // production && uglify()
];

export default {
    input: 'src/components/index',
    output: {
        file: 'dist/components.js',
        format: 'umd',
        amd: {
            id: 'uwc'
        }
    },
    sourceMap: false,
    name: 'TM',
    plugins: plugins,
    external: ['lodash', 'vue', 'jquery', 'bootstrap'],
    globals: {
        jquery: 'jQuery',
        lodash: '_',
        vue: 'Vue'
    }
};