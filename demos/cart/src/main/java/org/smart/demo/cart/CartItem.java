/**
 * ************************************************************
 * HEADERS
 * ************************************************************
 * File:                org.smart.demo.cart.CartItem
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
 * class is used by the PPDemo tenant and deployed as a part of
 * CartFlow jar. 
 *
 * In the demo when an object of this class is created, the following is
 * the data structure (This is created as two separate tables for two different
 * tenants created in the demo):
 *
 * Table created: __PPDemo-CartFlow__CartItem
 * Columns: column=d:CartItem.itemID  - An id associated with this item
 *                 d:CartItem.cartName - The name of the cart to which this item belongs
 *                 d:CartItem.actualItem - The link to the actual item this item is linked to.
 *                 d:CartItem.___smart_currentState___ - Added by SMART and stores the current state
 *                 d:CartItem.___smart_flow___ - Added by SMART and stores the flow this data belongs to
 *                 d:CartItem.___smart_legend___ - Added by SMART and has the createdOn, lastModifiedOn values
 *
 * By default SMART adds a synthetic key to this object and reference is stored
 * against this key. The itemID is the key against which the synthetic key is 
 * stored. 
 *
 * This is a related dataclass to the Cart data. A Cart contains a number of
 * CartItems. In this mashup the CartItem is linked to an actual object that is
 * present in the cart and by varying the actual item different mash ups can be got. The links
 * established is as this:
 *
 * Cart --> CartItems --> Actual Item (In our demo Catalogue)
 *
 * The link is established by using the following when the enable event is called for a tenant:
 * 'links':[{'name':'enquiryObject', 'flow':'CartFlow', 'object':'Cart','attribute':'cartName'}]
 *
 * ************************************************************
 * */

package org.smart.demo.cart;

import java.util.UUID;

public class CartItem implements java.io.Serializable
{
    private UUID itemID;
    private String cartName;
    private Object actualItem;

    public CartItem(String cart)
    {
        cartName = cart;
        itemID = UUID.randomUUID();
    }

    public String getCartItem() { return cartName; }
    public UUID getItemID() { return itemID; }
    public Object getActualItem() { return actualItem; }
}

