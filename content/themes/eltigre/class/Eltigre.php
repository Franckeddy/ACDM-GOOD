<?php
class Eltigre {

    public function __construct() {
        $this->load_classes();
    }


    private function load_classes() {
        if ( is_admin() && wp_doing_ajax() ) {
            $this->load_ajax();
        } else if ( is_admin() && !wp_doing_ajax() ) {
            $this->load_admin();
        } else {
            $this->load_public();
        }
    }

    
    private function load_ajax() {
        include_once 'ajax/Contact-mail.php';
    }


    private function load_admin() {

    }


    private function load_public() {

    }
}

new Eltigre();