<?php
/**
 * Purge WP Rocket quand une montre est supprimée / corbeille / (dé)publiée.
 * -> évite d'avoir l'ID encore présent dans des carrousels mis en cache.
 */
add_action('init', function () {

  // Helper: purge "tout le domaine" + CDN Cloudflare si add-on actif
  if (!function_exists('acdm_rocket_purge_all')) {
    function acdm_rocket_purge_all() {
      if (function_exists('rocket_clean_domain')) {
        rocket_clean_domain();                 // purge tout le cache WP Rocket
      } else {
        // fallback générique si jamais l'API change
        do_action('rocket_purge_cache');
      }
      // Purge Cloudflare via l’add-on WP Rocket (si activé)
      do_action('rocket_purge_cloudflare_cache');
    }
  }

  // 1) Mise à la corbeille / suppression définitive
  add_action('trashed_post', function ($post_id) {
    if (get_post_type($post_id) !== 'watches') return;
    acdm_rocket_purge_all();
  }, 20);

  add_action('before_delete_post', function ($post_id) {
    if (get_post_type($post_id) !== 'watches') return;
    acdm_rocket_purge_all();
  }, 20);

  // 2) Changement de statut impactant les listings (publish <-> non-publish)
  add_action('transition_post_status', function ($new, $old, $post) {
    if (!$post || $post->post_type !== 'watches') return;
    // On purge si on passe de publié à non-publié, ou l'inverse
    $impact = ($old === 'publish' && $new !== 'publish') || ($new === 'publish' && $old !== 'publish');
    if ($impact) {
      acdm_rocket_purge_all();
    }
  }, 20, 3);

});
