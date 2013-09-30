/**
 * ************************************************************
 * HEADERS
 * ************************************************************
 * File:                org.smart.demo.cart.RemoveFromCart
 *
 * ************************************************************
 * SUMMARY
 * ************************************************************
 * This is part of the SMART demo for Plug and Play Demo.
 *
 * This is an event class which sets the format for the json input
 * for a service. This class defines the services exposed by the flow
 * to the UI. The name specified for this class is the event in the 
 * URL of the service used.
 *
 * In this demo, this class belongs to CartFlow flow, hence the
 * URL to trigger this event is:
 * http://server:port/tenant/CartFlow/RemoveFromCart
 *
 * This event expects parameters that are indicated by the member variables
 * of the class. Here do not need any parameters since it is posted to the
 * cart item that has to be removed.
 *
 * The expected format for posting using this event is as below:
 *
 * {
 *   "CartItem": {
 *     "___smart_action___": "lookup",
 *     "___smart_value___": "item id"
 *   }
 * }
 * 
 *
 * ************************************************************
 * */

package org.smart.demo.cart;

public class RemoveFromCart implements java.io.Serializable
{
    public RemoveFromCart()
    {
    }
}

