/**
 * Demo - A demo for using the SMART platform
 *
 * Copyright (C) 2012 Individual contributors as indicated by
 * the @authors tag
 *
 * This file is a part of Utilities.
 *
 * Utilities is a free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * Utilities is distributed in the hope that it will be useful,
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
 * File:                org.smart.demo.catalogue.Product
 * Author:              rsankar
 * Revision:            1.0
 * Date:                17-04-2013
 *
 * ************************************************************
 * REVISIONS
 * ************************************************************
 * An item stored in a catague for which survey can be done
 *
 * ************************************************************
 * */

package org.smart.demo.catalogue;

public class Product implements java.io.Serializable
{
    private String skuId;
    private String skuType;
    private int availCount;
    private String specification;
    private long price;
    private String manufacturer;
    private String category;

    public Product()
    {
    }

    public String getSkuId() { return skuId; }
    public String getSkuType() { return skuType; }
    public int getAvailable() { return availCount; }
    public String getSpecification() { return specification; }
    public long getPrice() { return price; }
    public String getManufacturer() { return manufacturer; }
    public String getCategory() { return category; }
}

