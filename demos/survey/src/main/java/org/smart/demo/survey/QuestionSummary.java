/**
 * ************************************************************
 * HEADERS
 * ************************************************************
 * File:                org.smart.demo.survey.QuestionSummary
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
 * reference. This class is used by the Survey data as a list of
 * summary stored for each question of the Survey.
 *
 * This is stored as a part of the Survey data class and is 
 * not stored separately.
 *
 * ************************************************************
 * */

package org.smart.demo.survey;

public class QuestionSummary implements java.io.Serializable
{
    private int questionIndex; //The question for which this summary is stored.
    private int ayes; //THis number of yes answers
    private int nays; //The number of no answers
    private int maybes; //The number of maybe answers

    public QuestionSummary(int question)
    {
        questionIndex = question;
        ayes = 0;
        nays = 0;
        maybes = 0;
    }

    public void aye()
    {
        ayes++;
    }

    public void nay()
    {
        nays++;
    }

    public void maybe()
    {
        maybes++;
    }

    public String toString() { return ":" + ayes + ":" + nays + ":" + maybes; }
}


