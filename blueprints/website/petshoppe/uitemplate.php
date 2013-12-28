<?php
class uitemplate
{
    function uitemplate()
    {
    }

    function addbreadcrumb()
    {
    }

    function addHeader($name)
    {
        Echo "<h2 class='widget-title'><span>" . $name . "</span></h2>";
        Echo "<div class='sidebar-line'><span></span></div>";
    }

    function notloggedin()
    {
        global $_SESSION;
        if (!empty($_SESSION["user"]))
        {
            header("Location: index.php");
        }
    }

    function addMessageSpace()
    {
        global $_GET;
        Echo "<div ><span class='badge badge-important' id='messagespace' name='messagespace'>" . $_GET['msg'] . "</span></div>";
    }

    function currentuser()
    {
        global $_SESSION;
        return $_SESSION['user'];
    }

    function popupheader($title, $divname, $call )
    {
        Echo '<div class="boxhead">';
        Echo '<div class="left span3">';
        Echo '<h2>' . $title . '</h2>';
        Echo '</div>';
        Echo '<div class="right">';
        Echo '<div id="wdt-links">';
        Echo '<ul>';
        Echo '<li class="register"><a href="javascript:hideBox($(\'#' . $divname . '\'));' . $call . ';"><i class="icon-remove"></i></a></li>';
        Echo '</ul>';
        Echo '</div>';
        Echo '</div>';
        Echo '</div>';
    }
}
?>
