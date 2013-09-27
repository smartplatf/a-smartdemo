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
 * File:                org.smart.demo.cart.CartDetails
 * Author:              rsankar
 * Revision:            1.0
 * Date:                19-09-2013
 *
 * ************************************************************
 * REVISIONS
 * ************************************************************
 * A set of details of the cart sent out
 *
 * ************************************************************
 * */

package org.smart.demo.cart;

import java.util.List;
import java.util.ArrayList;

public class CartDetails implements java.io.Serializable
{
    private String cartName;
    private int totalItems;
    private List<CartItem> items;

    public CartDetails(Cart cart, List<CartItem> lst)
    {
        cartName = cart.getCartName();
        totalItems = cart.getTotalItems();
        items = new ArrayList<CartItem>();
        for (int i = 0; i < lst.size(); i++)
            items.add(lst.get(i));
    }
}

