<section id="TabElements" class="product-info">
    <ul id="myTab" class="nav nav-tabs">
      <li class="active"><a href="#setupdet" data-toggle="tab">Setup</a></li>
      <li><a href="#codecontainer" data-toggle="tab">Code</a></li>
      <li><a href="#apicalls" data-toggle="tab">Documentation</a></li>
    </ul>
    <div id="myTabContent" class="tab-content">
       <div class="tab-pane fade " id="codecontainer">
        <div class="row-fluid">
        <div class="span4 boxlight">
        <?php
        $file = $uitemp->dir_nav($dirpath);
        ?>
        </div>
        <div class="span8 editor" id="codediv">

        </div>
        </div>
      </div>
      <div class="tab-pane fade active in" id="setupdet">
          <?php include("setup.php") ?>
      </div>
      <div class="tab-pane fade" id="apicalls">
          <?php include("documentation.php") ?>
      </div>
    </div>
</section>