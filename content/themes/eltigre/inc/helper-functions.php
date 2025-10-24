<?php

if ( !function_exists( 'debug' ) ) {
	function debug( $data, $die = true ) {
		echo '<pre>';
		var_dump( $data );
		echo '</pre>';

		if ( $die ) wp_die();
	}
}

require_once __DIR__ . '/rocket-purge.php';
require_once __DIR__ . '/rankmath-auto.php';
require_once __DIR__ . '/acf-filter-published.php';
