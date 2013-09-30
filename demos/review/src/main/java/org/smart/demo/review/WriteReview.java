/**
 * ************************************************************
 * HEADERS
 * ************************************************************
 * File:                org.smart.demo.review.WriteReview
 *
 * ************************************************************
 * REVISIONS
 * ************************************************************
 * This is part of the SMART demo for Plug and Play Demo.
 *
 * This is an event class which sets the format for the json input
 * for a service. This class defines the services exposed by the flow
 * to the UI. The name specified for this class is the event in the 
 * URL of the service used.
 *
 * In this demo, this class belongs to ReviewDetailFlow flow, hence the
 * URL to trigger this event is:
 * http://server:port/tenant/ReviewDetailFlow/WriteReview
 *
 * This event expects parameters that are indicated by the member variables
 * of the class. Here we need the reviewText, rating and the review object.
 * The event is posted to the object that is reviewed. In our demo this is
 * the Catalogue object. This can be varied based on which flow this 
 * is mashed up with.
 *
 * The expected format for posting using this event is as below:
 *
 * {
 *   "reviewText": "Test Review",
 *   "rating": "5",
 *   "reviewObject": "125",
 *   "Catalogue": {
 *     "___smart_action___": "lookup",
 *     "___smart_value___": "125"
 *   }
 * }
 * 
 * "Catalogue" varies with the object type for which review is written.
 * Since we are writing it for Catalogue, this is Catalogue and the value
 * is the key of the specific product for which the review is written.
 *
 *
 * ************************************************************
 * */
package org.smart.demo.review;

public class WriteReview implements java.io.Serializable
{
    //Add the data that should be posted into the event here.
    //The posted data will follow the format that is present here.
    private String reviewText;
    private int rating;
    private Object reviewObject;

    public WriteReview()
    {
    }

    public String getReviewText() { return reviewText; }
    public int getRating() { return rating; }
    public Object getReviewObject() { return reviewObject; }
}

