/**
 * ************************************************************
 * HEADERS
 * ************************************************************
 * File:                org.smart.demo.contact.Contact
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
 * Table created: __RoleDemo-ContactFlow__Contact
 * Columns: column=d:Contact.contactName  - This will contain the data in contactName variable
 *                 d:Contact.street - street value
 *                 d:Contact.city - City value
 *                 d:Contact.pincode - pincode value
 *                 d:Contact.state - state value
 *                 d:Contact.email - email value
 *                 d:Contact.___smart_currentState___ - Added by SMART and stores the current state
 *                 d:Contact.___smart_flow___ - Added by SMART and stores the flow this data belongs to
 *                 d:Contact.___smart_legend___ - Added by SMART and has the createdOn, lastModifiedOn values
 *
 * By default SMART adds a synthetic key to this object and reference is stored
 * against this key. The contactName, street, city, pincode, state and email will store
 * the values for each of this fields. Optional fields will not be present unless they contain value.
 * A reference to the SMART generated key will be stored against the contactName member
 * variable since this is the key of this object.
 *
 * ************************************************************
 * */

package org.smart.demo.contact;

public class Contact implements java.io.Serializable
{
    //This is an automatically generated key for referencing
    //your object. If you change this, be sure to change the
    //corresponding .soa file also.
    
    private String contactName;

    //Add your data fields here. This will be stored and
    //retrieved back when this data is created and updated.
    //Creating a member as transient will not save the data.
    private String street;
    private String city;
    private String state;
    private String pincode;
    private String email;


    public Contact()
    {
    }

    public String getContactName() { return contactName; }
    public String getStreet() { return street; }
    public String getCity() { return city; }
    public String getState() { return state; }
    public String getPinCode() { return pincode; }
    public String getEmail() { return email; }
}

