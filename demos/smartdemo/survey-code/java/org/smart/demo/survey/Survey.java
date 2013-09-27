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
 * File:                org.smart.demo.survey.Survey
 * Author:              rsankar
 * Revision:            1.0
 * Date:                17-04-2013
 *
 * ************************************************************
 * REVISIONS
 * ************************************************************
 * A survey created from a questionaire - current assumption is that there is
 * only one survey for one questionaire.
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

