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

    public String getName() { return name; }
    public String getPhone() { return phone; }
    public String getEmail() { return email; }
    public String getMessage() { return message; }
    public String getSubject() { return subject; }
    public void setSubject(String sub) { subject = sub; }
}

