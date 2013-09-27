</div>
<!-- End Site Container -->
<div class="container">
	<!-- Start Footer -->
		<footer class="footer-wrapper">
			<div class="row-fluid">
				<div class="span4">
                    <h2 class="widget-title"><span>FiXchg is ...</span></h2>
						<div class="sidebar-line"><span></span></div>
                        	<p>A marketplace for SMART Flows. If it is your first time visiting the site, please visit our <a href="learnmore.php">"Learn More"</a> page.</p>
                            <p>As a developer you can rapidly develop "Lightweight flows" and publish it for customers. Get out of the box security, persistence, transaction, scalability and much more.</p>
                            <p>As a customer you can easily assemble "Lightweight flows" to create power packed solution on cutting edge technology.</p>
				</div>


            	<div class="span3">
			<h2 class="widget-title"><span>GET IN TOUCH</span></h2>
                    	<div class="sidebar-line"><span></span></div>
                            <ul class="contact-details">
                            <li><i class="icon-home"></i> SMART </li>
                            <li><i class="icon-phone"></i> +91 9902530998</li>
                            <li><i class="icon-envelope-alt"></i> <a href="mailto:support@smart-platform.com">support@smart-platform.com</a></li>
                            <li><i class="icon-envelope-alt"></i> <a href="mailto:info@smart-platform.com">info@smart-platform.com</a></li>
                            <li><i class="icon-map-marker"></i> <a href="#">View on Google Maps</a></li>
                            </ul>
                </div>
            </div>
		</footer>
	<!-- End Footer -->

	<!-- Start Copyright -->
	<div class="copyright">
        <div class="footer-menu left">
            <ul class="menu">
                <li><a href="index.php">Home</a></li>
                <li><a href="http://www.smart-platform.com" target="_blank">About SMART</a></li>
                <li><a href="#">Sitemap</a></li>
                <li><a href="#">Site Terms</a></li>
                <li><a href="http://http://blog.smart-platform.com/" target="_blank">Blog</a></li>
                <li><a href="mailto:support@smart-platform.com">Support</a></li>
            </ul>
        </div>

        <div class="right">
        	<p>© 2013 - 2014 <a href="index.html">SMART</a>. All rights reserved.</p>

        </div>
	</div>
	<!-- End Copyright -->
<div class="wdttop">Scroll To Top</div>
</div>
	<!-- JS Files -->
	<script src="js/jquery.js" type="text/javascript"></script>
	<script src="js/jquery-easing-1.3.js" type="text/javascript"></script>
	<script src="js/jquery-transit-modified.js" type="text/javascript"></script>
    <script type="text/javascript" src="js/jquery.ui.core.js"></script>
    <script type="text/javascript" src="js/jquery.ui.widget.js"></script>
	<script src="layerslider/js/layerslider.transitions.js" type="text/javascript"></script>
	<script src="layerslider/js/layerslider.kreaturamedia.jquery.js" type="text/javascript"></script>
	<script src="js/bootstrap.min.js"></script>
	<script src="js/jquery.flexslider.min.js"></script>
	<script src="js/countdown.js"></script>
    <script src="js/smartcom.js"></script>
    <script src="js/smartadmin.js"></script>
    <script src="js/jquery.form.js"></script>
    <script src="js/validate.js" type="text/javascript"></script>
    <script src="js/jquery-ui.js" type="text/javascript"></script>
    <script src="ace-editor/ace.js" type="text/javascript" charset="utf-8"></script>
    <script src="js/showcode.js" type="text/javascript" charset="utf-8"></script>
    <script src="<?php echo $dirpath; ?>/resources/js/custom.js" type="text/javascript" charset="utf-8"></script>
    <script>
        <?php
        if ($file[0] != '')
        {
        ?>
        setupcode("<?php echo $file[0]; ?>", "codediv", "<?php echo $file[1]; ?>");
        <?php
        }
        ?>
        setupeditor("jsondiv", "text");

        $('.tree > li a').click(function() {
                $(this).parent().find('ul').toggle();
                return false;
        });

        $(document).ready(function() {
            smartconfig.server = "192.168.1.4";
            smartconfig.smartPort = 9081;
            smartconfig.uploadPort = 9021;
            smartconfig.tenant = "<?php echo $tenant; ?>";
            setSessionId('<?php echo $tenant; ?>');
            init();
            showsetup("0");
            showdoc("<?php echo $firstdoc; ?>");
        });
    </script>
