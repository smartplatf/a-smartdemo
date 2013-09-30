/**
 * ************************************************************
 * HEADERS
 * ************************************************************
 * File:                org.smart.demo.survey.Answer
 *
 * ************************************************************
 * SUMMARY
 * ************************************************************
 * This is part of the SMART demo for Multi-tenancy Demo. 
 *
 * This is a helper data object that is part of a prime data of
 * SMART. SMART does not prevent usage of standard OOPs practices
 * in defining data objects. Data objects can be defined normally with
 * references to other data classes. This is a sample of one such
 * reference. This class is used by the SurveyAnswer as a list of
 * answers for questions.
 *
 * This is stored as a part of the SurveyAnswer data class and is 
 * not stored separately.
 *
 *
 * ************************************************************
 * */

package org.smart.demo.survey;

import java.util.UUID;

public class Answer implements java.io.Serializable
{
    private int questionIndex;
    private String answer;
    private String comments;

    public Answer(int quest, String ans, String comm)
    {
        questionIndex = quest;
        answer = ans;
        comments = comm;
    }

    public int getQuestionIndex() { return questionIndex; }
    public String getAnswer() { return answer; }
    public String getComments() { return comments; }

}


