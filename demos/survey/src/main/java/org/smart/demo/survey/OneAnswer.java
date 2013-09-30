/**
 * ************************************************************
 * HEADERS
 * ************************************************************
 * File:                org.smart.demo.survey.OneAnswer
 *
 * ************************************************************
 * SUMMARY
 * ************************************************************
 * This is part of the SMART demo for Multi tenancy Demo.
 * The representation of an answer for one question in the survey and
 * is used by the RecordAnswer event. SMART does not present any of
 * the OOPs concepts to be used when defining events. Events can be
 * defined in the most convienient method to represent them. The json
 * is appropriately defined. 
 *
 * This class is used by the RecordAnswer event in a list and the 
 * format of the json passed for the event has to reflect the data in 
 * this object to be correct.
 *
 * The format of each answer in the list as below is defined because of
 * this class.
 *     {
 *       "answer": "aye"
 *       "comments":"any comments"
 *     },
 *
 * ************************************************************
 * */

package org.smart.demo.survey;

public class OneAnswer implements java.io.Serializable
{
    private String answer;
    private String comments;

    public OneAnswer()
    {
    }

    public String getAnswer() { return answer; }
    public String getComments() { return comments; }

}


