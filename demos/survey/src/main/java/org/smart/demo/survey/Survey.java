/**
 * ************************************************************
 * HEADERS
 * ************************************************************
 * File:                org.smart.demo.survey.Survey
 *
 * ************************************************************
 * SUMMARY
 * ************************************************************
 * This is part of the SMART demo for Multi-tenancy Demo. 
 *
 * In the current implementation a Survey is created when a Questionaire
 * is created. This can be easily modified to create multiple surveys from
 * the same questionaire. 
 *
 * A survey created from a questionaire - current assumption is that there is
 * only one survey for one questionaire. This object is linked to the questionaire
 * by just using the same id as the questionaire id. Since the assumption is that
 * there is only one Survey for every Questionaire, this will work, if not the
 * correct design of linking a Survey to the Questionaire has to be done. Check
 * out the mashup demo for more information on linking.
 *
 * This is a data object that will create a data table of the following format:
 *
 * Table created: __SurveyDemo1-SurveyFlow__Survey, __SurveyDemo2-SurveyFlow__Survey
 * Columns: column=d:Survey.surveyId  - The name for this questionaire
 *                 d:Survey.questionForEmail - This stores the question number which requires email
 *                 d:Survey.summary - This class rolls up the survey summary into a list of QuestionSummary
 *                                    This is stored for each question and rolls up the number of yes, no and maybe ans.
 *                                    Note, while monitoring is a functionality that is provided out of box, this is
 *                                    business specific where roll up is based on answer data and has to be implemented
 *                                    separately.          
 *                 A set of the below 3 fields are repeated for every question. In the demo we have 6 questions for 
 *                 SurveyDemo1 and 5 questions for SurveyDemo2. Hence the table for SurveyDemo1 will have this repeated
 *                 6 times, while for SurveyDemo2, this will be repeated 5 times.
 *                 d:Survey.summary.0.ayes - This is an incrementing column. The 0 is incremented
 *                                           for every object stored in the list. This stores the number of yes
 *                 d:Survey.summary.0.nays - This is an incrementing column. The 0 is incremented
 *                                           for every object stored in the list. This stores the number of nos
 *                 d:Survey.summary.0.maybes - This is an incrementing column. The 0 is incremented
 *                                             for every object stored in the list. This stores the number of maybes
 *                 d:Survey.___smart_currentState___ - Added by SMART and stores the current state
 *                 d:Survey.___smart_flow___ - Added by SMART and stores the flow this data belongs to
 *                 d:Survey.___smart_legend___ - Added by SMART and has the createdOn, lastModifiedOn values
 *
 * ************************************************************
 * */

package org.smart.demo.survey;

import java.util.List;
import java.util.ArrayList;

public class Survey implements java.io.Serializable
{
    private static enum answertype { aye, nay, maybe }

    private String surveyId;
    private List<QuestionSummary> summary;
    //private List<Question> questions;
    private int questionForEmail;

    public Survey(String qfor, int q)
    {
        surveyId = qfor;
        summary = new ArrayList<QuestionSummary>();
        questionForEmail = q;
    }

    private QuestionSummary getSummary(int question)
    {
        if (summary.size() <= question)
        {
            QuestionSummary summ = new QuestionSummary(question);
            summary.add(summ);
        }
        return summary.get(question);
    }

    private void recordAye(int question)
    {
        QuestionSummary summ = getSummary(question);
        summ.aye();
    }

    private void recordNay(int question)
    {
        QuestionSummary summ = getSummary(question);
        summ.nay();
    }

    private void recordMaybe(int question)
    {
        QuestionSummary summ = getSummary(question);
        summ.maybe();
    }

    public void recordAnswer(int question, String answer)
    {
        answertype type = answertype.valueOf(answer);
        switch (type)
        {
            case aye:
                recordAye(question);
                break;
            case nay:
                recordNay(question);
                break;
            case maybe:
                recordMaybe(question);
                break;
            default:
                break;
        }
    }

    public String getSurveyId() { return surveyId; }
    public int getQuestionForEmail() { return questionForEmail; }
}

