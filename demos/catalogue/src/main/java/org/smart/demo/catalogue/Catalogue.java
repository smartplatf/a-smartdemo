/**
 * ************************************************************
 * HEADERS
 * ************************************************************
 * File:                org.smart.demo.catalogue.Catalogue
 *
 * ************************************************************
 * SUMMARY
 * ************************************************************
 * This is part of the SMART demo for Plug and Play Demo. 
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
 * Catalogue jar. 
 *
 * In the demo when an object of this class is created, the following is
 * the data structure:
 *
 * Table created: __PPDemo-CatalogueFlow__Catalogue
 * Columns: column=d:Catalogue.skuId  - This will contain the skuId that recognizes this object
 *                 d:Catalogue.cost - this will contain the cost data
 *                 d:Catalogue.productName - this will contain  the name of the product
 *                 d:Catalogue.available - the available field
 *                 d:Catalogue.___smart_currentState___ - Added by SMART and stores the current state
 *                 d:Catalogue.___smart_flow___ - Added by SMART and stores the flow this data belongs to
 *                 d:Catalogue.___smart_legend___ - Added by SMART and has the createdOn, lastModifiedOn values
 *
 * By default SMART adds a synthetic key to this object and reference is stored
 * against this key. The skuId member variable is created as a key for this object
 * A reference to the SMART generated key will be stored against the message member
 * variable.
 *
 * A single serializable object as below is sufficient to create a flow in SMART. By
 * default SMART provides all the events and functions to create, list, lookup, search and
 * update this object. Once created this can be mashed up with other flows.
 *
 * In this example, this catalogue is mashed up with the cart and review flows, thus creating
 * one homogenous application that has create and list products, add reviews to the product,
 * add the products to a cart and check out. The functionality to be achieved when check out
 * again can be achieved by mashing up with contact or payment.
 *
 * ************************************************************
 * */

package org.smart.demo.catalogue;

public class Catalogue implements java.io.Serializable
{
    private String skuId;       //stores the skuId
    private String productName; //stores the productName
    private double cost;        //stores the cost of the product
    private int available;      //stores the availability

    public Catalogue()
    {
    }

    //Accessor functions for the data for use within the
    //flow.
    public String getSKUID() { return skuId; }
    public String getProductName() { return productName; }
    public double getCost() { return cost; }
    public int getAvailable() { return available; }
}

