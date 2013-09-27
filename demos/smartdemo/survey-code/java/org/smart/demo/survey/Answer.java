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
 * File:                org.smart.demo.survey.Answer
 * Revision:            1.0
 * Date:                17-04-2013
 *
 * ************************************************************
 * REVISIONS
 * ************************************************************
 * One instance of an answer submitted in one survey
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


