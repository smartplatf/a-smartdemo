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
 * File:                com.smart.blueprints.petstore.PetAnimal
 * Revision:            1.0
 * Date:                09-09-2013
 *
 * ************************************************************
 * REVISIONS
 * ************************************************************
 * A petstore to be displayed to the world
 *
 * ************************************************************
 * */

package com.smart.blueprints.petstore;

public class PetAnimal implements java.io.Serializable
{
    private String id;
    private String category;
    private String type;
    private String name;
    private double price;
    private String description;
    private String availability;
    private String imageURL;

    public PetAnimal()
    {
    }

    public String getId() { return id; }
    public String getCategory() { return category; }
    public String getName() { return name; }
    public double getPrice() { return price; }
    public String getDescription() { return description; }
    public String getAvailability() { return availability; }
    public String getImageURL() { return imageURL; }
}

