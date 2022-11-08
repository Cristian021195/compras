export const HeadTitleUrl = (url:string, app_name:string) => {
  if(url == '/'){
    document.title = app_name;  
  }else{
    let url_arr = url.split('/').filter(e=>e !== '')
    document.title = Analizar(url_arr);
  }
}

function Analizar (words:string[]){
  let out = '';
  words.forEach(word => {
    out += word.charAt(0).toUpperCase() + word.slice(1) + ' ';
  });
  return out;
}
