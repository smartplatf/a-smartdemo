/**
 * ************************************************************
 * HEADERS
 * ************************************************************
 * File:                org.smart.demo.survey.SurveyValidator
 *
 * ************************************************************
 * REVISIONS
 * ************************************************************
 * This is part of the SMART demo for Multi-Tenancy Demo.
 *
 * This class contains the functions that has to be executed when
 * and event occurs. This is called transitions. When the RecordAnswer
 * event is called, we validate that the email is recorded if the
 * answer for which email is provided is answered is answered as yes.
 * This is a validation transition and throws and exception if the 
 * email is not present which rollsback the transaction and returns the
 * exception.
 *
 * This transition is also bucketed into a separate feature and is only
 * enabled for SurveyDemo2 which showcases how customizations can be done
 * by enabling only certain features for certain tenants without actually
 * adding IF clauses in the code with flags littered all over the place.
 *
 * ************************************************************
 * */

package org.smart.demo.survey;

import java.util.List;

public class SurveyValidator
{
    /**
     * VAlidate that an email is provided if a question exists in the survey
     * which requires an email for an answer of yes. If the email is provided
     * then just return else raise an exception so that the transaction is rolled 
     * back.
     * */
    public void validateSurveyResponse(Survey survey, RecordAnswer answer)
        throws Exception
    {
        if (answer.getEmail() != null)
            return;

        List<OneAnswer> ans = answer.getAnswers();
        //List<Question> questions = survey.getQuestions();
        int questionforemail = survey.getQuestionForEmail();
        boolean emailreqd = false;
        String question = "";
        for (int i = 0; !emailreqd && (i < ans.size()); i++)
        {
            //not a good practice to hardcode. This is done because of demo.
            //if ((questions.get(i).shouldRecordEmail() >= 1) && (ans.get(i).getAnswer().equals("aye")))
            if ((i == questionforemail) && (ans.get(i).getAnswer().equals("aye")))
            {
                emailreqd = true;
                //question = questions.get(i).getQuestion();
            }
        }

        if (emailreqd && answer.getEmail() == null)
            throw new Exception("Survey cannot be recorded. Email is required ");
    }
}

