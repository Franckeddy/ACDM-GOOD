<?php
/**
 * N'affiche que les posts "publish" pour les champs ACF Relationship & Post Object.
 * Fonctionne pour tout le site, quel que soit le carousel/section.
 */
add_action('init', function () {
  $filter = function ($value, $post_id, $field) {
    if (empty($value)) return $value;

    // Normaliser en liste d'IDs dans l'ordre initial
    $ids = [];
    if (is_array($value)) {
      foreach ($value as $v) { $ids[] = is_object($v) ? (int)$v->ID : (int)$v; }
    } else {
      $ids[] = is_object($value) ? (int)$value->ID : (int)$value;
    }
    $ids = array_values(array_filter(array_unique($ids)));

    if (!$ids) return [];

    // Récupère uniquement les IDs publiés, en conservant l'ordre d'origine
    $published_ids = get_posts([
      'post__in'     => $ids,
      'post_type'    => 'any',
      'post_status'  => 'publish',
      'numberposts'  => -1,
      'orderby'      => 'post__in',
      'fields'       => 'ids',
      'no_found_rows'=> true,
    ]);

    if (!$published_ids) return [];

    // Formater selon le return_format du champ
    if (isset($field['return_format']) && $field['return_format'] === 'id') {
      return $published_ids;
    }

    // Retour "object" (par défaut) : WP_Post[]
    return array_map('get_post', $published_ids);
  };

  add_filter('acf/format_value/type=relationship', $filter, 20, 3);
  add_filter('acf/format_value/type=post_object',  $filter, 20, 3);
});
