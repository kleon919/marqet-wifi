

// mozilla/netscape/opera/IE7)

      
var viewportwidth;
var viewportheight;

if (typeof window.innerWidth != "undefined"){

            viewportwidth = window.innerWidth,
            viewportheight = window.innerHeight
                  
}

// IE6 

else if (typeof document.documentElement != "undefined" && 
      typeof document.documentElement.clientWidth != "undefined" && 
      document.documentElement.clientWidth != 0){

            viewportwidth = document.documentElement.clientWidth,
            viewportheight = document.documentElement.clientHeight

}

// older versions of 'IE'

else{

            viewportwidth = document.getElementsByTagName("body")[0].clientWidth,
            viewportheight = document.getElementsByTagName("body")[0].clientHeight

}

document.write('<p>Your viewport width is ' + viewportwidth + 'x' + viewportheight + '</p>');



