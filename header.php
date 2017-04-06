<!DOCTYPE html>
<html>
<head>
  <meta charset="<?php bloginfo('charset'); ?>">
  <title><?php wp_title(''); ?><?php if(wp_title('', false)) { echo ' - '; } ?> <?php bloginfo('name'); ?></title>

  <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="<?php bloginfo('description'); ?>">

  <link rel="stylesheet" type="text/css" href="<?php echo get_template_directory_uri(); ?>/build/style.min.css">

  <?php wp_head(); ?>
</head>

<body>
  <header>
    <nav class="main-nav">
      <?php wp_nav_menu( array( 'theme_location' => 'primary-menu' ) ); ?>
    </nav>
  </header>
