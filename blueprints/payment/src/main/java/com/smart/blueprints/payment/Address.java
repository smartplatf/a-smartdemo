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
 * File:                com.smart.blueprints.payment.Address
 * Author:              rsankar
 * Revision:            1.0
 * Date:                24-11-2013
 *
 * ************************************************************
 * REVISIONS
 * ************************************************************
 * A representation of address
 *
 * ************************************************************
 * */

package com.smart.blueprints.payment;

public class Address implements java.io.Serializable
{
    private String address1;
    private String address2;
    private String city;
    private String state;
    private String country;
    private String pincode;

    public Address(String a1, String a2, String c, String s, String con, String pin)
    {
        address1 = a1;
        address2 = a2;
        city = c;
        state = s;
        country = con;
        pincode = pin;
    }

    public String getAddress1() { return address1; }
    public String getAddress2() { return address2; }
    public String getCity() { return city; }
    public String getState() { return state; }
    public String getCountry() { return country; }
    public String getPinCode() { return pincode; }
}

