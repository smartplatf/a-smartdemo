/**
 * ************************************************************
 * HEADERS
 * ************************************************************
 * File:                org.smart.demo.survey.Questionaire
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
 * reference. This class is used by the Questionaire as a list of
 * questions to be used by it. 
 *
 * This is stored as a part of the Questionaire data class and is 
 * not stored separately.
 *
 * ************************************************************
 * */

package org.smart.demo.survey;

import java.util.List;
import java.util.ArrayList;

public class Question implements java.io.Serializable
{
    private String question;
    private int recordEmail;

    public Question()
    {
    }

    public String getQuestion() { return question; }
    public int shouldRecordEmail() { return recordEmail; }
}


