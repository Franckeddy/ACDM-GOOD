<?php
namespace Eltigre\Controllers;

if( ! class_exists( 'Eltigre\Controllers\ContactForm' ) ) {
    class ContactForm {
        public static function get_context() {
            if( !empty( $_GET["watch_id"] )){
                $context['contact_form'] = array(
                    'btn_send'      => __( 'Envoyer', 'eltigre' ),
                    'value'  => array( 
                        'subject'       => __( 'Intérêt pour ' . get_the_title( $_GET["watch_id"] ) , 'eltigre' ) ,
                    )
                );
            }else{
                $context['contact_form'] = array(
                    'btn_send'      => __( 'Envoyer', 'eltigre' ),
                );
            }
            return $context;
        }
    }
}