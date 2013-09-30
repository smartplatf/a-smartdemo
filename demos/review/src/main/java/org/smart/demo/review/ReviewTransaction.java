/**
 * ************************************************************
 * HEADERS
 * ************************************************************
 * File:                org.smart.demo.review.ReviewTransaction
 *
 * ************************************************************
 * REVISIONS
 * ************************************************************
 * This is part of the SMART demo for Plug and Play Demo.
 *
 * This class contains the functions that has to be executed when
 * and event occurs. This is called transitions. When the WriteReview
 * event is called, we record the review against the given object. This
 * transition just creates the ReviewDetail object. The linking is
 * taken care by SMART.
 *
 * Since SMART takes care of the linking, the function is independent of
 * the object on which the event is raised and can be raised on any
 * object without any problems.
 * ************************************************************
 * */
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

