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
 * File:                com.smart.blueprints.order.OrderManager
 * Author:              rsankar
 * Revision:            1.0
 * Date:                22-11-2013
 *
 * ************************************************************
 * REVISIONS
 * ************************************************************
 * An order manager 
 *
 * ************************************************************
 * */

package com.smart.blueprints.order;

import java.util.List;
import java.util.ArrayList;

public class OrderManager
{
    public OrderManager()
    {
    }

    public void createOrder(Object createFrom, List<Object> items, double totalCost)
        throws Exception
    {
        String orderId = createFrom + "Order";
        Order order = new Order(orderId, createFrom, totalCost);
        if ((items == null) || (items.size() <= 0))
            throw new Exception("Cannot create order for null Items. " + createFrom);
        for (int i = 0; i < items.size(); i++)
        {
            if (items.get(i) == null)
                throw new Exception("Cannot add a null order item.");

            OrderItem item = new OrderItem(order, items.get(i), 1);
        }

        new OrderStatus("Created Order " + orderId, orderId);
    }

    public void getOrderDetails(GetOrder event, List<OrderItem> items, Order order)
        throws Exception
    {
        List<Object> aitems = new ArrayList<Object>();
        for (int i = 0; i < items.size(); i++)
        {
            if (items.get(i).getOrderItem() != null)
                aitems.add(items.get(i).getOrderItem());
        }

        OrderDetails det = new OrderDetails(order.getCreatedFrom(), order.getTotalItems(), aitems, order.getTotalPrice());
    }
}

