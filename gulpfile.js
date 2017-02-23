var gulp = require('gulp');
var ghPages = require('gulp-gh-pages');
var gitbook = require('gitbook');
var Q = require('q');


gulp.task('build', function(){
	var book = new gitbook.Book('./public',{
		config:{
			output:'./_book'
		}
	});
	return Q(book.parse())
	.then(function() {
		return book.generate('website');
	})
});

gulp.task('deploy', function(){
	return gulp.src('./public/**/*')
		.pipe(ghPages())

});

gulp.task('serve', function(){

	//do stuff

}); 
