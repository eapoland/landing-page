var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var browserSync = require('browser-sync');
var reload = browserSync.reload;
var nunjucksRender = require('gulp-nunjucks-render');
var pump = require('pump');
var fs = require('fs');
var wrapper = require('gulp-wrapper');
var filter = require('gulp-filter');
var markdown = require('gulp-markdown');

const PATHS = {
  output: 'dist',
  templates: 'src/templates',
  pages: 'src/pages'
};

const BLOG_CONFIG = 'src/blog-posts.json';

const blogPosts = JSON.parse(fs.readFileSync(BLOG_CONFIG, 'utf8'));
const blogIds = {};
for (let id in blogPosts) blogIds[blogPosts[id].path] = id;

// Create *.html paths from *.md
for (let id in blogPosts) {
  let t = blogPosts[id].path.split('.');
  if (t[t.length - 1] === 'md') t[t.length - 1] = 'html';
  blogPosts[id].pub_path = t.join('.');
}

gulp.task('styles', function() {
  var processors = [
    require('autoprefixer')({ browsers: ['last 1 version'] }),
    require('postcss-opacity'),
    require('pixrem')
  ];

  return gulp
    .src('src/scss/ea.scss')
    .pipe($.sass().on('error', $.sass.logError))
    .pipe($.postcss(processors))
    .pipe($.minifyCss())
    .pipe($.rename({ suffix: '.min' }))
    .pipe(reload({ stream: true }))
    .pipe($.size({ showFiles: true }))
    .pipe(gulp.dest('dist/css'));
});

gulp.task('templates', function() {
  let post_filter = filter('**/blog/*', { restore: true });
  let md_filter = filter('**/*.md', { restore: true });

  return gulp
    .src(PATHS.pages + '/**/*.+(html|js|css|md)')
    .pipe(post_filter)
    .pipe(md_filter)
    .pipe(markdown())
    .pipe(md_filter.restore)
    .pipe(
      wrapper({
        header: function(file) {
          let post_id = blogIds[file.path.match(/.*pages\/(.*)$/)[1]];
          if (!post_id)
            console.log(
              `Note: No post with path ${
                file.path
              } has been registered in blog-posts.json!`
            );

          return `
                {% extends "blog.html" %}
                {% set post_id = "${post_id}" %}
                {% block postcontent %}
                `;
        },
        footer: '{% endblock %}'
      })
    )
    .pipe(post_filter.restore)

    .pipe(
      nunjucksRender({
        path: [PATHS.templates],
        watch: true,
        data: {
          blogPosts
        }
      })
    )
    .pipe(gulp.dest(PATHS.output));
});

gulp.task('scripts', function(cb) {
  pump(
    [
      gulp.src('src/js/*.js'),
      $.uglify(),
      $.rename({ suffix: '.min' }),
      gulp.dest('dist/js')
    ],
    cb
  );
});

gulp.task('copy', function() {
  gulp.src(['src/fonts/**/*']).pipe(gulp.dest('dist/fonts'));
  gulp.src(['src/images/**/*']).pipe(gulp.dest('dist/images'));
  gulp.src(['src/CNAME']).pipe(gulp.dest('dist'));
});

gulp.task('dev', function() {
  browserSync({
    notify: false,
    port: 9000,
    server: {
      baseDir: './dist'
    }
  });

  // trigger Nunjucks render when pages or templates changes
  gulp.watch(
    [
      PATHS.pages + '/**/*.+(html|js|css)',
      PATHS.templates + '/**/*.+(html|js|css)'
    ],
    ['templates']
  );

  gulp
    .watch(['dist/**/*.html', 'dist/**/*.js', 'dist/images/**/*'])
    .on('change', reload);

  gulp.watch(['src/scss/**/*.{css,scss}'], ['styles']);
  gulp.watch(['src/js/*.js'], ['scripts']);
  gulp.watch(['src/images/**/*', 'src/fonts/**/*'], ['copy']);
});

//default task to be run with gulp
gulp.task('default', ['styles', 'scripts', 'copy', 'templates']);
