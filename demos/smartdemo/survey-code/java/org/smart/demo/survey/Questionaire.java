/**
 * ************************************************************
 * HEADERS
 * ************************************************************
 * File:                org.smart.demo.survey.Questionaire
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
 * Table created: __SurveyDemo1-SurveyFlow__Questionaire and __SurveyDemo2-SurveyFlow__Questionaire
 * Columns: column=d:Questionaire.questionaireFor  - The name for this questionaire
 *                 d:Questionaire.questions - The questions stored. Since this is a list of questions this
 *                                            will inturn have a list of columns associated as below.
 *                 d:Questionaire.questions.0.question - This is an incrementing column. The 0 is incremented
 *                                                       for every object stored in the list
 *                 d:Questionaire.questions.0.recordEmail - This is an incrementing column. The 0 is incremented
 *                                                       for every object stored in the list
 *                 d:Questionaire.___smart_currentState___ - Added by SMART and stores the current state
 *                 d:Questionaire.___smart_flow___ - Added by SMART and stores the flow this data belongs to
 *                 d:Questionaire.___smart_legend___ - Added by SMART and has the createdOn, lastModifiedOn values
 *
 * By default SMART adds a synthetic key to this object and reference is stored
 * against this key. This is a sample of how lists are stored in SMART. Lists translate
 * to different columns within the database. This also shows how for each tenant a new
 * table is created and the same table is not re-used. 
 *
 * ************************************************************
 * */

package org.smart.demo.survey;

import java.util.List;
import java.util.ArrayList;

public class Questionaire implements java.io.Serializable
{
    private String questionaireFor; //The key for this object
    private List<Question> questions; //The list of questions to be stored.

    public Questionaire(String qfor)
    {
        questionaireFor = qfor;
        questions = new ArrayList<Question>();
    }

    //Accessors for the two member variables
    public String getQuestionaireFor() { return questionaireFor; }
    public List<Question> getQuestions() { return questions; }

}


