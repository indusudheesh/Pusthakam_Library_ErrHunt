var image=document.getElementById("imagehidden");
var imgfile=document.getElementById("imgfile")

function validate()
{
    console.log("within js")
    console.log(imgfile.value);
    console.log(image.value);
    if(imgfile.value!="")
     image.value=imgfile.value;
     console.log(image.value);
     return false;

}