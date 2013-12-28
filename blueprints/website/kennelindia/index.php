<?php include("header.inc") ?>
    <?php include("quickshop.inc") ?>

    <!-- BEGIN .main-content-wrapper -->
    <section class="main-content-wrapper clearfix">

        <!-- BEGIN .welcome-message-1 -->
        <div class="welcome-message-1">
            <h2>Welcome to <span>Cloud PetStore</span></h2>
            <p><b>Cloud Petstore</b> is a recreation of the classic Petstore application of J2EE platforms in SMART. This is a sample cloud application running on SMART Platform</p>
        <!-- END .welcome-message-1 -->
        </div>
        <!-- BEGIN .featured-items -->
        <div class="featured-items clearfix">

            <!--<div class="main-title clearfix">
                <p>Pets</p>
            </div>-->

            <div class="items clearfix" id="petitems" name="petitems">

            </div>

        <!-- END .featured-items -->
        </div>

    <!-- END .main-content-wrapper -->
    </section>

    <script>
        $(document).ready(function()
        {
            smartconfig.tenant = "<?php echo $_POST['tenantid']; ?>";
            if (smartconfig.tenant == '')
                smartconfig.tenant = "<?php echo $_GET['tenant']; ?>";
            if (smartconfig.tenant == '')
                smartconfig.tenant = 'kennelindia'
            var ptype = "<?php echo $_GET['pettype']; ?>";
            if (ptype == '')
                ptype = 'FISH';
            resetPets(ptype);
            getCartItems(true);
        });

    $('#searchanimals').submit(function(e) {
        e.preventDefault();
        var addTo = $("#petitems");
        addTo.empty();
        var nm = $('#searchname').val();
        var smartconn = createpetanimalconn();
        smartconn.searchAnimalNames(nm, displayPet, finishDisplay);
        return false;
    });

    $('#addtocart').click(function() {
        addItemToCart($('#shopItemId').val());
    });

    $('#shoppingcnt').click(function() {
        redirectTo('cart.php'); return false;
    });
    </script>

<?php include("footer.inc") ?>
