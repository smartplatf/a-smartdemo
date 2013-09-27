<?php
class userlogin
{
    function userlogin()
    {
    }

    function notloggedin()
    {
        global $_SESSION;
        if (!empty($_SESSION["user"]))
        {
            header("Location: index.php");
        }
    }

    function loggedin()
    {
        global $_SESSION;
        return (!empty($_SESSION["user"]));
    }

    function logintenant($user, $pwd, $tenant)
    {
        $post = "{'FlowAdmin':{'___smart_action___':'lookup', '___smart_value___':'Security'},'identity':'" . $user . "', 'password':'" . $pwd . "', 'type':'custom'}";
        $comm = new smartcomm;
        $json = $comm->postSmart('/' . $tenant . '/Security/Authenticate', $post, '');
        $resp = $json->{'responses'};
        if ($resp != null)
        {
            $sess = $resp[0]->{'sessionId'};
            if ($sess != null)
            {
                return $sess;
            }
        }

        return 'Error';
    }

    function logout()
    {
        global $_SESSION;
        $sess = $_SESSION['sessionId'];
        if ($sess != '')
        {
            $post = "{'Session':{'___smart_action___':'lookup', '___smart_value___':'" . $sess . "','___key_type___':'java.util.UUID'}}";
            $comm = new smartcomm;
            $tenant = 'fixchg';
            if (!empty($_SESSION['tenant']))
                $tenant = $_SESSION['tenant'];
            $json = $comm->postSmart('/' . $tenant . '/Security/Logout', $post, $sess);
            $resp = $json->{'responses'};
            if ($resp != null)
            {
                $message = $resp[0]->{'message'};
                if ($message != null)
                    return $message;
            }
        }

        return "Error logging out";
    }
}
?>
