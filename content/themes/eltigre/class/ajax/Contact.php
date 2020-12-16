<?php

namespace Eltigre\Ajax;

class Contact {

    public function __construct() {
        add_action('wp_ajax_submit_form', array($this, 'submit_form'));
        add_action('wp_ajax_nopriv_submit_form', array($this, 'submit_form'));
    }


    public function submit_form(){
        // Retrieve form fields
        $this->fields = $this->get_fields();

        if ( $this->verify_fields() ) {
            $lastname                 = $this->fields['lastname']['value'];
            $mail                     = $this->fields['mail']['value'];
            $subject                  = $this->fields['subject']['value'];
            $user_message             = $this->fields['user_message']['value'];

            $post_ID = url_to_postid( $_SERVER['HTTP_REFERER'] );
            $sections = get_field( 'sections', $post_ID );
            $success_message = '';

            foreach( $sections as $section ) {
                if ( $section['acf_fc_layout'] === 'contact_form' ) {
                    $success_message = $section['confirmation'];
                    // $subject = $section['subject'];
                    $recipient = $section['recipient'];
                }
            }

            // Format message
            $message = '';
            $message .= sprintf( __( 'Nom : %s', 'eltigre' ), $lastname ) . "\n";
            $message .= sprintf( __( 'E-Mail : %s', 'eltigre' ), $mail ) . "\n";
            $message .= sprintf( __( 'Sujet : %s', 'eltigre' ), $subject ) . "\n";
            $message .= sprintf( __( 'Téléphone : %s', 'eltigre' ), $phone ) . "\n\n";
            $message .= $user_message;

            // Build email headers
            $headers = array();
            $headers[] = 'Content-Type: text/html; charset=UTF-8';
            $headers[] = 'From: ' . get_bloginfo( 'name' ) . ' <'. $mail .'>';
            $headers[] = "Reply-To: $firstname $lastname <$mail>";
        
            // Send email
            if ( wp_mail( $recipient, $subject, $message, $headers ) ) {
                wp_send_json_success( __( $success_message , 'eltigre' ) );
            } else {
                wp_send_json_error( __( 'Erreur: Impossible d\'envoyer votre message', 'eltigre' ) );
            }
            
            wp_die();
        }
    }

    public function get_fields() {
        return array(
            'lastname' => array(
                'value'     => $_POST['lastname'],
                'required'  => true,
            ),
            'mail' => array(
                'value'     => $_POST['mail'],
                'required'  => true,
            ),
            'subject' => array(
                'value'     => $_POST['subject'],
                'required'  => true,
            ),
            'user_message' => array(
                'value'     => $_POST['message'],
                'required'  => true,
            ),
        );
    }

    private function verify_fields() {
        foreach ( $this->fields as $field ) {
            if ( $field['required'] && empty( $field['value'] ) ) {
                wp_send_json_error( __( 'Erreur: Champs requis vide', 'eltigre' ) );
                wp_die();
            }
        }

        return true;
    }
}

new Contact();