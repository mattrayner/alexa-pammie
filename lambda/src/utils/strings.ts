'use strict';

let EnglishStrings = {
  ".launch_request.text" : "Welcome to Parliament. Say, 'what's on', to find out whats happening today at the Houses of Parliament. Say, who's my MP, to find out information about your MP. Or say, 'help', for more information.",
  ".launch_request.reprompt": "Try saying, 'what's on', or, who's my MP.",

  ".help_intent.text"     : "Parliament for Alexa, can tell you what's on today at the Houses of Parliament, or tell you who your MP is. Try saying, 'what's on', to hear about the events at both houses. Alternatively, say, 'whats on at the commons', or, 'whats on in the lords', to hear about the events at a specific house. To find out who your MP is, try saying, who's my MP.",
  ".help_intent.reprompt" : "Try saying, 'what's on', or, who's my MP.",

  ".say_love_intent.1.text": "Hippo loves you more than anything Llama",
  ".say_love_intent.2.text": "Hippo loves you so flipping much",
  ".say_love_intent.3.text": "Hippo loves you more than you can ever imagine",
  ".say_love_intent.4.text": "Matt Matt loves you more than anything Llama",
  ".say_love_intent.5.text": "Matt Matt loves you so flipping much",
  ".say_love_intent.6.text": "Matt Matt loves you more than you can ever imagine",

  ".ask_love_intent.1.text": "definitely Arthur",
  ".ask_love_intent.2.text": "definitely Lillian",
  ".ask_love_intent.3.text": "hmm... Harry?",
  ".ask_love_intent.4.text": "probably Hippo?",
  ".ask_love_intent.5.text": "probably Fluff Fluff?",
  ".ask_love_intent.6.text": "possibly Squish.",

  ".unhandled_intent.text"    : "Unhandled stuff",
  ".unhandled_intent.reprompt": "Unhandled reprompt",

  "TEST"        : "test english",
  "TEST_PARAMS" : "test with parameters {0} and {1}",
};

let FrenchStrings = {
  "TEST"        : "test français",
  "TEST_PARAMS" : "test avec paramètres {0} et {1}",
};

export const strings = {
  "en-GB": EnglishStrings,
  "en-US": EnglishStrings,
  "en-IN": EnglishStrings,
  "en-CA": EnglishStrings,
  "en-AU": EnglishStrings,
  "fr-FR": FrenchStrings
};
