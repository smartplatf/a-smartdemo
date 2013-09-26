package org.smart.demo.review;

public class ReviewTransaction
{
    public void writeReview(WriteReview evt)
    {
        //Add your code to process the event here.
        //data is the data to which the event is posted
        //evt is the event posted.
        ReviewDetail detail = new ReviewDetail(evt.getReviewText(), evt.getRating());
        AddedReview resp = new AddedReview();
    }
}

