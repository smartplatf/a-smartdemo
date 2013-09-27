<?php
$scripts = $setup->getRequestDemoSetup();
?>
<script>
    var setupparms = [];
<?php
$cnt = 0;
foreach ($scripts as &$one)
{
   echo 'setupparms["' . $cnt . '"] = {};';
   echo 'setupparms["' . $cnt . '"]["title"]="' . $one['title'] . '";';
   echo 'setupparms["' . $cnt . '"]["uri"]="' . $one['uri'] . '";';
   echo 'setupparms["' . $cnt . '"]["data"]=' . $one['data'] . ';';
   echo 'setupparms["' . $cnt . '"]["comments"]="' . $one['comments'] . '";';
   $cnt++;
}
?>
</script>
<div class='row-fluid'>
<div class="span4">
<div class="single-review boxlight">
<h5>Setup Steps</h5>
<ul class='bullet_arrow2'>
<?php
$cnt = 0;
foreach ($scripts as &$one)
{
?>
<li>
<a href='javascript:showsetup("<?php echo $cnt; ?>");'>
<?php echo ' ' . $one['title']; ?></a>
</li>
<?php
$cnt++;
}
?>
</ul>
</div>
<div class="single-review boxlight" id='tenants'>
<h5>Tenants</h5>
<?php
  $uitemp->tenant_setup($tenant);
?>
</div>
</div>
<div class="span7">
    <h5 id='posttitle'></h5>
    <h5>URI</h5>
    <pre id='posturi'></pre>
    <h5>Data</h5>
    <pre id='postdata'></pre>
    <h5>Comments</h5>
    <pre id='postcomments'></pre>
    </div>
</div>