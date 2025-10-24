<?php
// Auto-remplit Rank Math au save d'une montre (sans écraser le manuel)
add_action('save_post_watches', function($post_id, $post, $update) {
    if (defined('DOING_AUTOSAVE') && DOING_AUTOSAVE) return;
    if (wp_is_post_revision($post_id)) return;
    if ($post->post_status === 'auto-draft') return;

    $get = function($k){ return function_exists('get_field') ? (string)get_field($k) : ''; };

    $title   = get_the_title($post_id);
    $year    = $get('year');
    $diam    = $get('diameter_mm');
    $ref     = $get('reference');
    $caliber = $get('caliber');
    $price   = $get('price');

    $parts = array_filter([$title, $year ? "– $year" : '', $diam ? "– Ø{$diam} mm" : '']);
    $seo_title = implode(' ', $parts) . ' | Au Cœur Des Montres';

    $desc = trim(sprintf(
        '%s%s%s%s. Révisée et garantie 3 ans.',
        $title,
        $ref ? " (réf. $ref)" : '',
        $caliber ? " – calibre $caliber" : '',
        $diam ? " – Ø{$diam} mm" : ''
    ));
    $seo_desc = mb_substr(preg_replace('~\s+~',' ', $desc), 0, 155);

    $focus = trim(implode(', ', array_filter([$title, $year, 'montre', 'vintage'])));

    if (!get_post_meta($post_id, 'rank_math_title', true)) {
        update_post_meta($post_id, 'rank_math_title', $seo_title);
    }
    if (!get_post_meta($post_id, 'rank_math_description', true)) {
        update_post_meta($post_id, 'rank_math_description', $seo_desc);
    }
    if (!get_post_meta($post_id, 'rank_math_focus_keyword', true) && $focus) {
        update_post_meta($post_id, 'rank_math_focus_keyword', $focus);
    }
}, 10, 3);
