var token = "[token from FCM]";
var topicName = "news";
var topicUrl = "https://iid.googleapis.com/iid/v1/" + token + "/rel/topics/" + topicName;
$.ajax({
    url: topicUrl,
    type: 'post',
    data: {},
    headers: {
        "Content-Type": 'application/json',
        "Authorization": '[project key]'
    },
    dataType: 'json',
    success: function (data) {
        console.log("subscribe to topic: ", data);
    }
});