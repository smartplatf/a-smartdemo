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
    <h5>
    Preparation
    </h5>
    <div class="bullet_arrow3">
    <ul>
        <li>Edit /etc/hosts file. Add to this the ip address of your machine and map it to the name hadoop.
        <pre>
        For eg.,
        192.168.1.4    hadoop
        127.0.0.1 localhost
        127.0.0.1 platform-dev-debian
        </pre>
        </li>
        <li>Create a user for SMART using the command
        <pre>
            useradd -m -d /home/smartuser smartuser
            passwd smartuser - enter the password to setup the password.
         </pre>
        </li>
        <li>login as smartuser</li>
        <li>Setup the JAVA_HOME to the correct java home.</li>
    </ul>
    </div>
    <h5>
    Installation
    </h5>
    <div class="bullet_arrow3">
    <ul>
        <li>Run the command "curl http://fixchg.com/installweb.sh | sh"</li>
    </ul>
    <p>Check out manual installation and service installation steps at:
    <a target="_blank" href="https://github.com/smartplatf/a-smart/blob/master/sm.kernel/src/main/resources/README">github</a>
    </p>
    </div>
    </div>
    <div class="row">
    <?php
        $uitemp->addHeader("Windows");
    ?>
    <h5>
    Preparation
    </h5>
    <div class="bullet_arrow3">
    <ul>
        <li>Start Powershell in administration mode. The Powershell version should be 3 or greater.</li>
        <li>mkdir smartinstall (Or the directory you want install in)</li>
        <li>cd smartinstall</li>
        <li>Setup the JAVA_HOME to the correct java home and ensure java is in the path.</li>
    </ul>
    </div>
    <h5>
    Installation
    </h5>
    <div class="bullet_arrow3">
    <ul>
        <li>Run the command "Invoke-RestMethod http://fixchg.com/installweb.ps1 -OutFile installweb.ps1;./installweb.ps1"</li>
    </ul>
    </div>
    </div>
    <?php include("footer.inc") ?>
</body>
</html>