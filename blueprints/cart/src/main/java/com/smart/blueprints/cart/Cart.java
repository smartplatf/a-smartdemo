/**
 * ************************************************************
 * HEADERS
 * ************************************************************
 * File:                com.smart.blueprints.cart.Cart
 *
 * ************************************************************
 * SUMMARY
 * ************************************************************
 * This is part of the SMART petstore blueprint.
 *
 * This class is a data class that stores data into the database.
 * In SMART data is just a Serializable class. It converts directly
 * into a single table in the database. The members of the class
 * translate to columns in the database. When the members are
 * sub objects, the column names are dereferenced by the member name.
 *
 * The tables are not created until the first data is created in SMART.
 * In SMART all data is stored against a tenant. For the demo, this 
 * class is used by the PPDemo tenant and deployed as a part of
 * CartFlow jar. 
 *
 * In the demo when an object of this class is created, the following is
 * the data structure (This is created as two separate tables for two different
 * tenants created in the demo):
 *
 * Table created: __PPDemo-CartFlow__Cart
 * Columns: column=d:Cart.cartName  - The name of the cart
 *                 d:Cart.totalItems - The number of items in this cart.
 *                 d:Cart.___smart_currentState___ - Added by SMART and stores the current state
 *                 d:Cart.___smart_flow___ - Added by SMART and stores the flow this data belongs to
 *                 d:Cart.___smart_legend___ - Added by SMART and has the createdOn, lastModifiedOn values
 *
 * By default SMART adds a synthetic key to this object and reference is stored
 * against this key. The cartName is the key against which the synthetic key is 
 * stored. The contactNotification being a transient field will not be stored in the
 * database. 
 *
 * ************************************************************
 * */

package com.smart.blueprints.cart;

public class Cart implements java.io.Serializable
{
    //This is an automatically generated key for referencing
    //your object. If you change this, be sure to change the
    //corresponding .soa file also.
    
    private String cartName;

    //Add your data fields here. This will be stored and
    //retrieved back when this data is created and updated.
    //Creating a member as transient will not save the data.
    
    private int totalItems;

    private transient String notificationString;


    public Cart()
    {
        totalItems = 0;
    }

    public String getCartName() { return cartName; }
    public int getTotalItems() { return totalItems; }

    public void addItem(CartItem item)
    {
        totalItems++;
    }

    public void setupNotification(String str) { notificationString = str; }
    public String toString() { return notificationString; }
}

