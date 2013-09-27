<?php
$doc = $setup->getRequestDocumentation();
$firstdoc = $doc[0];
?>
<div class='row-fluid'>
<div class="span4">
    <div class="single-review boxlight">
    <h5>Events Used in Demo</h5>
    <ul class='bullet_arrow2'>
    <?php
    $arrlength = count($doc);
    for($x = 0; $x < $arrlength; $x++)
    {
    ?>
    <li>
    <a href='javascript:showdoc("<?php echo $doc[$x]; ?>");'>
    <?php echo ' ' . $doc[$x]; ?></a>
    </li>
    <?php
    }
    ?>
    </ul>
    </div>
</div>
<div class="span8" id="eventdet">

</div>
</div>