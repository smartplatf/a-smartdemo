<?php include("header.inc") ?>

    <div class="row">
			<div class="span12 post">
				<h2 class="page-header"><span id="category">Replace</span></h2>
				<div class="sidebar-line"><span></span></div>
				<div class="row-fluid" id="petitems">

  			    </div>
			</div><!-- end post span -->
  	</div>

	<!-- End Site Container -->


<?php include("footer.inc") ?>
    <script>
        $(document).ready(function()
        {
            var ptype = "<?php echo $_GET['pettype']; ?>";
            if (ptype == '')
                ptype = 'FISH';
            resetPets(ptype);
            getCartItems(true);
        });
    </script>
        <script src="js/custom.js" type="text/javascript"></script>
