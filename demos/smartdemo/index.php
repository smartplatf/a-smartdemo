<?php
include ("demosetup.php");
$setup = new demosetup;
$details = $setup->getRequestDemoDetails();
$dirpath=$details['dirpath'];
$tenant=$details['tenant'];
$title = $details['title'];
$desc = $details['description'];
$setsession = $details['setsession'];
?>
<!DOCTYPE html>
<html lang="en">
<body>
    <?php include("header.inc") ?>
        <div class="span12 post">
            <div class="runsample">
                <?php
                    $uitemp->addHeader($title);
                ?>
                <div class="span12">
                    <p><?php echo $desc; ?></p>
                </div>
                <div class="row-fluid">
                <div class="span6 boxlight">
                    <?php include($dirpath . "/resources/html/message.html") ?>
                </div>
                <?php include("sidebar.inc") ?>
                </div>
            </div>
        </div>
        <?php include("showcode.inc") ?>
    <?php include("footer.inc") ?>
</body>
</html>
