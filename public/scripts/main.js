/* namespace. */
var rhit = rhit || {};

darkmode = true;


rhit.colorMode = function()
{
    alert("hiiiiiiiiiiiiiii change colors when i get this in place");
    if(darkMode)
    {
        background = "#23202d";
        text = "#ebeaef";
        header = "#17151e";
        accent = "#fee285";
    }else //light mode
    {

    }
}

rhit.main = function()
{
    let clickables = document.getElementsByClassName("clickable");
    for(let i = 0; i < clickables.length; i++)
    {
        const temp = clickables[i]; //this had a better name but didnt work. now it works with a shit name. ._.

        temp.style.color = "#0dee7";
        temp.onmouseover = (event) =>
        {
            //how do you just change the color what  the fuck oh my fucking GOD
            temp.style.color = "#f2a918";
        }

        temp.onmouseleave = (event) =>
        {
            temp.style.color = "#ebeaef";
        }

        temp.onclick = (event) =>
        {
            temp.style.color = "#e0dee7";
        }
    }

    let mode = document.getElementById("colorSwitch");

    mode.onmouseover = (event) =>
    {
        // alert("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA");
    }
    
    mode.onclick = (event) =>
    {
        darkMode = !darkMode;
        this.colorMode();
    }
}

rhit.main();