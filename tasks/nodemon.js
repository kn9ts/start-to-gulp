export function nodemonServer(gulp, plugins) {
  return () => {
    plugins.nodemon({
        script: './index.js',
        ext: 'js',
        ignore: [process.env.PROJECT_BUILD_FOLDER, './node_modules']
      })
      .on('change', ['lint'])
      .on('restart', () => {
        console.log('-->> application restart!');
      });
  };
};

