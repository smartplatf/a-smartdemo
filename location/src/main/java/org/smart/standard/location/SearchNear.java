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
 * File:                org.smart.standard.location.SearchNear
 * Author:              rsankar
 * Revision:            1.0
 * Date:                15-11-2013
 *
 * ************************************************************
 * REVISIONS
 * ************************************************************
 * Search locations near
 *
 * ************************************************************
 * */

package org.smart.standard.location;

import java.util.Map;
import java.util.List;

public class SearchNear implements java.io.Serializable
{
    private double latitude;
    private double longitude;
    private int radius;

    private Map _places;
    private List _locations;
    private String _onelocation; //This is just a test, need to fix search to get a list

    public SearchNear()
    {
    }

    public double getLatitude() { return latitude; }
    public double getLongitude() { return longitude; }

    public void setPlaces(Map places) { _places = places; }
    public void setLocations()
    {
        if (_places != null)
            _locations = (List)_places.get("locations");

        if ((_locations != null) && (_locations.size() > 0))
            _onelocation = (String)_locations.get(0);
    }
}

