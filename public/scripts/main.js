/* namespace. */
var rhit = rhit || {};

rhit.darkmode = true;
rhit.image = "images/darkmode.png";
rhit.background = "#23202d";
rhit.text = "#ebeaef";
rhit.header = "#17151e";
rhit.accent = "#fee285";
rhit.secondary = "#454168";


rhit.colorMode = function()
{
    // alert(rhit.darkmode);
    if(rhit.darkMode)
    {
        // alert("hiiiiiiiiiiiiiii darkmode");
        rhit.image = "images/darkmode.png";
        rhit.background = "#23202d";
        rhit.text = "#ebeaef";
        rhit.header = "#17151e";
        rhit.accent = "#fee285";
    }else //light mode
    {
        // alert("hiiiiiiiiiiiiiii lightmode");
        rhit.image = "images/lightmode.png";
        rhit.background = "#e0dee7";
        rhit.text = "#141316";
        rhit.header = "#3e3b54";
        rhit.accent = "#fee285";
    }

    document.getElementById("colorSwitch").src = rhit.image;

    let body = document.getElementsByTagName("body");
    body[0].style.backgroundColor = rhit.background;

    let text = document.getElementsByClassName("text");
    for(let i = 0; i < text.length; i++)
    {
        text[i].style.color = rhit.text;
    }

    let header = document.getElementsByClassName("header");
    header[0].style.backgroundColor = header; //hhhhhhhhhhhhh can this shit please work like come the fuck on what is the issue
    
    //just gonna leave this as extra credit ig since this is already late
    //it is joe biden over as the kids say
}

rhit.main = function()
{
    let clickables = document.getElementsByClassName("clickable");
    for(let i = 0; i < clickables.length; i++)
    {
        const temp = clickables[i]; //this had a better name but didnt work. now it works with a shit name. ._.
        temp.onmouseover = (event) =>
        {
            
            if(rhit.darkmode)
            {
                temp.style.color = rhit.accent;
            }else if(!rhit.darkmode)
            {
                temp.style.color = rhit.secondary;
            }
        }

        temp.onmouseleave = (event) =>
        {
            temp.style.color = rhit.text;
        }

        temp.onclick = (event) =>
        {
            if(rhit.darkmode)
            {
                temp.style.color = rhit.secondary;
            }else
            {
                temp.style.color = rhit.accent;
            }
        }
    }

    let mode = document.getElementById("colorSwitch");

    mode.onclick = (event) =>
    {
        this.darkMode = !this.darkMode;
        this.colorMode();
    }
}

rhit.main();