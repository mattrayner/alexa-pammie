'use strict';

import 'mocha';

import { RequestEnvelope, ResponseEnvelope } from 'ask-sdk-model';

import { handler as skill } from '../../src/index';

import { Assertion } from '../utils/Assertion';

import * as r from '../fixtures/requests/ask_love_intent.json'; // tslint:disable-line

const request:RequestEnvelope = <RequestEnvelope>r;
const assert = new Assertion();
let skill_response:ResponseEnvelope;

describe('Pammie : AskLoveIntent', function () {
  beforeEach(() => {
    this.timeout(5000);

    return new Promise((resolve, reject) => {
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
    assert.correctOutputSpeechIncludesTextMatch(skill_response, /(definitely Arthur|definitely Lillian|hmm\.\.\. Harry?|probably Hippo?|probably Fluff Fluff?|possibly Squish)/g);
  });

  it('it responds without reprompt speech', () => {
    assert.withoutRepromptSpeechStructure(skill_response);
  });

  it('it does not close the session ', () => {
    assert.correctSessionStatus(skill_response, true);
  });
});
