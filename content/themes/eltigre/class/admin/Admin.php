<?php
// C'est ici qui'on fera les modifications wordpress,  
namespace Eltigre;

class Admin {

    public function __construct() {
        add_filter( 'manage_posts_columns', array( $this, 'add_thumbnail_column_to_watches_table' ), 10, 2 );
        add_action( 'manage_posts_custom_column', array( $this, 'set_thumbnail_column_content' ), 10, 2 );
        add_filter( 'tiny_mce_before_init', array( $this,'custom_wysiwyg_colors' ) );
    }

    public function custom_wysiwyg_colors( $init ) {
		$custom_colours = '
			"cba755", "Gold",
			"4D4D4D", "Light Black",
			"ffffff", "White",
			"000000", "Black"
			';
		$init['textcolor_map'] = '['.$custom_colours.']';
		$init['textcolor_rows'] = 8; 
		
		return $init;
	}

    public function add_thumbnail_column_to_watches_table( $posts_columns, $post_type ) {
        if ( $post_type !== 'watches' ) return $posts_columns;

        $reordered_posts_columns = array();
        foreach ( $posts_columns as $column_name => $column ) {
            $reordered_posts_columns[ $column_name ] = $column;

            if ( $column_name === 'cb' ) {
                $reordered_posts_columns[ 'thumbnail' ] = __( 'Thumbnail', 'eltigre' );
            }
        }

        return $reordered_posts_columns;
    }

    public function set_thumbnail_column_content( $column_name, $post_id ) {
        if ( $column_name === 'thumbnail' ) {?>
            <a href="<?php echo get_edit_post_link( $post_id ); ?>">
             <?php echo get_the_post_thumbnail( $post_id, array( 50, 50 ) ); ?>
             </a><?php
        }
    }
}

new Admin();