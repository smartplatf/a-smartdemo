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

