/**
 * ************************************************************
 * HEADERS
 * ************************************************************
 * File:                org.smart.demo.contact.ContactStatus
 *
 * ************************************************************
 * SUMMARY
 * ************************************************************
 * This is part of the SMART demo for Role-based Demo.
 *
 * A response class is a serializable class in SMART which indicates
 * the fields that has to be sent back to the requestor in the json
 * format. A response is sent by virtue of it being created
 * in a transition that is run for an event. Responses are only
 * sent for external events. Internal events, i.e., events raised
 * within SMART for asynchronous processing cannot send back 
 * responses.
 *
 * The ContactStatus response as created will create the following 
 * response:
 * {
 *   "event": "4260e664-4e76-40ab-976d-37c7098cbeb9",
 *   "responses": [
 *   {
 *      "message": "An email has been sent.",
 *      "___smart_responseid___": "b1d3bcee-0298-4d0e-b2a9-946db9d5495e"
 *   }
 *   ]
 * }
 *
 * All responses are embedded with a ___smart_responseid___ that can be used
 * to track the response. The event is used to track the event for which this
 * response has been sent. The responses tag is an array and is a list of all
 * the responses that has been created during the execution of transitions for
 * the event. In our case only one response object ContactStatus is created
 * and hence the response sent back has only ContactStatus.
 *
 * ************************************************************
 * */

package org.smart.demo.contact;

public class ContactStatus implements java.io.Serializable
{
    private String message;

    public ContactStatus(String msg)
    {
        message = msg;
    }
}

