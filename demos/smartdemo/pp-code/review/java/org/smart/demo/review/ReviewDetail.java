/**
 * ************************************************************
 * HEADERS
 * ************************************************************
 * File:                org.smart.demo.review.ReviewDetail
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
 * MessageFlow jar. 
 *
 * In the demo when an object of this class is created, the following is
 * the data structure:
 *
 * Table created: __PPDemo-ReviewDetailFlow__ReviewDetail
 * Columns: column=d:ReviewDetail.reviewId  - This contains an assigned id for this review
 *                 d:ReviewDetail.reviewText - Stores the text provided for review
 *                 d:ReviewDetail.rating - the rating for the review
 *                 d:ReviewDetail.reviewObject - this stores the key of the object that is reviewed
 *                 d:ReviewDetail.___smart_currentState___ - Added by SMART and stores the current state
 *                 d:ReviewDetail.___smart_flow___ - Added by SMART and stores the flow this data belongs to
 *                 d:ReviewDetail.___smart_legend___ - Added by SMART and has the createdOn, lastModifiedOn values
 *
 * By default SMART adds a synthetic key to this object and reference is stored
 * against this key. The reviewId member variable is created as a key for this object
 * A reference to the SMART generated key will be stored against the message member
 * variable. 
 *
 * The reviewObject member variable is linked to the reviewed object automatically by
 * SMART if a link via is provided in the configuration file. Check the soa file for
 * more details on this. Once linked, a reference to the object can be got by using
 * the link param in the soa file.
 *
 * ************************************************************
 * */
package org.smart.demo.review;

import java.util.UUID;

public class ReviewDetail implements java.io.Serializable
{
    //This is an automatically generated key for referencing
    //your object. If you change this, be sure to change the
    //corresponding .soa file also.
    
    private UUID reviewId;

    //Add your data fields here. This will be stored and
    //retrieved back when this data is created and updated.
    //Creating a member as transient will not save the data.
    private String reviewText;
    private int rating;
    private Object reviewObject;

    public ReviewDetail(String txt, int r)
    {
        reviewId = UUID.randomUUID();
        reviewText = txt;
        rating = r;
    }

    public UUID getReviewId() { return reviewId; }
    public int getRating() { return rating; }
    public String getReviewText() { return reviewText; }
    public Object getReviewObject() { return reviewObject; }
}

