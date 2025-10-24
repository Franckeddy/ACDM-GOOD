<?php
define( 'WP_CACHE', true ); // Added by WP Rocket


require_once(__DIR__ . '/vendor/autoload.php');
$dotenv = Dotenv\Dotenv::create(__DIR__);
$dotenv->load();

/** Database information **/
define( 'DB_NAME', getenv('DB_NAME') );
define( 'DB_USER', getenv('DB_USER') );
define( 'DB_PASSWORD', getenv('DB_PASSWORD') );
define( 'DB_HOST', getenv('DB_HOST') );
$table_prefix  = 'acdm_';

define( 'DB_CHARSET', 'utf8' );
define( 'DB_COLLATE', '' );
define( 'FS_METHOD', 'direct' );
/**
 * @link https://api.wordpress.org/secret-key/1.1/salt/
 */
define('AUTH_KEY',         'YjUd$Mx1#G89C6Z@lLKu]q)Y)GO=xTuWLSPI?=80]ytWFMpNnHlp+@jruv|rs:P|');
define('SECURE_AUTH_KEY',  '7E~wF!^)W 3*~5n=CTbYD[s*kQ5}z(!#J;j194lq+&PCITRX<y%]={p7;1#MQ.lk');
define('LOGGED_IN_KEY',    'G9@r=1]e>mw`>-X~@)Wv=%N>)a4A)_;m+za?FJWG<n4O^yq^%-.AHHj;?:TBTg>w');
define('NONCE_KEY',        'o!RO5f8eV9T2Q28kABb7UW(|a}6NN.&z2y<UYev e*fi}ReO#`-U4bNMRWL- {Qt');
define('AUTH_SALT',        '/Jd_}h%-p9X=gsO#[VKh-TW}I{u*,=T-Cm] PTj=-N^=I4 ~<T.P+mFa$sJ<4+y*');
define('SECURE_AUTH_SALT', '#d}m!1y:@ezWmbG/3 98;0!P;~pJ>o7|Vc75-qEHT_h~0u<5wEN9!|x+ANg@=`gH');
define('LOGGED_IN_SALT',   '$TsQFv5ZK]|1s=JMH9&hOh_q`UA>U~IB:iuDUasarf*ON5dNnqTjoTGv|M:9ekf}');
define('NONCE_SALT',       'WG[yM1|[,4B,]->79#_w{O[eq%l9ELDj)?1($FxH//1Be[)d-<JpeIZCs?0-D|#X');

/** Debug mode **/
// define('WP_DEBUG', true);
define( 'WP_DEBUG', false );
if ( WP_DEBUG ) {
	define( 'WP_DEBUG_LOG', true );
	define( 'WP_DEBUG_DISPLAY', getenv('WP_DEBUG') );
	@ini_set( 'display_errors', 1 );
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
