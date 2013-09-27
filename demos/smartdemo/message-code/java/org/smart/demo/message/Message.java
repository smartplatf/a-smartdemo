/**
 * ************************************************************
 * HEADERS
 * ************************************************************
 * File:                org.smart.demo.message.Message
 *
 * ************************************************************
 * SUMMARY
 * ************************************************************
 * This is part of the SMART demo for Basic Demo. 
 *
 * This class is a data class that stores data into the database.
 * In SMART data is just a Serializable class. It converts directly
 * into a single table in the database. The members of the class
 * translate to columns in the database. When the members are
 * sub objects, the column names are dereferenced by the member name.
 *
 * The tables are not created until the first data is created in SMART.
 * In SMART all data is stored against a tenant. For the demo, this 
 * class is used by the BasicDemo tenant and deployed as a part of
 * MessageFlow jar. 
 *
 * In the demo when an object of this class is created, the following is
 * the data structure:
 *
 * Table created: __BasicDemo-MessageFlow__Message
 * Columns: column=d:Message.message  - This will contain the data in the current object
 *                 d:Message.___smart_currentState___ - Added by SMART and stores the current state
 *                 d:Message.___smart_flow___ - Added by SMART and stores the flow this data belongs to
 *                 d:Message.___smart_legend___ - Added by SMART and has the createdOn, lastModifiedOn values
 *
 * By default SMART adds a synthetic key to this object and reference is stored
 * against this key. The message member variable is created as a key for this object
 * A reference to the SMART generated key will be stored against the message member
 * variable.
 *
 * ************************************************************
 * */

package org.smart.demo.message;

public class Message implements java.io.Serializable
{
    //A member variable to store the Hello World message and display back
    private String message;

    public Message()
    {
    }

    /**
     * An access for the message member variable. 
     * Since this object is created using the standard CreatePrime event, a setter is not required 
     * for this field and is setup using reflect when the event is posted. If the data is created
     * using other methods, please do add the appropriate setter methods or logic.
     * */
    public String getMessage() { return message; }
}

