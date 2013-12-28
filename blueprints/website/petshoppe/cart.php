<?php include("header.inc") ?>

    		<div class="row">

			<div class="span12 post">
            	<div class="row-fluid">
                	<div class="span12">
                    <h2 class="page-header">Shopping Cart</h2>
                    <div class="sidebar-line"><span></span></div>
                        <table class="table wishlist table-hover table-bordered">
                          <thead>
                           <tr>
                              <th class="span2">Image</th>
                              <th class="span3">Product Name</th>
                              <th class="span1">Quantity</th>
                              <th class="span3">Price</th>
                            </tr>
                          </thead>
                          <tbody id="cartitems">
                          </tbody>
                        </table>
                      </div>
					</div>
					<div class="right">
                        <a href="javascript:checkout()" class="btn btn-primary btn-general">Checkout</a> <a href="javascript:redirectTo('index.php')" class="btn btn-primary btn-general">Continue Shopping</a>
					</div>

                </div>
			</div>
		</div>

<?php include("footer.inc")?>
    <script>
            $(document).ready(function()
            {
                $('#shoppingcartid').val('<?php echo $_GET["shoppingcartid"]; ?>');
                getCartItems(false);
            });

    </script>
