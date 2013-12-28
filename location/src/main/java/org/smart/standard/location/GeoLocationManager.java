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
 * File:                org.smart.standard.location.GeoLocationManager
 * Author:              rsankar
 * Revision:            1.0
 * Date:                15-11-2013
 *
 * ************************************************************
 * REVISIONS
 * ************************************************************
 * A manager for locations
 *
 * ************************************************************
 * */

package org.smart.standard.location;

import java.util.Map;
import java.util.HashMap;

public class GeoLocationManager
{
    public GeoLocationManager()
    {
    }

    public void getAutoComplete(AutoCompleteLocation event)
        throws Exception
    {
        Map m = new HashMap();
        event.setMap(m);
    }

    public void createAutoCompleteResponse(AutoCompleteLocation event)
        throws Exception
    {
        Map lmap = event.getLocations();
        Locations locs = new Locations(lmap);
    }

    public void setupAddPlace(CreateLocation loc)
        throws Exception
    {
        Map add = new HashMap();
        loc.setAddPlace(add);
    }

    public void createLocation(CreateLocation loc)
        throws Exception
    {
        String ref = loc.getAddedPlace();
        if (ref == null)
            throw new Exception("Place has not been added to google. Please add, before calling this.");
        GeoLocation l = new GeoLocation(loc.getName(), ref);
        new LocationStatus("Created " + loc.getName());
    }

    public void setupPlaces(SearchNear near)
        throws Exception
    {
        Map m = new HashMap();
        near.setPlaces(m);
    }

    public void setupLocation(SearchNear near)
        throws Exception
    {
        near.setLocations();
    }

    public void getLocations(SearchNear near, GeoLocation loc)
        throws Exception
    {
        //TODO: change to a list of loc instead of one once search parameter is fixed.
        SearchedLocations locs = new SearchedLocations();
        if (loc != null)
            locs.addGeoLocation(loc);
    }
}

