'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var fetch = require('node-fetch');
var FormData = require('form-data');

var TelegramBotAPI = function () {
  function TelegramBotAPI(token, options) {
    _classCallCheck(this, TelegramBotAPI);

    if (!token) {
      throw new Error('"token" must be specified');
    }
    this.token = token;
    this.options = Object.assign({ endpoint: 'https://api.telegram.org' }, options);
  }

  _createClass(TelegramBotAPI, [{
    key: 'endpoint',
    value: function endpoint(method) {
      return this.options.endpoint + '/bot' + this.token + '/' + method;
    }
  }, {
    key: 'request',
    value: function request(method, options) {
      var _this = this;

      return Promise.resolve(options).then(this._prepareRequestBody).then(function (opts) {
        return fetch(_this.endpoint(method), opts);
      }).then(this._checkResponseType).then(function (response) {
        return response.json();
      }).then(this._checkResponseBody);
    }
  }, {
    key: '_required',
    value: function _required(parameters, required) {
      if (!parameters) {
        throw new Error('\'parameters\' object is required.');
      }
      required.forEach(function (prop) {
        if (!parameters[prop]) {
          throw new Error('\'' + prop + '\' parameter is required.');
        }
      });
    }
  }, {
    key: '_prepareRequestBody',
    value: function _prepareRequestBody(options) {
      var opts = Object.assign({ method: 'POST', headers: {} }, options);

      if (opts.body && opts.body.reply_markup && typeof opts.body.reply_markup !== 'string') {
        opts.body.reply_markup = JSON.stringify(opts.body.reply_markup);
      }

      if (opts.formData && !(opts.body instanceof FormData)) {
        var formData = new FormData();
        for (var field in opts.body) {
          if (opts.body.hasOwnProperty(field)) {
            formData.append(field, opts.body[field]);
          }
        }
        delete opts.formData;
        opts.body = formData;
        Object.assign(opts.headers, formData.getHeaders());
      } else if (opts.body && typeof opts.body !== 'string') {
        opts.body = JSON.stringify(opts.body);
        opts.headers['content-type'] = 'application/json';
      }
      return opts;
    }
  }, {
    key: '_checkResponseType',
    value: function _checkResponseType(response) {
      var contentType = response.headers.get('content-type');
      if (contentType !== 'application/json') {
        throw new Error('Telegram API wrong type of response: \'' + contentType + '\'');
      }
      return response;
    }
  }, {
    key: '_checkResponseBody',
    value: function _checkResponseBody(body) {
      if (body.ok !== true) {
        if (body.description != null && body.error_code != null) {
          var err = new Error('Telegram API: \'' + body.description + '\'');
          err.code = body.error_code;
          throw err;
        } else {
          throw new Error('Telegram API error: \'' + JSON.stringify(body) + '\'');
        }
      }
      return body;
    }
  }, {
    key: 'getMe',
    value: function getMe(options) {
      var opts = Object.assign({ method: 'GET' }, options);
      return this.request('getMe', opts);
    }
  }, {
    key: 'sendMessage',
    value: function sendMessage(parameters, options) {
      var _this2 = this;

      return new Promise(function (resolve) {
        _this2._required(parameters, ['chat_id', 'text']);

        resolve(Object.assign({}, options, { body: parameters }));
      }).then(function (opts) {
        return _this2.request('sendMessage', opts);
      });
    }
  }, {
    key: 'forwardMessage',
    value: function forwardMessage(parameters, options) {
      var _this3 = this;

      return new Promise(function (resolve) {
        _this3._required(parameters, ['chat_id', 'from_chat_id', 'message_id']);

        resolve(Object.assign({}, options, { body: parameters }));
      }).then(function (opts) {
        return _this3.request('forwardMessage', opts);
      });
    }
  }, {
    key: 'sendPhoto',
    value: function sendPhoto(parameters, options) {
      var _this4 = this;

      return new Promise(function (resolve) {
        _this4._required(parameters, ['chat_id', 'photo']);

        var opts = Object.assign({
          formData: typeof parameters.photo !== 'string'
        }, options, { body: parameters });

        resolve(opts);
      }).then(function (opts) {
        return _this4.request('sendPhoto', opts);
      });
    }
  }, {
    key: 'sendAudio',
    value: function sendAudio(parameters, options) {
      var _this5 = this;

      return new Promise(function (resolve) {
        _this5._required(parameters, ['chat_id', 'audio']);

        var opts = Object.assign({
          formData: typeof parameters.audio !== 'string'
        }, options, { body: parameters });

        resolve(opts);
      }).then(function (opts) {
        return _this5.request('sendAudio', opts);
      });
    }
  }, {
    key: 'sendDocument',
    value: function sendDocument(parameters, options) {
      var _this6 = this;

      return new Promise(function (resolve) {
        _this6._required(parameters, ['chat_id', 'document']);

        var opts = Object.assign({
          formData: typeof parameters.document !== 'string'
        }, options, { body: parameters });

        resolve(opts);
      }).then(function (opts) {
        return _this6.request('sendDocument', opts);
      });
    }
  }, {
    key: 'sendSticker',
    value: function sendSticker(parameters, options) {
      var _this7 = this;

      return new Promise(function (resolve) {
        _this7._required(parameters, ['chat_id', 'sticker']);

        var opts = Object.assign({
          formData: typeof parameters.sticker !== 'string'
        }, options, { body: parameters });

        resolve(opts);
      }).then(function (opts) {
        return _this7.request('sendSticker', opts);
      });
    }
  }, {
    key: 'sendVideo',
    value: function sendVideo(parameters, options) {
      var _this8 = this;

      return new Promise(function (resolve) {
        _this8._required(parameters, ['chat_id', 'video']);

        var opts = Object.assign({
          formData: typeof parameters.video !== 'string'
        }, options, { body: parameters });

        resolve(opts);
      }).then(function (opts) {
        return _this8.request('sendVideo', opts);
      });
    }
  }, {
    key: 'sendVoice',
    value: function sendVoice(parameters, options) {
      var _this9 = this;

      return new Promise(function (resolve) {
        _this9._required(parameters, ['chat_id', 'voice']);

        var opts = Object.assign({
          formData: typeof parameters.vioce !== 'string'
        }, options, { body: parameters });

        resolve(opts);
      }).then(function (opts) {
        return _this9.request('sendVoice', opts);
      });
    }
  }, {
    key: 'sendLocation',
    value: function sendLocation(parameters, options) {
      var _this10 = this;

      return new Promise(function (resolve) {
        _this10._required(parameters, ['chat_id', 'latitude', 'longitude']);

        resolve(Object.assign({}, options, { body: parameters }));
      }).then(function (opts) {
        return _this10.request('sendLocation', opts);
      });
    }
  }, {
    key: 'sendVenue',
    value: function sendVenue(parameters, options) {
      var _this11 = this;

      return new Promise(function (resolve) {
        _this11._required(parameters, ['chat_id', 'latitude', 'longitude', 'title', 'address']);

        resolve(Object.assign({}, options, { body: parameters }));
      }).then(function (opts) {
        return _this11.request('sendVenue', opts);
      });
    }
  }, {
    key: 'sendContact',
    value: function sendContact(parameters, options) {
      var _this12 = this;

      return new Promise(function (resolve) {
        _this12._required(parameters, ['chat_id', 'phone_number', 'first_name']);

        resolve(Object.assign({}, options, { body: parameters }));
      }).then(function (opts) {
        return _this12.request('sendContact', opts);
      });
    }
  }, {
    key: 'sendChatAction',
    value: function sendChatAction(parameters, options) {
      var _this13 = this;

      return new Promise(function (resolve) {
        _this13._required(parameters, ['chat_id', 'action']);

        resolve(Object.assign({}, options, { body: parameters }));
      }).then(function (opts) {
        return _this13.request('sendChatAction', opts);
      });
    }
  }, {
    key: 'getUserProfilePhotos',
    value: function getUserProfilePhotos(parameters, options) {
      var _this14 = this;

      return new Promise(function (resolve) {
        _this14._required(parameters, ['user_id']);

        resolve(Object.assign({}, options, { body: parameters }));
      }).then(function (opts) {
        return _this14.request('getUserProfilePhotos', opts);
      });
    }
  }, {
    key: 'getFile',
    value: function getFile(parameters, options) {
      var _this15 = this;

      return new Promise(function (resolve) {
        _this15._required(parameters, ['file_id']);

        resolve(Object.assign({}, options, { body: parameters }));
      }).then(function (opts) {
        return _this15.request('getFile', opts);
      }).then(function (response) {
        var url = _this15.options.endpoint + '/file/bot' + _this15.token + '/' + response.result.file_path;
        response.result.file_url = url;
        return response;
      });
    }
  }, {
    key: 'kickChatMember',
    value: function kickChatMember(parameters, options) {
      var _this16 = this;

      return new Promise(function (resolve) {
        _this16._required(parameters, ['chat_id', 'user_id']);

        resolve(Object.assign({}, options, { body: parameters }));
      }).then(function (opts) {
        return _this16.request('kickChatMember', opts);
      });
    }
  }, {
    key: 'unbanChatMember',
    value: function unbanChatMember(parameters, options) {
      var _this17 = this;

      return new Promise(function (resolve) {
        _this17._required(parameters, ['chat_id', 'user_id']);

        resolve(Object.assign({}, options, { body: parameters }));
      }).then(function (opts) {
        return _this17.request('unbanChatMember', opts);
      });
    }
  }, {
    key: 'getUpdates',
    value: function getUpdates(parameters, options) {
      var opts = Object.assign({}, options, { body: parameters });
      return this.request('getUpdates', opts);
    }
  }, {
    key: 'setWebhook',
    value: function setWebhook(parameters, options) {
      var _this18 = this;

      return new Promise(function (resolve) {
        var opts = Object.assign({}, options, { body: parameters });
        if (parameters && parameters.certificate) {
          opts.formData = true;
        }
        resolve(opts);
      }).then(function (opts) {
        return _this18.request('setWebhook', opts);
      });
    }

    /* TODO tests for callback queries */

  }, {
    key: 'answerCallbackQuery',
    value: function answerCallbackQuery(parameters, options) {
      var _this19 = this;

      return new Promise(function (resolve) {
        _this19._required(parameters, ['callback_query_id']);

        resolve(Object.assign({}, options, { body: parameters }));
      }).then(function (opts) {
        return _this19.request('answerCallbackQuery', opts);
      });
    }

    /* TODO tests for inline queries */

  }, {
    key: 'answerInlineQuery',
    value: function answerInlineQuery(parameters, options) {
      var _this20 = this;

      return new Promise(function (resolve) {
        _this20._required(parameters, ['inline_query_id', 'results']);

        if (typeof parameters.results !== 'string') {
          parameters.results = JSON.strigify(parameters.results);
        }
        resolve(Object.assign({}, options, { body: parameters }));
      }).then(function (opts) {
        return _this20.request('answerInlineQuery', opts);
      });
    }

    /**
     * Updating messages
     * https://core.telegram.org/bots/api#updating-messages
     */

    /**
     * https://core.telegram.org/bots/api#editmessagetext
     */

  }, {
    key: 'editMessageText',
    value: function editMessageText(parameters, options) {
      var _this21 = this;

      return new Promise(function (resolve) {
        _this21._required(parameters, ['text']);

        resolve(Object.assign({}, options, { body: parameters }));
      }).then(function (opts) {
        return _this21.request('editMessageText', opts);
      });
    }

    /**
     * https://core.telegram.org/bots/api#editmessagecaption
     */

  }, {
    key: 'editMessageCaption',
    value: function editMessageCaption(parameters, options) {
      var _this22 = this;

      return new Promise(function (resolve) {
        resolve(Object.assign({}, options, { body: parameters }));
      }).then(function (opts) {
        return _this22.request('editMessageCaption', opts);
      });
    }

    /**
     * https://core.telegram.org/bots/api#editmessagereplymarkup
     */

  }, {
    key: 'editMessageReplyMarkup',
    value: function editMessageReplyMarkup(parameters, options) {
      var _this23 = this;

      return new Promise(function (resolve) {
        resolve(Object.assign({}, options, { body: parameters }));
      }).then(function (opts) {
        return _this23.request('editMessageReplyMarkup', opts);
      });
    }
  }]);

  return TelegramBotAPI;
}();

module.exports = TelegramBotAPI;