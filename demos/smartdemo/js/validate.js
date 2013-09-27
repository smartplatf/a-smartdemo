/*******************************************************************************
 * SMART - State Machine ARchiTecture 
 * Copyright (C) 2012 Individual contributors as indicated by the @authors tag
 *
 * This file is a part of SMART.
 *
 * SMART is a free software: you can redistribute it and/or modify it under the
 * terms of the GNU General Public License as published by the Free Software
 * Foundation, either version 3 of the License, or (at your option) any later
 * version.
 *
 * SMART is distributed in the hope that it will be useful, but WITHOUT ANY
 * WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR
 * A PARTICULAR PURPOSE. See the GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License along with
 * this program. If not, see http://www.gnu.org/licenses/
 *
 * ************************************************************ 
 * HEADERS
 * ************************************************************ 
 * File: validations 
 * Author: rsankar 
 * Revision: 1.0 
 * Date: August 17, 2013
 *
 * ************************************************************ 
 * REVISIONS
 * ************************************************************ 
 * Purpose
 *
 * This javascript is used by Fixchg to validate data dynamically
 * ************************************************************
 **/
 
 function validateInput(input, msg)
 {
     if ((input.val() == "") || (input.val() == (undefined || null)))
     {
         $('#messagespace').empty().append(msg);
         //alert(msg);
         input.focus();
         return false;
     }
     
     return true;
 }
 
 function validateCreate()
 {
     var validate = validateInput($('#FlowName'), "Please Enter a valid Flow Name");
     if (!validate) return false;
     
     validate = validateInput($('#SoaFile'), "Please Enter a valid soa file");
     if (!validate) return false;

     validate = validateInput($('#SoaName'), "Please Enter a valid soa name");
     if (!validate) return false;
         
     validate = validateInput($('#Summary'), "Please enter a summary for your flow.");
     if (!validate) return false;

     validate = validateInput($('#Description'), "Please enter description for your flow.");
     if (!validate) return false;
     
     validate = validateInput($('#Information'), "Please enter information related to your flow. What to does?");
     if (!validate) return false;
     
     return true;
     
 }
 
 function validateJarUpload()
 {
     var validate = validateInput($('#upload-file'), "Please select a jar file to upload.");
     return (validate);
 }
 
 function validatetenant()
 {
     var validate = validateInput($('#name'), "Please select a name for your tenant.");
     return validate;
 }
 