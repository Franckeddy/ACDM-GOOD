<?php
/**
 * Single Watch Controller - Timber
 * 
 * Fichier : single-watch.php (à la racine de votre thème)
 * 
 * Ce fichier prépare le contexte pour le template Twig de la page montre
 */

use Timber\Timber;

// Vérifier que Timber est disponible
if (!class_exists('Timber')) {
    echo 'Timber not activated. Make sure you activate the plugin.';
    return;
}

// Préparer le contexte Timber
$context = Timber::context();

// Récupérer le post actuel
$context['post'] = Timber::get_post();

// Récupérer toutes les données du post avec ACF
if (function_exists('get_field')) {
    // Champs personnalisés
    $context['post']->custom_fields = array(
        'price'              => get_field('price'),
        'reference'          => get_field('reference'),
        'diameter'           => get_field('diameter'),
        'movement'           => get_field('movement'),
        'caliber'            => get_field('caliber'),
        'year'               => get_field('year'),
        'case_material'      => get_field('case_material'),
        'availability'       => get_field('availability'),
        'availability_link'  => get_field('availability_link'),
    );
    
    // Galerie d'images
    $images = get_field('images');
    if ($images) {
        $context['post']->images = $images;
    }
}

// URLs pour les boutons
$context['interest'] = array(
    'url'   => home_url('/contact'),
    'label' => 'Je suis intéressé',
);

$context['watches'] = array(
    'url'   => get_post_type_archive_link('watch'),
    'label' => 'Retour aux montres',
);

// Récupérer les posts similaires (même marque, par exemple)
$current_brands = wp_get_post_terms(get_the_ID(), 'watch_brand', array('fields' => 'ids'));

if (!empty($current_brands)) {
    $context['similar_watches'] = Timber::get_posts(array(
        'post_type'      => 'watch',
        'posts_per_page' => 4,
        'post__not_in'   => array(get_the_ID()),
        'tax_query'      => array(
            array(
                'taxonomy' => 'watch_brand',
                'field'    => 'term_id',
                'terms'    => $current_brands,
            ),
        ),
    ));
}

// Meta données SEO
$context['seo'] = array(
    'title'       => get_the_title() . ' - ' . get_bloginfo('name'),
    'description' => get_the_excerpt() ?: wp_trim_words(get_the_content(), 30),
    'image'       => get_the_post_thumbnail_url(null, 'large'),
);

// Breadcrumbs
$context['breadcrumbs'] = array(
    array('url' => home_url('/'), 'title' => 'Accueil'),
    array('url' => get_post_type_archive_link('watch'), 'title' => 'Montres'),
    array('url' => '', 'title' => get_the_title()),
);

// Affichage du template
Timber::render('single-watch-new-layout.twig', $context);

/**
 * ALTERNATIVE: Si vous préférez une classe controller
 */

/*
class SingleWatchController extends Timber\Post {
    
    public function __construct() {
        parent::__construct();
    }
    
    public function custom_fields() {
        if (!function_exists('get_field')) {
            return array();
        }
        
        return array(
            'price'              => get_field('price', $this->ID),
            'reference'          => get_field('reference', $this->ID),
            'diameter'           => get_field('diameter', $this->ID),
            'movement'           => get_field('movement', $this->ID),
            'caliber'            => get_field('caliber', $this->ID),
            'year'               => get_field('year', $this->ID),
            'case_material'      => get_field('case_material', $this->ID),
            'availability'       => get_field('availability', $this->ID),
            'availability_link'  => get_field('availability_link', $this->ID),
        );
    }
    
    public function images() {
        if (!function_exists('get_field')) {
            return array();
        }
        
        $images = get_field('images', $this->ID);
        return $images ?: array();
    }
    
    public function formatted_price() {
        $price = get_field('price', $this->ID);
        if ($price) {
            return number_format($price, 0, ',', ' ');
        }
        return null;
    }
    
    public function similar_watches($limit = 4) {
        $brands = wp_get_post_terms($this->ID, 'watch_brand', array('fields' => 'ids'));
        
        if (empty($brands)) {
            return array();
        }
        
        return Timber::get_posts(array(
            'post_type'      => 'watch',
            'posts_per_page' => $limit,
            'post__not_in'   => array($this->ID),
            'tax_query'      => array(
                array(
                    'taxonomy' => 'watch_brand',
                    'field'    => 'term_id',
                    'terms'    => $brands,
                ),
            ),
        ));
    }
}

// Utilisation de la classe
$context = Timber::context();
$context['post'] = new SingleWatchController();
$context['interest'] = array(
    'url'   => home_url('/contact'),
    'label' => 'Je suis intéressé',
);
$context['watches'] = array(
    'url'   => get_post_type_archive_link('watch'),
    'label' => 'Retour aux montres',
);
Timber::render('single-watch-new-layout.twig', $context);
*/

/**
 * HOOKS SUPPLÉMENTAIRES
 */

// Modifier le contexte global Timber
add_filter('timber/context', function($context) {
    // Ajouter des données globales ici
    $context['site_logo'] = get_theme_mod('custom_logo');
    $context['copyright_year'] = date('Y');
    
    return $context;
});

// Ajouter des fonctions Twig personnalisées
add_filter('timber/twig', function($twig) {
    // Fonction pour formater les prix
    $twig->addFilter(new Twig\TwigFilter('format_price', function($price) {
        return '€' . number_format($price, 0, ',', ' ');
    }));
    
    // Fonction pour tronquer le texte
    $twig->addFilter(new Twig\TwigFilter('truncate', function($text, $length = 100) {
        if (strlen($text) > $length) {
            return substr($text, 0, $length) . '...';
        }
        return $text;
    }));
    
    return $twig;
});

/**
 * EXEMPLE DE DONNÉES FICTIVES POUR TESTER
 * (À utiliser uniquement en développement)
 */

/*
function get_fake_watch_data() {
    return array(
        'ID' => 123,
        'title' => 'ROLEX DATEJUST - 71\'',
        'content' => 'La Rolex Datejust 1601, apparue en 1959, est l\'une des montres haut de gamme les plus connues et répandues...',
        'custom_fields' => array(
            'price' => 6200,
            'reference' => 'Rolex Datejust 1601',
            'diameter' => '36 mm',
            'movement' => 'Automatique',
            'caliber' => 'Rolex 1570',
            'year' => 1971,
            'case_material' => 'Acier',
            'availability' => '28 rue Madame',
            'availability_link' => '/contact',
        ),
        'images' => array(
            array(
                'url' => 'https://via.placeholder.com/800x800',
                'alt' => 'Rolex Datejust vue 1',
            ),
            array(
                'url' => 'https://via.placeholder.com/800x800',
                'alt' => 'Rolex Datejust vue 2',
            ),
        ),
    );
}
*/
