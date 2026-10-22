module.exports = {
    presets: [['@babel/preset-env', {
        modules: false,
        targets: '> 5%, Firefox ESR, not dead',
        useBuiltIns: 'entry',
        corejs: 3,
    }],
    '@babel/preset-react'],
    plugins: ['syntax-dynamic-import',
        '@babel/plugin-proposal-class-properties'
    ],
};
