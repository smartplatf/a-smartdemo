/**
 * ************************************************************
 * HEADERS
 * ************************************************************
 * File:                org.smart.demo.survey.RecordAnswer
 *
 * ************************************************************
 * REVISIONS
 * ************************************************************
 * This is part of the SMART demo for Multi tenancy Demo.
 *
 * This is an event class which sets the format for the json input
 * for a service. This class defines the services exposed by the flow
 * to the UI. The name specified for this class is the event in the 
 * URL of the service used.
 *
 * In this demo, this class belongs to ContactFlow flow, hence the
 * URL to trigger this event is:
 * http://server:port/tenant/SurveyFlow/RecordAnswer
 *
 * This event expects parameters that are indicated by the member variables
 * of the class. In this case, answers and email.
 * The event is posted to the Survey object. The expected format for
 * posting using this event is as below:
 *
 * {
 *   "answers": [
 *     {
 *       "answer": "aye"
 *     },
 *     ... Repeated for each question in Questionaire ...
 *  ],
 *  "Survey": {
 *    "___smart_action___": "lookup",
 *    "___smart_value___": "demo1questions"
 *  }
 * }
 * 
 *
 * The Survey name has to be the name of the survey to record the answer against.
 * The answers are repeated for each of the questions in the Survey. The email is included
 * if an email is provided. The lookup specifies that we lookup a value, this can be a search also. In this case
 * the event is posted to all the objects that match the search criteria specified.
 *
 * ************************************************************
 * */

package org.smart.demo.survey;

import java.util.List;

public class RecordAnswer implements java.io.Serializable
{
    private List<OneAnswer> answers; //The current assumption is that the order is the same order as the questions
    private String email;

    public RecordAnswer()
    {
    }

    public List<OneAnswer> getAnswers() { return answers; }
    public String getEmail() { return email; }
}


