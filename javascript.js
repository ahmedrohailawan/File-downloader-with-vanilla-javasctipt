const fileinput = document.querySelector("input")
downloadbtn = document.querySelector("button")

downloadbtn.addEventListener("click", e =>{
    e.preventDefault()   //preventing form from submittins
    downloadbtn.innerText = "Downloading file..."
    fetchFile(fileinput.value);
})

function fetchFile(url){
    //fetching file and returning response as a blob
    fetch(url).then(res => res.blob()).then(file =>{
        //create a url of passed object
        let tempurl = URL.createObjectURL(file);
        //passing tempurl as href value of <a> tag
        let atag = document.createElement("a");
        atag.href = tempurl;
        // passing filename as download value of <a> tag
        // atag.download = url.replace(/^.*[\\\/]/, '');
        atag.download = ("Downloaded");
        // adding <a> tag inside body
        document.body.appendChild(atag);
        //clicking <a> tag so file download
        atag.click();
        //removing <a> tag once file donwloaded
        atag.remove();
        URL.revokeObjectURL(tempurl);
        downloadbtn.innerText = "Download File"
    }).catch(() => {
        //catch method will be called whenever error will be occured durning download
        downloadbtn.innerText = "Download File"
        alert("Failed to download file! \n check you internet connection \n or this content is blocked to download");
    })
}