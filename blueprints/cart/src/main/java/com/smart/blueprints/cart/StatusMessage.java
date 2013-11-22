/**
 * ************************************************************
 * HEADERS
 * ************************************************************
 * File:                com.smart.blueprints.cart.StatusMessage
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
 * The StatusResponse response as created will create the following 
 * response:
 * {
 *   "event": "9a137301-508e-4469-a55a-b0a00f166757",
 *     "responses": [
 *         {
 *               "message": "Added item to cart: cart1381204430010",
 *               "___smart_responseid___": "1d06b71e-428c-48af-8377-5bf290b91d39"
 *         }
 *      ]
 * }
 * 
 *
 * All responses are embedded with a ___smart_responseid___ that can be used
 * to track the response. The event is used to track the event for which this
 * response has been sent. The responses tag is an array and is a list of all
 * the responses that has been created during the execution of transitions for
 * the event. In our case only one response object StatusResponse is created
 * and hence the response sent back has only StatusResponse.
 *
 *
 * ************************************************************
 * */

package com.smart.blueprints.cart;

public class StatusMessage implements java.io.Serializable
{
    private String message;

    public StatusMessage(String msg)
    {
        message = msg;
    }
}

