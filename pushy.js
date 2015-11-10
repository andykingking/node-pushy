var Needle  = require('needle'),
    Q       = require('q');

function Pushy(apiKey){
    this.setApiKey(apiKey);
}

Pushy.prototype.setApiKey = function(apiKey){
    this._apiKey = apiKey;
};

Pushy.prototype.url = function(){
    // Require apiKey to be present
    if (typeof this._apiKey == 'undefined') {
        throw new Error('Pushy API key not set');
    }
    return 'https://pushy.me/push?api_key=' + this._apiKey;
};

Pushy.prototype.send = function(data, userTokens){
    // Require both data and userTokens parameters
    if (typeof data == 'undefined'){
        throw new Error('Please provide data to send');
    }
    if (typeof userTokens == 'undefined') {
        throw new Error('Please provide userTokens to notify');
    }

    // Return a promise
    var deferred = Q.defer();

    // Prepare data to send to Pushy
    var _data = {
        registration_ids: userTokens,
        data: data
    };

    // Prepare headers for API request
    var options = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    // POST to Pushy API
    Needle.post(this.url(), _data, options, function (error, response) {
        if (error || response.statusCode !== 200) {
            // If the request fails
            deferred.reject(new Error('Failed to send to Pushy server'));
        } else {
            // If the request succeeds
            deferred.resolve(response.statusCode);
        }
    });
    return deferred.promise;
};

module.exports = function(apiKey){
    return new Pushy(apiKey);
}
