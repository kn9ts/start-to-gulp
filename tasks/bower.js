import fs from 'fs';

export function bower(gulp, plugins) {
  // Get the directory from .bowerrc
  var bowerConfig = JSON.parse(fs.readFileSync('./.bowerrc', 'utf-8'));
  return () => plugins.bower().pipe(gulp.dest(bowerConfig.directory));
};

