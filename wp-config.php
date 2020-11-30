<?php

require_once(__DIR__ . '/vendor/autoload.php');
$dotenv = Dotenv\Dotenv::create(__DIR__);
$dotenv->load();

/** Database information **/
define( 'DB_NAME', getenv('DB_NAME') );
define( 'DB_USER', getenv('DB_USER') );
define( 'DB_PASSWORD', getenv('DB_PASSWORD') );
define( 'DB_HOST', getenv('DB_HOST') );
$table_prefix  = 'wp_';

define( 'DB_CHARSET', 'utf8' );
define( 'DB_COLLATE', '' );
define( 'FS_METHOD', 'direct' );
/**
 * @link https://api.wordpress.org/secret-key/1.1/salt/
 */
define('AUTH_KEY',         'put your unique phrase here');
define('SECURE_AUTH_KEY',  'put your unique phrase here');
define('LOGGED_IN_KEY',    'put your unique phrase here');
define('NONCE_KEY',        'put your unique phrase here');
define('AUTH_SALT',        'put your unique phrase here');
define('SECURE_AUTH_SALT', 'put your unique phrase here');
define('LOGGED_IN_SALT',   'put your unique phrase here');
define('NONCE_SALT',       'put your unique phrase here');

/** Debug mode **/
define( 'WP_DEBUG', getenv('WP_DEBUG') );
if ( WP_DEBUG ) {
	define( 'WP_DEBUG_LOG', true );
	define( 'WP_DEBUG_DISPLAY', getenv('WP_DEBUG') );
	@ini_set( 'display_errors',0 );
}

/** Site paths **/
define( 'WP_HOME', getenv('WP_HOME'));
define( 'WP_SITEURL', getenv('WP_HOME') . '/wp' );
/** Paths to the content directory. **/
define( 'WP_CONTENT_DIR', dirname( __FILE__ ) . '/content' );
define( 'WP_CONTENT_URL', WP_HOME . '/content' );

/** Absolute path to the WordPress directory. **/
if ( !defined( 'ABSPATH' ) )
	define( 'ABSPATH', dirname( __FILE__ ) . '/wp/' );

/** Sets up WordPress vars and included files. **/
require_once( ABSPATH . 'wp-settings.php' );
