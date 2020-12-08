<?php status_header(200); ?>
<!DOCTYPE html>
<html <?php language_attributes(); ?> class="no-js no-svg">

<head>
    <meta charset="<?php bloginfo('charset'); ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <?php wp_head(); ?>
</head>

<body <?php body_class(); ?> data-homepage="<?php echo get_home_page(); ?>">
    <?php wp_body_open(); ?>

    <div id="app"></div>

    <?php wp_footer(); ?>
    <?php if (preg_match("/(.*.test|.*.local|.*.loc|localhost:.*)/i", $_SERVER['HTTP_HOST'])) : ?>
        <!-- HMR Reloader -->
        <script id="__bs_script__">
            //<![CDATA[
            document.write("<script async src='http://HOST:3000/browser-sync/browser-sync-client.js?v=2.26.5'><\/script>".replace("HOST", location.hostname));
            //]]>
        </script>
    <?php endif; ?>
</body>

</html>