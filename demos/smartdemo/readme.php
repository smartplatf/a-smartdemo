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
    <?php
        $uitemp->addHeader("Information");
    ?>
    <p>
    The Demos are working examples of the different features present in SMART platform. Below shows the different sections and the information shown in each section. Click on the Demo link to see the demos.
    </p>

    <div class="span12 post">
        <div class="runsample">
            <?php
                $uitemp->addHeader("Title of the demo");
            ?>
            <div class="span12">
                <p>A small description of what is present in the sample and how to run the sample.</p>
            </div>
            <div class="row-fluid">
            <div class="span6 boxlight">
                This section contains a skeleton UI for running the sample. This is pure HTML which makes AJAX calls to the server using jquery.
            </div>
            <div class="span6">
                <div class=" editor" id="jsondiv">
                </div>
            </div>
            </div>
        </div>
    </div>
    <section id="TabElements" class="product-info">
        <ul id="myTab" class="nav nav-tabs">
          <li class="active"><a href="#setupdet" data-toggle="tab">Setup</a></li>
          <li><a href="#codecontainer" data-toggle="tab">Code</a></li>
          <li><a href="#apicalls" data-toggle="tab">Documentation</a></li>
        </ul>
        <div id="myTabContent" class="tab-content">
           <div class="tab-pane fade" id="codecontainer">
            <div class="row-fluid">
            <div class="span4 boxlight">
                This section contains the tree of the code that is used in this sample. Click on the file names to browse the code. There are on a broad level java, soa (SMART object annotations), js and html files. The java and soa files are compiled into jar files and deployed into SMART. The js and html files are used in the UI.
            </div>
            <div class="span8 editor" id="codediv">

            </div>
            </div>
          </div>
          <div class="tab-pane fade active in" id="setupdet">
            <div class='row-fluid'>
            <div class="span4">
            <div class="single-review boxlight">
            <h5>Setup Steps</h5>
            <p>List the steps that needs to be run to setup to run this demo. Clicking on the step to get the data and URI to post the data to.</p>
            </div>
            <div class="single-review boxlight">
            <h5>Tenants</h5>
            <p>Lists the tenants created to run this demo and the flows that are enabled for each tenant.</p>
            </div>
            </div>
            <div class="span7">
                <h5 id='posttitle'>Shows the step name</h5>
                <h5>URI</h5>
                <pre id='posturi'>Shows the URI to post the data</pre>
                <h5>Data</h5>
                <pre id='postdata'>Shows the Data to be posted. Replace the required data as indicated.</pre>
                <h5>Comments</h5>
                <pre id='postcomments'>Shows Comments if any and explains what we are running.</pre>
                </div>
            </div>
          </div>
          <div class="tab-pane fade" id="apicalls">
            <div class='row-fluid'>
            <div class="span4">
                <div class="single-review boxlight">
                <p>Shows a list of the events used in the current demo. Click on each event to read more details about it.</p>
                </div>
            </div>
            <div class="span8" id="eventdet">
                <blockquote>
                <table class="table wishlist table-bordered">
                <thead>
                <th><h6>Event Name</h6></th>
                <th><h6>Flow</h6></th>
                <th><h6>URI Format</h6></th>
                <th><h6>Raised on Object</h6></th>
                </thead>
                <tbody>
                <tr>
                <td>Name of the event</td>
                <td>The flow the event belongs to</td>
                <td>The URI on which the event is raised</td>
                <td>Event is always raised on a prime data. This shows which prime data this event is raised on.</td>
                </tr>
                </tbody>
                </table>
                </blockquote>
                <h6>Summary</h6>
                <blockquote>A brief summary of the event</blockquote>
                <h6>Request Format</h6>
                <pre>
                The request format in json
                </pre>
                <h6>Request Description</h6>
                <blockquote>
                <table class="table wishlist table-bordered table-striped">
                <thead>
                <th class='span2'><h6>Name</h6></th>
                <th class='span2'><h6>Value</h6></th>
                <th class='span6'><h6>Description</h6></th>
                </thead>
                <tbody>
                <tr>
                <td>name in json</td>
                <td>required value in json</td>
                <td>A description for the value</td>
                </tr>
                </tbody>
                </table>
                </blockquote>
                <h6>Response Format</h6>
                <pre>
                The response or responses that will be sent back for the request
                </pre>
                <h6>Response Description</h6>
                <blockquote>
                <table class="table wishlist table-bordered table-striped">
                <thead>
                <th class='span2'><h6>Name</h6></th>
                <th class='span2'><h6>Value</h6></th>
                <th class='span6'><h6>Description</h6></th>
                </thead>
                <tbody>
                <tr>
                <td>name in json</td>
                <td>the value this indicates</td>
                <td>A description for the value</td>
                </tr>
                </tbody>
                </table>
                </blockquote>
                </div>
            </div>
         </div>
        </div>
    </section>
    <?php include("footer.inc") ?>
    <script>
        var editor = ace.edit('jsondiv');
        editor.setTheme("ace/theme/textmate");
        editor.getSession().setMode("ace/mode/text");
        editor.setReadOnly(true);
        editor.setValue("This section will get updated as you run the sample. This shows the requests sent and the responses returned from the server. The request also shows the URL to which the data was posted. Data is posted in the JSON format.");

        var editor = ace.edit('codediv');
        editor.setTheme("ace/theme/textmate");
        editor.getSession().setMode("ace/mode/text");
        editor.setReadOnly(true);
        editor.setValue("This section will shows the code of the file clicked on from the code tree.");

    </script>
</body>
</html>
