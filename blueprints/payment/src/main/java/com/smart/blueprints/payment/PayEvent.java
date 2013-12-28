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
 * File:                com.smart.blueprints.payment.PayEvent
 * Author:              rsankar
 * Revision:            1.0
 * Date:                24-11-2013
 *
 * ************************************************************
 * REVISIONS
 * ************************************************************
 * an event to pay a bill
 *
 * ************************************************************
 * */

package com.smart.blueprints.payment;

public class PayEvent implements java.io.Serializable
{
    private String name;
    private String email;
    private String phone;
    private String addr1;
    private String addr2;
    private String city;
    private String state;
    private String country;
    private String pincode;
    private String payBy;

    public PayEvent()
    {
    }

    public Payment createPayment(Object orderId, double price)
    {
        Payment p = new Payment(orderId, price);
        Address a = new Address(addr1, addr2, city, state, country, pincode);
        p.setShipTo(a);
        p.setDetails(name, email, phone, payBy);
        return p;
    }
}

