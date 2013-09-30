/**
 * ************************************************************
 * HEADERS
 * ************************************************************
 * File:                org.smart.demo.contact.Enquire
 *
 * ************************************************************
 * SUMMARY
 * ************************************************************
 * This is part of the SMART demo for Role-based Demo.
 *
 * This is an event class which sets the format for the json input
 * for a service. This class defines the services exposed by the flow
 * to the UI. The name specified for this class is the event in the 
 * URL of the service used.
 *
 * In this demo, this class belongs to ContactFlow flow, hence the
 * URL to trigger this event is:
 * http://server:port/tenant/ContactFlow/Enquire
 *
 * This event expects parameters that are indicated by the member variables
 * of the class. In this case, name, phone, email, message and subject.
 * The event is posted to the Contact object. The expected format for
 * posting using this event is as below:
 *
 * {
 *   "subject": "",
 *   "message": "Test Message",
 *   "name": "Raji Sankar",
 *   "email": "test@t.com",
 *   "phone": "",
 *   "Contact": {
 *     "___smart_action___": "lookup",
 *     "___smart_value___": "Raji"
 *   }
 * }
 *
 * The Contact name has to be the name of the contact to send the email to. The 
 * name, phone, email etc are the data that has to be sent to the contact.
 * The lookup specifies that we lookup a value, this can be a search also. In this case
 * the event is posted to all the objects that match the search criteria specified.
 *
 * ************************************************************
 * */
package org.smart.demo.contact;

public class Enquire implements java.io.Serializable
{
    //Add the data that should be posted into the event here.
    //The posted data will follow the format that is present here.
    //
    private String name;
    private String phone;
    private String email;
    private String message;
    private String subject;
    
    public Enquire()
    {
    }

    /**
     * Accessors to all the values passed in via the event. This is used
     * internally by your transitions and is not a requirement for SMART.
     * */
    public String getName() { return name; }
    public String getPhone() { return phone; }
    public String getEmail() { return email; }
    public String getMessage() { return message; }
    public String getSubject() { return subject; }
    public void setSubject(String sub) { subject = sub; }
}

