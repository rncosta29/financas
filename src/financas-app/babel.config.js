module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        "module-resolver",
        {
          extensions: [".tsx", ".ts", ".js", ".json"],
          alias: {
            src: './src',
            '@assets': './src/assets',
            '@components': './src/components',
            '@constants': './src/constants',
            '@helpers': './src/helpers',
            '@hooks': './src/hooks',
            '@models': './src/models',
            '@navigation': './src/navigation',
            '@redux': './src/redux',
            '@screens': './src/screens',
            '@services': './src/services',
            '@theme': './src/theme',
            '@utils': './src/utils'
          }
        }
      ],
      'react-native-reanimated/plugin'
    ],
  };
};
