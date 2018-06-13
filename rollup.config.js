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
import replace from 'rollup-plugin-replace'
import commonjs from 'rollup-plugin-commonjs'

const production = process.env.NODE_ENV === 'production';

const plugins = [
    resolve({
        module: true,
        jsnext: false,
        main: true,
        browser: true
    }),
    replace({
        'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
        "require('./vendor/jquery.ui.widget')": "",
        delimiters: ['', '']
    }),
    vue({
        autoStyles: true,
        styleToImports: false,
        compileTemplate: false,
        css(style, styles, compiler) {
            // fs.writeFileSync('dist/components.css', style.trim())
        }
    }),
    commonjs({
        include: 'node_modules/**',
        exclude: [ 'vendor/jquery.ui.widget.js' ]

    }),
    stylus(),
    scss(),
    babel(),
    !production && livereload(),
    !production && serve('dist')
    // production && uglify()
];

export default {
    input: 'src/components/index',
    output: {
        file: 'dist/components.js',
        format: 'amd',
        sourcemap: false,
        name: 'TM',
        globals: {
            jquery: 'jQuery',
            lodash: '_',
            vue: 'Vue'
        }
    },
    plugins: plugins,
    external: ['lodash', 'vue', 'jquery', 'bootstrap']
};