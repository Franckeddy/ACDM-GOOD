<?php

if ( !function_exists( 'debug' ) ) {
	function debug( $data, $die = true ) {
		echo '<pre>';
		var_dump( $data );
		echo '</pre>';

		if ( $die ) wp_die();
	}
}