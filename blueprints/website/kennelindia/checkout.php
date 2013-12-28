<?php include("header.inc") ?>
    <!-- BEGIN .main-content-wrapper -->
    <section class="main-content-wrapper clearfix">
        <!-- BEGIN .main-content -->
        <div class="main-content item-block-3">
            <div class="content">
                <!-- BEGIN .header -->
                <div class="header">
                    <div class="left" id="purchaseditems">
                        <h6>You have purchased this</h6>

                    </div>

                    <div class="right custom-font-1">
                        <h2 id="ordercost">$260.99</h2>
                    </div>
                    <div class="clear"></div>
                <!-- END .header -->
                </div>
                <table class="message-success custom-font-1">
                    <tr>
                        <td>
                            Thank you! Your order was placed successfully!
                        </td>
                    </tr>
                </table>
                <div class="order-id">
                    Your order ID is: <a href="#" id="ordernumber">#1012</a>
                </div>
                <div class="clear"></div>
                <div class="next-step">
                    <table>
                        <tr>
                            <td>
                                <a href="javascript:continueshopping();" class="button-1 custom-font-1 trans-1"><span>Continue shopping</span></a>
                            </td>
                        </tr>
                    </table>
                </div>
                <div class="clear"></div>
            </div>
        <!-- END .main-content -->
        </div>
    </section>

    <script>
            $(document).ready(function()
            {
                smartconfig.tenant = "<?php echo $_GET['tenant']; ?>";
                if (smartconfig.tenant == '')
                    smartconfig.tenant = 'kennelindia'
                $('#ordernumber').empty().append('<?php echo $_GET["orderid"]; ?>');
                getOrder('<?php echo $_GET["orderid"]; ?>');
            });
    </script>

<?php include("footer.inc") ?>
