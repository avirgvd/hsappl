// (C) Copyright 2016 Hewlett Packard Enterprise Development LP
'use strict';

var hsIndices = {
  'stagedFiles': {
    'index': 'stagedfiles',
    'type': 'stagedfiles',
    'id': 'stagedfile',
    'body': {
      'settings': {
        'number_of_shards': 1,
        'number_of_replicas': 1
      },
      'mappings': {
      }
    }
  },
  'photos': {
    'index': 'photos',
    'type': 'photos',
    'id': 'photos',
    'body': {
      'settings': {
        'number_of_shards': 1,
        'number_of_replicas': 1
      },
      'mappings': {
      }
    }
  },
  'documents': {
    'index': 'documents',
    'type': 'documents',
    'id': 'documents',
    'body': {
      'settings': {
        'number_of_shards': 1,
        'number_of_replicas': 1
      },
      'mappings': {
      }
    }
  },
  'digitallibrary': {
    'index': 'digitallibrary',
    'type': 'digitallibrary',
    'id': 'digitallibrary',
    'body': {
      'settings': {
        'number_of_shards': 1,
        'number_of_replicas': 1
      },
      'mappings': {
      }
    }
  },
  'messages': {
    'index': 'messages',
    'type': 'messages',
    'id': 'messages',
    'body': {
      'settings': {
        'number_of_shards': 1,
        'number_of_replicas': 1
      },
      'mappings': {
      }
    }
  },
  'contacts': {
    'index': 'contacts',
    'type': 'contacts',
    'id': 'contacts',
    'body': {
      'settings': {
        'number_of_shards': 1,
        'number_of_replicas': 1
      },
      'mappings': {
      }
    }
  }
};


var defaultAnalysis = {
  'filter': {
    'edgengram_filter': {
      'type': 'edge_ngram',
      'min_gram': 1,
      'max_gram': 25,
      'token_chars': ['letter', 'digit', 'punctuation', 'symbol']
    },
    'ngram_filter': { // Add 'ngram_filter', this will allow to search text in the middle of the word, Ex. '201124GR', the part of the S/N '2M201124GR'
      'type': 'ngram',
      'min_gram': 1,
      'max_gram': 40, // In order to search longer host name, uuid, Ex. 'ci-005056b44e75.vse.rdlabs.hpecorp.net','30373737-3237-4D32-3230-313531364752'
      'token_chars': ['letter', 'digit', 'punctuation', 'symbol']
    },
    'truncate_filter_weight': {
      'type': 'truncate',
      'length': 40 //Truncate the token if longer than the length, to avoid the case of cannot find the host name longer than 40
    }
  },
  'analyzer': {
    'edgengram_analyzer': {
      'type': 'custom',
      'tokenizer': 'whitespace',
      'filter': ['lowercase', 'edgengram_filter'] //Modified by change back to 'edgengram_filter' from 'ngram_filter
    },
    'whitespace_analyzer': {
      'type': 'custom',
      'tokenizer': 'whitespace',
      'filter': ['lowercase', 'asciifolding']
    },
    'ngram_analyzer': { //This is used to index the _partialMatchFields, to support partial match
      'type': 'custom',
      'tokenizer': 'whitespace',
      'filter': ['lowercase', 'ngram_filter']
    },
    'ngram_analyzer_weight': {
      'type': 'custom',
      'tokenizer': 'keyword', //This is used to index the _weightFields field, especially to index the token include whitespace, Ex. "bay 7"
      'filter': ['lowercase', 'ngram_filter']
    },
    'keyword_analyzer_weight': { // This is used to search in _weightFields while user input query string start and end with \"
      'type': 'custom',
      'tokenizer': 'keyword',// 'keyword' tokenizer emits the entire input as a single output
      'filter': ['lowercase', 'asciifolding', 'truncate_filter_weight']
    }
  }
};

exports.hsIndices = hsIndices;
exports.defaultAnalysis = defaultAnalysis;
