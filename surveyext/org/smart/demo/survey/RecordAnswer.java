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
 * File:                org.smart.demo.survey.RecordAnswer
 * Author:              rsankar
 * Revision:            1.0
 * Date:                17-04-2013
 *
 * ************************************************************
 * REVISIONS
 * ************************************************************
 * An event that occurs to record a single answer for a survey
 *
 * ************************************************************
 * */

package org.smart.demo.survey;

import java.util.List;

public class RecordAnswer implements java.io.Serializable
{
    private List<OneAnswer> answers; //The current assumption is that the order is the same order as the questions
    private String email;

    public RecordAnswer()
    {
    }

    public List<OneAnswer> getAnswers() { return answers; }
    public String getEmail() { return email; }
}


