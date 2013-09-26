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
 * File:                org.smart.demo.survey.SurveyValidator
 * Author:              rsankar
 * Revision:            1.0
 * Date:                17-04-2013
 *
 * ************************************************************
 * REVISIONS
 * ************************************************************
 * Validates the answers that are given for recording.
 *
 * ************************************************************
 * */

package org.smart.demo.survey;

import java.util.List;

public class SurveyValidator
{
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

