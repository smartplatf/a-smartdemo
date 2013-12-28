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
 * File:                com.smart.blueprints.order.OrderItem
 * Author:              rsankar
 * Revision:            1.0
 * Date:                22-11-2013
 *
 * ************************************************************
 * REVISIONS
 * ************************************************************
 * an item for an order, create when order created
 *
 * ************************************************************
 * */

package com.smart.blueprints.order;

public class OrderItem implements java.io.Serializable
{
    private String orderItemId;
    private String orderId;
    private Object orderItem;
    private int quantity;

    public OrderItem(Order order, Object oi, int no)
    {
        orderId = order.getOrderId();
        orderItemId = orderId + order.incrementAndGetTotalItems();
        orderItem = oi;
        quantity = no;
    }

    public String getOrderItemId() { return orderItemId; }
    public String getOrderId() { return orderId; }
    public Object getOrderItem() { return orderItem; }
    public int getQuantity() { return quantity; }
}

