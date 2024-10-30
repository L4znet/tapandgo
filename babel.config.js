module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        "react-native-paper/babel",
      ],
      ['dotenv-import', {
        moduleName: '@env',
        path: '.env',
      }],
    ]
  };
};

