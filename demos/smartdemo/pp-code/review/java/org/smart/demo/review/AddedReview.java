/**
 * ************************************************************
 * HEADERS
 * ************************************************************
 * File:                org.smart.demo.review.AddedReview
 *
 * ************************************************************
 * SUMMARY
 * ************************************************************
 * This is part of the SMART demo for Plug and Play Demo.
 *
 * A response class is a serializable class in SMART which indicates
 * the fields that has to be sent back to the requestor in the json
 * format. A response is sent by virtue of it being created
 * in a transition that is run for an event. Responses are only
 * sent for external events. Internal events, i.e., events raised
 * within SMART for asynchronous processing cannot send back 
 * responses.
 *
 * The AddedReview response as created will create the following 
 * response:
 * {
 *   "event": "9a137301-508e-4469-a55a-b0a00f166757",
 *     "responses": [
 *         {
 *               "added": "Added Review",
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
 * the event. In our case only one response object AddedReview is created
 * and hence the response sent back has only AddedReview.
 *
 *
 * ************************************************************
 * */

package org.smart.demo.review;

public class AddedReview implements java.io.Serializable
{
    private String added;

    public AddedReview()
    {
        added = "Added Review";
    }
}

