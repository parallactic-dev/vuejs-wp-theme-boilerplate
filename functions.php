<?php
// remove all wp redirects
remove_action('template_redirect', 'redirect_canonical');

// redirect all routes to index.php to enable vue router
function remove_redirects() 
{
	add_rewrite_rule( '^/(.+)/?', 'index.php', 'top' );
}
add_action('init', 'remove_redirects');

// enqueue js scripts and styles
function load_vue_scripts() 
{
	wp_enqueue_script(
		'vuejs-wordpress-theme-starter-js',
		get_stylesheet_directory_uri() . '/dist/index.js',
		array(),
		filemtime( get_stylesheet_directory() . '/dist/index.js' ),
		true
	);
	wp_enqueue_style(
		'vuejs-wordpress-theme-starter-css',
		get_stylesheet_directory_uri() . '/dist/styles.css',
		null,
		filemtime( get_stylesheet_directory() . '/dist/styles.css' )
	);
}
add_action('wp_enqueue_scripts', 'load_vue_scripts', 100);

// register menus
function register_menues()
{
	register_nav_menu('main', 'Header');
	register_nav_menu('footer', 'Footer');
}
add_action('init', 'register_menues', 100);

// register menu rest endpoints
function register_rest_endpoints()
{
	register_rest_route('wp/v2', 'menus', array(
		'methods' => 'GET',
		'callback' => '_get_menus',
		'permission_callback' => function(WP_REST_Request $request) {
			return wp_verify_nonce($request->get_header('X-WP-Nonce'), 'wp_rest');
		},
	));
	register_rest_route('wp/v2', 'meta', array(
		'methods' => 'GET',
		'callback' => '_get_meta',
		'permission_callback' => function(WP_REST_Request $request) {
			return wp_verify_nonce($request->get_header('X-WP-Nonce'), 'wp_rest');
		},
	));
}
function _get_menus()
{
	$locations = get_nav_menu_locations();
	$menus = array();
	// loop all menus
	foreach ($locations as $key => $location) {
		$object = wp_get_nav_menu_object($location);
		$menu_items = wp_get_nav_menu_items($object->slug);
		$menu = array();
		// loop all items
		foreach ($menu_items as $menu_item) {
			$menu_item->url = str_replace(get_home_url(), '', $menu_item->url);
			// add slug if post
			if ($menu_item->object !== 'custom') {
				$menu_item->slug = get_post_field('post_name', $menu_item->object_id);;
			}
			// if has parent
			if ($menu_item->menu_item_parent > 0) {
				$i = _get_index_of_menu_item($menu, $menu_item->menu_item_parent);
				if ($i !== false) {
					$menu[$i]['menu_item_children'][] = $menu_item->to_array();
				}
			} 
			// add to menu
			else {
				$menu[] = $menu_item->to_array();
			}
		}
		$menus[$key] = $menu;
	}
	return $menus;
}
function _get_index_of_menu_item($array, $ID)
{
	foreach ($array as $key => $item) {
		if ($item['ID'] == $ID)
			return $key;
	}
	return false;
}
function _get_meta()
{
	$fields = array(
		'name', 
		'description', 
		'wpurl', 
		'url', 
		'charset', 
		'version', 
		'html_type', 
		'text_direction', 
		'language'
	);
	$meta = array();
	foreach($fields as $field) {
		$meta[$field] = get_bloginfo($field);
	}
	return new WP_REST_Response($meta, 200);
}
add_action('rest_api_init', 'register_rest_endpoints');

// get home page type
function get_home_page() 
{
	$post_id = get_option('page_on_front');
	return $post_id ? get_post_field('post_name', $post_id) : null;
}

// add static meta tags as no js fallback
function add_static_meta_tags() {
	$title = get_bloginfo('name');
	$description = get_bloginfo('description');

	echo '<title>' . $title . '</title>';
	echo '<meta data-vmid="description" name="description" content="' . $description . '">';

	echo '<link data-n-head="ssr" rel="icon" type="image/x-icon" href="' . get_template_directory_uri() . '/dist/favicon.ico">';
	echo '<link data-n-head="ssr" rel="icon" type="image/png" sizes="196x196" href="' . get_template_directory_uri() . '/dist/favicon-196.png">';
	echo '<link data-n-head="ssr" rel="icon" type="image/png" sizes="96x96" href="' . get_template_directory_uri() . '/dist/favicon-96.png">';
	echo '<link data-n-head="ssr" rel="icon" type="image/png" sizes="32x32" href="' . get_template_directory_uri() . '/dist/favicon-32.png">';

	echo '<meta property="og:type" content="website">';
	echo '<meta property="og:site_name" content="' . $title . '">';
	echo '<meta data-vmid="og:title" property="og:title" content="' . $title . '">';
	echo '<meta data-vmid="og:description" property="og:description" content="' . $description . '">';
	echo '<meta data-vmid="og:image" property="og:image:secure_url" itemprop="image" content="' . get_template_directory_uri() . '/dist/og-img.png">';
}
add_action('wp_head', 'add_static_meta_tags', 99);
