HTTP Methods Tested

1. GET
   - Used to retrieve data from the server.

2. POST
   - Used to create new resources or submit data.

3. PATCH
   - Used to update specific fields of an existing resource.


Status Codes

200 OK
- Request completed successfully.

201 Created
- Resource created successfully.

404 Not Found
- Requested resource or endpoint does not exist.

HTTP Status Codes — Understanding Server Responses
2xx Success Codes:

200 OK — Request succeeded, data returned
201 Created — New resource successfully created (used with POST)
204 No Content — Request succeeded, no data to return (used with DELETE, PATCH)

4xx Client Error Codes (Your Fault):

400 Bad Request — You sent invalid data (wrong format, missing required field, wrong data type)
401 Unauthorized — You need to authenticate/login (missing or invalid credentials)
403 Forbidden — You're logged in but don't have permission to do this action
404 Not Found — Resource doesn't exist (user deleted, endpoint doesn't exist)

5xx Server Error Codes (Their Fault):

500 Internal Server Error — Backend bug or unhandled exception
503 Service Unavailable — Server is down for maintenance or overloaded