module.exports = {
  presets: [
    [
      '@babel/preset-react',
      {
        runtime: 'automatic',
        loose: false,
      },
    ],
    ['@babel/preset-typescript', { loose: false }],
  ],
};
