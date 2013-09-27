package org.smart.demo.contact;

import java.util.Date;

public class ContactManager
{
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

