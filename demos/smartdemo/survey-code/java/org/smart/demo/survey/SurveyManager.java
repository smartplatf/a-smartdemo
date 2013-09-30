/**
 * ************************************************************
 * HEADERS
 * ************************************************************
 * File:                org.smart.demo.survey.SurveyManager
 *
 * ************************************************************
 * SUMMARY
 * ************************************************************
 * This is part of the SMART demo for Multi-Tenancy Demo.
 *
 * This class contains the functions that has to be executed when
 * and event occurs. This is called transitions. When the RecordAnswer
 * event is called, we update the summary in the survey object with
 * the answers. We also create a SurveyAnswer object. When a Questionaire
 * is created with CreatePrime event we want to create the Survey object
 * also. This class demonstrates how we can append a transition to be
 * executed when CreatePrime is called and how to sequence the transitions.
 *
 * The parameters to transitions can be of two types, "Implicit parameters"
 * and "Explicit parameters". Implicit parameters are events, data, configurations
 * that can be derived from the event that is raised. For eg., the method recordAnswer
 * here accepts two implicit parameters. The RecordAnswer event that is raised
 * and the Survey data on which the event is raised. Explicit parameters are
 * parameters that are passed by specifying what should be passed. For eg.,
 * in the createQuestionaire function, the parameters passed are neither the
 * event nor the data object, but the object that is created within this transaction.
 * Such objects can be referenced using tags. All objects created or added to
 * a transaction is referencible by their object name. In this case Questionaire.
 * Explicit parameters are specified in the parms configuration in the soa file.
 * Refer to the soa file for more details here.
 *
 * Any data object created within a transition is automatically added to the
 * transaction and commite or rolledback when the transaction is committed. The 
 * transaction span across all the transitions that are run for any given event and
 * is committed only if no exception is thrown by any of the transitions. If an
 * exception is thrown, then the transaction is rolled back and the exception is
 * returned as an Error response.
 *
 * Refer to transitions documentation for more details.
 *
 *
 * ************************************************************
 * */

package org.smart.demo.survey;

import java.util.List;
import java.util.ArrayList;

public class SurveyManager implements java.io.Serializable
{
    /**
     * A transition to be called  when RecordAnswer event is raised on the Survey object.
     * This function creates a single SurveyAnswer object for this answer and updates
     * the Survey object's Summary appropriately.
     * */
    public void recordAnAnswer(Survey survey, RecordAnswer answer)
    {
        List<OneAnswer> answers = answer.getAnswers();
        List<Answer> store = new ArrayList<Answer>();
        for (int question = 0; question < answers.size(); question++)
        {
            OneAnswer oans = answers.get(question);
            Answer ans = new Answer(question, oans.getAnswer(), oans.getComments());
            store.add(ans);
            survey.recordAnswer(question, ans.getAnswer());
        }

        //since this is a hosted object, by virtue of creating it, it will get persisted
        //and can be looked or searched in context.
        SurveyAnswer sans = new SurveyAnswer(survey.getSurveyId(), answer.getEmail(), store);

        //by virtue of creating a response object, the response is sent back
        //to the client when the transaction ends.
        Recorded reply = new Recorded();
    }

    /**
     * This function is called when a Questionaire object is created. The Survey object
     * is also created when a Questionaire object is created.
     * */
    public void createQuestionaire(Questionaire questionaire)
    {
        //This object should not be null, if it is, then handle it. It is a TODO.
        //for now the flow will not work correctly in this case.
        if (questionaire != null)
        {
            //since Survey is a hosted object, by virtue of creating it, it will get saved
            //when committed.

            int question = -1;
            for (int i = 0; i < questionaire.getQuestions().size(); i++)
            {
                if (questionaire.getQuestions().get(i).shouldRecordEmail() >= 1)
                {
                    question = i;
                    break;
                }
            }
            Survey survey = new Survey(questionaire.getQuestionaireFor(), question);
        }
    }
}

