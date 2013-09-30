/**
 * ************************************************************
 * HEADERS
 * ************************************************************
 * File:                org.smart.demo.survey.SurveyAnswer
 *
 * ************************************************************
 * SUMMARY
 * ************************************************************
 * This is part of the SMART demo for Multi-tenancy Demo. 
 *
 * This class is a data class that stores data into the database.
 * In SMART data is just a Serializable class. It converts directly
 * into a single table in the database. The members of the class
 * translate to columns in the database. When the members are
 * sub objects, the column names are dereferenced by the member name.
 *
 * The tables are not created until the first data is created in SMART.
 * In SMART all data is stored against a tenant. For the demo, this 
 * class is used by the SurveyDemo1 and SurveyDemo2 tenant and deployed as a part of
 * SurveyFlow jar. 
 *
 * In the demo when an object of this class is created, the following is
 * the data structure (This is created as two separate tables for two different
 * tenants created in the demo):
 *
 * Table created: __SurveyDemo1-SurveyFlow__SurveyAnswer, __SurveyDemo2-SurveyFlow__SurveyAnswer
 * Columns: column=d:SurveyAnswer.answerId  - An unique id is associated to reference this answer. 
 *                 d:SurveyAnswer.surveyId - The id of the survey for which this is an answer
 *                 d:SurveyAnswer.answers.0.answer - The answer given for the questionindex
 *                 d:SurveyAnswer.answers.0.questionIndex - The question for which this answer is given
 *                 d:SurveyAnswer.email - an email associted with the answer if email is rerequired
 *                 d:SurveyAnswer.___smart_currentState___ - Added by SMART and stores the current state
 *                 d:SurveyAnswer.___smart_flow___ - Added by SMART and stores the flow this data belongs to
 *                 d:SurveyAnswer.___smart_legend___ - Added by SMART and has the createdOn, lastModifiedOn values
 *
 * By default SMART adds a synthetic key to this object and reference is stored
 * against this key. This is a sample of how lists are stored in SMART. Lists translate
 * to different columns within the database. This also shows how for each tenant a new
 * table is created and the same table is not re-used. 
 *
 * ************************************************************
 * */

package org.smart.demo.survey;

import java.util.UUID;
import java.util.List;
import java.util.ArrayList;

public class SurveyAnswer implements java.io.Serializable
{
    private UUID answerId;
    private String surveyId;
    private List<Answer> answers;
    private String email;

    public SurveyAnswer(String aFor, String e, List<Answer> ans)
    {
        answerId = UUID.randomUUID();
        surveyId = aFor;
        answers = ans;
        email = e;
    }

    public List<Answer> getAnswers() { return answers; }
}
