var pc;
const awords = 2500;
var apara = awords/150;
var acharacters = awords*5;
var asentences = awords/apara;
var areadingtime = apara/2;
var c, w, p, autosave2;
for (pc = 1; pc < 6; pc++) {
setProgress('progress-container' + pc, "#7E8490", 1);
}



var input = document.querySelectorAll('textarea')[0],
  characterCount = document.querySelector('#characterCount'),
  wordCount = document.querySelector('#wordCount'),
  sentenceCount = document.querySelector('#sentenceCount'),
  paragraphCount = document.querySelector('#paragraphCount'),
  readingTime = document.querySelector('#readingTime'),
  readability = document.querySelector('#pill-progress-container5'),
  topKeywords = document.querySelector('#topKeywords');
  
  autosave2 = localStorage.getItem('autosave2');
  if (autosave2 ==true) {
  document.querySelectorAll('textarea')[0].value = localStorage.getItem('word-article');
  document.getElementById('autosaveicon2').setAttribute('style', 'fill: green');
  } else {
  document.getElementById('autosaveicon2').setAttribute('style', 'fill: black');
  }

function countwords() {

  if (autosave2 == 'true'){
   localStorage.setItem("word-article", input.value);
  }

  characterCount.innerHTML = input.value.length;

  var words = input.value.match(/\b[-?(\w+)?]+\b/gi);

  if (words) {
    wordCount.innerHTML = words.length;
  } else {
    wordCount.innerHTML = 0;
  }

  if (words) {
    var sentences = input.value.split(/[.|!|?]+/g);
    sentenceCount.innerHTML = sentences.length - 1;
  } else {
    sentenceCount.innerHTML = 0;
  }

  if (words) {

    var paragraphs = input.value.replace(/\n$/gm, '').split(/\n/);
    paragraphCount.innerHTML = paragraphs.length;
  } else {
    paragraphCount.innerHTML = 0;
  }

  if (words) {
    var seconds = Math.floor(words.length * 60 / 275);
 
    if (seconds > 59) {
      var minutes = Math.floor(seconds / 60);
      seconds = seconds - minutes * 60;
      readingTime.innerHTML = minutes + "m " + seconds + "s";
    } else {
      readingTime.innerHTML = seconds + "s";
    }
  } else {
    readingTime.innerHTML = "0s";
  }


  if (words) {

    var nonStopWords = [];
    var stopWords = ["a", "able", "about", "above", "abst", "accordance", "according", "accordingly", "across", "act", "actually", "added", "adj", "affected", "affecting", "affects", "after", "afterwards", "again", "against", "ah", "all", "almost", "alone", "along", "already", "also", "although", "always", "am", "among", "amongst", "an", "and", "announce", "another", "any", "anybody", "anyhow", "anymore", "anyone", "anything", "anyway", "anyways", "anywhere", "apparently", "approximately", "are", "aren", "arent", "arise", "around", "as", "aside", "ask", "asking", "at", "auth", "available", "away", "awfully", "b", "back", "be", "became", "because", "become", "becomes", "becoming", "been", "before", "beforehand", "begin", "beginning", "beginnings", "begins", "behind", "being", "believe", "below", "beside", "besides", "between", "beyond", "biol", "both", "brief", "briefly", "but", "by", "c", "ca", "came", "can", "cannot", "can't", "cause", "causes", "certain", "certainly", "co", "com", "come", "comes", "contain", "containing", "contains", "could", "couldnt", "d", "date", "did", "didn't", "different", "do", "does", "doesn't", "doing", "done", "don't", "down", "downwards", "due", "during", "e", "each", "ed", "edu", "effect", "eg", "eight", "eighty", "either", "else", "elsewhere", "end", "ending", "enough", "especially", "et", "et-al", "etc", "even", "ever", "every", "everybody", "everyone", "everything", "everywhere", "ex", "except", "f", "far", "few", "ff", "fifth", "first", "five", "fix", "followed", "following", "follows", "for", "former", "formerly", "forth", "found", "four", "from", "further", "furthermore", "g", "gave", "get", "gets", "getting", "give", "given", "gives", "giving", "go", "goes", "gone", "got", "gotten", "h", "had", "happens", "hardly", "has", "hasn't", "have", "haven't", "having", "he", "hed", "hence", "her", "here", "hereafter", "hereby", "herein", "heres", "hereupon", "hers", "herself", "hes", "hi", "hid", "him", "himself", "his", "hither", "home", "how", "howbeit", "however", "hundred", "i", "id", "ie", "if", "i'll", "im", "immediate", "immediately", "importance", "important", "in", "inc", "indeed", "index", "information", "instead", "into", "invention", "inward", "is", "isn't", "it", "itd", "it'll", "its", "itself", "i've", "j", "just", "k", "keep", "keeps", "kept", "kg", "km", "know", "known", "knows", "l", "largely", "last", "lately", "later", "latter", "latterly", "least", "less", "lest", "let", "lets", "like", "liked", "likely", "line", "little", "'ll", "look", "looking", "looks", "ltd", "m", "made", "mainly", "make", "makes", "many", "may", "maybe", "me", "mean", "means", "meantime", "meanwhile", "merely", "mg", "might", "million", "miss", "ml", "more", "moreover", "most", "mostly", "mr", "mrs", "much", "mug", "must", "my", "myself", "n", "na", "name", "namely", "nay", "nd", "near", "nearly", "necessarily", "necessary", "need", "needs", "neither", "never", "nevertheless", "new", "next", "nine", "ninety", "no", "nobody", "non", "none", "nonetheless", "noone", "nor", "normally", "nos", "not", "noted", "nothing", "now", "nowhere", "o", "obtain", "obtained", "obviously", "of", "off", "often", "oh", "ok", "okay", "old", "omitted", "on", "once", "one", "ones", "only", "onto", "or", "ord", "other", "others", "otherwise", "ought", "our", "ours", "ourselves", "out", "outside", "over", "overall", "owing", "own", "p", "page", "pages", "part", "particular", "particularly", "past", "per", "perhaps", "placed", "please", "plus", "poorly", "possible", "possibly", "potentially", "pp", "predominantly", "present", "previously", "primarily", "probably", "promptly", "proud", "provides", "put", "q", "que", "quickly", "quite", "qv", "r", "ran", "rather", "rd", "re", "readily", "really", "recent", "recently", "ref", "refs", "regarding", "regardless", "regards", "related", "relatively", "research", "respectively", "resulted", "resulting", "results", "right", "run", "s", "said", "same", "saw", "say", "saying", "says", "sec", "section", "see", "seeing", "seem", "seemed", "seeming", "seems", "seen", "self", "selves", "sent", "seven", "several", "shall", "she", "shed", "she'll", "shes", "should", "shouldn't", "show", "showed", "shown", "showns", "shows", "significant", "significantly", "similar", "similarly", "since", "six", "slightly", "so", "some", "somebody", "somehow", "someone", "somethan", "something", "sometime", "sometimes", "somewhat", "somewhere", "soon", "sorry", "specifically", "specified", "specify", "specifying", "still", "stop", "strongly", "sub", "substantially", "successfully", "such", "sufficiently", "suggest", "sup", "sure", "t", "take", "taken", "taking", "tell", "tends", "th", "than", "thank", "thanks", "thanx", "that", "that'll", "thats", "that've", "the", "their", "theirs", "them", "themselves", "then", "thence", "there", "thereafter", "thereby", "thered", "therefore", "therein", "there'll", "thereof", "therere", "theres", "thereto", "thereupon", "there've", "these", "they", "theyd", "they'll", "theyre", "they've", "think", "this", "those", "thou", "though", "thoughh", "thousand", "throug", "through", "throughout", "thru", "thus", "til", "tip", "to", "together", "too", "took", "toward", "towards", "tried", "tries", "truly", "try", "trying", "ts", "twice", "two", "u", "un", "under", "unfortunately", "unless", "unlike", "unlikely", "until", "unto", "up", "upon", "ups", "us", "use", "used", "useful", "usefully", "usefulness", "uses", "using", "usually", "v", "value", "various", "'ve", "very", "via", "viz", "vol", "vols", "vs", "w", "want", "wants", "was", "wasn't", "way", "we", "wed", "welcome", "we'll", "went", "were", "weren't", "we've", "what", "whatever", "what'll", "whats", "when", "whence", "whenever", "where", "whereafter", "whereas", "whereby", "wherein", "wheres", "whereupon", "wherever", "whether", "which", "while", "whim", "whither", "who", "whod", "whoever", "whole", "who'll", "whom", "whomever", "whos", "whose", "why", "widely", "willing", "wish", "with", "within", "without", "won't", "words", "world", "would", "wouldn't", "www", "x", "y", "yes", "yet", "you", "youd", "you'll", "your", "youre", "yours", "yourself", "yourselves", "you've", "z", "zero"];
    for (var i = 0; i < words.length; i++) {
      // filtering out stop words and numbers
      if (stopWords.indexOf(words[i].toLowerCase()) === -1 && isNaN(words[i])) {
        nonStopWords.push(words[i].toLowerCase());
      }
    }
 
    var keywords = {};
    for (var i = 0; i < nonStopWords.length; i++) {
      if (nonStopWords[i] in keywords) {
        keywords[nonStopWords[i]] += 1;
      } else {
        keywords[nonStopWords[i]] = 1;
      }
    }

    var sortedKeywords = [];
    for (var keyword in keywords) {
      sortedKeywords.push([keyword, keywords[keyword]])
    }
    sortedKeywords.sort(function(a, b) {
      return b[1] - a[1]
    });
    topKeywords.innerHTML = "";
    for (var i = 0; i < sortedKeywords.length && i < 4; i++) {
      var li = document.createElement('li');
      li.innerHTML = "<b>" + sortedKeywords[i][0] + "</b>: " + sortedKeywords[i][1];
      topKeywords.appendChild(li);
    }
  }
    setStats();
  if (words) {
    topKeywords.style.display = "block";
  } else {
    topKeywords.style.display = "none";
  }

};

readability.addEventListener('click', function() {
  readability.innerHTML = "Fetching score...";


  var data = input.value;

 
      readability.innerHTML = readingEase(CheckReadability(data));
   
});

// function to convert FLESCH READING SCORE into meaningful string.
function readingEase(num) {
  switch (true) {
    case (num <= 30):
      return "College graduate.";
      break;
    case (num > 30 && num <= 50):
      return "College level.";
      break;
    case (num > 50 && num <= 60):
      return "10th - 12th grade.";
      break;
    case (num > 60 && num <= 70):
      return "8th - 9th grade.";
      break;
    case (num > 70 && num <= 80):
      return "7th grade.";
      break;
    case (num > 80 && num <= 90):
      return "6th grade.";
      break;
    case (num > 90 && num <= 100):
      return "5th grade.";
      break;
    default:
      return "Not available.";
      break;
  }
}
 

function calculateFlesch(totalSentences, totalWords, totalSyllables) {
  return (206.835 - (1.015 * (totalWords/totalSentences)) - (84.6 *(totalSyllables/totalWords)));
}

function getSyllables(word) {
  word = word.toLowerCase();
  if(word.length <= 3) { return 1; }
  word = word.replace(/(?:[^laeiouy]es|ed|[^laeiouy]e)$/, '');
  word = word.replace(/^y/, '');
  var syl = word.match(/[aeiouy]{1,2}/g);
  return (syl && syl.length) || 0;
}

function CheckReadability(text) {
  var totalSentences = 0, totalWords = 0, totalSyllables = 0;
 

  var sentences = text.split(/[\\.!\?]/);
  totalSentences = sentences.length;
  sentences.forEach(function (sentence) {
    var word = "";
    for (var i = 0; i < sentence.length; i++) {
      word += sentence[i];
      if(sentence[i] == " ") {
        totalWords++;
        totalSyllables += getSyllables(word);
        word = "";
      }
    }

    if(word.length > 0) {
      totalWords++;
      totalSyllables += getSyllables(word);
      word = ""
    }
  });
 
 
 var sc = calculateFlesch(totalSentences, totalWords, totalSyllables);
return sc;
  }
  
function setProgress (pce, col, val, pcaption='Active', pcolDefault= '') {
  $('#' + pce).circleProgress({value: val,size: 40,startAngle: 11,thickness: 5,lineCap: "round", fill: {color: col}});
  $('#pill-' + pce).text(pcaption);
  if (pcolDefault=="") {
  $('#pill-' + pce).css("background", col);
  } else { $('#pill-' + pce).css("background", pcolDefault); }
}

function autosavetoggle2() {
var ic = document.getElementById('autosaveicon2').getAttribute('style');
if (ic=='fill: black') {
document.getElementById('autosaveicon2').setAttribute('style', 'fill: green');
//toastify('Auto save is ON','center');
autosave2 = 'true';
localStorage.setItem("autosave2", autosave2);
} else {
document.getElementById('autosaveicon2').setAttribute('style', 'fill: black');
//toastify('Auto save is OFF','center');
autosave2 = 'false';
localStorage.setItem("autosave2", autosave2);
}}

function cleartext2(){
if (input.value != "") {
input.value = "";
localStorage.removeItem("word-article");
//toastify('All saved data is cleared','center');
}
}

function setStats() {

w = parseInt(wordCount.innerText, 10)/awords;
if (w<0.5) { c = "red"; p = "Poor " } else if (w<=0.8) { c = "orange" ; p = "Fair  " } else if (w<=0.9) { c = "green"; p = "Good"  } else { c = "green" ; p = "Good"  }
setProgress('progress-container1', c, w, p);

w = parseInt(characterCount.innerText, 10)/acharacters;
if (w<0.5) { c = "red"; p = "Poor " } else if (w<=0.8) { c = "orange" ; p = "Fair  " } else if (w<=0.9) { c = "green"; p = "Good"  } else { c = "green" ; p = "Good"  }
setProgress('progress-container2', c, w, p);

w = parseInt(sentenceCount.innerText, 10)/asentences;
if (w<0.5) { c = "red"; p = "Poor " } else if (w<=0.8) { c = "orange" ; p = "Fair  " } else if (w<=0.9) { c = "green"; p = "Good"  } else { c = "green" ; p = "Good"  }
setProgress('progress-container3', c, w, p);

w = parseInt(paragraphCount.innerText, 10)/apara;
if (w<0.5) { c = "red"; p = "Poor " } else if (w<=0.8) { c = "orange" ; p = "Fair  " } else if (w<=0.9) { c = "green"; p = "Good"  } else { c = "green" ; p = "Good"  }
setProgress('progress-container4', c, w, p);

w = parseInt(readingTime.innerText, 10)/areadingtime;
if (w<0.5) { c = "red";  } else if (w<=0.8) { c = "orange" ;  } else if (w<=0.9) { c = "green";   } else { c = "green" ;   }
setProgress('progress-container5', c, w, "Readability", "dodgerblue");

}
