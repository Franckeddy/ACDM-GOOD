<?php

namespace Eltigre\Controllers;

if( !class_exists( 'Eltigre\Controllers\Watches' ) ) {
    class Watches {
        public static function get_context() {
            $context = array( 'watches' => self::get_posts() );
            return $context;
        }

        public static function get_posts() {
            $query_args = array(
                'post_type'         => "watches",
                'orderby'           => "menu_order",
                'order'             => "ASC",
                'post_per_page'     => -1
            );

            $query = new \WP_Query( $query_args );
            $watches = array();

            while( $query->have_posts() ) {
                $query->the_post();
                $post_ID = get_the_ID();
                $acf_fields = get_fields( $post_ID );

                $watch = array(
                    'name'                  => get_the_title( $post_ID ),
                    'images'               => $acf_fields['images'],
                    'price'                 => $acf_fields['price'],
                );

                $watches[ $post_ID ] = $watch;
            }
            
            return $watches;
        }
    }
}