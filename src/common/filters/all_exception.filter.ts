import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { _400, _404, _500 } from '../constants/error-messages';
import { Response } from 'express';
@Catch()
export class AllExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost): Response {
    const context = host.switchToHttp();
    const response = context.getResponse<Response>();

    console.log(exception, ' my exception');

    if (exception['code'] === 'ENOENT') {
      return response.status(HttpStatus.NOT_FOUND).json(_404.FILE_NOT_FOUND);
    }

    // Errors that will be handled and get thrown within the application
    if (exception instanceof HttpException) {
      const statusCode = exception.getStatus();
      const responseMsg = exception.getResponse();

      // Customize response for non-supported uploaded file size
      if (statusCode === HttpStatus.PAYLOAD_TOO_LARGE)
        return response
          .status(HttpStatus.BAD_REQUEST)
          .json(_400.UPLOADED_FILE_IS_TOO_LARGE);

      // Transform the exception error as the error code
      if (responseMsg['error']) {
        responseMsg['code'] = responseMsg['error']
          .split(' ')
          ?.join('_')
          ?.toUpperCase();
        delete responseMsg['error'];
      }

      // Error which returns message as an array, show each item independently
      // Generally these are the errors which will be thrown by the validation pipes
      if (responseMsg['message'] && Array.isArray(responseMsg['message'])) {
        responseMsg['message'] = responseMsg['message'][0];
      }

      delete responseMsg['statusCode'];
      return response.status(exception.getStatus()).json(responseMsg);
    }

    // Unhandled exceptions
    return response
      .status(HttpStatus.INTERNAL_SERVER_ERROR)
      .json(_500.INTERNAL_SERVER_ERROR);
  }
}
