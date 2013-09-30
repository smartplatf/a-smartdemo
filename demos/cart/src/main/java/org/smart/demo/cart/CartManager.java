/**
 * ************************************************************
 * HEADERS
 * ************************************************************
 * File:                org.smart.demo.cart.CartManager
 *
 * ************************************************************
 * SUMMARY
 * ************************************************************
 * This is part of the SMART demo for Plug and Play Demo.
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

package org.smart.demo.cart;

import java.util.List;

public class CartManager
{
    public void addToCart(AddToCart evt, Cart data)
        throws Exception
    {
        //Add your code to process the event here.
        //data is the data to which the event is posted
        //evt is the event posted.
        
        CartItem item = new CartItem(data.getCartName());
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
}

