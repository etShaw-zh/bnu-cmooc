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

	// wp_enqueue_script(
	// 	'cmooc-header-js',
	// 	get_stylesheet_directory_uri() . '/dist/header.js',
	// 	array( 'jquery' ),
	// 	filemtime( get_stylesheet_directory() . '/dist/header.js' ),
	// 	true
	// );

	// wp_enqueue_script(
	// 	'cmooc-content-js',
	// 	get_stylesheet_directory_uri() . '/dist/content.js',
	// 	array( 'jquery' ),
	// 	filemtime( get_stylesheet_directory() . '/dist/content.js' ),
	// 	true
	// );

	// check if the current page is wordpress homepage
	$is_home = is_front_page();

	if ( $is_home ) {
		wp_enqueue_script(
			'cmooc-home-page-js',
			get_stylesheet_directory_uri() . '/dist/homepage.js',
			array( 'jquery' ),
			filemtime( get_stylesheet_directory() . '/dist/homepage.js' ),
			true
		);
	
		// wp_enqueue_script(
		// 	'cmooc-home-chat-js',
		// 	get_stylesheet_directory_uri() . '/dist/homechat.js',
		// 	array( 'jquery' ),
		// 	filemtime( get_stylesheet_directory() . '/dist/homechat.js' ),
		// 	true
		// );
	}

	// check if the current page is custom page
	$is_custom = get_page_template_slug();

	if ( $is_custom === 'pages/custom.php' ) {
		wp_enqueue_script(
			'cmooc-custom-page-js',
			get_stylesheet_directory_uri() . '/dist/custompage.js',
			array( 'jquery' ),
			filemtime( get_stylesheet_directory() . '/dist/custompage.js' ),
			true
		);
		wp_localize_script( 'cmooc-custom-page-js', 'zrz_single',array(
            'post_id'=>556572,//当前页面ID
        ));
	}

	wp_enqueue_style(
		'cmooc-css',
		get_stylesheet_directory_uri() . '/dist/style.css',
		null,
		filemtime( get_stylesheet_directory() . '/dist/style.css' )
	);
}
add_action( 'wp_enqueue_scripts', 'load_vue_scripts', 100 );
