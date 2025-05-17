export async function handleError(response: Response): Promise<Error> {
  const responseBody = await response.text();
  const statusCode = response.status;

  const errorMessages: { [key: number]: string } = {
    400: `Bad request.`,
    401: "Unauthorized.",
    403: "Forbidden.",
    500: "Internal Server Error.",
  };

  const statusCodeMessage =
    errorMessages[statusCode] || `Unknown error (Status Code: ${statusCode})`;
  const errorMessage = `Error ${statusCode}: ${statusCodeMessage}. Response: ${responseBody}`;

  console.error("Error fetching data:", errorMessage);

  return new Error(errorMessage);
}
