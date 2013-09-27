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

    function dir_nav($dir)
    {
      $file = '';
      $ret = array();
      $exclude_list = array(".", "..");
      $directories = array_diff(scandir($dir), $exclude_list);
      echo "<ul class='tree bullet_arrow2'>";
      foreach($directories as $entry)
      {
        if(is_dir($dir."/".$entry))
        {
          echo "<li><a href='#'> " . $entry . "</a>";
          $thisret = $this->dir_nav($dir."/".$entry);
          if ($file == '')
          {
              $file = $thisret[0];
              $ret = $thisret;
          }
          echo "</li>";
        }
        else
        {
            $ext = pathinfo($entry, PATHINFO_EXTENSION);
            if ($ext == 'soa')
                $ext = 'yaml';
            else if ($ext == 'js')
                $ext = 'javascript';
            if ($file == '')
            {
                $ret = array ($dir . "/" . $entry, $ext);
                $file = $ret[0];
            }
            $script = "javascript:setupcode('" . $dir . "/" . $entry . "', 'codediv', '" . $ext . "')";
            echo "<li><span class='leafnode' onClick=\"" . $script . "\">". $entry . "</span></li>";
        }
      }
      echo "</ul>";
      return $ret;
    }

    function tenant_setup($ten)
    {
        echo "<ul class='tree bullet_arrow2'>";
        echo "<li><a href='#'>" . $ten . "</a>";
        echo "<ul class='tree bullet_arrow2' id='enabledflows'></ul>";
        echo "</li>";
        echo "</ul>";
    }
}
?>
