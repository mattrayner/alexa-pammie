'use strict';

import { ResponseFactory, SkillBuilders, RequestHandler, HandlerInput } from 'ask-sdk';
import { RequestEnvelope, ResponseEnvelope, Response } from 'ask-sdk-model';
import { i18n } from './utils/I18N';
import { winston } from './utils/logger';

const DEBUG:boolean = true;

export async function handler(event: RequestEnvelope, context: any, callback: any): Promise<ResponseEnvelope> {
  const LaunchRequestHandler: RequestHandler = {
    canHandle(handlerInput: HandlerInput) {
      return handlerInput.requestEnvelope.request.type === 'LaunchRequest';
    },
    handle(handlerInput: HandlerInput) {
      const request = handlerInput.requestEnvelope.request;

      let response:Response = ResponseFactory.init()
        .speak(i18n.S(request, '.launch_request.text'))
        .reprompt(i18n.S(request, '.launch_request.reprompt'))
        .getResponse();

      return response;
    }
  };

  const HelpRequestHandler: RequestHandler = {
    canHandle(handlerInput: HandlerInput) {
      return handlerInput.requestEnvelope.request.type === 'IntentRequest'
        && handlerInput.requestEnvelope.request.intent.name === 'AMAZON.HelpIntent';
    },
    handle(handlerInput: HandlerInput) {
      const request = handlerInput.requestEnvelope.request;

      let response:Response = ResponseFactory.init()
        .speak(i18n.S(request, '.help_intent.text'))
        .reprompt(i18n.S(request, '.help_intent.reprompt'))
        .getResponse();

      return response;
    }
  };

  const SayLoveRequestHandler: RequestHandler = {
    canHandle(handlerInput: HandlerInput) {
      return handlerInput.requestEnvelope.request.type === 'IntentRequest'
        && handlerInput.requestEnvelope.request.intent.name === 'SayLoveIntent';
    },
    handle(handlerInput: HandlerInput) {
      const request = handlerInput.requestEnvelope.request;

      let chooseAResponse:number = Math.floor(Math.random() * 6) + 1; // 1-5
      let messageKey = `.say_love_intent.${chooseAResponse}.text`;

      let response:Response = ResponseFactory.init()
        .speak(i18n.S(request, messageKey))
        .withShouldEndSession(true)
        .getResponse();

      return response;
    }
  };

  const AskLoveRequestHandler: RequestHandler = {
    canHandle(handlerInput: HandlerInput) {
      return handlerInput.requestEnvelope.request.type === 'IntentRequest'
        && handlerInput.requestEnvelope.request.intent.name === 'AskLoveIntent';
    },
    handle(handlerInput: HandlerInput) {
      const request = handlerInput.requestEnvelope.request;

      let chooseAResponse:number = Math.floor(Math.random() * 6) + 1; // 1-6
      let messageKey = `.ask_love_intent.${chooseAResponse}.text`;

      let response:Response = ResponseFactory.init()
        .speak(i18n.S(request, messageKey))
        .withShouldEndSession(true)
        .getResponse();

      return response;
    }
  };

  const CloseHandler = {
    canHandle(handlerInput) {
      let isSessionEnded: boolean = (handlerInput.requestEnvelope.request.type === 'SessionEndedRequest');

      let isIntent:       boolean = (handlerInput.requestEnvelope.request.type === 'IntentRequest');
      let isCancel:       boolean = (isIntent && handlerInput.requestEnvelope.request.intent.name === 'AMAZON.CancelIntent');
      let isStop:         boolean = (isIntent && handlerInput.requestEnvelope.request.intent.name === 'AMAZON.StopIntent');

      return (isSessionEnded || isCancel || isStop)
    },
    handle(handlerInput) {
      return handlerInput.responseBuilder.getResponse();
    },
  };

  const UnhandledIntent = {
    canHandle() {
      return true;
    },
    handle(handlerInput) {
      const request = handlerInput.requestEnvelope.request;

      return handlerInput.responseBuilder
        .speak(i18n.S(request, '.unhandled_intent.text'))
        .reprompt(i18n.S(request, '.unhandled_intent.reprompt'))
        .getResponse();
    },
  };

  let skill = SkillBuilders.standard()
    .addRequestHandlers(
      LaunchRequestHandler,
      HelpRequestHandler,
      SayLoveRequestHandler,
      AskLoveRequestHandler,
      CloseHandler,
      UnhandledIntent
    ).create();

  try {
    if (DEBUG) {
      winston.debug("\n" + "******************* REQUEST  **********************");
      winston.debug(JSON.stringify(event, null, 2));
    }

    const responseEnvelope: ResponseEnvelope = await skill.invoke(event, context);

    if (DEBUG) {
      winston.debug("\n" + "******************* RESPONSE  **********************");
      winston.debug(JSON.stringify(responseEnvelope, null, 2));
    }

    return callback(null, responseEnvelope);
  } catch (error) {
    if (DEBUG) {
      winston.error(JSON.stringify(error, null, 2));
    }

    return callback(error);
  }
}