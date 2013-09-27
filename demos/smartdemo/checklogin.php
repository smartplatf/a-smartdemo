<?php
include("smartcomm.php");
include("userlogin.php");
session_start();
function is_user_logged_in()
{
    return !empty($_SESSION['user']); // it is a boolean value, which should be set TRUE by the login function
}

$inTenant = $_POST['tenant'];
$tenant = $_POST['tenant'];

if ( $inTenant != '' )
{
    $user = $inTenant . "admin";
    $pwd = $inTenant . "admin";
    $smart = new userlogin;
    $sessionid = $smart->logintenant($user, $pwd, $tenant);
    if ($sessionid != 'Error')
    {
        session_start();
        $_SESSION['user'] = $user;
        $_SESSION['sessionId'] = $sessionid;
        $_SESSION['tenant'] = $tenant;
        echo $sessionid;
    }
    else
    {
        echo 'Wrong User/Password';
    }
}
else
{
    $user = $_POST['user'];
    $pwd = $_POST['password'];
    $tenant = $_SESSION['tenant'];

    if ($user != '')
    {
        $smart = new userlogin;
        $sessionid = $smart->logintenant($user, $pwd, $tenant);
        if ($sessionid != 'Error')
            echo $sessionid;
        else
            echo 'Error';
    }
}
?>