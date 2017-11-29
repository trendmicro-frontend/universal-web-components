import babel from 'rollup-plugin-babel';

import vue from 'rollup-plugin-vue';
import stylus from 'rollup-plugin-stylus-css-modules'
import scss from 'rollup-plugin-scss';
import uglify from 'rollup-plugin-uglify';

import resolve from 'rollup-plugin-node-resolve';
import multiEntry from 'rollup-plugin-multi-entry';
import livereload from 'rollup-plugin-livereload'
import serve from 'rollup-plugin-serve'


const production = process.env.NODE_ENV === 'production';

const plugins = [
    multiEntry(),
    resolve({
        jsnext: false,
        main: true,
        browser: true
    }),
    vue({
        autoStyles: false,
        styleToImports: false,
        compileTemplate: false
    }),
    stylus(),
    scss(),
    babel(),
    !production && livereload(),
    !production && serve('dist')
    // production && uglify()
];

export default {
    input: ['components'],
    output: {
        file: 'dist/components.js',
        format: 'amd'
    },
    sourceMap: false,
    name: 'TM',
    plugins: plugins,
    external: ['lodash', 'vue'],
    globals: {
        jquery: '$',
        lodash: '_',
        vue: 'Vue'
    }
};