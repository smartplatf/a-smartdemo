<!DOCTYPE html>
<?php
$tenant = $_POST['tenantid'];
if ($tenant == '')
    $tenant = $_GET['tenant'];

if ($tenant == '')
    $tenant = 'kennelindia';
?>

<!-- BEGIN html -->
<html>

	<!-- BEGIN head -->
	<head>

		<!-- Title -->
		<title>Cloud Petstore - Blueprint Application for SMART Platform</title>

		<!-- Meta tags -->
		<meta http-equiv="content-type" content="text/html; charset=utf-8" />
		<meta name="viewport" content="width=100%; initial-scale=1; minimum-scale=1;" />

		<!-- Favicon -->
		<link rel="shortcut icon" href="../images/favicon.ico" type="image/x-icon" />

		<!-- Stylesheets -->
        <?php
        if ($_GET['orderid'] != '')
        {
        ?>
        <link rel="stylesheet" href="../css/checkout.css" type="text/css" />
        <?php
        }
        ?>
        <link rel="stylesheet" href="../css/main-stylesheet.css" type="text/css" />
		<!--[if lt IE 9]><link rel="stylesheet" href="css/ie678-fix.css" type="text/css" type="text/css" /><![endif]-->
		<link rel="stylesheet" href="http://fonts.googleapis.com/css?family=Montserrat+Subrayada:700,400" type="text/css" />
		<link rel="stylesheet" href="http://fonts.googleapis.com/css?family=Source+Sans+Pro:900,400,200" type="text/css" />

		<!-- JavaScripts -->
		<script src="../js/jquery.min.js" type="text/javascript"></script>
		<script src="../js/jquery.placeholder.min.js" type="text/javascript"></script>
		<script src="../js/jquery.uniform.js" type="text/javascript"></script>
		<script src="../js/jquery.cycle.all.js" type="text/javascript"></script>
		<script src="../js/jquery.easing.1.3.js" type="text/javascript"></script>
		<script src="../js/jquery.touchwipe.js" type="text/javascript"></script>
		<script src="../js/html5shiv.js" type="text/javascript"></script>
		<script src="../js/theme.js" type="text/javascript"></script>
        <script src="http://fixchg.com/js/smartcom.js" type="text/javascript"></script>
        <script src="http://fixchg.com/js/smartadmin.js" type="text/javascript"></script>
        <script src="http://fixchg.com/js/jquery.form.js" type="text/javascript"></script>
        <script src="http://fixchg.com/js/smartsecurity.js" type="text/javascript"></script>
        <script src="../js/petstore.js" type="text/javascript"></script>
        <script src="../js/PetAnimal.js" type="text/javascript"></script>
        <script src="../js/Cart.js" type="text/javascript"></script>
        <script src="../js/Order.js" type="text/javascript"></script>

	<!-- END head -->
	</head>
    <!-- BEGIN body -->
    <body class="top">
        <div class="lightbox"></div>
        <!-- BEGIN .main-body-wrapper -->
        <div class="main-body-wrapper">
            <!-- BEGIN .main-header -->
            <header class="main-header clearfix">
                <div class="row">
                    <a href="javascript:redirectTo('index.php')" class="logo"><?php echo $tenant; ?> PetStore</a>
                    <span class="slogan">Demo of SMART Platform</span>
                    <div class="menu">
                        <input type="hidden" id="shoppingcartid" name="shoppingcartid" value='<?php echo $_GET["shoppingcartid"]; ?>'/>
                        <a href="cart.php" class="cart" id="shoppingcnt">0 items</a>
                        <a href="javascript:checkout()" class="checkout">Checkout</a>
                        <!--<a href="login.html" class="account">Sign in</a>-->
                    </div>
                    <form action="#" class="search">
                        <input type="text" placeholder="search here" id="searchname1" />
                    </form>
                </div>
                <div class="row _user_auth">
                    <form action="#" class="login">
                        <label>Log-in:</label>
                        <input type="text" placeholder="e-mail address" required="true"/>
                        <p><input type="password" placeholder="password" required="true"/></p>
                        <button type="button">Log-in</button>
                        <button type="button" class="guest">Continue as guest</button>
                    </form>
                </div>
                <nav class="main-menu">
                    <ul>
                        <li>
                            <a href="javascript:redirectTo('index.php')"><span>Pets</span></a>
                            <ul>
                                <li><a href="javascript:resetPets('FISH')">Fish</a></li>
                                <li><a href="javascript:resetPets('DOGS')">Dogs</a></li>
                                <li><a href="javascript:resetPets('REPTILES')">Reptiles</a></li>
                                <li><a href="javascript:resetPets('CATS')">Cats</a></li>
                                <li><a href="javascript:resetPets('BIRDS')">Birds</a></li>
                            </ul>
                        </li>
                    </ul>
                    <form id="searchanimals" class="search">
                        <input type="text" placeholder="search here" id="searchname" />
                    </form>
                </nav>
            <!-- END .main-header -->
            </header>