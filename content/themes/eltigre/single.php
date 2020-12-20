<?php
/**
 * The Template for displaying all single posts
 *
 * Methods for TimberHelper can be found in the /lib sub-directory
 *
 * @package  WordPress
 * @subpackage  Timber
 * @since    Timber 0.1
 */

$context         = Timber::context();
$timber_post     = Timber::query_post();
$context['post'] = $timber_post;
$context['post']->post_date = date( 'd/m/y', strtotime( $context['post']->post_date ) );
$context['post']->post_thumbnail = wp_get_attachment_image_url( get_post_thumbnail_id(), '', false, array( 'class' => 'single-post__image' ) );
$pages = get_pages(
	array(
	   'meta_key' => '_wp_page_template',
	   'meta_value' => 'templates/template-blog.php'
   )
);
$context['interest'] = array(
	'label' 		=> __( 'Je suis intéressé', 'eltigre' ),
	// 'url' 	=> !empty( get_pages( array( 'meta_key' => '_wp_page_template', 'meta_value' => 'controllers/controller-blog.php' ) ) ) ? get_permalink( get_pages( array( 'meta_key' => '_wp_page_template', 'meta_value' => 'controllers/controller-blog.php' ) )[0]->ID ) : ''
	'url'			=> get_permalink( 165 ) . '?watch_id=' . get_the_id(),
);

$context['watches'] = array(
	'label' => __( 'Retour', 'eltigre' ),
<<<<<<< HEAD
	// 'url' 	=> !empty( get_pages( array( 'meta_key' => '_wp_page_template', 'meta_value' => 'controllers/controller-blog.php' ) ) ) ? get_permalink( get_pages( array( 'meta_key' => '_wp_page_template', 'meta_value' => 'controllers/controller-blog.php' ) )[0]->ID ) : ''
	'url' => get_permalink(165), // 165 est l'ID de la page montre de collection à mettre dynamiquement.
=======
	'url' => get_permalink( 141 ),
>>>>>>> 738309b72b801e1072f07dab2ca1dd35af3238b3
);


if ( post_password_required( $timber_post->ID ) ) {
	Timber::render( 'single-password.twig', $context );
} else {
	Timber::render( array( 'single-' . $timber_post->ID . '.twig', 'single-' . $timber_post->post_type . '.twig', 'single-' . $timber_post->slug . '.twig', 'single.twig' ), $context );
}
