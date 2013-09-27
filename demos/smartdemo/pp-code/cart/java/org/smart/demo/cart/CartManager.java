/**
 * SMART - State Machine ARchiTecture
 *
 * Copyright (C) 2012 Individual contributors as indicated by
 * the @authors tag
 *
 * This file is a part of SMART.
 *
 * SMART is a free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * SMART is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program. If not, see <http://www.gnu.org/licenses/>.
 *
 *
 * */
 
/**
 * ************************************************************
 * HEADERS
 * ************************************************************
 * File:                org.smart.demo.cart.CartManager
 * Author:              rsankar
 * Revision:            1.0
 * Date:                09-19-2013
 *
 * ************************************************************
 * REVISIONS
 * ************************************************************
 * A Manager for the cart
 *
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

