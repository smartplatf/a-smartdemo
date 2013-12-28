<?php include("header.inc") ?>
	<!-- BEGIN .main-content-wrapper -->
	<section class="main-content-wrapper main-item-wrapper clearfix">
		<!-- BEGIN .main-cart -->
		<div class="main-cart">

			<div class="titles clearfix">
				<p class="product">Product name</p>
				<p class="quantity">Quantity</p>
				<p class="price">Price</p>
			</div>

			<form action="#" id="checkoutform">
                <div id="cartitems">

                </div>
				<div class="row clearfix">
					<div class="total">
						<label>Total payment:</label>
						<p id="totalprice"></p>
					</div>
				</div>

				<div class="row clearfix">
					<div class="buttons">
						<button class="checkout" >Proceed to checkout</button>
					</div>
				</div>

			</form>

		<!-- END .main-cart -->
		</div>

	<!-- END .main-content-wrapper -->
	</section>

    <script>
            $(document).ready(function()
            {
                smartconfig.tenant = "<?php echo $_GET['tenant']; ?>";
                if (smartconfig.tenant == '')
                    smartconfig.tenant = 'kennelindia'
                $('#shoppingcartid').val('<?php echo $_GET["shoppingcartid"]; ?>');
                getCartItems(false);
            });

            $('#checkoutform').submit(function(e) {
                e.preventDefault();
                checkout();
                return false;
            });
    </script>
<?php include("footer.inc") ?>
