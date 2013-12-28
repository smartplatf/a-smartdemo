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
 * File:                org.smart.standard.location.Locations
 * Author:              rsankar
 * Revision:            1.0
 * Date:                15-11-2013
 *
 * ************************************************************
 * REVISIONS
 * ************************************************************
 * A set of locations returned as response
 *
 * ************************************************************
 * */

package org.smart.standard.location;

import java.util.Map;
import java.util.List;
import java.util.ArrayList;

public class Locations implements java.io.Serializable
{
    public class Location
    {
        private String latitude;
        private String longitude;
        private String reference;
        private String description;
        private String mapurl;
    }

    private List<Location> locations;

    public Locations()
    {
        locations = new ArrayList<Location>();
    }

    public Locations(Map output)
    {
        //here we assume the output in the format as from SMART
        locations = new ArrayList<Location>();
        List lst = (List)output.get("locations");
        for (int i = 0; i < lst.size(); i++)
        {
            Map m = (Map)lst.get(i);
            String ref = (String)m.get("reference");
            String desc = (String)m.get("description");
            addLocation(desc, ref);
        }
    }

    void addLocation(String desc, String ref)
    {
        Location l = new Location();
        l.description = desc;
        l.reference = ref;
        locations.add(l);
    }
}

