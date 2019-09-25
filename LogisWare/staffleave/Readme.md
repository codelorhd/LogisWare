A Staff Leave Module aims to automate the process of staff asking for leave through the human resources.
Below are the stake holders of the module.
1. Human Resource
2. Staff

Human Resource is some one who does the following.
1. Specifies the leave staff can apply for.
2. Gives the period in weeks or days in which each staff can apply for any leave.
3. Approves or Rejects leave request by Staff with reason why such leave was rejected.
4. Monitors the leave requests by staff for each.

Staff
1. Request leave from the Human Resource
2. Can see the number of times request has been accepted or rejected

HumanResource and Staff are both user of this system

Leave
 - name
 - type
 - date_to_start
 - date_to_end
 
LeaveTypes
 - name
 - maximum_days
 - include_working_days
 - start_month
 - end_month
 - number_of_days_to_notify

 Requests
    - user
    - leave
    - date_requested
    - status: pending, rejected, approved
    - date_approved


Human Resource
- Add Leave Types

Staff 
 - Request Leave
 