/**
 * ************************************************************
 * HEADERS
 * ************************************************************
 * File:                org.smart.demo.contact.Enquiry
 *
 * ************************************************************
 * SUMMARY
 * ************************************************************
 * This is part of the SMART demo for Role-based Demo. 
 *
 * This class is a data class that stores data into the database.
 * In SMART data is just a Serializable class. It converts directly
 * into a single table in the database. The members of the class
 * translate to columns in the database. When the members are
 * sub objects, the column names are dereferenced by the member name.
 *
 * The tables are not created until the first data is created in SMART.
 * In SMART all data is stored against a tenant. For the demo, this 
 * class is used by the RoleDemo tenant and deployed as a part of
 * ContactFlow jar. 
 *
 * In the demo when an object of this class is created, the following is
 * the data structure:
 *
 * Table created: __RoleDemo-ContactFlow__Enquiry
 * Columns: column=d:Enquiry.id  - The generated if for this object
 *                 d:Enquiry.name - The name of the contact
 *                 d:Enquiry.email - The email of the contact
 *                 d:Enquiry.phone - The phone provided
 *                 d:Enquiry.subject - The subject
 *                 d:Enquiry.message - the message of the contact
 *                 d:Enquiry.contactedEmail - the contact in the company to whom the email is sent
 *                 d:Enquiry.contactedName - the name of the person to whom email is sent
 *                 d:Enquiry.___smart_currentState___ - Added by SMART and stores the current state
 *                 d:Enquiry.___smart_flow___ - Added by SMART and stores the flow this data belongs to
 *                 d:Enquiry.___smart_legend___ - Added by SMART and has the createdOn, lastModifiedOn values
 *
 * By default SMART adds a synthetic key to this object and reference is stored
 * against this key. The related member variables in the class is stored in appropriate columns.
 * Any column containing null value is not created or stored and only created and stored if it contains a value.
 * A reference to the SMART generated key will be stored against the id member
 * variable.
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

