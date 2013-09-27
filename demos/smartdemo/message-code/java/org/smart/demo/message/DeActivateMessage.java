/**
 * ************************************************************
 * HEADERS
 * ************************************************************
 * File:                org.smart.demo.message.DeActivateMessage
 *
 * ************************************************************
 * SUMMARY
 * ************************************************************
 * This is part of the SMART demo for Basic Demo.
 *
 * This is an event class which sets the format for the json input
 * for a service. This class defines the services exposed by the flow
 * to the UI. The name specified for this class is the event in the 
 * URL of the service used.
 *
 * In this demo, this class belongs to MessageFlow flow, hence the
 * URL to trigger this event is:
 * http://server:port/tenant/MessageFlow/DeActivateMessage
 *
 * In this event, no other inputs are expected. In the demo, this
 * event is posted to the Message Data object. The expected format for
 * posting using this event is as below:
 *
 * {'Message':{'___smart_action___':'lookup','___smart_value___':'Hello World!!!'}}
 *
 * "Hello World!!!" is the value of the key field in Message object. The lookup
 * specifies that we lookup a value, this can be a search also. In this case
 * the event is posted to all the objects that match the search criteria specified.
 *
 * ************************************************************
 * */

package org.smart.demo.message;

public class DeActivateMessage implements java.io.Serializable
{
    public DeActivateMessage()
    {
    }
}

