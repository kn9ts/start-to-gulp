export function htmlCompile(gulp, plugins) {
  return () => {
    return gulp.src(process.env.PROJECT_BUILD_FOLDER + '/**/*.html')
      // Minify any HTML
      .pipe(plugins.htmlmin({
        removeComments: true,
        collapseWhitespace: true,
        collapseBooleanAttributes: true,
        removeAttributeQuotes: true,
        removeRedundantAttributes: true,
        removeEmptyAttributes: true,
        removeScriptTypeAttributes: true,
        removeStyleLinkTypeAttributes: true,
        removeOptionalTags: true
      }))
      // Output files
      .pipe(plugins.size({ title: 'html', showFiles: true }))
      .pipe(gulp.dest(process.env.PROJECT_BUILD_FOLDER));
  };
};

