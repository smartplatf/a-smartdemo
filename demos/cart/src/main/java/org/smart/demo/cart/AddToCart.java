/**
 * ************************************************************
 * HEADERS
 * ************************************************************
 * File:                org.smart.demo.cart.AddToCart
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
 * http://server:port/tenant/CartFlow/AddToCart
 *
 * This event expects parameters that are indicated by the member variables
 * of the class. Here we need just the cartItem which is a mashed up item.
 * The event is posted to the Cart Object. 
 *
 * The expected format for posting using this event is as below:
 *
 * {
 *   "cartItem": "125",
 *   "Cart": {
 *     "___smart_action___": "lookup",
 *     "___smart_value___": "cart1381204430010"
 *   }
 * }
 * 
 * In the demo we have mashed up the CartFlow with the Catalogue flow hence
 * we pass the Catalogue's primary key as the cartItem in the event. THis is
 * posted to the Cart object and hence the value needs to be the cart's name.
 *
 * ************************************************************
 * */

package org.smart.demo.cart;

public class AddToCart implements java.io.Serializable
{
    //Add the data that should be posted into the event here.
    //The posted data will follow the format that is present here.
    private Object cartItem;

    public AddToCart()
    {
    }

    public Object getCartItem()
    {
        return cartItem;
    }
}

