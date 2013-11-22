/**
 * ************************************************************
 * HEADERS
 * ************************************************************
 * File:                com.smart.blueprints.cart.CartDetails
 *
 * ************************************************************
 * SUMMARY
 * ************************************************************
 * This is part of the SMART petstore blueprint.
 *
 * A response class is a serializable class in SMART which indicates
 * the fields that has to be sent back to the requestor in the json
 * format. A response is sent by virtue of it being created
 * in a transition that is run for an event. Responses are only
 * sent for external events. Internal events, i.e., events raised
 * within SMART for asynchronous processing cannot send back 
 * responses.
 *
 * The CartDetails response as created will create the following 
 * response:
 * 
 * {
 *   "event": "5ee11ec8-40c9-40d2-95c1-742d55724c5c",
 *   "responses": [
 *     {
 *       "cartName": "cart1381204430010",
 *       "totalItems": 1,
 *       "items": [
 *         {
 *           "itemID": "d6e30d50-7860-4cd4-b18a-61bf7bf63238",
 *           "cartName": "cart1381204430010",
 *           "actualItem": "125",
 *           "___smart_flow___": {
 *             "_model": {
 *               "fileStore": null,
 *               "_name": "CartFlow"
 *             },
 *             "_id": "55e5d878-433b-450d-b86f-3ee5b570c3c5"
 *           },
 *           "___smart_currentState___": {
 *             "_stateEntityType": "CartItem",
 *             "_stateName": "active",
 *             "_script": null,
 *             "_initialState": true,
 *             "_finalState": false
 *           },
 *           "___smart_legend___": {
 *             "_id": "23238cea-c001-45a0-93d2-7613b2663089",
 *             "_group": null,
 *             "_createdOn": 39775660011688,
 *             "_lastModifiedOn": 39775660013085,
 *             "_ownedBy": "PPDemoadmin",
 *             "_lastModifiedBy": null
 *           }
 *         }
 *       ],
 *       "___smart_responseid___": "755cc874-d5eb-49e3-bbf1-85b51ec5c048"
 *     }
 *  ]
 * }
 * 
 *
 * All responses are embedded with a ___smart_responseid___ that can be used
 * to track the response. The event is used to track the event for which this
 * response has been sent. The responses tag is an array and is a list of all
 * the responses that has been created during the execution of transitions for
 * the event. In our case only one response object CartDetails is created
 * and hence the response sent back has only CartDetails. The CartDetails contains
 * a list of CartItems which is a hosted object which has inherently all current 
 * state, legend and flow information. This is returned as is. This can be filtered
 * as required to return a smaller result.
 *
 * In the above only one item is present and hence only one CartItem object is
 * present, if many, then there are as many items as the CartItems.
 *
 * ************************************************************
 * */

package com.smart.blueprints.cart;

import java.util.List;
import java.util.ArrayList;

public class CartDetails implements java.io.Serializable
{
    private String cartName;
    private int totalItems;
    private List<CartItem> items;

    public CartDetails(Cart cart, List<CartItem> lst)
    {
        cartName = cart.getCartName();
        totalItems = cart.getTotalItems();
        items = new ArrayList<CartItem>();
        for (int i = 0; i < lst.size(); i++)
            items.add(lst.get(i));
    }
}

