// Copyright 2017 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
'use strict';

var Main_data;
var body_text;
let timeout = null;
function callback_Summarizer(response){
    //console.log(response.data);
    //alert(response.data);
    body_text=response.data
   $.ajax({
    url: "http://localhost:5000/sayakext/outer/",
    type: "POST",
    dataType: "json",
  contentType: "application/json",
    data:  JSON.stringify({
	"query":body_text
    }),
    dataType: "json",
    success: function(data) {
        Main_data=data;
        console.log(data);
        $('#loading_gif').hide(); 
        $('#main_selection_window').show()
        },
        error: function(e) {
            console.log(e);
          },
    });
   
   
    
}

$('#btn_summarizer').click(function(){
    $('#main_window').hide();
    
//  $.post("http://localhost:5000/sayakext/outer",
//  {
//    query: "Donald Duck"
//    
//  },
//  function(data, status){
//    alert("Data: " + data + "\nStatus: " + status);
//  });
      var text='Summarize'
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
                chrome.tabs.sendMessage(tabs[0].id, {data: text}, callback_Summarizer);
            }); 
    
    
    
    $('#loading_gif').show();
   
    
});
function callback_findURL(response){
    console.log(response.data);
    //alert(response.data);
   
   $('#terms_url').text(response.data);
   $("#terms_url").attr("href",response.data);
    
}

$('#btn_findLink').click(function(){
    $('#main_window').hide();
    $('#Find_Link_div').show();
    
    var text='FindLink'
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
                chrome.tabs.sendMessage(tabs[0].id, {data: text}, callback_findURL);
            });   
});

$('#btn_metricesScore').click(function(){
    $('#main_selection_window').hide();
    $('#metricScores_div').show();
    $('#readability_score').text(Math.round(Main_data["readability_matrix"]["reading_ease"]));
    $('#smog_index').text(Math.round(Main_data["readability_matrix"]["smog_index"]));
    $('#word_count').text(Math.round(Main_data["readability_matrix"]["word_count"]));
    $('#readability_progress_circle').addClass("p"+Math.round(Main_data["readability_matrix"]["reading_ease"]))
    $('#smog_progress_circle').addClass("p"+Math.round(Main_data["readability_matrix"]["smog_index"]))
    $('#wordcount_progress_circle').addClass("p"+Math.round(Main_data["readability_matrix"]["word_count"]))
    
});

$('#btn_showSummary').click(function(){
    $('#main_selection_window').hide();
    $('#summarizer_div').show();
    $('#summary_para').text(Main_data["summary"]);
    
    
});
$('#btn_clusteringsummary').click(function(){
    $('#main_selection_window').hide();
    $('#clustering_summary').show();
    $('#first_part_summary').text(Main_data["clusters"]["First Party Collection/Use"]);
    $('#third_party_summary').text(Main_data["clusters"]["Third Party Sharing/Collection"]);
    $('#user_choice_summary').text(Main_data["clusters"]["User Choice/Control"]);
    $('#data_security_summary').text(Main_data["clusters"]["Data Security"]);
    $('#international_audience_summary').text(Main_data["clusters"]["International and Specific Audiences"]);
    $('#user_access_summary').text(Main_data["clusters"]["User Access, Edit and Deletion"]);
    $('#policy_change_summary').text(Main_data["clusters"]["Policy Change"]);
    $('#data_retention_summary').text(Main_data["clusters"]["Data Retention"]);
    $('#donot_track_summary').text(Main_data["clusters"]["Do Not Track"]);
    $('#other_summary').text(Main_data["clusters"]["Other"]);
    //$('#data_security_summary').text(Main_data["clusters"]["User Access, Edit and Deletion"]);
    
    
    
});
$('#btn_clusteringNER').click(function(){
    $('#main_selection_window').hide();
    $('#clustering_NER').show();
    $('#article_NER_summary').text(Main_data["ner"]["article"]);
    $('#court_NER_summary').text(Main_data["ner"]["court"]);
    $('#legality_NER_summary').text(Main_data["ner"]["legality"]);
    $('#activity_NER_summary').text(Main_data["ner"]["activity"]);
    
});

$('.gotomain').click(function(){
    $('#clustering_summary').hide();
    $('#metricScores_div').hide();
    $('#summarizer_div').hide();
    $('#clustering_NER').hide();
    $('#compare_selection_div').hide();
    $('#compare_div').hide();
    $('#main_selection_window').show();
    
});

$('#btn_ContinueCompare').click(function(){
    $('#compare_selection_div').hide();
     $('#loading_gif').show();
    var comp_site_name=$( "#target_site option:selected" ).val();
       $.ajax({
        url: "http://localhost:5000/sayakext/getCompareSitesummary/",
        type: "POST",
        dataType: "json",
      contentType: "application/json",
        data:  JSON.stringify({
        "query":comp_site_name
        }),
        dataType: "json",
        success: function(data) {
            console.log(data);
            $('#loading_gif').hide(); 
            $('#compare_div').show();
            
            
            $('#first_part_summary_self').text(Main_data["clusters_summarized"]["First Party Collection/Use"]);
            $('#third_party_summary_self').text(Main_data["clusters_summarized"]["Third Party Sharing/Collection"]);
            $('#user_choice_summary_self').text(Main_data["clusters_summarized"]["User Choice/Control"]);
            $('#data_security_summary_self').text(Main_data["clusters_summarized"]["Data Security"]);
            $('#international_audience_summary_self').text(Main_data["clusters_summarized"]["International and Specific Audiences"]);
            $('#user_access_summary_self').text(Main_data["clusters_summarized"]["User Access, Edit and Deletion"]);
            $('#policy_change_summary_self').text(Main_data["clusters_summarized"]["Policy Change"]);
            $('#data_retention_summary_self').text(Main_data["clusters_summarized"]["Data Retention"]);
            $('#donot_track_summary_self').text(Main_data["clusters_summarized"]["Do Not Track"]);
            $('#other_summary_self').text(Main_data["clusters_summarized"]["Other"]);
            
             $('#first_part_summary_target').text(data["clusters_summarized"]["First Party Collection/Use"]);
            $('#third_party_summary_target').text(data["clusters_summarized"]["Third Party Sharing/Collection"]);
            $('#user_choice_summary_target').text(data["clusters_summarized"]["User Choice/Control"]);
            $('#data_security_summary_target').text(data["clusters_summarized"]["Data Security"]);
            $('#international_audience_summary_target').text(data["clusters_summarized"]["International and Specific Audiences"]);
            $('#user_access_summary_target').text(data["clusters_summarized"]["User Access, Edit and Deletion"]);
            $('#policy_change_summary_target').text(data["clusters_summarized"]["Policy Change"]);
            $('#data_retention_summary_target').text(data["clusters_summarized"]["Data Retention"]);
            $('#donot_track_summary_target').text(data["clusters_summarized"]["Do Not Track"]);
            $('#other_summary_target').text(data["clusters_summarized"]["Other"]);
            
            $('.target_site_heading').text(comp_site_name);
            },
            error: function(e) {
                console.log(e);
              },
        });
    
});
$('#btn_comparison').click(function(){
    $('#main_selection_window').hide();
    $('#compare_selection_div').show();
    
});


//$('#clustering_summary_detail_opt label input').click(function() {
//    //alert($(this).val());
//    alert("Mateen");
//    // TODO: insert whatever you want to do with $(this) here
//});


$("#clustering_summary_detail_opt :input").change(function() {
    var selected_value=$(this).val()
    if(selected_value=='detailed'){
        
    $('#first_part_summary').text(Main_data["clusters"]["First Party Collection/Use"]);
    $('#third_party_summary').text(Main_data["clusters"]["Third Party Sharing/Collection"]);
    $('#user_choice_summary').text(Main_data["clusters"]["User Choice/Control"]);
    $('#data_security_summary').text(Main_data["clusters"]["Data Security"]);
    $('#international_audience_summary').text(Main_data["clusters"]["International and Specific Audiences"]);
    $('#user_access_summary').text(Main_data["clusters"]["User Access, Edit and Deletion"]);
    $('#policy_change_summary').text(Main_data["clusters"]["Policy Change"]);
    $('#data_retention_summary').text(Main_data["clusters"]["Data Retention"]);
    $('#donot_track_summary').text(Main_data["clusters"]["Do Not Track"]);
    $('#other_summary').text(Main_data["clusters"]["Other"]);
        
    }
    if(selected_value=='summerized')
        {
    $('#first_part_summary').text(Main_data["clusters_summarized"]["First Party Collection/Use"]);
    $('#third_party_summary').text(Main_data["clusters_summarized"]["Third Party Sharing/Collection"]);
    $('#user_choice_summary').text(Main_data["clusters_summarized"]["User Choice/Control"]);
    $('#data_security_summary').text(Main_data["clusters_summarized"]["Data Security"]);
    $('#international_audience_summary').text(Main_data["clusters_summarized"]["International and Specific Audiences"]);
    $('#user_access_summary').text(Main_data["clusters_summarized"]["User Access, Edit and Deletion"]);
    $('#policy_change_summary').text(Main_data["clusters_summarized"]["Policy Change"]);
    $('#data_retention_summary').text(Main_data["clusters_summarized"]["Data Retention"]);
    $('#donot_track_summary').text(Main_data["clusters_summarized"]["Do Not Track"]);
    $('#other_summary').text(Main_data["clusters_summarized"]["Other"]);
        }
    //alert($(this).val());
    
});

$(document).on('input', '#summary_slider', function() {
    clearTimeout(timeout);
    
        // Make a new timeout set to go off in 1000ms (1 second)
    timeout = setTimeout(function () {
        $('#loading_gif').show(); 
        var slider_val=  document.getElementById("summary_slider").value;//10; //$(this).val();
        slider_val=slider_val/1000
        $.ajax({
        url: "http://localhost:5000/sayakext/changesliderrequest/",
        type: "POST",
        dataType: "json",
      contentType: "application/json",
        data:  JSON.stringify({
        "query":body_text,
        "selection":"summary",
        "slidervalue":slider_val
        }),
        dataType: "json",
        success: function(data) {
            $('#loading_gif').hide(); 
            $('#summary_para').text(data);
            },
            error: function(e) {
                console.log(e);
              },
        });
//       alert("POP" );
    }, 700);

});

$(document).on('input', '#cluster_slider', function() {
    clearTimeout(timeout);
    
        // Make a new timeout set to go off in 1000ms (1 second)
    timeout = setTimeout(function () {
        $('#loading_gif').show(); 
        var slider_val=  document.getElementById("cluster_slider").value;//10; //$(this).val();
        slider_val=slider_val/1000
        $.ajax({
        url: "http://localhost:5000/sayakext/changesliderrequest/",
        type: "POST",
        dataType: "json",
      contentType: "application/json",
        data:  JSON.stringify({
        "query":body_text,
        "selection":"cluster",
        "slidervalue":slider_val
        }),
        dataType: "json",
        success: function(data) {
            $('#loading_gif').hide(); 
            $('#first_part_summary').text(data["clusters"]["First Party Collection/Use"]);
            $('#third_party_summary').text(data["clusters"]["Third Party Sharing/Collection"]);
            $('#user_choice_summary').text(data["clusters"]["User Choice/Control"]);
            $('#data_security_summary').text(data["clusters"]["Data Security"]);
            $('#international_audience_summary').text(data["clusters"]["International and Specific Audiences"]);
            $('#user_access_summary').text(data["clusters"]["User Access, Edit and Deletion"]);
            $('#policy_change_summary').text(data["clusters"]["Policy Change"]);
            $('#data_retention_summary').text(data["clusters"]["Data Retention"]);
            $('#donot_track_summary').text(data["clusters"]["Do Not Track"]);
            $('#other_summary').text(data["clusters"]["Other"]);},
            error: function(e) {
                $('#loading_gif').hide(); 
                console.log(e);
              },
        });
//       alert("POP" );
    }, 700);

});