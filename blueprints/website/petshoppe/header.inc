<?php
session_start();
?> <!-- Will contain the user only if logged in. -->
<html lang="en">
<head>
    <meta charset="utf-8" />

    <!-- Set the viewport width to device width for mobile -->
    <meta name="viewport" content="user-scalable=no, width=device-width, initial-scale=1.0, maximum-scale=1.0" />

    <!-- Set meta informations -->
    <title>Cloud Petstore - A blueprint for cloud applications</title>
    <meta name="description" content="FiXchg plug and play with different SMART Flows">
    <meta name="author" content="">
    <meta name = "viewport" content = "initial-scale = 1, user-scalable = no">

    <!-- Style Files -->
    <!--<link href="http://fonts.googleapis.com/css?family=Open+Sans:400,300,300italic,400italic,600,700,700italic,800" rel="stylesheet" type="text/css">-->
    <link rel="stylesheet" href="layerslider/css/layerslider.css" type="text/css">
    <link rel="stylesheet" href="css/bootstrap.css">
    <link rel="stylesheet" href="css/media.css">
    <link rel="stylesheet" href="css/flexslider.css">
    <link rel="stylesheet" href="style.css">

    <!--[if IE 7]>
        <link rel="stylesheet" href="css/font-awesome-ie7.min.css">
    <![endif]-->

    <!-- JS Files -->
    <script>
        document.documentElement.className = document.documentElement.className.replace(/(\s|^)no-js(\s|$)/, '$1js$2');
    </script>

     <!--[if lt IE 9]>
        <script src="js/html5shiv.min.js"></script>
    <![endif]-->

</head>
<body>
    <!-- Start Top Bar -->
    <div class="container tophead">
        <div class="left span3">
            <ul class="social">
                <li><a title="Follow us on Twitter" data-placement="bottom" data-toggle="tooltip" href="http://twitter.com/smartplatf"><i class="icon-twitter"></i></a></li>
            </ul>
        </div>
        <div class="right">
            <div id="wdt-links">
                <ul>
                    <input type="hidden" id="shoppingcartid" name="shoppingcartid" value='<?php echo $_GET["shoppingcartid"]; ?>'/>
                    <li class="cart"><a href="javascript:redirectTo('cart.php')"><i class="icon-shopping-cart"></i> Your Cart <span class="label label-success font14" id="shoppingcnt">0 Items</span> <i class="icon-arrow-down"></i></a>
                </ul>
            </div>
        </div>
    </div>
	<!-- END Top Bar -->

    <!-- Start Header Bar -->
    <div class="container header-wrap make-bg">
        <div class="left brand">
            <h1><a href="index.php">Cloud Petstore - PetShoppe</a></h1>
        </div>
    </div>
    <!-- End Header Bar -->

    <!-- Start Main Menu -->
    <div class="container make-bg">
        <div class="navbar">
            <div class="container">
                <div class="navbar-inner">
                    <button class="btn btn-navbar" data-toggle="collapse" data-target=".nav-collapse">
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                    </button>
                    <div class="nav-collapse collapse">
                        <ul class="nav pull-left">
                            <li class="dropdown dropdown-hover active">
                              <a class="dropdown-toggle" href="index.php" data-toggle="dropdown">Pets <span class="caret"></span></a>
                                  <div class="dropdown-menu span4">
                                    <div class="row">
                                      <div class="span2">
                                        <ul class="mega-menu-links">
                                          <li><a href="javascript:resetPets('FISH')">Fish</a></li>
                                          <li><a href="javascript:resetPets('DOGS')">Dogs</a></li>
                                          <li><a href="javascript:resetPets('REPTILES')">Reptiles</a></li>
                                        </ul>
                                      </div>
                                      <div class="span2">
                                        <ul class="mega-menu-links">
                                          <li><a href="javascript:resetPets('CATS')">Cats</a></li>
                                          <li><a href="javascript:resetPets('BIRDS')">Birds</a></li>
                                        </ul>
                                      </div>
                                   </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- End Main Menu -->
    <!-- Start Site Container -->
    <div class="container make-bg" id="body-container">
