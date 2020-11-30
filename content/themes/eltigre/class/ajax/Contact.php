<?php

namespace Eltigre\Ajax;

class Contact {

    public function __construct() {
        add_action('wp_ajax_send_contact_mail', array($this, 'send_contact_mail'));
        add_action('wp_ajax_nopriv_send_contact_mail', array($this, 'send_contact_mail'));
    }


    public function send_contact_mail(){
        // Retrieve form fields


        // Format message
        $message  = 'E-Mail Message';
        $message .= 'E-Mail Message....';


        // Set E-Mail subject
        $subject = 'E-Mail Subject';


        // Set E-Mail recipients
        $recipients = array();


        // Build email headers
        $headers = array();
        $headers[] = 'Content-Type: text/html; charset=UTF-8';
        $headers[] = 'From: ' . get_bloginfo( 'name' ) . ' <site@mail.com>';
        $headers[] = 'Reply-To: Firstname Lastname <customer@mail.com>';


        // Send email
        if ( wp_mail( $recipients, $subject, $message, $headers ) ) {
            wp_send_json_success(' Success message' );
        } else {
            wp_send_json_error( 'Error message' );
        }


        wp_die();
    }
}

new Contact();