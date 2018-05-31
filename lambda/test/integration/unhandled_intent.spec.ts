'use strict';

import 'mocha';

import { RequestEnvelope, ResponseEnvelope } from 'ask-sdk-model';

import { handler as skill } from '../../src/index';

import { Assertion } from '../utils/Assertion';

import * as r from '../fixtures/requests/unhandled_intent.json'; // tslint:disable-line

const request:RequestEnvelope = <RequestEnvelope>r;
const assert = new Assertion();
let skill_response:ResponseEnvelope;

describe('Pammie : UnhandledIntent', function () {
  beforeEach(() => {
    this.timeout(5000);

    return new Promise((resolve, reject) => {
      // prepare the database
      skill(request, null, (error, responseEnvelope) => {
        skill_response = responseEnvelope;
        resolve();
      });
    });
  });

  afterEach(() => {
    skill_response = null;
  });

  it('it responds with valid response structure ', () => {
    assert.correctResponseStructure(skill_response);
  });

  it('it responses with output speech ', () => {
    assert.correctOutputSpeechStructure(skill_response);
  });

  it('it responds with the expected output speech', () => {
    assert.correctOutputSpeechIncludesText(skill_response, 'Unhandled stuff');
  });

  it('it responds with reprompt speech', () => {
    assert.correctRepromptSpeechStructure(skill_response);
  });

  it('it responds with the expected reprompt speech', () => {
    assert.correctRepromptSpeechIncludesText(skill_response, 'Unhandled reprompt');
  });

  it('it does not close the session ', () => {
    assert.correctSessionStatus(skill_response, false);
  });
});
