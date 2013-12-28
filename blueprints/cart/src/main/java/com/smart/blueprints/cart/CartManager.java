/**
 * ************************************************************
 * HEADERS
 * ************************************************************
 * File:                com.smart.blueprints.cart.CartManager
 *
 * ************************************************************
 * SUMMARY
 * ************************************************************
 * This is part of the SMART petstore blueprint.
 *
 * This class contains the functions that has to be executed when
 * and event occurs. This is called transitions. When the AddToCart
 * event is called, we create the CartItem object for the cartName
 * to which this item is added. Since the CartItem is linked to an
 * actual object, the actual object is populated by SMART.
 *
 * The removeFromCart is called when the RemoveFromCart event is
 * raised. Since this needs to do nothing other than change the
 * state of the CartItem to an inactive state, this function does
 * nothing. SMART takes care of changing the state of the item.
 *
 * The getCartItems is called when GetCartItems event is called. The
 * list all of standard SMART is used to only retrieve standard objects.
 * THis event retrieves the items in a specific cart. This showcases
 * how a linked object can be accepted as a input parameter for a 
 * function. This has to be a explicit parameter that is specified in
 * the soa file.
 * ************************************************************
 * */

package com.smart.blueprints.cart;

import java.util.List;
import java.util.ArrayList;

public class CartManager
{
    public void addToCart(AddToCart evt, Cart data, Double cost)
        throws Exception
    {
        //Add your code to process the event here.
        //data is the data to which the event is posted
        //evt is the event posted.
        
        if (cost == null)
            cost = 0.0;
        CartItem item = new CartItem(data.getCartName(), cost);
        data.addItem(item);
        StatusMessage msg = new StatusMessage("Added item to cart: " + data.getCartName());
    }

    public void removeFromCart(RemoveFromCart evt, CartItem data)
        throws Exception
    {
        //shd be a straight forward change in state of the item
    }

    public void getCartItems(GetCartItems evt, Cart cart, List<CartItem> items)
        throws Exception
    {
        CartDetails det = new CartDetails(cart, items);
    }

    public void checkoutItems(CheckOut event, Cart cart, List<CartItem> items)
        throws Exception
    {
        List<Object> cItems = new ArrayList<Object>();
        if ((items == null) || (items.size() <= 0))
            throw new Exception("No Items in the cart to checkout.");

        for (int i = 0; (items != null) && (i < items.size()); i++)
        {
            cItems.add(items.get(i).getActualItem());
        }
        event.setCartItems(cItems);
        //assumption is that the response is sent via the service, if not setup
        //there is no response for this service?
        //StatusMessage msg = new StatusMessage("Checked out: " + cart.getCartName());
    }
}

