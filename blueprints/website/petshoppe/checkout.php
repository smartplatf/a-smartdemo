<?php include("header.inc") ?>
    <div class="row">
        <div class="span12 post">
            <div class="row-fluid">
                <div class="span12">
                <h2 class="page-header">Payment For <span id="ordernumber">OrderId</span></h2>
                <div class="sidebar-line"><span></span></div>
                    <div class="accordion-group">
                      <div class="accordion-heading">
                        <a class="accordion-toggle" data-toggle="collapse" data-parent="#checkout" href="#collapseTwo">
                          Step 1: Account & Billing Informations
                        </a>
                      </div>
                      <div id="collapseTwo" class="accordion-body collapse in">
                        <div class="accordion-inner">
                              <label for="inputEmail"><span class="required">*</span> Your Personal Details</label>
                              <input class="input-block-level" type="text" placeholder="* Enter your first name" id="inputname" />
                              <input class="input-block-level" placeholder="* Enter your email address" type="text" id="inputemail" />
                              <input class="input-block-level" placeholder="Enter your phone number" type="text" id="inputphone" />
                        </div>
                      </div>
                    </div>
                    <div class="accordion-group">
                      <div class="accordion-heading">
                        <a class="accordion-toggle" data-toggle="collapse" data-parent="#checkout" href="#collapseThree">
                          Step 2: Shipping Informations
                        </a>
                      </div>
                      <div id="collapseThree" class="accordion-body collapse">
                        <div class="accordion-inner">
                              <label for="inputEmail"><span class="required">*</span> Shipping Address Details</label>
                              <input class="input-block-level" type="text" placeholder="* Enter your address #1" id="inputaddress" />
                              <input class="input-block-level" placeholder="Enter your address #2" type="text" id="inputaddress1" />
                              <input class="input-block-level" placeholder="* Enter your city" type="text" id="inputcity" />
                              <input class="input-block-level" placeholder="* Enter your post code" type="text" id="inputcode" />
                                 <label for="inputEmail"><span class="required">*</span> Country / Region / State</label>
                                 <select class="span5" id="inputcountry">
                                <option value="India">India</option>
                                </select>
                                 <select class="span5" id="inputstate">
                                <option value="Karnataka">Karnataka</option>
                                </select>
                        </div>
                      </div>
                    </div>
                    <div class="accordion-group">
                      <div class="accordion-heading">
                        <a class="accordion-toggle" data-toggle="collapse" data-parent="#checkout" href="#collapseFour">
                          Step 3: Payment Methods
                        </a>
                      </div>
                      <div id="collapseFour" class="accordion-body collapse">
                        <div class="accordion-inner">
                            <p>Please select the preferred payment method to use on this order.</p>
                                <label class="checkbox payment-method inline">
                                <input type="checkbox" id="inlineCheckbox1" value="paypal"> PayPal
                                </label>
                                <label class="checkbox payment-method inline">
                                <input type="checkbox" id="inlineCheckbox2" value="creditcard"> Credit Card
                                </label>
                                <label class="checkbox payment-method inline">
                                <input type="checkbox" id="inlineCheckbox3" value="netbanking"> Netbanking
                                </label>
                        </div>
                      </div>
                    </div>
                    <div class="accordion-group">
                      <div class="accordion-heading">
                        <a class="accordion-toggle" data-toggle="collapse" data-parent="#checkout" href="#collapseFive">
                          Step 4: Confirm Your Orders
                        </a>
                      </div>
                      <div id="collapseFive" class="accordion-body collapse">
                        <div class="accordion-inner">
                    <table class="table wishlist table-hover table-bordered">
                      <thead>
                       <tr>
                          <th class="span2">Image</th>
                          <th class="span3">Product Name</th>
                          <th class="span1">Quantity</th>
                          <th class="span3">Price</th>
                        </tr>
                      </thead>
                      <tbody id="cartitems">
                      </tbody>
                        <tfoot>
                          <tr>
                            <td class="price" colspan="3"><b>Total:</b></td>
                            <td class="total" id="ordercost">£77.21</td>
                          </tr>
                        </tfoot>
                    </table>
                        <div class="right">
                            <a href="javascript:payOrder()" class="btn btn-primary btn-general">Pay For Order</a>
                        </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
            </div>
        </div>
    </div>
<?php include("footer.inc")?>
<script>
    $(document).ready(function()
    {
        $('#ordernumber').empty().append('<?php echo $_GET["orderid"]; ?>');
        getOrder('<?php echo $_GET["orderid"]; ?>');
    });

    function payOrder()
    {
        var id = '<?php echo $_GET["orderid"]; ?>';
        pay(id);
    }
</script>