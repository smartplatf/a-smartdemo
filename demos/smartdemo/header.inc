<?php
session_start();
include("uitemplate.php");
$uitemp = new uitemplate;
?> <!-- Will contain the user only if logged in. -->
<html lang="en">
<head>
    <meta charset="utf-8" />

    <!-- Set the viewport width to device width for mobile -->
    <meta name="viewport" content="user-scalable=no, width=device-width, initial-scale=1.0, maximum-scale=1.0" />

    <!-- Set meta informations -->
    <title>SMART - A Demo of SMART Capabilities</title>
    <meta name="description" content="SMART plug and play with different SMART Flows">
    <meta name="author" content="">
    <meta name = "viewport" content = "initial-scale = 1, user-scalable = no">

    <!-- Style Files -->
    <!--<link href="http://fonts.googleapis.com/css?family=Open+Sans:400,300,300italic,400italic,600,700,700italic,800" rel="stylesheet" type="text/css">-->
    <link rel="stylesheet" href="layerslider/css/layerslider.css" type="text/css">
    <link rel="stylesheet" href="css/bootstrap.css">
    <link rel="stylesheet" href="css/media.css">
    <link rel="stylesheet" href="css/flexslider.css">
    <link rel="stylesheet" href="style.css">
    <link rel="stylesheet" href="toastr.css">


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
                <li><a title="Like us on Facebook" data-placement="bottom" data-toggle="tooltip" href="http://facebook.com/smartplatf"><i class="icon-facebook"></i></a></li>
                <li><a title="Follow us on Twitter" data-placement="bottom" data-toggle="tooltip" href="http://twitter.com/smartplatf"><i class="icon-twitter"></i></a></li>
            </ul>
        </div>
        <div class="right">
            <div id="wdt-links">
                <ul>
                    <li class="register"><span class="label label-success font14">Beta Version <i class="icon-info"></i></span></li>
                    <li class="register"><a href="http://fixchg.com/register.php" id="wdt-register">Register <i class="icon-user"></i></a></li>
                    <li><a href="http://fixchg.com/login.php">Login <i class="icon-unlock-alt"></i></a></li>
                </ul>
            </div>
        </div>
    </div>
	<!-- END Top Bar -->

    <!-- Start Header Bar -->
    <div class="container header-wrap make-bg">
        <div class="left brand">
            <h1><a href="index.php">SMART Demo</a></h1>
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
                            <a class="dropdown-toggle" href="#" data-toggle="dropdown">Demo <span class="caret"></span></a>
                              <div class="dropdown-menu span5">
                                <div class="row">
                                  <div class="span2">
                                    <ul class="mega-menu-links">
                                      <li><a href="index.php?demo=BasicDemo">Basic Usage</a></li>
                                      <li><a href="index.php?demo=RoleDemo">Role-Based Security</a></li>
                                      <li><a href="index.php?demo=SurveyDemo">Multi-Tenancy</a></li>
                                      <li><a href="index.php?demo=PlugPlay">Plug & Play</a></li>
                                    </ul>
                                  </div>
                                  <div class="span3">
                                    <ul class="mega-menu-links">
                                      <li><a href="http://fixchg.com" target="_blank">FixChg <span class="label label-success">(Market Place App)</span></a></li>
                                      <li><a href="http://azzaca.com" target="_blank">Azzaca - <span class="label label-success">(Widget Sample)</span></a></li>
                                    </ul>
                                  </div>
                               </div>
                            </div>
                           </li>
                        </ul>
                        <ul class="nav pull-right">
                            <li><a href="readme.php">Read Me</a></li>
                            <li><a href="download.php">Install SMART</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- End Main Menu -->
    <!-- Start Site Container -->
    <div class="container make-bg" id="body-container">

