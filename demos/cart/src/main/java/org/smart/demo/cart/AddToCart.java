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
 * File:                org.smart.demo.cart.AddToCart
 * Author:              rsankar
 * Revision:            1.0
 * Date:                09-19-2013
 *
 * ************************************************************
 * REVISIONS
 * ************************************************************
 * An event to add cart items
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

