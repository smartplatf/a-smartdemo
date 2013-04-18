/**
 * Demo - A demo for using the SMART platform
 *
 * Copyright (C) 2012 Individual contributors as indicated by
 * the @authors tag
 *
 * This file is a part of Utilities.
 *
 * Utilities is a free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * Utilities is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program. If not, see <http://www.gnu.org/licenses/>.
 *
 *
 * */

/**
 * ************************************************************
 * HEADERS
 * ************************************************************
 * File:                org.smart.demo.survey.SurveyManager
 * Author:              rsankar
 * Revision:            1.0
 * Date:                17-04-2013
 *
 * ************************************************************
 * REVISIONS
 * ************************************************************
 * An object that stores the summary of the ayes or nays for a questions
 *
 * ************************************************************
 * */

package org.smart.demo.survey;

import java.util.List;
import java.util.ArrayList;

public class SurveyManager implements java.io.Serializable
{
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
        SurveyAnswer sans = new SurveyAnswer(survey.getSurveyId(), store);

        //by virtue of creating a response object, the response is sent back
        //to the client when the transaction ends.
        Recorded reply = new Recorded();
    }

    public void createQuestionaire(Questionaire questionaire)
    {
        //This object should not be null, if it is, then handle it. It is a TODO.
        //for now the flow will not work correctly in this case.
        if (questionaire != null)
        {
            //since Survey is a hosted object, by virtue of creating it, it will get saved
            //when committed.
            Survey survey = new Survey(questionaire.getQuestionaireFor());
        }
    }
}

