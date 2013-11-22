/**
 * ************************************************************
 * HEADERS
 * ************************************************************
 * File:                com.smart.blueprints.cart.GetCartItems
 *
 * ************************************************************
 * SUMMARY
 * ************************************************************
 * This is part of the SMART petstore blueprint.
 *
 * This is an event class which sets the format for the json input
 * for a service. This class defines the services exposed by the flow
 * to the UI. The name specified for this class is the event in the 
 * URL of the service used.
 *
 * In this demo, this class belongs to CartFlow flow, hence the
 * URL to trigger this event is:
 * http://server:port/tenant/CartFlow/GetCartItems
 *
 * This event expects parameters that are indicated by the member variables
 * of the class. Here we do not expect any parameters since it is already
 * posted to the cart for which data has to be retrieved.
 *
 * The expected format for posting using this event is as below:
 *
 * {
 *   "Cart": {
 *     "___smart_action___": "lookup",
 *     "___smart_value___": "cart1381204430010"
 *   }
 * }
 * 
 *
 * ************************************************************
 * */

package com.smart.blueprints.cart;

public class GetCartItems implements java.io.Serializable
{
    public GetCartItems()
    {
    }
}

