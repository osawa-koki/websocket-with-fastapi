import esbuild from 'esbuild'

await esbuild.build({
  entryPoints: ['./src/index.ts'],
  bundle: true,
  outfile: './public/index.js',
  minify: true,
  sourcemap: true,
  target: ['ES2022'],
  platform: 'browser',
  define: {
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
  },
  plugins: [],
  external: [],
  loader: {},
  logLevel: 'info',
  color: true,
})
