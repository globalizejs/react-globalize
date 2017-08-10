import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import pkg from './package.json';

export default [
	// browser-friendly UMD build
	{
		entry: 'src/index.js',
		external: [ 
            'react',
            'globalize',
            'globalize/currency',
            'globalize/date',
            'globalize/message',
            'globalize/plural',
            'globalize/number',
            'globalize/relative-time'
        ],
		dest: pkg.browser,
		format: 'umd',
		moduleName: 'react-globalize',
		plugins: [
			resolve(), // so Rollup can find `react`
			commonjs() // so Rollup can convert `react` to an ES module
        ],
        globals: {
            react: 'React',
            globalize: 'Globalize',            
        }
	},

	// CommonJS (for Node) and ES module (for bundlers) build.
	// (We could have three entries in the configuration array
	// instead of two, but it's quicker to generate multiple
	// builds from a single configuration where possible, using
	// the `targets` option which can specify `dest` and `format`)
	{
		entry: 'src/index.js',
        external: [ 
            'react',
            'globalize',
            'globalize/currency',
            'globalize/date',
            'globalize/message',
            'globalize/plural',
            'globalize/number',
            'globalize/relative-time'
        ],
		targets: [
			{ dest: pkg.main, format: 'cjs' },
			{ dest: pkg.module, format: 'es' }
		]
	}
];