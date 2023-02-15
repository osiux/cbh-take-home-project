# Ticket Breakdown
We are a staffing company whose primary purpose is to book Agents at Shifts posted by Facilities on our platform. We're working on a new feature which will generate reports for our client Facilities containing info on how many hours each Agent worked in a given quarter by summing up every Shift they worked. Currently, this is how the process works:

- Data is saved in the database in the Facilities, Agents, and Shifts tables
- A function `getShiftsByFacility` is called with the Facility's id, returning all Shifts worked that quarter, including some metadata about the Agent assigned to each
- A function `generateReport` is then called with the list of Shifts. It converts them into a PDF which can be submitted by the Facility for compliance.

## You've been asked to work on a ticket. It reads:

**Currently, the id of each Agent on the reports we generate is their internal database id. We'd like to add the ability for Facilities to save their own custom ids for each Agent they work with and use that id when generating reports for them.**


Based on the information given, break this ticket down into 2-5 individual tickets to perform. Provide as much detail for each ticket as you can, including acceptance criteria, time/effort estimates, and implementation details. Feel free to make informed guesses about any unknown details - you can't guess "wrong".


You will be graded on the level of detail in each ticket, the clarity of the execution plan within and between tickets, and the intelligibility of your language. You don't need to be a native English speaker, but please proof-read your work.

## Your Breakdown Here

### Ticket 1: Modify Agents table to add custom_id field

We need to modify `Agents` table and add a `custom_id` string field, which shound not have any default value and can be null.

Acceptance criteria:
 * Have a new field named `custom_id` in `Agents` table
 * Nothing else breaks by this change

### Ticket 2: Add Custom ID field in agent management page

We need to add a way for the customer to update the Custom ID for their agents. For this, add a new field in the Agent management section named "Custom ID", which value is a string and is not required. If a value is sent, save this value to the `custom_id` field in the corresponding row in `Agents` database.

Acceptance criteria:
 * Working new Custom ID field in Agent management page
 * Any data that the user input in said field, needs to be saved and retrieved from the database when looking at the agent profile.

### Ticket 3: Use Agent Custom ID in generated PDF report

Currently we use a database generated ID when displaying an Agent information in the PDF report, we want to use the customer Custom ID assigned to each agent, if it's available.

Modify `getShiftsByFacility` to return Custom ID in Agent metadata.
Modify `generateReport` to use Agent Custom ID if it exist, or if the value is empty, dosplay database generated ID.

Acceptance criteria:
 * On the generated PDF report we need to see the Agent Custom ID, if there is any assigned to the correspondent agent.
 * We should see the database generated ID for Agents which the customer has not assigned a Custom ID.