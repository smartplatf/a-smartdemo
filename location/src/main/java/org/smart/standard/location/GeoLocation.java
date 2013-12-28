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
 * File:                org.smart.standard.location.GeoLocation
 * Revision:            1.0
 * Date:                09-09-2013
 *
 * ************************************************************
 * REVISIONS
 * ************************************************************
 * A location to be displayed to the world
 *
 * ************************************************************
 * */

package org.smart.standard.location;

public class GeoLocation implements java.io.Serializable
{
    private String locationId;
    private String reference;

    public GeoLocation(String id, String ref)
    {
        locationId = id;
        reference = ref;
    }

    public String getGeoLocation() { return locationId; }
    public String getReference() { return reference; }
}

