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
 * File:                com.smart.blueprints.payment.Payment
 * Revision:            1.0
 * Date:                09-09-2013
 *
 * ************************************************************
 * REVISIONS
 * ************************************************************
 * A payment to be displayed to the world
 *
 * ************************************************************
 * */

package com.smart.blueprints.payment;

public class Payment implements java.io.Serializable
{
    private String paymentId;
    private String profileId;
    private Address shipTo;
    private String name;
    private String email;
    private String phone;
    private Object orderId;
    private double totalPrice;
    private String payBy;

    public Payment(Object oid, double price)
    {
        paymentId = oid.toString() + "payment";
        orderId = oid;
        totalPrice = price;
    }

    public void setShipTo(Address a) { shipTo = a; }
    public void setDetails(String n, String e, String p, String pay) 
    {
        name = n;
        email = e;
        phone = p;
        payBy = pay;
    }

    public String getPaymentId() { return paymentId; }
    public Address getShippingAddress() { return shipTo; }
    public String getName() { return name; }
}

