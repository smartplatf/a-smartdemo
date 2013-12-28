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

    function isdeveloper()
    {
        global $_SESSION;
        return (!empty($_SESSION['developer']));
    }

    function getProfileType($user, $sess)
    {
        $comm = new smartcomm;
        $post = "{'FlowAdmin':{'___smart_action___':'lookup', '___smart_value___':'FxRegistration'},'group':'Profile', 'key':'" . $user . "'}";
        $json = $comm->postSmart('/fixchg/FxRegistration/LookupEvent', $post, $sess);
        $resp = $json->{'responses'};
        if ($resp != null)
        {
            $result = $resp[0]->{'result'};
            if ($result != null)
            {
                $profiletype = $result[0]->{'type'};
                if ($profiletype != null)
                    return $profiletype;
            }
        }

        return "Error";
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

    function loginsmart($user, $pwd)
    {
        return $this->logintenant($user, $pwd, "fixchg");
    }

    function changepwd($identity, $oldpwd, $newpwd)
    {
        global $_SESSION;
        $usr = $_SESSION['user'];
        if ($usr != '')
        {
            $post = "{'SmartUser':{'___smart_action___':'lookup','___smart_value___':'" . $usr . "'}, 'identity':'" . $identity . "', 'credential':'" . $newpwd . "','oldcredential':'" . $oldpwd . "'}";
            $comm = new smartcomm;
            $sess = $_SESSION['sessionId'];
            $tenant = 'fixchg';
            if (!empty($_SESSION['tenant']))
                $tenant = $_SESSION['tenant'];
            $json = $comm->postSmart('/' . $tenant . '/Security/ChangePassword', $post, $sess);
            $resp = $json->{'responses'};
            if ($resp != null)
            {
                $message = $resp[0]->{'message'};
                if ($message != null)
                    return $message;
            }
        }

        return "Error cannot change the password";
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
