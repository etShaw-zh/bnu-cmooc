<?php
// Remove all default WP template redirects/lookups
remove_action( 'template_redirect', 'redirect_canonical' );

// Redirect all requests to index.php so the Vue app is loaded and 404s aren't thrown
function remove_redirects() {
	add_rewrite_rule( '^/(.+)/?', 'index.php', 'top' );
}
add_action( 'init', 'remove_redirects' );

// Load scripts
function load_vue_scripts() {

	wp_enqueue_script(
		'cmooc-header-js',
		get_stylesheet_directory_uri() . '/dist/header.js',
		array( 'jquery' ),
		filemtime( get_stylesheet_directory() . '/dist/header.js' ),
		true
	);

	wp_enqueue_script(
		'cmooc-content-js',
		get_stylesheet_directory_uri() . '/dist/content.js',
		array( 'jquery' ),
		filemtime( get_stylesheet_directory() . '/dist/content.js' ),
		true
	);

	wp_enqueue_style(
		'cmooc-css',
		get_stylesheet_directory_uri() . '/dist/style.css',
		null,
		filemtime( get_stylesheet_directory() . '/dist/style.css' )
	);
}
add_action( 'wp_enqueue_scripts', 'load_vue_scripts', 100 );
