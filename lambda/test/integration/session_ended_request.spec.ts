'use strict';

import 'mocha';

import { RequestEnvelope, ResponseEnvelope } from 'ask-sdk-model';

import { handler as skill } from '../../src/index';

import { Assertion } from '../utils/Assertion';

import * as r from '../fixtures/requests/session_ended_intent.json'; // tslint:disable-line

const request:RequestEnvelope = <RequestEnvelope>r;
const assert = new Assertion();
let skill_response:ResponseEnvelope;

describe('Pammie : SessionEndedIntent', function () {
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
});
