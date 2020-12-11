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
        include_once 'admin/Admin.php';
    }


    private function load_public() {
        include_once 'public/controllers/Watches.php';
    }
}

new Eltigre();