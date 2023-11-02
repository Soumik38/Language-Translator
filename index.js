const language = {
    "am-ET": "Amharic",
    "ar-SA": "Arabic",
    "be-BY": "Belarusian",
    "bem-ZM": "Bemba",
    "bi-VU": "Bislama",
    "bjs-BB": "Bajan",
    "bn-IN": "Bengali",
    "bo-CN": "Tibetan",
    "br-FR": "Breton",
    "bs-BA": "Bosnian",
    "ca-ES": "Catalan",
    "cop-EG": "Coptic",
    "cs-CZ": "Czech",
    "cy-GB": "Welsh",
    "da-DK": "Danish",
    "dz-BT": "Dzongkha",
    "de-DE": "German",
    "dv-MV": "Maldivian",
    "el-GR": "Greek",
    "en-GB": "English",
    "es-ES": "Spanish",
    "et-EE": "Estonian",
    "eu-ES": "Basque",
    "fa-IR": "Persian",
    "fi-FI": "Finnish",
    "fn-FNG": "Fanagalo",
    "fo-FO": "Faroese",
    "fr-FR": "French",
    "gl-ES": "Galician",
    "gu-IN": "Gujarati",
    "ha-NE": "Hausa",
    "he-IL": "Hebrew",
    "hi-IN": "Hindi",
    "hr-HR": "Croatian",
    "hu-HU": "Hungarian",
    "id-ID": "Indonesian",
    "is-IS": "Icelandic",
    "it-IT": "Italian",
    "ja-JP": "Japanese",
    "kk-KZ": "Kazakh",
    "km-KM": "Khmer",
    "kn-IN": "Kannada",
    "ko-KR": "Korean",
    "ku-TR": "Kurdish",
    "ky-KG": "Kyrgyz",
    "la-VA": "Latin",
    "lo-LA": "Lao",
    "lv-LV": "Latvian",
    "men-SL": "Mende",
    "mg-MG": "Malagasy",
    "mi-NZ": "Maori",
    "ms-MY": "Malay",
    "mt-MT": "Maltese",
    "my-MM": "Burmese",
    "ne-NP": "Nepali",
    "niu-NU": "Niuean",
    "nl-NL": "Dutch",
    "no-NO": "Norwegian",
    "ny-MW": "Nyanja",
    "ur-PK": "Urdu",
    "pau-PW": "Palauan",
    "pa-IN": "Panjabi",
    "ps-PK": "Pashto",
    "pis-SB": "Pijin",
    "pl-PL": "Polish",
    "pt-PT": "Portuguese",
    "rn-BI": "Kirundi",
    "ro-RO": "Romanian",
    "ru-RU": "Russian",
    "sg-CF": "Sango",
    "si-LK": "Sinhala",
    "sk-SK": "Slovak",
    "sm-WS": "Samoan",
    "sn-ZW": "Shona",
    "so-SO": "Somali",
    "sq-AL": "Albanian",
    "sr-RS": "Serbian",
    "sv-SE": "Swedish",
    "sw-SZ": "Swahili",
    "ta-LK": "Tamil",
    "te-IN": "Telugu",
    "tet-TL": "Tetum",
    "tg-TJ": "Tajik",
    "th-TH": "Thai",
    "ti-TI": "Tigrinya",
    "tk-TM": "Turkmen",
    "tl-PH": "Tagalog",
    "tn-BW": "Tswana",
    "to-TO": "Tongan",
    "tr-TR": "Turkish",
    "uk-UA": "Ukrainian",
    "uz-UZ": "Uzbek",
    "vi-VN": "Vietnamese",
    "wo-SN": "Wolof",
    "xh-ZA": "Xhosa",
    "yi-YD": "Yiddish",
    "zu-ZA": "Zulu"
}


let langOption=document.querySelectorAll('select')
let fromText=document.querySelector('.fromText')
let toText=document.querySelector('.toText')

langOption.forEach((get,con)=>{
    for(let countryCode in language){
        let selected
        if(con==0 && countryCode=='en-GB'){
            selected='selected'
        }else if(con==1 && countryCode=='bn-IN'){
            selected='selected'
        }
        let option=`<option value="${countryCode}" ${selected}>${language[countryCode]}</option>`
        get.insertAdjacentHTML('beforeend',option)
    }
})

fromText.addEventListener('input',function(){
    let content=fromText.value
    fromLanguage=langOption[0].value
    toLanguage=langOption[1].value
    let link=`https://api.mymemory.translated.net/get?q=${content}&langpair=${fromLanguage}|${toLanguage}`
    fetch(link).then(translate=>translate.json()).then(data=>{
        console.log(data)
        toText.value=data.responseData.translatedText
    })
})

let fromVoice=document.querySelector('.fromVoice')
fromVoice.addEventListener('click',function(){
    let fromSpeech=new SpeechSynthesisUtterance(fromText.value)
    fromSpeech.lang=langOption[0].value
    speechSynthesis.speak(fromSpeech)
})

let toVoice=document.querySelector('.toVoice')
toVoice.addEventListener('click',function(){
    let toSpeech=new SpeechSynthesisUtterance(toText.value)
    toSpeech.lang=langOption[1].value
    speechSynthesis.speak(toSpeech)
})

let exchange=document.querySelector('.bx-transfer')
exchange.addEventListener('click',function(){
    let temp=fromText.value
    fromText.value=toText.value
    toText.value=temp
    temp=langOption[0].value
    langOption[0].value=langOption[1].value
    langOption[1].value=temp
})