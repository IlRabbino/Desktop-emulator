$(document).ready(function(){
    var icon = $(".upload-icon");
    icon.click(function(){
        $("body").append('<div class="upload-container">\
        <form action="../php/upload.php" method="post" enctype="multipart/form-data">\
            Select file to upload:\
            <input type="file" name="fileToUpload" id="fileToUpload">\
            <input type="submit" value="Upload file" name="submit">\
        </form>\
    </div>');
    });
});