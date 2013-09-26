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

