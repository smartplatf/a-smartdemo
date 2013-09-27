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

