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
    <div class="row">
    <?php
        $uitemp->addHeader("Linux");
    ?>
    <p>
    To install SMART on Linux
    </p>

    <p>
    The top section can be split again into two. The left section is the UI rendering for the feature. This is a bare minimum, written as HTML code with calls made to the server using AJAX calls. The right hand box shows the requests sent to the server and the response got back from the server that is rendered in the UI.
    </p>

    <p>
    The bottom section has three tabs. You can browse the code used for the working example. There are typically two folders. The "java" folder has the java code while the "resources" folder has the SMART Object annotation(soa) files, the js files and the html used in the working example.

    The setup tab has the JSONs that can be posted to any server to get the sample working. It shows the tenants created and the flows enabled for them to get this working. Download the script from github to setup all the samples at one go. The script works in linux.

    The documentation tab has more details about the sample and how to use the features used in the sample in your flows.
    </p>
    </div>
    <div class="row">
    <?php
        $uitemp->addHeader("Windows");
    ?>
    <p>
    SMART can be easily installed using a single shell command.
    </p>

    <p>
    The top section can be split again into two. The left section is the UI rendering for the feature. This is a bare minimum, written as HTML code with calls made to the server using AJAX calls. The right hand box shows the requests sent to the server and the response got back from the server that is rendered in the UI.
    </p>

    <p>
    The bottom section has three tabs. You can browse the code used for the working example. There are typically two folders. The "java" folder has the java code while the "resources" folder has the SMART Object annotation(soa) files, the js files and the html used in the working example.

    The setup tab has the JSONs that can be posted to any server to get the sample working. It shows the tenants created and the flows enabled for them to get this working. Download the script from github to setup all the samples at one go. The script works in linux.

    The documentation tab has more details about the sample and how to use the features used in the sample in your flows.
    </p>
    </div>
    <?php include("footer.inc") ?>
</body>
</html>