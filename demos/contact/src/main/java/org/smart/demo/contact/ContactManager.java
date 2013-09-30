/**
 * ************************************************************
 * HEADERS
 * ************************************************************
 * File:                org.smart.demo.contact.ContactManager
 *
 * ************************************************************
 * SUMMARY
 * ************************************************************
 * This is part of the SMART demo for Role-based Demo.
 *
 * This class contains the functions that has to be executed when
 * and event occurs. This is called transitions. While all other events
 * are standard events, the Enquire event requires special processing.
 * Here we have a transition to handle this transition. The enquiry 
 * method is called when the Enquire event is raised and is called a 
 * transition. 
 *
 * The parameters to transitions can be of two types, "Implicit parameters"
 * and "Explicit parameters". Implicit parameters are events, data, configurations
 * that can be derived from the event that is raised. For eg., the method
 * here accepts two implicit parameters. The Enquire event that is raised
 * and the Contact data on which the event is raised.
 *
 * The method also creates the ContactStatus object which is a response class.
 * When a response is created, the response is automatically sent back to the
 * requestor. Multiple response objects can be created and all the responses
 * will be sent back to the requestor.
 *
 * Since the Enquire event is shared between different transitions, data to be
 * shared can be set into the event and used in other transitions. For eg., here
 * the transition sets up the contactEmail which can then be used by the
 * any send email transition to send the email appropriately. In this case
 * the transitions should be sequenced using runAfter and runBefore configurations.
 * More than one transition can be created for the same event. 
 * By default transitions are run in parallel.
 *
 * Refer to transitions documentation for more details.
 *
 * ************************************************************
 * */
package org.smart.demo.contact;

import java.util.Date;

public class ContactManager
{
    /**
     * Transition called for the Enquire Event. This transition sets up the email details
     * that has to be sent for this specific enquire event. This transition also creates
     * and Enquiry object which can then be processed by the sales team.
     *
     * While the demo does not send out an email, this can be chained to the standard
     * sendEmail service to send out an email when this event occurs.
     * */
    public void enquiry(Enquire enquire, Contact data)
        throws Exception
    {
        //Add your code to process the event here.
        //data is the data to which the event is posted
        //evt is the event posted.
        if ((enquire.getName() == null) || (enquire.getName().length() <= 0))
            throw new Exception("Please give an email to contact.");

        if ((enquire.getEmail() == null) || (enquire.getEmail().length() <= 0))
            throw new Exception("Please give an email to contact.");

        if ((enquire.getSubject() == null) || (enquire.getSubject().length() <= 0))
            enquire.setSubject("Contact from Website");

        if (data.getEmail() == null)
            throw new Exception("The contact information is setup wrong. Please contact system admin.");

        Enquiry enquiry = new Enquiry(enquire.getName(), enquire.getEmail(), enquire.getPhone(),
                enquire.getSubject(), enquire.getMessage(), data.getEmail(), data.getContactName());


        ContactStatus stat = new ContactStatus("An email has been sent.");
    }
}

