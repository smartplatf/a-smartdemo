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
 * File:                com.smart.blueprints.petstore.PetLoader
 * Author:              rsankar
 * Revision:            1.0
 * Date:                11-12-2013
 *
 * ************************************************************
 * REVISIONS
 * ************************************************************
 * A loading function for pets
 *
 * ************************************************************
 * */

package com.smart.blueprints.petstore;

public class PetLoader
{
    public void loadBlueprintPets(LoadPets pets)
        throws Exception
    {
        String[] cmd = { "/bin/sh", "-c", "/home/rsankar/smartplatf/a-smartdemo/blueprints/scripts/setupdata.sh 192.168.1.2 9081 " + pets.getForTenant()};
        Process p = Runtime.getRuntime().exec(cmd); //I am not waiting. Have to see what happens if I do this. :)
        //p.waitFor();
        new LoadStatus();
    }
}

