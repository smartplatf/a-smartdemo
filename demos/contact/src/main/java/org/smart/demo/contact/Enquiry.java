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
 * File:                org.smart.demo.contact.Enquiry
 * Revision:            1.0
 * Date:                05-09-2013
 *
 * ************************************************************
 * REVISIONS
 * ************************************************************
 * A contact notification turns to an enquiry
 *
 * ************************************************************
 * */

package org.smart.demo.contact;

import java.util.UUID;

public class Enquiry implements java.io.Serializable
{
    private UUID id;
    private String name;
    private String email;
    private String phone;
    private String subject;
    private String message;
    private String contactedEmail;
    private String contactedName;

    public Enquiry(String nm, String em, String ph, String sub, String msg, String cemail, String cname)
    {
        id = UUID.randomUUID();
        name = nm;
        email = em;
        phone = ph;
        subject = sub;
        message = msg;
        contactedEmail = cemail;
        contactedName = cname;
    }
}

